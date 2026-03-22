// ─── TripAdvisor Enrichment Service ─────────────────────────────────────────
// Uses Apify actor "maxcopell/tripadvisor" to fetch real hotels, restaurants,
// and attractions for a destination. Results cached in Supabase.
//
// Flow: Supabase cache → Apify actor run → parse & cache → return
// ────────────────────────────────────────────────────────────────────────────

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const APIFY_TOKEN  = import.meta.env.VITE_APIFY_TOKEN;

const APIFY_BASE = 'https://api.apify.com/v2';
const ACTOR_ID = 'maxcopell~tripadvisor';

// ─── Custom Exceptions ──────────────────────────────────────────────────────

class TripAdvisorError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'TripAdvisorError';
    this.details = details;
    this.timestamp = new Date().toISOString();
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
  ta:      'color: #00aa6c; font-weight: bold', // TripAdvisor green
};

function log(level, ...args) {
  const ts = new Date().toLocaleTimeString('en-US', {
    hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3,
  });
  const prefix = `[${ts}] [TripAdvisorService]`;
  const style = LOG_STYLES[level] || '';
  const icon = { request: '📡', success: '✅', info: 'ℹ️', cache: '💾', ta: '🦉', warn: '⚠️', error: '❌' }[level] || '•';

  if (level === 'error') {
    console.error(`%c${prefix} ${icon}`, style, ...args);
  } else if (level === 'warn') {
    console.warn(`%c${prefix} ${icon}`, style, ...args);
  } else {
    console.log(`%c${prefix} ${icon}`, style, ...args);
  }
}

// ─── Cache helpers ──────────────────────────────────────────────────────────

// Map country codes / currency symbols to ISO currency codes for TripAdvisor
const CURRENCY_MAP = {
  '₹': 'INR', 'INR': 'INR', 'IN': 'INR',
  '$': 'USD', 'USD': 'USD', 'US': 'USD',
  '£': 'GBP', 'GBP': 'GBP', 'GB': 'GBP',
  '€': 'EUR', 'EUR': 'EUR', 'DE': 'EUR', 'FR': 'EUR',
  'A$': 'AUD', 'AUD': 'AUD', 'AU': 'AUD',
  'C$': 'CAD', 'CAD': 'CAD', 'CA': 'CAD',
};

function resolveCurrency(input) {
  return CURRENCY_MAP[input] || 'USD';
}

function buildCacheKey(destination, currency) {
  return `ta::${destination}::${resolveCurrency(currency)}`.toLowerCase().replace(/\s+/g, '-');
}

async function checkCache(cacheKey) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return null;

  const t0 = performance.now();
  try {
    const url = `${SUPABASE_URL}/rest/v1/tripadvisor_cache?cache_key=eq.${encodeURIComponent(cacheKey)}&select=hotels,restaurants,attractions&limit=1`;
    const res = await fetch(url, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
    });
    if (!res.ok) return null;
    const rows = await res.json();
    const elapsed = (performance.now() - t0).toFixed(0);

    if (rows.length > 0) {
      log('cache', `HIT — found cached TripAdvisor data (${elapsed}ms)`, cacheKey);
      return rows[0];
    }
    log('cache', `MISS — no cached data (${elapsed}ms)`, cacheKey);
    return null;
  } catch (err) {
    log('warn', 'Cache check failed:', err.message);
    return null;
  }
}

async function writeCache(cacheKey, destination, hotels, restaurants, attractions, rawData) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return;

  try {
    const url = `${SUPABASE_URL}/rest/v1/tripadvisor_cache?on_conflict=cache_key`;
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
        destination,
        hotels,
        restaurants,
        attractions,
        raw_data: rawData,
        created_at: new Date().toISOString(),
      }),
    });
    log('cache', 'Wrote TripAdvisor data to cache', cacheKey);
  } catch (err) {
    log('warn', 'Cache write failed (non-critical):', err.message);
  }
}

// ─── Apify Actor Runner ────────────────────────────────────────────────────

async function runTripAdvisorActor(destination, currency = 'INR') {
  if (!APIFY_TOKEN) {
    throw new TripAdvisorError('VITE_APIFY_TOKEN is not set in .env');
  }

  const isoCurrency = resolveCurrency(currency);

  const input = {
    query: destination,
    maxItemsPerQuery: 5,
    includeHotels: true,
    includeRestaurants: true,
    includeAttractions: true,
    includeTags: false,
    includeNearbyResults: false,
    includePriceOffers: false,
    includeAiReviewsSummary: false,
    language: 'en',
    currency: isoCurrency,
    maxPhotosPerPlace: 0,
  };

  log('ta', `Calling Apify actor "${ACTOR_ID}" for "${destination}"...`);
  log('request', `Input: ${JSON.stringify({ query: destination, maxItemsPerQuery: 5, currency })}`);

  const t0 = performance.now();

  // Start actor run and wait for it to finish (max 90s)
  const runUrl = `${APIFY_BASE}/acts/${ACTOR_ID}/runs?waitForFinish=90`;
  const res = await fetch(runUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${APIFY_TOKEN}`,
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const errBody = await res.text().catch(() => '');
    log('error', `Apify API error: HTTP ${res.status}`, errBody);
    throw new TripAdvisorError(`Apify returned ${res.status}`, { body: errBody });
  }

  const runData = await res.json();
  const runId = runData.data?.id;
  const status = runData.data?.status;
  const elapsed = (performance.now() - t0).toFixed(0);

  log('ta', `Actor run ${runId} — status: ${status} (${elapsed}ms)`);

  if (status !== 'SUCCEEDED') {
    // If still running, wait a bit more
    if (status === 'RUNNING') {
      log('info', 'Actor still running, waiting additional 30s...');
      await new Promise(r => setTimeout(r, 5000));

      // Check status
      const statusRes = await fetch(`${APIFY_BASE}/actor-runs/${runId}`, {
        headers: { Authorization: `Bearer ${APIFY_TOKEN}` },
      });
      const statusData = await statusRes.json();
      if (statusData.data?.status !== 'SUCCEEDED') {
        log('warn', `Actor didn't finish in time, status: ${statusData.data?.status}`);
        throw new TripAdvisorError('Actor run timed out');
      }
    } else {
      throw new TripAdvisorError(`Actor run failed with status: ${status}`);
    }
  }

  // Fetch dataset items
  const datasetId = runData.data?.defaultDatasetId;
  if (!datasetId) throw new TripAdvisorError('No dataset ID in run result');

  const itemsUrl = `${APIFY_BASE}/datasets/${datasetId}/items?format=json&limit=15`;
  const itemsRes = await fetch(itemsUrl, {
    headers: { Authorization: `Bearer ${APIFY_TOKEN}` },
  });

  if (!itemsRes.ok) throw new TripAdvisorError('Failed to fetch dataset items');

  const items = await itemsRes.json();
  const totalElapsed = (performance.now() - t0).toFixed(0);

  log('success', `Got ${items.length} TripAdvisor results for "${destination}" (${totalElapsed}ms)`);

  return items;
}

// ─── Data Parsers ───────────────────────────────────────────────────────────

function parseHotel(item) {
  return {
    name: item.name || item.title || 'Unknown Hotel',
    rating: item.rating || item.bubbleRating || null,
    reviewCount: item.reviewCount || item.numberOfReviews || 0,
    priceRange: item.priceRange || item.price || null,
    priceLevel: item.priceLevel || null,
    rankingString: item.rankingString || null,
    image: item.image || item.photo?.images?.small?.url || null,
    url: item.url || item.webUrl || null,
    amenities: (item.amenities || []).slice(0, 5),
    neighborhood: item.neighborhood || item.location?.neighborhood || null,
  };
}

function parseRestaurant(item) {
  return {
    name: item.name || item.title || 'Unknown Restaurant',
    rating: item.rating || item.bubbleRating || null,
    reviewCount: item.reviewCount || item.numberOfReviews || 0,
    priceLevel: item.priceLevel || item.price || null,
    cuisine: (item.cuisine || item.cuisines || []).slice(0, 3).map(c => typeof c === 'string' ? c : c.name || c),
    rankingString: item.rankingString || null,
    image: item.image || item.photo?.images?.small?.url || null,
    url: item.url || item.webUrl || null,
    mealTypes: (item.mealTypes || []).slice(0, 3),
  };
}

function parseAttraction(item) {
  return {
    name: item.name || item.title || 'Unknown Attraction',
    rating: item.rating || item.bubbleRating || null,
    reviewCount: item.reviewCount || item.numberOfReviews || 0,
    category: item.category || item.subcategory?.[0]?.name || null,
    rankingString: item.rankingString || null,
    image: item.image || item.photo?.images?.small?.url || null,
    url: item.url || item.webUrl || null,
    description: item.description?.slice(0, 150) || null,
  };
}

function categorizeResults(items) {
  const hotels = [];
  const restaurants = [];
  const attractions = [];

  for (const item of items) {
    const type = (item.type || item.category || '').toLowerCase();
    const url = (item.url || item.webUrl || '').toLowerCase();

    if (type.includes('hotel') || type.includes('accommodation') || type.includes('lodging') || url.includes('hotel_review')) {
      hotels.push(parseHotel(item));
    } else if (type.includes('restaurant') || type.includes('dining') || url.includes('restaurant_review')) {
      restaurants.push(parseRestaurant(item));
    } else if (type.includes('attraction') || type.includes('activity') || type.includes('thing') || url.includes('attraction_review')) {
      attractions.push(parseAttraction(item));
    } else {
      // Try to guess from available fields
      if (item.priceRange || item.amenities) {
        hotels.push(parseHotel(item));
      } else if (item.cuisine || item.cuisines || item.mealTypes) {
        restaurants.push(parseRestaurant(item));
      } else {
        attractions.push(parseAttraction(item));
      }
    }
  }

  return {
    hotels: hotels.slice(0, 5),
    restaurants: restaurants.slice(0, 5),
    attractions: attractions.slice(0, 5),
  };
}

// ─── Main Export ─────────────────────────────────────────────────────────────

/**
 * Fetch TripAdvisor data for a destination.
 * Flow: Supabase cache → Apify actor → parse & cache → return
 *
 * @param {string} destination - Destination name (e.g., "Gokarna")
 * @param {string} currency - Currency code (default: "INR")
 * @returns {Promise<{ hotels: Array, restaurants: Array, attractions: Array, source: string }>}
 */
export async function fetchTripAdvisorData(destination, currency = 'INR') {
  log('request', '═══════════════════════════════════════════════════');
  log('request', `TRIPADVISOR ENRICHMENT → ${destination}`);
  log('ta', `  Actor: ${ACTOR_ID} | Currency: ${currency}`);
  log('request', '═══════════════════════════════════════════════════');

  const cacheKey = buildCacheKey(destination, currency);

  // Step 1: Check cache
  log('info', 'Step 1/2: Checking Supabase cache...');
  const cached = await checkCache(cacheKey);
  if (cached) {
    log('success', 'Returning cached TripAdvisor data');
    return { ...cached, source: 'cache' };
  }

  // Step 2: Call Apify actor
  log('info', 'Step 2/2: Calling Apify TripAdvisor actor...');
  try {
    const rawItems = await runTripAdvisorActor(destination, currency);
    const { hotels, restaurants, attractions } = categorizeResults(rawItems);

    log('success', `Parsed: ${hotels.length} hotels, ${restaurants.length} restaurants, ${attractions.length} attractions`);

    // Log details
    hotels.forEach((h, i) => log('info', `  🏨 ${i + 1}. ${h.name} — ⭐${h.rating || '?'} (${h.reviewCount} reviews)`));
    restaurants.forEach((r, i) => log('info', `  🍽️ ${i + 1}. ${r.name} — ⭐${r.rating || '?'} (${r.cuisine?.join(', ')})`));
    attractions.forEach((a, i) => log('info', `  🎯 ${i + 1}. ${a.name} — ⭐${a.rating || '?'}`));

    // Cache (non-blocking)
    writeCache(cacheKey, destination, hotels, restaurants, attractions, rawItems).catch(() => {});

    log('success', '═══════════════════════════════════════════════════');
    log('success', `DONE — TripAdvisor enrichment for ${destination}`);
    log('success', '═══════════════════════════════════════════════════');

    return { hotels, restaurants, attractions, source: 'apify' };
  } catch (err) {
    log('error', `TripAdvisor enrichment failed: ${err.message}`);
    return { hotels: [], restaurants: [], attractions: [], source: 'error' };
  }
}

/**
 * Check if TripAdvisor enrichment is available (Apify token set)
 */
export function isTripAdvisorConfigured() {
  return !!APIFY_TOKEN;
}
