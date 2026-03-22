import { useState, useMemo, useCallback } from 'react';
import Header from './components/Header';
import Calendar from './components/Calendar';
import Legend from './components/Legend';
import PlanningModal from './components/PlanningModal';
import WishlistSidebar from './components/WishlistSidebar';
import { COUNTRIES, DESTINATIONS } from './data/appData';
import { useHolidays } from './hooks/useHolidays';
import { analyzeExtendedWeekends } from './utils/holidayUtils';

export default function App() {
  const today = new Date();

  // ── Core state ─────────────────────────────────────────────────────────────
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]); // India default
  const [selectedState, setSelectedState] = useState(null);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  // ── UI state ───────────────────────────────────────────────────────────────
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [inspireOpen, setInspireOpen] = useState(false);
  const [inspireDestination, setInspireDestination] = useState(null);

  // ── Holiday data ───────────────────────────────────────────────────────────
  const { holidays, loading, error } = useHolidays(
    selectedCountry?.code,
    selectedState?.code,
    currentYear,
  );

  const extendedWeekends = useMemo(
    () => (holidays.length ? analyzeExtendedWeekends(holidays) : []),
    [holidays],
  );

  // ── Stats ──────────────────────────────────────────────────────────────────
  const longWeekendCount = useMemo(
    () => extendedWeekends.filter(g => g.type !== 'weekend_holiday').length,
    [extendedWeekends],
  );

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleDayClick = useCallback(group => {
    setSelectedGroup(group);
    setModalOpen(true);
  }, []);

  const handleAddToWishlist = useCallback(trip => {
    setWishlist(prev => {
      const exists = prev.find(t => t.id === trip.id);
      if (exists) return prev.filter(t => t.id !== trip.id);
      return [...prev, trip];
    });
  }, []);

  const handlePrevMonth = useCallback(() => {
    setCurrentMonth(m => {
      if (m === 0) { setCurrentYear(y => y - 1); return 11; }
      return m - 1;
    });
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth(m => {
      if (m === 11) { setCurrentYear(y => y + 1); return 0; }
      return m + 1;
    });
  }, []);

  const handleInspireMe = useCallback(() => {
    const random = DESTINATIONS[Math.floor(Math.random() * DESTINATIONS.length)];
    setInspireDestination(random);
    setInspireOpen(true);
  }, []);

  const handleCountryChange = useCallback(code => {
    const c = COUNTRIES.find(x => x.code === code);
    setSelectedCountry(c);
    setSelectedState(null);
  }, []);

  const handleStateChange = useCallback(code => {
    const s = selectedCountry?.states?.find(x => x.code === code);
    setSelectedState(s || null);
  }, [selectedCountry]);

  return (
    <div className="min-h-screen font-body" style={{ background: 'linear-gradient(180deg, #f7f5f0 0%, #faf8f4 40%, #f0ece4 100%)' }}>
      {/* Soft ambient blobs — vacation warmth */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(255,220,150,0.3) 0%, transparent 70%)' }} />
        <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(200,240,230,0.3) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[5%] left-[30%] w-[600px] h-[400px] rounded-full opacity-25"
          style={{ background: 'radial-gradient(circle, rgba(255,200,170,0.25) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <Header
          wishlistCount={wishlist.length}
          onWishlistOpen={() => setWishlistOpen(true)}
          onInspireMe={handleInspireMe}
        />

        {/* Controls */}
        <div className="max-w-5xl mx-auto px-4 pt-3 pb-2">
          <div className="flex flex-wrap items-end gap-4">

            {/* Country selector */}
            <div>
              <label className="block text-[10px] text-amber-700/60 uppercase tracking-[0.2em] mb-2 font-semibold">
                Country
              </label>
              <div className="sel-wrap">
                <select
                  className="sel min-w-[160px]"
                  value={selectedCountry?.code || ''}
                  onChange={e => handleCountryChange(e.target.value)}
                >
                  {COUNTRIES.map(c => (
                    <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* State selector */}
            {selectedCountry?.states?.length > 0 && (
              <div>
                <label className="block text-[10px] text-amber-700/60 uppercase tracking-[0.2em] mb-2 font-semibold">
                  State / Province
                </label>
                <div className="sel-wrap">
                  <select
                    className="sel min-w-[210px]"
                    value={selectedState?.code || ''}
                    onChange={e => handleStateChange(e.target.value)}
                  >
                    <option value="">All States (National only)</option>
                    {selectedCountry.states.map(s => (
                      <option key={s.code} value={s.code}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Loading spinner */}
            {loading && (
              <div className="flex items-center gap-2 text-amber-700/60 text-xs pb-2.5">
                <div className="w-3.5 h-3.5 border-2 border-amber-300 border-t-amber-600 rounded-full animate-spin" />
                Loading holidays…
              </div>
            )}

            {/* Error */}
            {error && !loading && (
              <div className="text-xs text-orange-600 pb-2.5">⚠ {error}</div>
            )}

            {/* Stats */}
            {!loading && holidays.length > 0 && (
              <div className="ml-auto flex items-center gap-5">
                <div className="text-center">
                  <div className="font-display text-2xl font-bold text-red-500">
                    {holidays.length}
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">Holidays</div>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div className="text-center">
                  <div className="font-display text-2xl font-bold text-teal-600">
                    {longWeekendCount}
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">Long Weekends</div>
                </div>
                {extendedWeekends.filter(g => g.type === 'mega_bridge').length > 0 && (
                  <>
                    <div className="w-px h-8 bg-gray-200" />
                    <div className="text-center">
                      <div className="font-display text-2xl font-bold text-purple-600">
                        {extendedWeekends.filter(g => g.type === 'mega_bridge').length}
                      </div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider">Mega Breaks</div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Hero nudge when no state selected */}
        {!selectedState && selectedCountry?.code === 'IN' && !loading && holidays.length > 0 && (
          <div className="max-w-5xl mx-auto px-4 mb-2">
            <div className="px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-2.5">
              <span className="text-amber-500 text-sm">💡</span>
              <p className="text-xs text-amber-700/80">
                Select your state above to see regional holidays like Ganesh Chaturthi, Pongal, Baisakhi, and more — unlocking even more long weekend opportunities!
              </p>
            </div>
          </div>
        )}

        {/* Calendar */}
        <div className="max-w-5xl mx-auto px-4 pb-1">
          <Calendar
            year={currentYear}
            month={currentMonth}
            holidays={holidays}
            extendedWeekends={extendedWeekends}
            onDayClick={handleDayClick}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
          />
          <Legend />
        </div>

        {/* Footer */}
        <div className="max-w-5xl mx-auto px-4 pb-4 mt-2 text-center">
          <p className="text-xs text-slate-400">
            Holiday data powered by Nager.Date · Destinations curated by AI · Plan responsibly
          </p>
        </div>
      </div>

      {/* Planning Modal */}
      {modalOpen && selectedGroup && (
        <PlanningModal
          group={selectedGroup}
          country={selectedCountry}
          state={selectedState}
          month={currentMonth}
          onClose={() => setModalOpen(false)}
          onAddToWishlist={handleAddToWishlist}
          wishlist={wishlist}
        />
      )}

      {/* Wishlist Sidebar */}
      {wishlistOpen && (
        <WishlistSidebar
          wishlist={wishlist}
          onClose={() => setWishlistOpen(false)}
          onRemove={id => setWishlist(prev => prev.filter(t => t.id !== id))}
        />
      )}

      {/* Inspire Me Popup */}
      {inspireOpen && inspireDestination && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setInspireOpen(false)}>
          <div className="absolute inset-0 modal-backdrop" />
          <div
            className="relative z-10 max-w-sm w-full bg-white rounded-2xl border border-gray-200 p-6 animate-fade-up"
            style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.15)' }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setInspireOpen(false)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 text-sm"
            >✕</button>

            <p className="text-xs text-amber-600/70 uppercase tracking-widest mb-3">✨ Inspiration for you</p>
            <div className="text-4xl mb-2">{inspireDestination.emoji}</div>
            <h3 className="font-display text-3xl font-semibold text-gold-gradient mb-1">
              {inspireDestination.name}
            </h3>
            <p className="text-slate-500 text-sm mb-4">{inspireDestination.tagline}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {inspireDestination.highlights.slice(0, 3).map(h => (
                <span key={h} className="text-[10px] px-2.5 py-1 rounded-full bg-gray-50 text-slate-500 border border-gray-200">
                  {h}
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleInspireMe}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-slate-500 text-sm hover:bg-gray-50 transition-all"
              >
                🔀 Another
              </button>
              <button
                onClick={() => setInspireOpen(false)}
                className="flex-1 py-2.5 rounded-xl font-semibold text-sm text-white"
                style={{ background: 'linear-gradient(135deg, #d4a24a, #c08a30)' }}
              >
                Explore on Calendar →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
