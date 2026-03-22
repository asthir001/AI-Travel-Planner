// ─── Date Helpers ─────────────────────────────────────────────────────────────

export function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function addDays(dateStr, n) {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + n);
  return formatDate(d);
}

export function getDow(dateStr) {
  // 0=Sunday, 1=Monday, ... 6=Saturday
  return new Date(dateStr + 'T00:00:00').getDay();
}

export function isWeekend(dateStr) {
  const dow = getDow(dateStr);
  return dow === 0 || dow === 6;
}

export function isWorkday(dateStr) {
  const dow = getDow(dateStr);
  return dow >= 1 && dow <= 5;
}

export function formatDisplayDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
}

export function formatShortDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

export function daysBetween(a, b) {
  const da = new Date(a + 'T00:00:00');
  const db = new Date(b + 'T00:00:00');
  return Math.abs((db - da) / (1000 * 60 * 60 * 24));
}

// ─── Calendar Grid ────────────────────────────────────────────────────────────

export function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDow = firstDay.getDay(); // 0=Sun

  const days = [];

  // Pad from previous month
  for (let i = 0; i < startDow; i++) {
    const d = new Date(year, month, i - startDow + 1);
    days.push({ date: formatDate(d), currentMonth: false });
  }

  // Current month
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push({ date: formatDate(new Date(year, month, d)), currentMonth: true });
  }

  // Pad to 42 cells (6 rows)
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({ date: formatDate(new Date(year, month + 1, i)), currentMonth: false });
  }

  return days;
}

// ─── Major Festival Keywords ──────────────────────────────────────────────────
// These holidays justify suggesting 2+ leave days even when only 1 bank holiday
// (applies universally across all countries)

const MAJOR_FESTIVAL_KEYWORDS = [
  'diwali', 'deepavali', 'naraka chaturdashi', 'lakshmi puja', 'bhai dooj',
  'ganesh chaturthi', 'vinayaka chaturthi',
  'holi', 'holika',
  'eid al-fitr', 'eid al-adha', 'eid', 'ramadan', 'mawlid', "prophet's birthday",
  'christmas', 'christmas day', 'boxing day',
  'easter', 'easter monday', 'good friday',
  'dussehra', 'vijaya dashami',
  'navratri', 'durga puja',
  'pongal', 'thai pongal',
  'onam', 'vishu',
  'baisakhi', 'vaisakhi', 'lohri',
  'muharram', 'ashura',
  'thanksgiving',
  "new year's day", 'new year',
  'national day', 'independence day',
];

function isMajorFestival(name) {
  const lower = name.toLowerCase();
  return MAJOR_FESTIVAL_KEYWORDS.some(kw => lower.includes(kw));
}

// ─── Extended Weekend Analysis ────────────────────────────────────────────────
//
// Rules:
//  1. Weekend holidays (Sat/Sun) never generate leave suggestions.
//  2. Bridge (mega_bridge): Only when BOTH holidays fall on workdays.
//     → All workday gap days between them are suggested as leaves.
//  3. Single workday holiday: max 1 suggested leave day.
//     Exception → major festivals on Wed may suggest 2 (Thu + Fri).
//  4. Wed standalone non-major: no leave suggestion (1 leave ≠ contiguous break).

export function analyzeExtendedWeekends(holidays) {
  const holidaySet = new Set(holidays.map(h => h.date));
  const groups = [];
  const processedHolidays = new Set();

  // ── Step 1: Bridge between two WORKDAY holidays ───────────────────────────
  for (let i = 0; i < holidays.length; i++) {
    for (let j = i + 1; j < holidays.length; j++) {
      const h1 = holidays[i];
      const h2 = holidays[j];

      // BOTH must fall on Mon–Fri to qualify for bridge leave suggestion
      if (!isWorkday(h1.date) || !isWorkday(h2.date)) continue;

      const diff = daysBetween(h1.date, h2.date);
      if (diff < 2 || diff > 9) continue;

      // Collect workday gap days that need to be taken as leave
      const gapDays = [];
      let curr = addDays(h1.date, 1);
      while (curr < h2.date) {
        if (isWorkday(curr) && !holidaySet.has(curr)) gapDays.push(curr);
        curr = addDays(curr, 1);
      }

      if (gapDays.length < 1 || gapDays.length > 4) continue;

      // Weekend days in the gap (free — included in break window)
      const gapWeekends = [];
      let gapWalker = addDays(h1.date, 1);
      while (gapWalker < h2.date) {
        if (isWeekend(gapWalker)) gapWeekends.push(gapWalker);
        gapWalker = addDays(gapWalker, 1);
      }

      // Immediately adjacent flanking weekends (no workday gap between them and h1/h2)
      const leadDays = [];
      let before = addDays(h1.date, -1);
      while (isWeekend(before)) { leadDays.unshift(before); before = addDays(before, -1); }

      const trailDays = [];
      let after = addDays(h2.date, 1);
      while (isWeekend(after)) { trailDays.push(after); after = addDays(after, 1); }

      const totalDays = leadDays.length + 1 + gapDays.length + gapWeekends.length + 1 + trailDays.length;

      if (totalDays >= 5) {
        groups.push({
          id: `bridge-${h1.date}-${h2.date}`,
          type: 'mega_bridge',
          holidayDate: h1.date,
          holidayDates: [h1.date, h2.date],
          holidayName: `${h1.name} + ${h2.name}`,
          weekendDates: [...leadDays, h1.date, ...gapWeekends, h2.date, ...trailDays],
          suggestedLeaveDates: gapDays,
          totalDays,
          description: `Bridge ${gapDays.length} day${gapDays.length > 1 ? 's' : ''} between ${h1.name} & ${h2.name} → ${totalDays}-day mega holiday!`,
        });
        processedHolidays.add(h1.date);
        processedHolidays.add(h2.date);
      }
    }
  }

  // ── Step 2: Individual workday holidays ───────────────────────────────────
  holidays.forEach(holiday => {
    if (processedHolidays.has(holiday.date)) return;
    const date = holiday.date;
    const dow = getDow(date);

    // Weekend holidays don't generate leave suggestions
    if (!isWorkday(date)) return;

    const major = isMajorFestival(holiday.name);
    let weekendDates = [];
    let suggestedLeaveDates = [];
    let description = '';

    if (dow === 5) {
      // Friday bank holiday → natural 3-day Fri+Sat+Sun
      // Optionally take Thu off → 4-day Thu+Fri+Sat+Sun (1 leave max)
      const sat = addDays(date, 1);
      const sun = addDays(date, 2);
      const thu = addDays(date, -1);
      weekendDates = [date, sat, sun];
      if (!holidaySet.has(thu) && isWorkday(thu)) {
        suggestedLeaveDates = [thu];
        description = `${holiday.name} on Friday → Take Thu off for a 4-day weekend!`;
      } else {
        description = `${holiday.name} on Friday → Natural 3-day weekend`;
      }

    } else if (dow === 1) {
      // Monday bank holiday → natural 3-day Sat+Sun+Mon
      // Optionally take Tue off → 4-day Sat+Sun+Mon+Tue (1 leave max)
      const sat = addDays(date, -2);
      const sun = addDays(date, -1);
      const tue = addDays(date, 1);
      weekendDates = [sat, sun, date];
      if (!holidaySet.has(tue) && isWorkday(tue)) {
        suggestedLeaveDates = [tue];
        description = `${holiday.name} on Monday → Take Tue off for a 4-day weekend!`;
      } else {
        description = `${holiday.name} on Monday → Natural 3-day weekend`;
      }

    } else if (dow === 4) {
      // Thursday → take 1 leave (Fri) → 4-day Thu+Fri+Sat+Sun
      const fri = addDays(date, 1);
      const sat = addDays(date, 2);
      const sun = addDays(date, 3);
      weekendDates = [date, sat, sun];
      if (!holidaySet.has(fri) && isWorkday(fri)) {
        suggestedLeaveDates = [fri];
        description = `Take 1 leave (${formatDisplayDate(fri)}) → 4-day long weekend!`;
      } else {
        description = `${holiday.name} on Thursday`;
      }

    } else if (dow === 2) {
      // Tuesday → take 1 leave (Mon) → 4-day Sat+Sun+Mon+Tue
      const mon = addDays(date, -1);
      const sun = addDays(date, -2);
      const sat = addDays(date, -3);
      weekendDates = [sat, sun, date];
      if (!holidaySet.has(mon) && isWorkday(mon)) {
        suggestedLeaveDates = [mon];
        description = `Take 1 leave (${formatDisplayDate(mon)}) → 4-day long weekend!`;
      } else {
        description = `${holiday.name} on Tuesday`;
      }

    } else if (dow === 3) {
      // Wednesday: 1 leave never creates a contiguous weekend break.
      // Only major festivals get 2-leave suggestion (Thu+Fri → 5-day Wed–Sun).
      if (!major) return; // Skip non-major Wed holidays entirely
      const thu = addDays(date, 1);
      const fri = addDays(date, 2);
      const sat = addDays(date, 3);
      const sun = addDays(date, 4);
      weekendDates = [date, sat, sun];
      const bridgeable = [thu, fri].filter(d => isWorkday(d) && !holidaySet.has(d));
      if (bridgeable.length > 0) {
        suggestedLeaveDates = bridgeable;
        description = `${holiday.name} — Take ${bridgeable.length} leave(s) → ${3 + bridgeable.length}-day mega break!`;
      } else {
        description = `${holiday.name} — public holiday`;
      }
    }

    if (weekendDates.length > 0) {
      const totalDays = new Set([...weekendDates, ...suggestedLeaveDates]).size;
      groups.push({
        id: `ext-${date}`,
        type: suggestedLeaveDates.length > 0 ? 'bridge' : 'extended',
        holidayDate: date,
        holidayName: holiday.name,
        weekendDates,
        suggestedLeaveDates,
        totalDays,
        description,
      });
    }
  });

  return groups;
}

// ─── Build per-day data map from groups ───────────────────────────────────────

export function buildDayGroupMap(groups) {
  const map = {};
  groups.forEach(group => {
    const allDates = [...group.weekendDates, ...group.suggestedLeaveDates];
    allDates.forEach(date => {
      if (!map[date]) map[date] = [];
      map[date].push(group);
    });
  });
  return map;
}
