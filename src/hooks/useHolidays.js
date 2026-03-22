import { useState, useEffect } from 'react';
import { INDIA_FALLBACK_HOLIDAYS_2025, INDIA_FALLBACK_HOLIDAYS_2026 } from '../data/appData';

const FALLBACK_MAP = {
  '2025': INDIA_FALLBACK_HOLIDAYS_2025,
  '2026': INDIA_FALLBACK_HOLIDAYS_2026,
};

export function useHolidays(countryCode, stateCode, year) {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!countryCode) return;

    setLoading(true);
    setError(null);

    const controller = new AbortController();

    fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`, {
      signal: controller.signal,
    })
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(data => {
        // Filter by state if stateCode is provided
        const filtered = data.filter(h => {
          if (!stateCode) return true;
          if (h.global === true || h.counties === null) return true;
          if (Array.isArray(h.counties) && h.counties.includes(stateCode)) return true;
          return false;
        });
        setHolidays(filtered);
        setLoading(false);
      })
      .catch(err => {
        if (err.name === 'AbortError') return;
        console.warn('Holiday API failed, using fallback data:', err.message);

        // Use fallback for India
        const key = String(year);
        const fallback = FALLBACK_MAP[key];
        if (fallback && countryCode === 'IN') {
          const filtered = fallback.filter(h => {
            if (!stateCode) return true;
            if (h.global === true || h.counties === null) return true;
            if (Array.isArray(h.counties) && h.counties.includes(stateCode)) return true;
            return false;
          });
          setHolidays(filtered);
        } else {
          setHolidays([]);
          setError('Could not load holidays. Please check your connection.');
        }
        setLoading(false);
      });

    return () => controller.abort();
  }, [countryCode, stateCode, year]);

  return { holidays, loading, error };
}
