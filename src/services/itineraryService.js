// ─── Itinerary Service ───────────────────────────────────────────────────────
// Flow: Supabase cache → Groq AI itinerary → local fallback
// Caches results in Supabase so repeated queries are instant
//
// AI Stack:
//   Destination Suggestions: Groq AI (openai/gpt-oss-120b) — see grokService.js
//   Itinerary Generation:    Groq AI (openai/gpt-oss-120b) → local template fallback
//   Future:                  TripAdvisor Apify actors for enriched details
//
// DEPRECATED (Apify actors caused wrong data):
//   Primary:  Apify actor "akash9078/ai-travel-planner" → Mistral Large
//   Fallback: Apify actor "whole_yolk/personalized-tourist-planner" → Claude / OpenAI

import { generateDynamicItinerary } from '../data/detailedItineraries';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'openai/gpt-oss-120b';

// ─── Custom Exceptions ──────────────────────────────────────────────────────

class ItineraryError extends Error {
  constructor(message, source, details = {}) {
    super(message);
    this.name = 'ItineraryError';
    this.source = source;
    this.details = details;
    this.timestamp = new Date().toISOString();
  }
}

class CacheError extends ItineraryError {
  constructor(message, details) { super(message, 'supabase-cache', details); this.name = 'CacheError'; }
}

class GroqItineraryError extends ItineraryError {
  constructor(message, details) { super(message, 'groq-ai (openai/gpt-oss-120b)', details); this.name = 'GroqItineraryError'; }
}

class ConfigError extends ItineraryError {
  constructor(message) { super(message, 'config', {}); this.name = 'ConfigError'; }
}

// ─── Logger ─────────────────────────────────────────────────────────────────

const LOG_STYLES = {
  request:  'color: #6366f1; font-weight: bold',  // indigo
  success:  'color: #10b981; font-weight: bold',  // green
  warn:     'color: #f59e0b; font-weight: bold',  // amber
  error:    'color: #ef4444; font-weight: bold',  // red
  info:     'color: #3b82f6; font-weight: bold',  // blue
  cache:    'color: #8b5cf6; font-weight: bold',  // purple
  ai:       'color: #ec4899; font-weight: bold',  // pink — for AI-specific logs
};

function log(level, ...args) {
  const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 });
  const prefix = `[${timestamp}] [ItineraryService]`;
  const style = LOG_STYLES[level] || '';

  if (level === 'error') {
    console.error(`%c${prefix} ❌`, style, ...args);
  } else if (level === 'warn') {
    console.warn(`%c${prefix} ⚠️`, style, ...args);
  } else {
    const icon = { request: '📡', success: '✅', info: 'ℹ️', cache: '💾', ai: '🤖' }[level] || '•';
    console.log(`%c${prefix} ${icon}`, style, ...args);
  }
}

// ─── Cache key builder ──────────────────────────────────────────────────────

function buildCacheKey(destination, fromCity, transport, duration) {
  return `${destination}::${fromCity}::${transport}::${duration}d`.toLowerCase().replace(/\s+/g, '-');
}

// ─── Supabase helpers ───────────────────────────────────────────────────────

async function checkCache(cacheKey) {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    log('warn', 'Supabase not configured — skipping cache check');
    return null;
  }
  const startTime = performance.now();
  try {
    log('cache', `Checking cache → key: "${cacheKey}"`);
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/itinerary_cache?cache_key=eq.${encodeURIComponent(cacheKey)}&select=itinerary_data,source&limit=1`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } },
    );
    const elapsed = (performance.now() - startTime).toFixed(0);
    if (!res.ok) {
      log('warn', `Cache check failed → HTTP ${res.status} (${elapsed}ms)`);
      return null;
    }
    const rows = await res.json();
    if (rows.length > 0) {
      log('success', `CACHE HIT → source: "${rows[0].source}" (${elapsed}ms)`);
      return rows[0];
    }
    log('info', `CACHE MISS → no entry found (${elapsed}ms)`);
  } catch (err) {
    log('error', 'Cache check threw:', err.message);
  }
  return null;
}

async function writeCache(cacheKey, destination, fromCity, transport, duration, itineraryData, source) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return;
  const startTime = performance.now();
  try {
    log('cache', `Writing to cache → key: "${cacheKey}", source: "${source}"`);
    await fetch(`${SUPABASE_URL}/rest/v1/itinerary_cache`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates',
      },
      body: JSON.stringify({
        cache_key: cacheKey,
        destination,
        from_city: fromCity,
        transport,
        duration_days: duration,
        itinerary_data: itineraryData,
        source,
      }),
    });
    const elapsed = (performance.now() - startTime).toFixed(0);
    log('success', `Cache write complete (${elapsed}ms)`);
  } catch (err) {
    log('error', 'Cache write failed:', err.message);
  }
}

// ─── Groq AI Itinerary Generator ────────────────────────────────────────────

/**
 * @param {string} destination
 * @param {string} fromCity
 * @param {string} transport - train|flight|road|bus
 * @param {number} numDays
 * @param {string[]} vacationTypes
 * @param {string} departureSlot - 'morning'|'afternoon'|'evening'|'latenight'
 * @param {object|null} tripAdvisorData - { hotels, restaurants, attractions } from TripAdvisor
 */
async function generateGroqItinerary(destination, fromCity, transport, numDays, vacationTypes, departureSlot, tripAdvisorData) {
  if (!GROQ_API_KEY) {
    log('warn', 'VITE_GROQ_API_KEY not set — skipping Groq AI itinerary');
    return null;
  }

  const vtLabels = vacationTypes?.join(', ') || 'general sightseeing';

  const DEPARTURE_WINDOWS = {
    morning: '6:00 AM – 10:00 AM',
    afternoon: '1:00 PM – 5:00 PM',
    evening: '6:00 PM – 9:00 PM',
    latenight: '10:00 PM – 4:00 AM',
  };
  const departureWindow = DEPARTURE_WINDOWS[departureSlot] || DEPARTURE_WINDOWS.morning;

  // Build TripAdvisor context for the prompt
  let taContext = '';
  if (tripAdvisorData) {
    const parts = [];
    if (tripAdvisorData.hotels?.length) {
      parts.push('REAL HOTELS from TripAdvisor (USE these in the itinerary for accommodation):\n' +
        tripAdvisorData.hotels.map(h => `  - ${h.name} (Rating: ${h.rating || '?'}/5, ${h.reviewCount} reviews${h.priceRange ? ', Price: ' + h.priceRange : ''}${h.neighborhood ? ', Area: ' + h.neighborhood : ''})`).join('\n'));
    }
    if (tripAdvisorData.restaurants?.length) {
      parts.push('REAL RESTAURANTS from TripAdvisor (USE these for meals):\n' +
        tripAdvisorData.restaurants.map(r => `  - ${r.name} (Rating: ${r.rating || '?'}/5, ${r.reviewCount} reviews${r.cuisine?.length ? ', Cuisine: ' + r.cuisine.join(', ') : ''})`).join('\n'));
    }
    if (tripAdvisorData.attractions?.length) {
      parts.push('REAL ATTRACTIONS from TripAdvisor (USE these as primary sightseeing spots, then add more if needed):\n' +
        tripAdvisorData.attractions.map(a => `  - ${a.name} (Rating: ${a.rating || '?'}/5, ${a.reviewCount} reviews${a.category ? ', Type: ' + a.category : ''})`).join('\n'));
    }
    if (parts.length) {
      taContext = '\n\nTRIPADVISOR VERIFIED DATA — You MUST incorporate these real places into the itinerary:\n' + parts.join('\n\n') +
        '\n\nIMPORTANT: Use ALL the TripAdvisor places listed above. If there aren\'t enough attractions to fill all days, ADD more well-known spots that you know exist at the destination. Every meal should prefer the TripAdvisor restaurants listed. Hotels listed should be used for overnight stays.';
    }
  }

  const systemPrompt = `You are an expert travel planner. Generate a detailed hour-by-hour itinerary.

CRITICAL RULES:
- Starting city is ${fromCity}. The traveller departs FROM ${fromCity} TO ${destination}.
- Transport mode: ${transport}
- User wants to depart during: ${departureWindow}

TRAVEL PLANNING RULES:
- If you know a specific real ${transport} service (train name, flight number, bus service) that departs from ${fromCity} to ${destination} within the ${departureWindow} window, USE IT and start the itinerary from ${fromCity} with that specific departure.
- If you know real routes but not specific services, pick a realistic departure time within the ${departureWindow} window and include the journey from ${fromCity}.
- If NO direct ${transport} route exists from ${fromCity} to ${destination}, calculate the approximate travel time and start the itinerary from the nearest arrival point at ${destination} (e.g., railway station, airport, bus stand). Mention in the first timeline item how the traveller reaches that point.
- Always use realistic travel durations based on actual distances.
- For return journey on the last day, apply the same logic in reverse.

GENERAL RULES:
- Include specific restaurant names, hotel names, and attraction names (prefer TripAdvisor data if provided)
- Time format: HH:MM (24-hour)
- Each day should have 6-10 timeline items
- Include breakfast, lunch, dinner with real restaurant names
- Include check-in/check-out at hotels
- Balance activities throughout the day with rest breaks
${taContext}

Return ONLY valid JSON (no markdown, no explanation) with this exact structure:
{
  "days": [
    {
      "dayNum": 1,
      "title": "Day title (e.g. Mumbai → Goa)",
      "subtitle": "Theme or focus of the day",
      "isTravel": true/false,
      "overnight": "Hotel name from TripAdvisor or real hotel",
      "timeline": [
        {
          "time": "HH:MM",
          "type": "travel|activity|food|rest|checkin|prep",
          "emoji": "single emoji",
          "title": "Short title",
          "detail": "1-2 sentence description with real place names"
        }
      ]
    }
  ],
  "summary": "X days · Y nights · Transport from City",
  "totalActivities": number,
  "destinationDays": number,
  "nights": number,
  "fromCity": "${fromCity}",
  "transport": "${transport}"
}`;

  const userPrompt = `Create a ${numDays}-day itinerary for ${destination}.
- Starting from: ${fromCity}
- Transport: ${transport}
- Departure time: ${departureWindow}
- Vacation vibes: ${vtLabels}
- Day 1: Depart from ${fromCity} during ${departureWindow}, travel to ${destination}
- Last day: Return to ${fromCity}
- Middle days: detailed sightseeing, local food, activities matching ${vtLabels}
${tripAdvisorData ? '- USE the TripAdvisor hotels, restaurants, and attractions provided in the system prompt' : ''}`;

  log('ai', `Calling Groq AI for itinerary → ${destination} (${GROQ_MODEL})`);
  log('request', `Prompt: ${numDays} days from ${fromCity} via ${transport}`);

  const t0 = performance.now();

  try {
    const res = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.6,
        max_tokens: 4000,
        response_format: { type: 'json_object' },
      }),
    });

    const elapsed = (performance.now() - t0).toFixed(0);

    if (!res.ok) {
      const errBody = await res.text().catch(() => '');
      log('error', `Groq API error: HTTP ${res.status} (${elapsed}ms)`, errBody);
      throw new GroqItineraryError(`HTTP ${res.status}`, { body: errBody });
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      log('error', 'Groq returned empty content');
      throw new GroqItineraryError('Empty response');
    }

    log('ai', `Groq responded in ${elapsed}ms, tokens: ${data.usage?.total_tokens || '?'}`);

    // Parse JSON (handle markdown wrapping, extra text)
    let jsonStr = content.trim();
    jsonStr = jsonStr.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?\s*```\s*$/i, '');
    const firstBrace = jsonStr.indexOf('{');
    const lastBrace = jsonStr.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace > firstBrace) {
      jsonStr = jsonStr.slice(firstBrace, lastBrace + 1);
    }

    const parsed = JSON.parse(jsonStr);

    if (!parsed.days || !Array.isArray(parsed.days) || parsed.days.length === 0) {
      throw new GroqItineraryError('Response missing days array');
    }

    // Ensure fromCity is set correctly
    parsed.fromCity = fromCity;
    parsed.transport = transport;
    if (!parsed.summary) {
      parsed.summary = `${numDays} days · ${numDays - 1} nights · ${transport} from ${fromCity}`;
    }
    if (!parsed.nights) parsed.nights = Math.max(1, numDays - 1);
    if (!parsed.destinationDays) parsed.destinationDays = Math.max(1, numDays - 2);
    if (!parsed.totalActivities) {
      parsed.totalActivities = parsed.days.reduce((sum, d) =>
        sum + d.timeline.filter(t => t.type === 'activity' || t.type === 'food').length, 0);
    }

    log('success', `Groq AI itinerary: ${parsed.days.length} days, ${parsed.totalActivities} activities`);
    return parsed;
  } catch (err) {
    if (err instanceof GroqItineraryError) throw err;
    const elapsed = (performance.now() - t0).toFixed(0);
    log('error', `Groq AI itinerary failed (${elapsed}ms):`, err.message);
    throw new GroqItineraryError(err.message);
  }
}

// ─── Apify actors (DEPRECATED — replaced by Groq AI) ───────────────────────
// Kept as comments for future TripAdvisor integration.
// See git history for full Apify actor code.

// ─── Markdown → Structured Itinerary Parser ─────────────────────────────────

function classifyTimelineType(text) {
  const lower = text.toLowerCase();
  if (/\b(breakfast|lunch|dinner|café|cafe|eat|food|restaurant|meal|snack|thali|coffee)\b/.test(lower)) return 'food';
  if (/\b(arrive|depart|board|train|flight|drive|bus|travel|journey|check.?out|leave|transfer)\b/.test(lower)) return 'travel';
  if (/\b(check.?in|hotel|resort|accommodation|stay)\b/.test(lower)) return 'checkin';
  if (/\b(sleep|rest|night|relax|wind down)\b/.test(lower)) return 'rest';
  if (/\b(pack|packing|prepare|wake up|morning routine)\b/.test(lower)) return 'prep';
  return 'activity';
}

function typeToEmoji(type, text) {
  const lower = text.toLowerCase();
  if (type === 'food') {
    if (/breakfast/.test(lower)) return '☕';
    if (/dinner/.test(lower)) return '🍽️';
    if (/lunch/.test(lower)) return '🍛';
    return '🍴';
  }
  if (type === 'travel') {
    if (/train/.test(lower)) return '🚂';
    if (/flight|fly|airport/.test(lower)) return '✈️';
    if (/drive|car|road/.test(lower)) return '🚗';
    if (/bus/.test(lower)) return '🚌';
    if (/arrive/.test(lower)) return '📍';
    return '🚂';
  }
  if (type === 'checkin') return '🏨';
  if (type === 'rest') return '🌙';
  if (type === 'prep') return '⏰';
  // Activity subtypes
  if (/temple|church|mosque|monastery|spiritual/.test(lower)) return '🏛️';
  if (/beach|swim/.test(lower)) return '🏖️';
  if (/trek|hike|walk/.test(lower)) return '🥾';
  if (/market|shop|mall/.test(lower)) return '🛍️';
  if (/sunset|sunrise/.test(lower)) return '🌅';
  if (/museum|gallery|art/.test(lower)) return '🖼️';
  if (/waterfall|falls/.test(lower)) return '💦';
  if (/adventure|sport|paraglid|ski|raft/.test(lower)) return '🪂';
  if (/garden|park|forest|nature/.test(lower)) return '🌿';
  if (/fort|castle|palace/.test(lower)) return '🏰';
  if (/lake|river|boating/.test(lower)) return '🚣';
  return '🎯';
}

function parsePrimaryMarkdown(markdown, fromCity, transport, numDays) {
  const days = [];
  // Split by "### **Day N:" pattern
  const dayRegex = /###\s*\*{0,2}Day\s+(\d+)\s*[:–—]\s*(.+?)\*{0,2}\s*$/gmi;
  const daySections = [];
  let match;

  // Find all day header positions
  const matches = [];
  while ((match = dayRegex.exec(markdown)) !== null) {
    matches.push({ index: match.index, dayNum: parseInt(match[1]), title: match[2].replace(/\*+/g, '').trim() });
  }

  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index;
    const end = i + 1 < matches.length ? matches[i + 1].index : markdown.length;
    daySections.push({
      dayNum: matches[i].dayNum,
      title: matches[i].title,
      content: markdown.slice(start, end),
    });
  }

  // If no day sections found, create a single day from the whole markdown
  if (daySections.length === 0) {
    daySections.push({ dayNum: 1, title: `Exploring`, content: markdown });
  }

  for (const section of daySections) {
    const timeline = [];
    // Extract time-based entries: "- **HH:MM AM/PM – Title:**" or "**HH:MM – Title**"
    const timeRegex = /\*{0,2}(\d{1,2}[:.]\d{2}\s*(?:AM|PM)?)\s*[–—-]\s*(.+?)\*{0,2}:?\s*$/gmi;
    const bullets = section.content.split('\n');

    let currentTime = null;
    let currentTitle = null;
    let currentDetail = [];

    function flush() {
      if (currentTime && currentTitle) {
        const cleanTitle = currentTitle.replace(/\*+/g, '').replace(/:$/, '').trim();
        const detail = currentDetail.join(' ').replace(/\*+/g, '').replace(/\s+/g, ' ').trim();
        const type = classifyTimelineType(cleanTitle + ' ' + detail);
        const emoji = typeToEmoji(type, cleanTitle + ' ' + detail);

        // Normalize time to 24h HH:MM
        let time = currentTime.replace('.', ':').trim();
        const pmMatch = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
        if (pmMatch) {
          let h = parseInt(pmMatch[1]);
          const m = pmMatch[2];
          const ampm = pmMatch[3].toUpperCase();
          if (ampm === 'PM' && h !== 12) h += 12;
          if (ampm === 'AM' && h === 12) h = 0;
          time = `${String(h).padStart(2, '0')}:${m}`;
        }

        timeline.push({ time, type, emoji, title: cleanTitle, detail: detail || cleanTitle });
      }
    }

    for (const line of bullets) {
      const timeMatch = line.match(/\*{0,2}(\d{1,2}[:.]\d{2}\s*(?:AM|PM)?)\s*[–—-]\s*(.+?)(?:\*{0,2}:?\s*)$/i);
      if (timeMatch) {
        flush();
        currentTime = timeMatch[1];
        currentTitle = timeMatch[2];
        currentDetail = [];
      } else if (currentTime) {
        const cleaned = line.replace(/^\s*[-*•]\s*/, '').trim();
        if (cleaned && !cleaned.startsWith('###') && !cleaned.startsWith('---')) {
          currentDetail.push(cleaned);
        }
      }
    }
    flush();

    // Extract theme subtitle
    const themeMatch = section.content.match(/\*{1,2}Theme:\*{1,2}\s*\*{0,1}(.+?)\*{0,1}$/mi);
    const subtitle = themeMatch ? themeMatch[1].trim() : '';

    // Detect travel day
    const isTravel = /arrival|depart|travel|journey|transit/i.test(section.title);

    // Detect overnight
    const overnightMatch = section.content.match(/(?:stay|accommodation|hotel|resort|check.?in).*?(?:at|:)\s*\*{0,2}(.+?)\*{0,2}(?:\s*\(|,|\.|$)/mi);
    const overnight = overnightMatch ? overnightMatch[1].replace(/\*+/g, '').trim() : (isTravel ? `Hotel in destination` : null);

    // If no timeline items were parsed, create a generic one
    if (timeline.length === 0) {
      timeline.push({
        time: '09:00', type: 'activity', emoji: '🎯',
        title: section.title, detail: 'Explore and enjoy the day.',
      });
    }

    days.push({
      dayNum: section.dayNum,
      title: section.title,
      subtitle,
      isTravel,
      overnight,
      timeline,
    });
  }

  // Calculate stats
  const totalActivities = days.reduce((sum, d) =>
    sum + d.timeline.filter(t => t.type === 'activity' || t.type === 'food').length, 0);
  const travelDays = days.filter(d => d.isTravel).length;
  const destinationDays = Math.max(0.5, numDays - travelDays);

  return {
    fromCity,
    transport,
    destinationDays,
    nights: Math.max(1, numDays - 1),
    totalActivities,
    summary: `${numDays} days · ${numDays - 1} nights · ${transport === 'flight' ? 'Flight' : transport === 'train' ? 'Train' : transport === 'road' ? 'Drive' : 'Bus'} from ${fromCity}`,
    days,
  };
}

function parseFallbackData(data, destination, fromCity, transport, numDays) {
  const days = [];

  if (data.itinerary?.length) {
    data.itinerary.forEach((dayData, idx) => {
      const timeline = [];
      const dayNum = dayData.day || idx + 1;
      const isTravel = dayNum === 1 || dayNum === numDays;

      if (dayNum === 1) {
        timeline.push({
          time: '08:00', type: 'travel', emoji: transport === 'flight' ? '✈️' : '🚗',
          title: `Depart from ${fromCity}`,
          detail: `Start your journey to ${destination}. Distance: ${data.transportation?.totalDistanceKm || '?'} km.`,
        });
      }

      if (dayData.places?.length) {
        dayData.places.forEach((place, pi) => {
          const attraction = data.attractions?.find(a => a.name === place);
          const hour = 10 + pi * 2;
          timeline.push({
            time: `${String(hour).padStart(2, '0')}:00`,
            type: 'activity',
            emoji: typeToEmoji('activity', place),
            title: `Visit ${place}`,
            detail: attraction?.description || dayData.activities || `Explore ${place}`,
          });
        });
      }

      if (dayData.activities && !dayData.places?.length) {
        timeline.push({
          time: '10:00', type: 'activity', emoji: '🎯',
          title: dayData.activities,
          detail: `Day ${dayNum} activities and exploration.`,
        });
      }

      if (dayData.meals?.includes('Lunch')) {
        timeline.push({
          time: '13:00', type: 'food', emoji: '🍛',
          title: 'Lunch', detail: 'Local cuisine at a recommended restaurant.',
        });
      }
      if (dayData.meals?.includes('Dinner')) {
        timeline.push({
          time: '20:00', type: 'food', emoji: '🍽️',
          title: 'Dinner', detail: 'Evening meal.',
        });
      }

      if (dayNum === numDays) {
        timeline.push({
          time: '16:00', type: 'travel', emoji: transport === 'flight' ? '✈️' : '🚗',
          title: `Return to ${fromCity}`,
          detail: `Head back home. Safe travels!`,
        });
      }

      if (timeline.length === 0) {
        timeline.push({
          time: '09:00', type: 'activity', emoji: '🎯',
          title: `Explore ${destination}`, detail: 'Free day for exploration.',
        });
      }

      days.push({
        dayNum,
        title: dayNum === 1 ? `${fromCity} → ${destination}` : dayNum === numDays ? `${destination} → ${fromCity}` : `Day ${dayNum} — Explore`,
        subtitle: dayData.activities || '',
        isTravel,
        overnight: dayData.accommodation || null,
        timeline,
      });
    });
  }

  const totalActivities = days.reduce((sum, d) =>
    sum + d.timeline.filter(t => t.type === 'activity').length, 0);

  return {
    fromCity,
    transport,
    destinationDays: Math.max(0.5, numDays - 2),
    nights: Math.max(1, numDays - 1),
    totalActivities,
    summary: `${numDays} days · ${numDays - 1} nights · from ${fromCity} · Budget: ₹${data.totalCost?.toLocaleString('en-IN') || '?'}`,
    days,
    costBreakdown: data.costBreakdown,
    recommendations: data.recommendations,
  };
}

// ─── Main export ────────────────────────────────────────────────────────────

/**
 * Fetch a detailed itinerary for a destination.
 * Priority: Supabase cache → TripAdvisor + Groq AI → local template fallback
 *
 * @param {object} dest - Destination object
 * @param {number} duration - Trip duration in days
 * @param {string} fromCity - User's starting city
 * @param {string} transport - Transport mode (train/flight/road/bus)
 * @param {string} budget - Budget tier
 * @param {number} groupSize - Number of travellers
 * @param {string[]} vacationTypes - Selected vacation types
 * @param {string} departureSlot - 'morning'|'afternoon'|'evening'|'latenight'
 * @param {object|null} tripAdvisorData - { hotels, restaurants, attractions } or null
 * @returns {Promise<{itinerary: object, source: string}>}
 */
export async function fetchItinerary(dest, duration, fromCity, transport, budget, groupSize, vacationTypes, departureSlot, tripAdvisorData) {
  const slotSuffix = departureSlot || 'morning';
  const cacheKey = buildCacheKey(dest.name, fromCity, transport, duration) + `::${slotSuffix}`;
  const totalStart = performance.now();

  const hasTaData = tripAdvisorData && (tripAdvisorData.hotels?.length || tripAdvisorData.restaurants?.length || tripAdvisorData.attractions?.length);

  console.log('\n');
  log('info', '═══════════════════════════════════════════════════════════');
  log('info', `ITINERARY REQUEST → ${dest.name}`);
  log('info', `  From: ${fromCity} | Transport: ${transport} | Days: ${duration}`);
  log('info', `  Departure: ${slotSuffix} | Budget: ${budget || 'n/a'} | Group: ${groupSize}`);
  log('info', `  Types: [${vacationTypes?.join(', ')}]`);
  log('info', `  TripAdvisor data: ${hasTaData ? `${tripAdvisorData.hotels?.length || 0} hotels, ${tripAdvisorData.restaurants?.length || 0} restaurants, ${tripAdvisorData.attractions?.length || 0} attractions` : 'none'}`);
  log('info', `  Cache key: "${cacheKey}"`);
  log('info', '───────────────────────────────────────────────────────────');

  // ── 1. Check Supabase cache ────────────────────────────────────────────────
  log('info', 'Step 1/3 → Checking Supabase cache...');
  const cached = await checkCache(cacheKey);
  if (cached) {
    const totalElapsed = (performance.now() - totalStart).toFixed(0);
    log('success', `SERVED FROM CACHE → originally from "${cached.source}" (total: ${totalElapsed}ms)`);
    log('info', '═══════════════════════════════════════════════════════════\n');
    return { itinerary: cached.itinerary_data, source: `cache (${cached.source})` };
  }

  // ── 2. Try Groq AI (with TripAdvisor data if available) ────────────────────
  log('info', `Step 2/3 → Groq AI (openai/gpt-oss-120b)${hasTaData ? ' + TripAdvisor data' : ''}...`);
  try {
    const groqItinerary = await generateGroqItinerary(dest.name, fromCity, transport, duration, vacationTypes, slotSuffix, tripAdvisorData || null);
    if (groqItinerary) {
      const totalElapsed = (performance.now() - totalStart).toFixed(0);

      // Cache the AI-generated itinerary
      writeCache(cacheKey, dest.name, fromCity, transport, duration, groqItinerary, 'groq-ai').catch(() => {});

      log('success', `ITINERARY READY → source: GROQ AI (${GROQ_MODEL}) (total: ${totalElapsed}ms)`);
      log('info', '═══════════════════════════════════════════════════════════\n');
      return { itinerary: groqItinerary, source: 'groq-ai' };
    }
  } catch (err) {
    log('warn', `Groq AI failed: ${err.message}. Falling back to local generation.`);
  }

  // ── 3. Local template fallback ─────────────────────────────────────────────
  log('info', 'Step 3/3 → Using LOCAL template generation (fallback).');

  const localItinerary = generateDynamicItinerary(dest, duration, fromCity, transport);
  const totalElapsed = (performance.now() - totalStart).toFixed(0);

  log('info', `Local generation complete → ${localItinerary.days.length} days, from ${fromCity}`);

  // Cache locally-generated itinerary too
  writeCache(cacheKey, dest.name, fromCity, transport, duration, localItinerary, 'local').catch(() => {});

  log('success', `ITINERARY READY → source: LOCAL (template) (total: ${totalElapsed}ms)`);
  log('info', '═══════════════════════════════════════════════════════════\n');
  return { itinerary: localItinerary, source: 'local' };
}

/**
 * Get itinerary synchronously from local generator (for preview/stats).
 * Used in Step 5 destination cards before user clicks "View Itinerary".
 */
export function getLocalItinerary(dest, duration, fromCity, transport) {
  return generateDynamicItinerary(dest, duration, fromCity, transport);
}
