import { useState, useEffect, useCallback } from 'react';
import { formatDisplayDate, formatShortDate } from '../utils/holidayUtils';
import {
  VACATION_TYPES, getSuggestedTypes, getDestinations,
} from '../data/appData';
import { generateDynamicItinerary, TYPE_STYLES } from '../data/detailedItineraries';
import { fetchItinerary } from '../services/itineraryService';
import { fetchDestinationSuggestions, isGrokConfigured } from '../services/grokService';
import { fetchTripAdvisorData, isTripAdvisorConfigured } from '../services/tripAdvisorService';

// ─── Step indicator ───────────────────────────────────────────────────────────

function StepBar({ step, total }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => {
        const s = i + 1;
        let cls = 'step-dot ';
        if (s < step) cls += 'step-dot-done';
        else if (s === step) cls += 'step-dot-active';
        else cls += 'step-dot-idle';

        return (
          <div key={s} className="flex items-center">
            <div className={cls}>
              {s < step ? (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                s
              )}
            </div>
            {i < total - 1 && (
              <div
                className="h-px w-8 sm:w-12 mx-1 transition-all duration-500"
                style={{ background: s < step ? '#2dd4bf' : 'rgba(0,0,0,0.08)' }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Step 1: Date Confirmation ────────────────────────────────────────────────

function Step1({ group, onNext, onClose }) {
  const allDates = [...group.weekendDates, ...group.suggestedLeaveDates].sort();

  return (
    <div className="animate-fade-up">
      <h3 className="font-display text-3xl font-semibold mb-1" style={{ color: '#c08a30' }}>
        Plan Your Escape
      </h3>
      <p className="text-gray-500 text-sm mb-6">
        We found a great holiday opportunity. Here's your window:
      </p>

      {/* Holiday badge */}
      <div className="flex items-center gap-2 mb-5">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-500 border border-red-200">
          🎉 {group.holidayName}
        </span>
        {group.type === 'mega_bridge' && (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-600 border border-purple-200">
            ✨ Mega Holiday
          </span>
        )}
      </div>

      {/* Date chips */}
      <div className="mb-6">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Dates included</p>
        <div className="flex flex-wrap gap-2">
          {allDates.map(d => {
            const isHoliday = d === group.holidayDate || (group.holidayDates && group.holidayDates.includes(d));
            const isLeave = group.suggestedLeaveDates.includes(d);
            return (
              <span
                key={d}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                  isHoliday
                    ? 'bg-red-50 border-red-200 text-red-500'
                    : isLeave
                    ? 'bg-amber-50 border-amber-200 text-amber-600'
                    : 'bg-teal-50 border-teal-200 text-teal-600'
                }`}
              >
                {formatShortDate(d)}
                {isLeave && <span className="ml-1 opacity-70">(leave)</span>}
              </span>
            );
          })}
        </div>
      </div>

      {/* Summary card */}
      <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-display font-bold text-amber-600">{group.totalDays}</div>
            <div className="text-xs text-gray-400 mt-0.5">Total Days</div>
          </div>
          <div>
            <div className="text-2xl font-display font-bold text-teal-600">{group.weekendDates.length}</div>
            <div className="text-xs text-gray-400 mt-0.5">Weekend / Holiday</div>
          </div>
          <div>
            <div className="text-2xl font-display font-bold text-amber-600">{group.suggestedLeaveDates.length}</div>
            <div className="text-xs text-gray-400 mt-0.5">Leave Needed</div>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-6 leading-relaxed">
        {group.description}
      </p>

      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="px-5 py-3.5 rounded-xl border border-gray-200 text-gray-400 text-sm hover:bg-gray-50 transition-all"
        >
          ← Cancel
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-200 hover:brightness-110 active:scale-98"
          style={{ background: 'linear-gradient(135deg, #d4a24a, #c08a30)' }}
        >
          Start Planning →
        </button>
      </div>
    </div>
  );
}

// ─── Step 2: Location ─────────────────────────────────────────────────────────

function Step2({ stateData, onNext, onBack }) {
  const [city, setCity] = useState('');
  const [customCity, setCustomCity] = useState('');
  const [station, setStation] = useState('');
  const [district, setDistrict] = useState('');
  const [transport, setTransport] = useState('');

  const cities = stateData?.cities || [];
  const transports = [
    { id: 'train', label: 'Train', emoji: '🚂' },
    { id: 'flight', label: 'Flight', emoji: '✈️' },
    { id: 'road', label: 'Road Trip', emoji: '🚗' },
    { id: 'bus', label: 'Bus', emoji: '🚌' },
  ];

  const canProceed = (city || customCity) && transport;

  return (
    <div className="animate-fade-up">
      <h3 className="font-display text-3xl font-semibold mb-1" style={{ color: '#c08a30' }}>
        Where Are You Starting?
      </h3>
      <p className="text-gray-500 text-sm mb-6">
        Help us find destinations closest to you and estimate travel time.
      </p>

      <div className="space-y-4 mb-6">
        {/* City */}
        <div>
          <label className="block text-xs text-amber-600/70 uppercase tracking-widest mb-2">
            Your City / Area
          </label>
          {cities.length > 0 ? (
            <div className="sel-wrap">
              <select
                className="sel"
                value={city}
                onChange={e => setCity(e.target.value)}
              >
                <option value="">Select your city…</option>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
                <option value="__other">Other city…</option>
              </select>
            </div>
          ) : null}
          {(city === '__other' || cities.length === 0) && (
            <input
              className={`inp ${cities.length > 0 ? 'mt-2' : ''}`}
              placeholder="Enter your city or area…"
              value={customCity}
              onChange={e => setCustomCity(e.target.value)}
            />
          )}
        </div>

        {/* Station (optional) */}
        <div>
          <label className="block text-xs text-amber-600/70 uppercase tracking-widest mb-2">
            Nearest Railway Station <span className="text-gray-400 normal-case">— optional</span>
          </label>
          <input
            className="inp"
            placeholder="e.g., CSTM, SBC, HWH…"
            value={station}
            onChange={e => setStation(e.target.value)}
          />
        </div>

        {/* District (optional) */}
        <div>
          <label className="block text-xs text-amber-600/70 uppercase tracking-widest mb-2">
            District / Region <span className="text-gray-400 normal-case">— optional</span>
          </label>
          <input
            className="inp"
            placeholder="e.g., South Mumbai, East Delhi…"
            value={district}
            onChange={e => setDistrict(e.target.value)}
          />
        </div>

        {/* Transport preference */}
        <div>
          <label className="block text-xs text-amber-600/70 uppercase tracking-widest mb-3">
            Preferred Mode of Travel
          </label>
          <div className="grid grid-cols-4 gap-2">
            {transports.map(t => (
              <button
                key={t.id}
                onClick={() => setTransport(t.id)}
                className={`flex flex-col items-center gap-1.5 rounded-xl py-3 px-2 border text-xs font-medium transition-all duration-200 ${
                  transport === t.id
                    ? 'border-amber-400/60 bg-amber-50 text-amber-600'
                    : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{t.emoji}</span>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="px-5 py-3 rounded-xl border border-gray-200 text-gray-400 text-sm hover:bg-gray-50 transition-all"
        >
          ← Back
        </button>
        <button
          onClick={() => canProceed && onNext({ city: city === '__other' ? customCity : (city || customCity), station, district, transport })}
          disabled={!canProceed}
          className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110"
          style={{ background: 'linear-gradient(135deg, #d4a24a, #c08a30)', color: 'white' }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

// ─── Step 3: Budget & Group ───────────────────────────────────────────────────

function Step3({ currency, onNext, onBack }) {
  const [budget, setBudget] = useState('');
  const [groupType, setGroupType] = useState('');
  const [groupSize, setGroupSize] = useState(2);

  const sym = currency || '₹';

  const budgets = [
    { id: 'budget', label: 'Budget', range: `${sym}5k–15k`, desc: 'per person', emoji: '💰' },
    { id: 'midrange', label: 'Mid-Range', range: `${sym}15k–40k`, desc: 'per person', emoji: '✨' },
    { id: 'premium', label: 'Premium', range: `${sym}40k+`, desc: 'per person', emoji: '👑' },
  ];

  const groups = [
    { id: 'solo', label: 'Solo', emoji: '🧍' },
    { id: 'couple', label: 'Couple', emoji: '💑' },
    { id: 'family', label: 'Family', emoji: '👨‍👩‍👧' },
    { id: 'friends', label: 'Friends', emoji: '👯' },
  ];

  const canProceed = budget && groupType;

  return (
    <div className="animate-fade-up">
      <h3 className="font-display text-3xl font-semibold mb-1" style={{ color: '#c08a30' }}>
        Budget & Group
      </h3>
      <p className="text-gray-500 text-sm mb-6">
        This helps us tailor destinations and itineraries to match your style.
      </p>

      {/* Budget */}
      <div className="mb-6">
        <label className="block text-xs text-amber-600/70 uppercase tracking-widest mb-3">
          Budget Per Person
        </label>
        <div className="grid grid-cols-3 gap-3">
          {budgets.map(b => (
            <button
              key={b.id}
              onClick={() => setBudget(b.id)}
              className={`rounded-xl p-4 border text-center transition-all duration-200 ${
                budget === b.id
                  ? 'border-amber-400/60 bg-amber-50'
                  : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
              }`}
            >
              <div className="text-2xl mb-1">{b.emoji}</div>
              <div className={`font-semibold text-sm ${budget === b.id ? 'text-amber-600' : 'text-gray-800'}`}>
                {b.label}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">{b.range}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Group type */}
      <div className="mb-6">
        <label className="block text-xs text-amber-600/70 uppercase tracking-widest mb-3">
          Travelling With
        </label>
        <div className="grid grid-cols-4 gap-2">
          {groups.map(g => (
            <button
              key={g.id}
              onClick={() => setGroupType(g.id)}
              className={`flex flex-col items-center gap-1.5 rounded-xl py-3 px-2 border text-xs font-medium transition-all duration-200 ${
                groupType === g.id
                  ? 'border-amber-400/60 bg-amber-50 text-amber-600'
                  : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300'
              }`}
            >
              <span className="text-xl">{g.emoji}</span>
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Group size */}
      <div className="mb-6">
        <label className="block text-xs text-amber-600/70 uppercase tracking-widest mb-3">
          Total Travellers: <span className="text-amber-600 text-sm normal-case">{groupSize}</span>
        </label>
        <input
          type="range"
          min={1}
          max={12}
          value={groupSize}
          onChange={e => setGroupSize(Number(e.target.value))}
          className="w-full accent-amber-400 h-1.5 rounded-full cursor-pointer"
          style={{
            background: `linear-gradient(to right, #d4a853 ${((groupSize - 1) / 11) * 100}%, rgba(0,0,0,0.08) 0%)`,
          }}
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>1</span><span>6</span><span>12</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="px-5 py-3 rounded-xl border border-gray-200 text-gray-400 text-sm hover:bg-gray-50 transition-all">
          ← Back
        </button>
        <button
          onClick={() => canProceed && onNext({ budget, groupType, groupSize })}
          disabled={!canProceed}
          className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110"
          style={{ background: 'linear-gradient(135deg, #d4a24a, #c08a30)', color: 'white' }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

// ─── Step 3: Vacation Type (was Step 4, budget step removed) ─────────────────

function Step3VacationType({ month, totalDays, userCity, onNext, onBack }) {
  const [selected, setSelected] = useState([]);

  const suggestedIds = getSuggestedTypes(month, totalDays, userCity).map(s => s.id);
  const suggestions = getSuggestedTypes(month, totalDays, userCity);

  function toggle(id) {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id],
    );
  }

  const canProceed = selected.length > 0;

  return (
    <div className="animate-fade-up">
      <h3 className="font-display text-3xl font-semibold mb-1" style={{ color: '#c08a30' }}>
        What's Your Vibe?
      </h3>
      <p className="text-gray-500 text-sm mb-2">
        Select one or more — our AI picks the best destinations.
      </p>

      {/* AI badge */}
      {suggestedIds.length > 0 && (
        <div className="flex items-center gap-2 mb-5 px-3 py-2 rounded-lg bg-teal-50 border border-teal-200">
          <span className="text-teal-600 text-sm">🤖</span>
          <p className="text-xs text-teal-600">
            Based on {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][month]},
            {totalDays} days & your location — we've highlighted best picks for you.
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
        {VACATION_TYPES.map(vt => {
          const isRecommended = suggestedIds.includes(vt.id);
          const reasonObj = suggestions.find(s => s.id === vt.id);
          const isSelected = selected.includes(vt.id);

          return (
            <button
              key={vt.id}
              onClick={() => toggle(vt.id)}
              className={`type-card relative ${isSelected ? 'type-card-selected' : ''}`}
            >
              {isRecommended && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-teal-500 text-white whitespace-nowrap">
                  AI Pick
                </div>
              )}
              <span className="text-3xl mb-2 block">{vt.emoji}</span>
              <span className={`text-xs font-semibold leading-tight ${isSelected ? 'text-amber-600' : 'text-gray-700'}`}>
                {vt.label}
              </span>
              {isRecommended && reasonObj && (
                <span className="text-[9px] text-teal-600/80 mt-1 leading-tight block">
                  {reasonObj.reason}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="px-5 py-3 rounded-xl border border-gray-200 text-gray-400 text-sm hover:bg-gray-50 transition-all">
          ← Back
        </button>
        <button
          onClick={() => canProceed && onNext({ vacationTypes: selected })}
          disabled={!canProceed}
          className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110"
          style={{ background: 'linear-gradient(135deg, #d4a24a, #c08a30)', color: 'white' }}
        >
          Find Destinations →
        </button>
      </div>
    </div>
  );
}

// ─── Detailed Itinerary Modal ─────────────────────────────────────────────────

function downloadItinerary(dest, itinerary) {
  const typeEmoji = { travel: '🚂', activity: '🎯', food: '🍽️', rest: '😴', checkin: '🏨', checkout: '🏨', prep: '🎒' };

  const daysHtml = itinerary.days.map(day => `
    <div class="day">
      <div class="day-header">
        <span class="day-badge">Day ${day.dayNum}</span>
        <span class="day-title">${day.title}</span>
        ${day.subtitle ? `<div class="day-sub">${day.subtitle}</div>` : ''}
      </div>
      <div class="timeline">
        ${day.timeline.map(item => `
          <div class="item">
            <div class="item-time">${item.time}</div>
            <div class="item-body">
              <div class="item-title">${typeEmoji[item.type] || '🔹'} ${item.title}</div>
              <div class="item-detail">${item.detail}</div>
            </div>
          </div>
        `).join('')}
        ${day.overnight ? `<div class="overnight">🏨 <strong>Stay tonight:</strong> ${day.overnight}</div>` : ''}
      </div>
    </div>
  `).join('');

  const packingHtml = dest.packingTips?.length ? `
    <div class="packing">
      <h3>🎒 Packing Checklist</h3>
      <div class="tips">${dest.packingTips.map(t => `<span class="tip">${t}</span>`).join('')}</div>
    </div>
  ` : '';

  const html = `<!DOCTYPE html><html lang="en"><head>
  <meta charset="UTF-8">
  <title>${dest.name} — Full Itinerary</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'DM Sans',sans-serif;color:#1a202c;background:#fff;padding:40px 48px;max-width:760px;margin:0 auto;line-height:1.5}
    .header{border-bottom:3px solid #d4a853;padding-bottom:24px;margin-bottom:36px}
    .header-top{display:flex;align-items:center;gap:18px;margin-bottom:16px}
    .emoji{font-size:52px;line-height:1}
    .dest-name{font-family:'Cormorant Garamond',serif;font-size:38px;font-weight:700;color:#1a202c;line-height:1}
    .dest-tagline{color:#718096;font-size:13px;margin-top:6px;font-style:italic}
    .stats{display:flex;gap:20px;flex-wrap:wrap;margin-top:4px}
    .stat{display:flex;align-items:center;gap:6px;font-size:13px;color:#4a5568;background:#f7f2e8;padding:5px 12px;border-radius:20px}
    .stat strong{color:#744210}
    .day{margin-bottom:32px;page-break-inside:avoid}
    .day-header{background:linear-gradient(135deg,#fefce8,#fef9ee);border-left:4px solid #d4a853;padding:14px 18px;margin-bottom:18px;border-radius:0 10px 10px 0}
    .day-badge{display:inline-block;background:#d4a853;color:white;font-weight:600;font-size:10px;padding:3px 10px;border-radius:12px;margin-right:10px;text-transform:uppercase;letter-spacing:.06em}
    .day-title{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:600;color:#2d3748}
    .day-sub{color:#718096;font-size:12px;margin-top:5px}
    .timeline{padding-left:8px}
    .item{display:flex;gap:14px;margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid #edf2f7}
    .item:last-child{border-bottom:none}
    .item-time{width:50px;flex-shrink:0;font-family:monospace;font-size:12px;color:#d4a853;font-weight:700;padding-top:2px}
    .item-body{flex:1}
    .item-title{font-weight:600;font-size:14px;color:#2d3748;margin-bottom:4px}
    .item-detail{font-size:13px;color:#718096;line-height:1.6}
    .overnight{margin-top:12px;padding:10px 14px;background:#faf5ff;border:1px solid #e9d8fd;border-radius:10px;font-size:13px;color:#6b46c1}
    .packing{margin-top:36px;border-top:2px solid #e2e8f0;padding-top:28px}
    .packing h3{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:600;color:#2d3748;margin-bottom:14px}
    .tips{display:flex;flex-wrap:wrap;gap:8px}
    .tip{background:#f0fff4;border:1px solid #c6f6d5;color:#276749;font-size:12px;padding:5px 12px;border-radius:100px}
    .footer{margin-top:44px;border-top:1px solid #e2e8f0;padding-top:18px;text-align:center;color:#a0aec0;font-size:11px;letter-spacing:.03em}
    @media print{body{padding:20px 24px}.day{page-break-inside:avoid}}
  </style></head><body>
  <div class="header">
    <div class="header-top">
      <span class="emoji">${dest.emoji}</span>
      <div>
        <div class="dest-name">${dest.name} — Full Itinerary</div>
        <div class="dest-tagline">${dest.tagline} &nbsp;·&nbsp; ${itinerary.summary}</div>
      </div>
    </div>
    <div class="stats">
      <div class="stat">🎯 <strong>${itinerary.totalActivities}</strong> activities</div>
      <div class="stat">📅 <strong>${itinerary.destinationDays}</strong> days at destination</div>
      <div class="stat">🌙 <strong>${itinerary.nights}</strong> nights</div>
      ${itinerary.fromCity ? `<div class="stat">📍 from <strong>${itinerary.fromCity}</strong></div>` : ''}
    </div>
  </div>
  ${daysHtml}
  ${packingHtml}
  <div class="footer">Generated by AI Tour Planner &nbsp;·&nbsp; Plan responsibly &nbsp;·&nbsp; Verify timings before travel</div>
</body></html>`;

  const win = window.open('', '_blank');
  if (!win) { alert('Please allow pop-ups to download the itinerary.'); return; }
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 700);
}

function DetailedItineraryModal({ dest, itinerary, source, onClose }) {
  const [activeDay, setActiveDay] = useState(0);

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const day = itinerary.days[activeDay];

  const typeColors = {
    travel:   { dot: '#f59e0b', label: 'amber' },
    activity: { dot: '#2dd4bf', label: 'teal' },
    food:     { dot: '#f97316', label: 'orange' },
    rest:     { dot: '#a78bfa', label: 'purple' },
    checkin:  { dot: '#60a5fa', label: 'blue' },
    checkout: { dot: '#94a3b8', label: 'slate' },
    prep:     { dot: '#facc15', label: 'yellow' },
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-stretch sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 modal-backdrop" />

      <div
        className="relative z-10 w-full sm:max-w-2xl bg-white border border-gray-200 rounded-none sm:rounded-2xl h-full sm:max-h-[92vh] flex flex-col overflow-hidden shadow-2xl"
        style={{ boxShadow: '0 40px 100px rgba(0,0,0,0.15), 0 0 0 1px rgba(192,138,48,0.1)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="flex-shrink-0 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 px-5 py-4">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-3xl flex-shrink-0">{dest.emoji}</span>
              <div className="min-w-0">
                <h2 className="font-display text-2xl font-semibold leading-none text-gold-gradient truncate">
                  {dest.name}
                </h2>
                <p className="text-gray-500 text-xs mt-0.5 truncate">
                  {itinerary.summary}
                  {source && source !== 'local' && (
                    <span className="ml-2 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-teal-50 text-teal-600 border border-teal-200">
                      {source === 'cache' ? 'Cached' : 'AI Generated'}
                    </span>
                  )}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-all flex-shrink-0"
            >
              ✕
            </button>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="text-teal-600">🎯</span>
              <span className="text-teal-600 font-medium">{itinerary.totalActivities}</span> activities
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="text-amber-600">📅</span>
              <span className="text-amber-600 font-medium">{itinerary.destinationDays}</span> days at destination
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="text-purple-600">🌙</span>
              <span className="text-purple-600 font-medium">{itinerary.nights}</span> nights
            </div>
            {itinerary.fromCity && (
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <span>📍</span> from <span className="text-gray-800 font-medium">{itinerary.fromCity}</span>
              </div>
            )}
          </div>
        </div>

        {/* ── Day tabs ── */}
        <div className="flex-shrink-0 flex gap-1.5 px-4 py-3 border-b border-gray-100 overflow-x-auto">
          {itinerary.days.map((d, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              className={`flex-shrink-0 flex flex-col items-center px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 min-w-[64px] ${
                activeDay === i
                  ? 'bg-amber-50 border border-amber-400/50 text-amber-600'
                  : 'bg-gray-50 border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>Day {d.dayNum}</span>
              {d.isTravel && <span className="text-[9px] opacity-60 mt-0.5">travel</span>}
            </button>
          ))}
        </div>

        {/* ── Day header ── */}
        <div className="flex-shrink-0 px-5 pt-4 pb-2">
          <h3 className="font-display text-xl font-semibold text-gray-800 leading-tight">{day.title}</h3>
          <p className="text-gray-400 text-xs mt-0.5">{day.subtitle}</p>
        </div>

        {/* ── Timeline ── */}
        <div className="flex-1 overflow-y-auto px-5 pb-4">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[52px] top-4 bottom-4 w-px bg-gray-100" />

            {day.timeline.map((item, idx) => {
              const tc = typeColors[item.type] || typeColors.activity;
              const isLast = idx === day.timeline.length - 1;
              return (
                <div key={idx} className={`flex gap-3 ${isLast ? 'mb-0' : 'mb-5'}`}>
                  {/* Time */}
                  <div className="w-12 flex-shrink-0 text-right pt-1">
                    <span className="text-[11px] font-mono" style={{ color: tc.dot }}>{item.time}</span>
                  </div>

                  {/* Dot */}
                  <div className="flex-shrink-0 flex items-start pt-[5px] relative z-10 w-5">
                    <div
                      className="w-3 h-3 rounded-full border-2 flex-shrink-0"
                      style={{
                        borderColor: tc.dot,
                        background: `${tc.dot}33`,
                        boxShadow: `0 0 6px ${tc.dot}55`,
                      }}
                    />
                  </div>

                  {/* Content card */}
                  <div className="flex-1 pb-1">
                    <div className="rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-100 transition-colors p-3">
                      <div className="flex items-start gap-2.5">
                        <span className="text-xl flex-shrink-0 leading-none mt-0.5">{item.emoji}</span>
                        <div className="min-w-0">
                          <p className="font-semibold text-sm leading-tight" style={{ color: tc.dot }}>
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{item.detail}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Overnight badge */}
          {day.overnight && (
            <div className="mt-3 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-purple-50 border border-purple-200">
              <span className="text-purple-600">🏨</span>
              <p className="text-xs text-purple-600/80">
                <span className="font-medium">Stay tonight:</span> {day.overnight}
              </p>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="flex-shrink-0 border-t border-gray-100 px-5 py-4">
          {/* Packing tips (last day only) */}
          {dest.packingTips && activeDay === itinerary.days.length - 1 && (
            <div className="mb-3 p-3 rounded-xl bg-teal-50 border border-teal-200">
              <p className="text-xs font-semibold text-teal-600 mb-2">🎒 Pack This</p>
              <div className="flex flex-wrap gap-1.5">
                {dest.packingTips.map(t => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-teal-50 text-teal-600/80 border border-teal-200">{t}</span>
                ))}
              </div>
            </div>
          )}
          <div className="flex gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-400 text-xs hover:bg-gray-50 transition-all"
            >
              ← Back
            </button>
            {activeDay < itinerary.days.length - 1 && (
              <button
                onClick={() => setActiveDay(d => d + 1)}
                className="flex-1 py-2.5 rounded-xl border border-amber-300 text-amber-600 text-xs font-medium hover:bg-amber-50 transition-all"
              >
                Next Day → Day {itinerary.days[activeDay + 1]?.dayNum}
              </button>
            )}
            <button
              className="flex-1 py-2.5 rounded-xl font-semibold text-xs transition-all hover:brightness-110 flex items-center justify-center gap-1.5"
              style={{ background: 'linear-gradient(135deg, #d4a24a, #c08a30)', color: 'white' }}
              onClick={() => downloadItinerary(dest, itinerary)}
            >
              📄 Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Step 4: AI Destination Results (was Step 5) ─────────────────────────────

function Step4Results({ formData, group, country, onClose, onBack, onAddToWishlist, wishlist }) {
  const [activeVacType, setActiveVacType] = useState(formData.vacationTypes[0]);
  const [detailModal, setDetailModal] = useState(null);
  const [loadingDest, setLoadingDest] = useState(null);
  const [itinerarySource, setItinerarySource] = useState(null);

  // AI state
  const [aiDestinations, setAiDestinations] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSource, setAiSource] = useState(null); // 'groq' | 'cache' | 'fallback' | 'error'
  const [aiError, setAiError] = useState(null);

  // Departure time popup state
  const [departurePopup, setDeparturePopup] = useState(null); // { dest, isAiDest } or null
  const [loadingStage, setLoadingStage] = useState(''); // '' | 'tripadvisor' | 'ai' | 'done'

  const month = formData.month;
  const totalDays = group.totalDays;
  const city = formData.location?.city || '';
  const transport = formData.location?.transport || 'train';
  const groupSize = 2; // default since budget step is removed

  // Fallback: use hardcoded destinations from appData
  const fallbackDestinations = getDestinations(activeVacType, month, totalDays, city, 'midrange');

  // Fetch AI suggestions on mount and when vacation type changes
  useEffect(() => {
    let cancelled = false;

    async function loadSuggestions() {
      setAiLoading(true);
      setAiError(null);

      try {
        const vtLabels = formData.vacationTypes.map(vt => {
          const vtData = VACATION_TYPES.find(v => v.id === vt);
          return vtData?.label || vt;
        });

        const { destinations, source } = await fetchDestinationSuggestions(
          vtLabels,
          city,
          transport,
          totalDays,
          month,
          country?.name || 'India',
        );

        if (!cancelled) {
          if (destinations.length > 0) {
            setAiDestinations(destinations);
            setAiSource(source);
          } else {
            // Grok returned empty or errored — use fallback
            setAiSource('fallback');
          }
        }
      } catch (err) {
        if (!cancelled) {
          setAiError(err.message);
          setAiSource('fallback');
        }
      } finally {
        if (!cancelled) setAiLoading(false);
      }
    }

    if (isGrokConfigured()) {
      loadSuggestions();
    } else {
      setAiSource('fallback');
    }

    return () => { cancelled = true; };
  }, [formData.vacationTypes, city, transport, totalDays, month, country]);

  // Decide which destinations to show
  const useAi = aiSource === 'groq' || aiSource === 'cache';
  const displayDestinations = useAi ? aiDestinations : fallbackDestinations;

  // Open departure popup instead of directly generating itinerary
  function handleViewItinerary(destOrAiDest, isAiDest) {
    setDeparturePopup({ dest: destOrAiDest, isAiDest });
  }

  // After user picks departure slot → fetch TripAdvisor → AI → show itinerary
  async function handleDepartureSelected(slot) {
    const { dest: destOrAiDest, isAiDest } = departurePopup;
    const dest = isAiDest ? makeDestForAi(destOrAiDest) : destOrAiDest;
    const destId = dest.id || dest.name;
    const destName = isAiDest ? destOrAiDest.name : dest.name;

    setDeparturePopup(null);
    setLoadingDest(destId);

    try {
      // Step 1: Fetch TripAdvisor data
      let taResult = null;
      if (isTripAdvisorConfigured()) {
        setLoadingStage('tripadvisor');
        const currency = country?.currency || 'INR';
        taResult = await fetchTripAdvisorData(destName, currency);
        if (taResult.source === 'error') taResult = null;
      }

      // Step 2: Pass TripAdvisor data + departure slot to AI
      setLoadingStage('ai');
      const { itinerary, source } = await fetchItinerary(
        dest, totalDays, city, transport, 'midrange', groupSize, formData.vacationTypes, slot, taResult,
      );
      setItinerarySource(source);
      setDetailModal({ dest, itinerary });
    } catch {
      // Fallback to local generation
      setLoadingStage('');
      const itinerary = generateDynamicItinerary(dest, totalDays, city, transport);
      setItinerarySource('local');
      setDetailModal({ dest, itinerary });
    } finally {
      setLoadingDest(null);
      setLoadingStage('');
    }
  }

  function isInWishlist(id) {
    return wishlist.some(w => w.id === id);
  }

  // For AI destinations, create a minimal dest object for itinerary generation
  function makeDestForAi(aiDest) {
    return {
      id: aiDest.name.toLowerCase().replace(/\s+/g, '-'),
      name: aiDest.name,
      emoji: aiDest.emoji || '🏖️',
      tagline: aiDest.tagline,
      state: aiDest.state,
      highlights: aiDest.highlights || [],
      packingTips: aiDest.packingTips || [],
      bestMonths: [],
      distanceFrom: {},
      costPerPerson: { budget: 8000, midrange: 20000, premium: 50000 },
      seasonalWarning: aiDest.seasonalWarning ? { months: [month], message: aiDest.seasonalWarning } : null,
      activities: aiDest.highlights || [],
    };
  }

  // openDetailModal kept for fallback cards (hardcoded destinations)
  async function openDetailModal(dest) {
    const destId = dest.id || dest.name;
    setLoadingDest(destId);
    try {
      const { itinerary, source } = await fetchItinerary(
        dest, totalDays, city, transport, 'midrange', groupSize, formData.vacationTypes, 'morning', null,
      );
      setItinerarySource(source);
      setDetailModal({ dest, itinerary });
    } catch {
      const itinerary = generateDynamicItinerary(dest, totalDays, city, transport);
      setItinerarySource('local');
      setDetailModal({ dest, itinerary });
    } finally {
      setLoadingDest(null);
    }
  }

  // For hardcoded destinations: compute stats
  function getDestStats(dest) {
    const itin = generateDynamicItinerary(dest, totalDays, city, transport);
    const actCount = itin.days.reduce((s, d) =>
      s + d.timeline.filter(t => t.type === 'activity').length, 0);
    return { actCount, destDays: itin.destinationDays, nights: itin.nights };
  }

  function getTravelInfo(dest) {
    const df = dest.distanceFrom?.[city] || Object.values(dest.distanceFrom || {})[0];
    if (!df) return null;
    if (transport === 'flight' && df.flight) return { time: df.flight, km: df.km, mode: '✈️ Flight' };
    if (transport === 'train' && df.train) return { time: df.train, km: df.km, mode: '🚂 Train' };
    if (transport === 'road' && df.road) return { time: df.road, km: df.km, mode: '🚗 Drive' };
    if (transport === 'bus' && df.road) return { time: df.road, km: df.km, mode: '🚌 Bus' };
    if (df.train) return { time: df.train, km: df.km, mode: '🚂 Train' };
    if (df.road) return { time: df.road, km: df.km, mode: '🚗 Drive' };
    if (df.flight) return { time: df.flight, km: df.km, mode: '✈️ Flight' };
    return null;
  }

  // ── Render AI destination card ──
  function renderAiCard(aiDest, i) {
    const destId = aiDest.name.toLowerCase().replace(/\s+/g, '-');
    const travelTime = aiDest.travelTime?.[transport] || aiDest.travelTime?.train || aiDest.travelTime?.road;

    return (
      <div
        key={destId}
        className="rounded-2xl border overflow-hidden transition-all duration-200"
        style={{ borderColor: 'rgba(0,0,0,0.08)', background: 'rgba(0,0,0,0.02)' }}
      >
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                style={{ background: i === 0 ? 'linear-gradient(135deg,#d4a24a,#c08a30)' : 'rgba(0,0,0,0.06)', color: i === 0 ? 'white' : 'rgba(0,0,0,0.4)' }}
              >{i + 1}</div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-display text-xl font-semibold text-gray-800 leading-none">
                    {aiDest.emoji} {aiDest.name}
                  </h4>
                  <span className="text-xs text-gray-400">{aiDest.state}</span>
                  {i === 0 && <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 font-semibold border border-amber-200">Top Pick</span>}
                  {aiSource === 'groq' && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-50 text-pink-600 font-semibold border border-pink-200">AI Assistant</span>
                  )}
                </div>
                <p className="text-gray-500 text-xs mt-0.5">{aiDest.tagline}</p>
              </div>
            </div>
            <button
              onClick={() => onAddToWishlist({ id: destId, name: aiDest.name, tagline: aiDest.tagline, emoji: aiDest.emoji, dates: group.weekendDates, totalDays, vacationType: activeVacType, city })}
              className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all flex-shrink-0 text-sm ${
                isInWishlist(destId) ? 'border-red-300 bg-red-50 text-red-500' : 'border-gray-200 bg-gray-50 text-gray-400 hover:border-red-300 hover:text-red-500'
              }`}
            >{isInWishlist(destId) ? '♥' : '♡'}</button>
          </div>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
            {travelTime && (
              <div className="flex items-center gap-1 text-xs">
                <span>{transport === 'flight' ? '✈️' : transport === 'train' ? '🚂' : transport === 'bus' ? '🚌' : '🚗'}</span>
                <span className="text-amber-600 font-semibold">{travelTime}</span>
                {aiDest.distanceKm && <span className="text-gray-400">· {aiDest.distanceKm} km</span>}
              </div>
            )}
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span>📅</span>
              <span className="text-gray-800 font-semibold">{totalDays} days</span>
            </div>
            {aiDest.estimatedCostPerPerson && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <span className="text-green-600">💰</span>
                <span className="text-green-600 font-semibold">{aiDest.estimatedCostPerPerson}</span>/person
              </div>
            )}
          </div>

          {/* Why now */}
          {aiDest.whyNow && (
            <div className="mt-2 px-3 py-2 rounded-lg bg-teal-50 border border-teal-200">
              <p className="text-xs text-teal-700">✨ {aiDest.whyNow}</p>
            </div>
          )}

          {/* Seasonal warning */}
          {aiDest.seasonalWarning && (
            <div className="mt-2 flex gap-2 p-2.5 rounded-lg bg-orange-50 border border-orange-200">
              <span className="text-orange-500 text-sm flex-shrink-0">⚠️</span>
              <p className="text-xs text-orange-600/80">{aiDest.seasonalWarning}</p>
            </div>
          )}

          {/* Highlights */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {(aiDest.highlights || []).slice(0, 4).map(h => (
              <span key={h} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-50 text-gray-500 border border-gray-200">{h}</span>
            ))}
          </div>

          {/* View Full Itinerary button */}
          <button
            onClick={() => handleViewItinerary(aiDest, true)}
            disabled={loadingDest === destId}
            className="mt-3 w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:brightness-110 disabled:opacity-60 disabled:cursor-wait"
            style={{ background: 'linear-gradient(135deg, rgba(192,138,48,0.08), rgba(192,138,48,0.04))', border: '1px solid rgba(192,138,48,0.25)', color: '#c08a30' }}
          >
            {loadingDest === destId ? (
              <>
                <span className="inline-block w-3.5 h-3.5 border-2 border-amber-400/40 border-t-amber-400 rounded-full animate-spin" />
                {loadingStage === 'tripadvisor' ? 'Enhancing trip with TripAdvisor...' : loadingStage === 'ai' ? 'AI is building your itinerary...' : 'Generating Itinerary...'}
              </>
            ) : (
              <>
                <span>📋</span> View Detailed Itinerary
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  // ── Render hardcoded destination card (fallback) ──
  function renderFallbackCard(dest, i) {
    const travel = getTravelInfo(dest);
    const stats = getDestStats(dest);
    const hasWarning = dest.seasonalWarning?.months.includes(month);

    return (
      <div
        key={dest.id}
        className="rounded-2xl border overflow-hidden transition-all duration-200"
        style={{ borderColor: 'rgba(0,0,0,0.08)', background: 'rgba(0,0,0,0.02)' }}
      >
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                style={{ background: i === 0 ? 'linear-gradient(135deg,#d4a24a,#c08a30)' : 'rgba(0,0,0,0.06)', color: i === 0 ? 'white' : 'rgba(0,0,0,0.4)' }}
              >{i + 1}</div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-display text-xl font-semibold text-gray-800 leading-none">
                    {dest.emoji} {dest.name}
                  </h4>
                  <span className="text-xs text-gray-400">{dest.state}</span>
                  {i === 0 && <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 font-semibold border border-amber-200">Top Pick</span>}
                </div>
                <p className="text-gray-500 text-xs mt-0.5">{dest.tagline}</p>
              </div>
            </div>
            <button
              onClick={() => onAddToWishlist({ id: dest.id, name: dest.name, tagline: dest.tagline, emoji: dest.emoji, dates: group.weekendDates, totalDays, vacationType: activeVacType, city })}
              className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all flex-shrink-0 text-sm ${
                isInWishlist(dest.id) ? 'border-red-300 bg-red-50 text-red-500' : 'border-gray-200 bg-gray-50 text-gray-400 hover:border-red-300 hover:text-red-500'
              }`}
            >{isInWishlist(dest.id) ? '♥' : '♡'}</button>
          </div>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
            {travel && (
              <div className="flex items-center gap-1 text-xs">
                <span>{travel.mode}</span>
                <span className="text-amber-600 font-semibold">{travel.time}</span>
                {travel.km && <span className="text-gray-400">· {travel.km} km</span>}
              </div>
            )}
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span className="text-teal-600">🎯</span>
              <span className="text-teal-600 font-semibold">{stats.actCount}</span> activities
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span>📅</span>
              <span className="text-gray-800 font-semibold">{stats.destDays} day{stats.destDays !== 1 ? 's' : ''}</span> at dest.
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span className="text-purple-600">🌙</span>
              <span className="text-purple-600 font-semibold">{stats.nights}</span> nights
            </div>
          </div>

          {hasWarning && (
            <div className="mt-2.5 flex gap-2 p-2.5 rounded-lg bg-orange-50 border border-orange-200">
              <span className="text-orange-500 text-sm flex-shrink-0">⚠️</span>
              <p className="text-xs text-orange-600/80">{dest.seasonalWarning.message}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 mt-3">
            {dest.highlights.slice(0, 4).map(h => (
              <span key={h} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-50 text-gray-500 border border-gray-200">{h}</span>
            ))}
          </div>

          <button
            onClick={() => openDetailModal(dest)}
            disabled={loadingDest === dest.id}
            className="mt-3 w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:brightness-110 disabled:opacity-60 disabled:cursor-wait"
            style={{ background: 'linear-gradient(135deg, rgba(192,138,48,0.08), rgba(192,138,48,0.04))', border: '1px solid rgba(192,138,48,0.25)', color: '#c08a30' }}
          >
            {loadingDest === dest.id ? (
              <>
                <span className="inline-block w-3.5 h-3.5 border-2 border-amber-400/40 border-t-amber-400 rounded-full animate-spin" />
                Generating Itinerary...
              </>
            ) : (
              <>
                <span>📋</span> View Hour-by-Hour Itinerary
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="animate-fade-up">
        <h3 className="font-display text-3xl font-semibold mb-1" style={{ color: '#c08a30' }}>
          {useAi ? 'AI-Powered Picks' : 'Your Picks'}
        </h3>
        <p className="text-gray-500 text-sm mb-2">
          {useAi
            ? `Suggested by AI based on ${city}, ${VACATION_TYPES.find(v => v.id === activeVacType)?.label || ''} vibe & season`
            : `Destinations for ${city || 'your city'} — ranked by season & distance`
          }
        </p>

        {/* AI source badge */}
        {aiSource && (
          <div className={`flex items-center gap-2 mb-4 px-3 py-2 rounded-lg border ${
            aiSource === 'groq' ? 'bg-pink-50 border-pink-200' :
            aiSource === 'cache' ? 'bg-purple-50 border-purple-200' :
            'bg-gray-50 border-gray-200'
          }`}>
            <span className="text-sm">{aiSource === 'groq' ? '🤖' : aiSource === 'cache' ? '💾' : 'ℹ️'}</span>
            <p className="text-xs text-gray-600">
              {aiSource === 'groq' && 'Destinations curated by AI'}
              {aiSource === 'cache' && 'Destinations loaded from cache'}
              {aiSource === 'fallback' && (
                <>
                  {isGrokConfigured()
                    ? 'AI Assistant unavailable — showing curated destinations'
                    : <>Set <code className="text-[10px] bg-gray-100 px-1 rounded">VITE_GROQ_API_KEY</code> in .env to enable AI suggestions</>
                  }
                </>
              )}
              {aiSource === 'error' && `AI error — showing curated destinations`}
            </p>
          </div>
        )}

        {/* Vacation type tabs */}
        {formData.vacationTypes.length > 1 && !useAi && (
          <div className="flex gap-2 mb-4 flex-wrap">
            {formData.vacationTypes.map(vt => {
              const vtData = VACATION_TYPES.find(v => v.id === vt);
              return (
                <button key={vt} onClick={() => setActiveVacType(vt)}
                  className={`pill-btn ${activeVacType === vt ? 'pill-btn-active' : 'pill-btn-inactive'}`}>
                  {vtData?.emoji} {vtData?.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Loading state */}
        {aiLoading && (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-3 border-amber-200 border-t-amber-500 rounded-full animate-spin mb-4" />
            <p className="text-gray-500 text-sm">AI is finding the best destinations...</p>
            <p className="text-gray-400 text-xs mt-1">Analyzing season, distance & your preferences</p>
          </div>
        )}

        {/* Destination cards */}
        {!aiLoading && (
          <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1">
            {displayDestinations.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <div className="text-4xl mb-3">🔍</div>
                <p>No destinations found for this combination.</p>
                <p className="text-xs mt-1">Try a different vacation type or season.</p>
              </div>
            ) : (
              displayDestinations.map((dest, i) =>
                useAi ? renderAiCard(dest, i) : renderFallbackCard(dest, i)
              )
            )}
          </div>
        )}

        <div className="flex gap-3 mt-4">
          <button onClick={onBack} className="px-5 py-3 rounded-xl border border-gray-200 text-gray-400 text-sm hover:bg-gray-50 transition-all">
            ← Back
          </button>
          <button onClick={onClose} className="px-5 py-3 rounded-xl border border-gray-200 text-gray-400 text-sm hover:bg-gray-50 transition-all">
            Close
          </button>
        </div>
      </div>

      {/* Departure Time Popup */}
      {departurePopup && (
        <div className="fixed inset-0 z-[55] flex items-center justify-center p-4" onClick={() => setDeparturePopup(null)}>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div
            className="relative z-10 w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-2xl p-6"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="font-display text-2xl font-semibold mb-1" style={{ color: '#c08a30' }}>
              When are you leaving?
            </h3>
            <p className="text-gray-500 text-xs mb-5">
              Select your preferred departure time from {city || 'your city'}
            </p>

            <div className="grid grid-cols-2 gap-2.5 mb-5">
              {[
                { id: 'morning', label: 'Morning', time: '6 AM – 10 AM', emoji: '🌅' },
                { id: 'afternoon', label: 'Afternoon', time: '1 PM – 5 PM', emoji: '☀️' },
                { id: 'evening', label: 'Evening', time: '6 PM – 9 PM', emoji: '🌆' },
                { id: 'latenight', label: 'Late Night', time: '10 PM – 4 AM', emoji: '🌙' },
              ].map(slot => (
                <button
                  key={slot.id}
                  onClick={() => handleDepartureSelected(slot.id)}
                  className="flex flex-col items-center gap-1.5 rounded-xl py-4 px-3 border text-center transition-all duration-200 border-gray-200 bg-gray-50 hover:border-amber-400/60 hover:bg-amber-50 group"
                >
                  <span className="text-2xl">{slot.emoji}</span>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-amber-600">{slot.label}</span>
                  <span className="text-[10px] text-gray-400 group-hover:text-amber-500">{slot.time}</span>
                </button>
              ))}
            </div>

            <p className="text-[10px] text-gray-400 text-center">
              This helps our AI plan realistic travel times and find the best departure options
            </p>

            <button
              onClick={() => setDeparturePopup(null)}
              className="mt-3 w-full py-2 rounded-xl border border-gray-200 text-gray-400 text-xs hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Detailed Itinerary Modal */}
      {detailModal && (
        <DetailedItineraryModal
          dest={detailModal.dest}
          itinerary={detailModal.itinerary}
          source={itinerarySource}
          onClose={() => setDetailModal(null)}
        />
      )}
    </>
  );
}

// ─── Main Modal Orchestrator ──────────────────────────────────────────────────

// Budget step (Step3) commented out — will be re-enabled when TripAdvisor actors are integrated
// const Step3Budget = Step3;

const TOTAL_STEPS = 4;

export default function PlanningModal({
  group, country, state, month,
  onClose, onAddToWishlist, wishlist,
}) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ month });

  // Prevent scroll when open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  function handleNext(data) {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(s => s + 1);
  }

  function handleBack() {
    setStep(s => s - 1);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 modal-backdrop" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
        style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.15), 0 0 0 1px rgba(192,138,48,0.1)' }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 pt-6 pb-4">
          <div className="flex justify-between items-start mb-4">
            <StepBar step={step} total={TOTAL_STEPS} />
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-all flex-shrink-0 ml-2"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Step content — 4 steps: Dates → Location → Vibe → Results */}
        <div className="px-6 pb-6">
          {step === 1 && <Step1 group={group} onNext={() => setStep(2)} onClose={onClose} />}
          {step === 2 && (
            <Step2
              stateData={state}
              onNext={data => handleNext({ location: data })}
              onBack={handleBack}
            />
          )}
          {/* Step 3: Vacation Type (budget step removed) */}
          {step === 3 && (
            <Step3VacationType
              month={month}
              totalDays={group.totalDays}
              userCity={formData.location?.city || ''}
              onNext={data => handleNext(data)}
              onBack={handleBack}
            />
          )}
          {/* Step 4: AI Destination Results */}
          {step === 4 && (
            <Step4Results
              formData={formData}
              group={group}
              country={country}
              onClose={onClose}
              onBack={handleBack}
              onAddToWishlist={onAddToWishlist}
              wishlist={wishlist}
            />
          )}
        </div>
      </div>
    </div>
  );
}
