// ─── AI Destination Suggestion Service ──────────────────────────────────────
// Suggests travel destinations based on user preferences
// Uses AI inference for intelligent destination recommendations
// ────────────────────────────────────────────────────────────────────────────

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'openai/gpt-oss-120b';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ─── Custom Exceptions ──────────────────────────────────────────────────────

class GroqError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'GroqError';
    this.details = details;
    this.timestamp = new Date().toISOString();
  }
}

class GroqConfigError extends GroqError {
  constructor(message) {
    super(message);
    this.name = 'GroqConfigError';
  }
}

class GroqAPIError extends GroqError {
  constructor(message, details) {
    super(message, details);
    this.name = 'GroqAPIError';
  }
}

// ─── Logger ─────────────────────────────────────────────────────────────────

const LOG_STYLES = {
  request: 'color: #6366f1; font-weight: bold',
  success: 'color: #10b981; font-weight: bold',
  warn:    'color: #f59e0b; font-weight: bold',
  error:   'color: #ef4444; font-weight: bold',
  info:    'color: #3b82f6; font-weight: bold',
  cache:   'color: #8b5cf6; font-weight: bold',
  ai:      'color: #ec4899; font-weight: bold',
};

function log(level, ...args) {
  const ts = new Date().toLocaleTimeString('en-US', {
    hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3,
  });
  const prefix = `[${ts}] [GroqService]`;
  const style = LOG_STYLES[level] || '';
  const icon = { request: '📡', success: '✅', info: 'ℹ️', cache: '💾', ai: '🤖', warn: '⚠️', error: '❌' }[level] || '•';

  if (level === 'error') {
    console.error(`%c${prefix} ${icon}`, style, ...args);
  } else if (level === 'warn') {
    console.warn(`%c${prefix} ${icon}`, style, ...args);
  } else {
    console.log(`%c${prefix} ${icon}`, style, ...args);
  }
}

// ─── Cache helpers ──────────────────────────────────────────────────────────

function buildSuggestionCacheKey(vacationTypes, fromCity, transport, totalDays, month, country) {
  const vtKey = [...vacationTypes].sort().join('+');
  return `suggest::${vtKey}::${fromCity}::${transport}::${totalDays}d::m${month}::${country}`
    .toLowerCase().replace(/\s+/g, '-');
}

async function checkSuggestionCache(cacheKey) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return null;

  const t0 = performance.now();
  try {
    const url = `${SUPABASE_URL}/rest/v1/destination_suggestions?cache_key=eq.${encodeURIComponent(cacheKey)}&select=suggestions&limit=1`;
    const res = await fetch(url, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rows = await res.json();
    const elapsed = (performance.now() - t0).toFixed(0);

    if (rows.length > 0 && rows[0].suggestions) {
      log('cache', `HIT — found cached suggestions (${elapsed}ms)`, cacheKey);
      return rows[0].suggestions;
    }
    log('cache', `MISS — no cached suggestions (${elapsed}ms)`, cacheKey);
    return null;
  } catch (err) {
    log('warn', 'Cache check failed, continuing without cache:', err.message);
    return null;
  }
}

async function writeSuggestionCache(cacheKey, suggestions) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return;

  try {
    const url = `${SUPABASE_URL}/rest/v1/destination_suggestions?on_conflict=cache_key`;
    await fetch(url, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates',
      },
      body: JSON.stringify({
        cache_key: cacheKey,
        suggestions,
        created_at: new Date().toISOString(),
      }),
    });
    log('cache', 'Wrote suggestions to cache', cacheKey);
  } catch (err) {
    log('warn', 'Cache write failed (non-critical):', err.message);
  }
}

// ─── Month names for prompt ─────────────────────────────────────────────────

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// ─── Groq API call ──────────────────────────────────────────────────────────

async function callGroq(vacationTypes, fromCity, transport, totalDays, month, country) {
  if (!GROQ_API_KEY) {
    throw new GroqConfigError('VITE_GROQ_API_KEY is not set in .env');
  }

  const monthName = MONTH_NAMES[month] || 'unknown';
  const vtLabels = vacationTypes.join(', ');

  const systemPrompt = `You are an expert travel advisor. Given user preferences, suggest exactly 5 travel destinations.

IMPORTANT RULES:
- Destinations must be reachable from the user's starting city via their preferred transport
- Consider the travel month for weather & season suitability
- Consider the total trip duration (including travel days)
- Rank destinations by suitability (best first)
- Include ONLY real, well-known tourist destinations
- Each destination must have realistic travel time estimates from the user's city
- For train/bus travel, ensure routes actually exist (no fictional connections)
- For flights, only suggest destinations with airports nearby

Return ONLY valid JSON, no markdown, no explanation. Use this exact structure:
{
  "destinations": [
    {
      "name": "Destination Name",
      "state": "State/Province/Region",
      "country": "Country",
      "emoji": "single emoji",
      "tagline": "One catchy line about this place",
      "highlights": ["Highlight 1", "Highlight 2", "Highlight 3", "Highlight 4"],
      "bestFor": ["vacation_type_1", "vacation_type_2"],
      "travelTime": {
        "train": "Xh" or null,
        "flight": "Xh" or null,
        "road": "Xh" or null
      },
      "distanceKm": number,
      "whyNow": "Why this destination is great for this month/season",
      "estimatedCostPerPerson": "budget range in local currency",
      "packingTips": ["tip1", "tip2", "tip3"],
      "seasonalWarning": "warning text or null"
    }
  ]
}`;

  const userPrompt = `Find 5 destinations for:
- Vacation types: ${vtLabels}
- Starting from: ${fromCity}
- Country: ${country}
- Preferred transport: ${transport}
- Trip duration: ${totalDays} days (including travel)
- Travel month: ${monthName}

Suggest destinations that are perfect for a ${totalDays}-day ${vtLabels} trip from ${fromCity} in ${monthName}. Prioritize destinations reachable by ${transport}.`;

  log('ai', `Calling AI for destination suggestions...`);
  log('request', `Prompt: ${vtLabels} trip from ${fromCity}, ${totalDays} days in ${monthName} via ${transport}`);

  const t0 = performance.now();

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
      temperature: 0.7,
      max_tokens: 3000,
      response_format: { type: 'json_object' },
    }),
  });

  const elapsed = (performance.now() - t0).toFixed(0);

  if (!res.ok) {
    const errBody = await res.text().catch(() => 'No body');
    log('error', `Groq API error: HTTP ${res.status} (${elapsed}ms)`, errBody);
    throw new GroqAPIError(`Groq API returned ${res.status}`, { status: res.status, body: errBody });
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    log('error', 'Groq returned empty content', data);
    throw new GroqAPIError('Groq returned empty response');
  }

  log('ai', `AI responded in ${elapsed}ms, tokens: ${data.usage?.total_tokens || 'unknown'}`);

  // Parse JSON from response (handle markdown wrapping, extra text, etc.)
  let parsed;
  try {
    let jsonStr = content.trim();
    // Strip markdown code fences
    jsonStr = jsonStr.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?\s*```\s*$/i, '');
    // If still not starting with {, try to find the first { and last }
    const firstBrace = jsonStr.indexOf('{');
    const lastBrace = jsonStr.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace > firstBrace) {
      jsonStr = jsonStr.slice(firstBrace, lastBrace + 1);
    }
    parsed = JSON.parse(jsonStr);
  } catch (err) {
    log('error', 'Failed to parse Groq JSON response:', content.slice(0, 500));
    throw new GroqAPIError('Failed to parse Groq response as JSON', { raw: content.slice(0, 500) });
  }

  if (!parsed.destinations || !Array.isArray(parsed.destinations)) {
    throw new GroqAPIError('Groq response missing destinations array', { parsed });
  }

  log('success', `Got ${parsed.destinations.length} destination suggestions`);
  parsed.destinations.forEach((d, i) => {
    log('info', `  ${i + 1}. ${d.emoji} ${d.name} (${d.state}) — ${d.whyNow || ''}`);
  });

  return parsed.destinations;
}

// ─── Main export ────────────────────────────────────────────────────────────

/**
 * Fetch AI-suggested destinations.
 * Flow: Supabase cache → AI → empty fallback
 *
 * @param {string[]} vacationTypes - e.g. ['Beaches & Coastal', 'Adventure']
 * @param {string} fromCity - user's starting city
 * @param {string} transport - 'train' | 'flight' | 'road' | 'bus'
 * @param {number} totalDays - total trip duration
 * @param {number} month - 0-indexed month
 * @param {string} country - country name
 * @returns {Promise<{ destinations: Array, source: string }>}
 */
export async function fetchDestinationSuggestions(vacationTypes, fromCity, transport, totalDays, month, country) {
  log('request', '═══════════════════════════════════════════════════');
  log('request', 'DESTINATION SUGGESTION REQUEST');
  log('info', `  Types: ${vacationTypes.join(', ')}`);
  log('info', `  From: ${fromCity} | Transport: ${transport}`);
  log('info', `  Duration: ${totalDays} days | Month: ${MONTH_NAMES[month]}`);
  log('info', `  Country: ${country}`);
  log('ai', `  AI Engine: ready`);
  log('request', '═══════════════════════════════════════════════════');

  const cacheKey = buildSuggestionCacheKey(vacationTypes, fromCity, transport, totalDays, month, country);

  // Step 1: Check cache
  log('info', 'Step 1/2: Checking Supabase cache...');
  const cached = await checkSuggestionCache(cacheKey);
  if (cached) {
    log('success', 'Returning cached destination suggestions');
    return { destinations: cached, source: 'cache' };
  }

  // Step 2: Call AI
  log('info', 'Step 2/2: Calling AI for suggestions...');
  try {
    const destinations = await callGroq(vacationTypes, fromCity, transport, totalDays, month, country);

    // Write to cache (non-blocking)
    writeSuggestionCache(cacheKey, destinations).catch(() => {});

    log('success', '═══════════════════════════════════════════════════');
    log('success', `DONE — ${destinations.length} AI-suggested destinations`);
    log('success', '═══════════════════════════════════════════════════');

    return { destinations, source: 'groq' };
  } catch (err) {
    if (err instanceof GroqConfigError) {
      log('warn', 'Groq API key not configured — returning empty suggestions');
      log('warn', 'Set VITE_GROQ_API_KEY in .env to enable AI destination suggestions');
    } else {
      log('error', 'AI suggestion failed:', err.message);
    }
    return { destinations: [], source: 'error' };
  }
}

/**
 * Check if AI is configured
 */
export function isGrokConfigured() {
  return !!GROQ_API_KEY;
}
