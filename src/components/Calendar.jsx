import { useMemo } from 'react';
import { getCalendarDays, buildDayGroupMap, formatDate } from '../utils/holidayUtils';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const DAY_HEADERS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Calendar({
  year, month, holidays, extendedWeekends,
  onDayClick, onPrevMonth, onNextMonth,
}) {
  const today = formatDate(new Date());

  const holidayMap = useMemo(() => {
    const m = {};
    holidays.forEach(h => { m[h.date] = h; });
    return m;
  }, [holidays]);

  const dayGroupMap = useMemo(
    () => buildDayGroupMap(extendedWeekends),
    [extendedWeekends],
  );

  const calendarDays = useMemo(
    () => getCalendarDays(year, month),
    [year, month],
  );

  function getDayMeta(day) {
    const dow = new Date(day.date + 'T00:00:00').getDay();
    const isWeekend = dow === 0 || dow === 6;
    const holiday = holidayMap[day.date] || null;
    const groups = dayGroupMap[day.date] || [];
    const isExtended = groups.some(g => g.weekendDates.includes(day.date));
    const isBridge = groups.some(g => g.suggestedLeaveDates.includes(day.date));
    const isToday = day.date === today;
    return { dow, isWeekend, holiday, groups, isExtended, isBridge, isToday };
  }

  function getCellClass(day, meta) {
    if (!day.currentMonth) return 'cal-cell opacity-25 cursor-default';
    if (day.date < today && !meta.isToday) return 'cal-cell opacity-30 cursor-not-allowed';

    let cls = 'cal-cell ';
    if (meta.holiday && meta.isExtended) {
      cls += 'cal-cell-extended cal-cell-holiday ';
    } else if (meta.holiday) {
      cls += 'cal-cell-holiday ';
    } else if (meta.isExtended) {
      cls += 'cal-cell-extended ';
    } else if (meta.isBridge) {
      cls += 'cal-cell-bridge ';
    } else if (meta.isWeekend) {
      cls += 'cal-cell-weekend ';
    }
    if (meta.isToday) cls += 'cal-cell-today ';
    return cls;
  }

  function getDateNumClass(meta) {
    if (meta.isToday) return 'bg-amber-500 text-white font-bold rounded-full w-5 h-5 flex items-center justify-center text-[11px]';
    if (meta.holiday) return 'text-red-500 font-semibold text-[11px] w-5 h-5 flex items-center justify-center';
    if (meta.isExtended) return 'text-teal-600 font-medium text-[11px] w-5 h-5 flex items-center justify-center';
    if (meta.isBridge) return 'text-amber-600 font-medium text-[11px] w-5 h-5 flex items-center justify-center';
    if (meta.isWeekend) return 'text-gray-400 text-[11px] w-5 h-5 flex items-center justify-center';
    return 'text-gray-700 text-[11px] w-5 h-5 flex items-center justify-center';
  }

  function handleClick(day, meta) {
    if (!day.currentMonth) return;
    if (day.date < today) return;
    if (meta.groups.length > 0) {
      const best = [...meta.groups].sort((a, b) => b.totalDays - a.totalDays)[0];
      onDayClick(best);
    }
  }

  const monthLongWeekendCount = extendedWeekends.filter(g => {
    if (g.type === 'weekend_holiday') return false;
    const d = g.holidayDate || (g.holidayDates && g.holidayDates[0]);
    if (!d) return false;
    const [y, m] = d.split('-').map(Number);
    return y === year && m - 1 === month;
  }).length;

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      {/* Calendar Header */}
      <div className="flex items-center justify-between px-5 py-2.5 border-b border-gray-100">
        <button
          onClick={onPrevMonth}
          className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 flex items-center justify-center transition-all"
          aria-label="Previous month"
        >
          <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="text-center">
          <h2 className="font-display text-xl sm:text-2xl font-semibold text-gold-gradient leading-none tracking-wide">
            {MONTHS[month]}
          </h2>
          <p className="text-gray-400 text-xs mt-0.5 font-light tracking-widest">{year}</p>
          {monthLongWeekendCount > 0 && (
            <p className="text-teal-600 text-[10px] mt-1 flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
              {monthLongWeekendCount} long weekend{monthLongWeekendCount > 1 ? 's' : ''} this month
            </p>
          )}
        </div>

        <button
          onClick={onNextMonth}
          className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 flex items-center justify-center transition-all"
          aria-label="Next month"
        >
          <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 border-b border-gray-100">
        {DAY_HEADERS.map(d => (
          <div
            key={d}
            className={`text-center py-1 text-[10px] font-semibold uppercase tracking-widest ${
              d === 'Sun' || d === 'Sat' ? 'text-gray-400' : 'text-amber-600/50'
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Grid — compact */}
      <div className="grid grid-cols-7 gap-[1px] p-1.5">
        {calendarDays.map((day, idx) => {
          const meta = getDayMeta(day);
          const dateNum = new Date(day.date + 'T00:00:00').getDate();

          return (
            <div
              key={idx}
              className={getCellClass(day, meta)}
              onClick={() => handleClick(day, meta)}
              title={
                meta.holiday
                  ? meta.holiday.name
                  : meta.groups.length > 0
                  ? meta.groups[0].description
                  : undefined
              }
            >
              {/* Date number */}
              <div className={getDateNumClass(meta)}>{dateNum}</div>

              {/* Content */}
              {day.currentMonth && (
                <div className="mt-auto space-y-0.5">
                  {meta.holiday && (
                    <div className="flex items-start gap-0.5">
                      <span className="w-1 h-1 rounded-full bg-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-[8px] leading-tight text-red-500/80 line-clamp-2">
                        {meta.holiday.name}
                      </span>
                    </div>
                  )}

                  {meta.isExtended && !meta.holiday && (
                    <div className="flex items-center gap-0.5">
                      <span className="w-1 h-1 rounded-full bg-teal-500 flex-shrink-0" />
                      <span className="text-[8px] text-teal-600/80 truncate">Long weekend</span>
                    </div>
                  )}

                  {meta.isBridge && !meta.isExtended && !meta.holiday && (
                    <div className="flex items-center gap-0.5">
                      <span className="w-1 h-1 rounded-full bg-amber-500 flex-shrink-0" />
                      <span className="text-[8px] text-amber-600/80 truncate">Take leave</span>
                    </div>
                  )}
                </div>
              )}

              {/* Click indicator */}
              {day.currentMonth && meta.groups.length > 0 && (
                <div className="absolute top-1 right-1">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: meta.isExtended ? '#0d9488' : '#d97706',
                      boxShadow: `0 0 3px ${meta.isExtended ? 'rgba(13,148,136,0.5)' : 'rgba(217,119,6,0.5)'}`,
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer hint */}
      <div className="px-5 py-1.5 border-t border-gray-100 text-center">
        <p className="text-[10px] text-gray-400 tracking-wide">
          Click any{' '}
          <span className="text-teal-600 font-medium">teal</span> or{' '}
          <span className="text-amber-600 font-medium">amber</span> date to start planning
        </p>
      </div>
    </div>
  );
}
