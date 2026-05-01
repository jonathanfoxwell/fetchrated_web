import type { CurrentOpeningHours } from './locations';

/**
 * Compute "is open right now" against UK practice hours in Europe/London.
 *
 * Google's currentOpeningHours.openNow is stale by the time it reaches the
 * page (cached in Supabase, then through Next's revalidate window) — never
 * trust it. Recompute from `periods` against the current London time.
 *
 * `periods[].open.day` is 0–6 with 0 = Sunday (Google convention).
 */
export function isOpenNow(
  hours: CurrentOpeningHours | null | undefined,
  now: Date = new Date(),
): boolean {
  if (!hours?.periods?.length) return false;

  const london = londonTimeParts(now);
  const minutesNow = london.hour * 60 + london.minute;

  for (const period of hours.periods) {
    if (period.open.day !== london.weekday) continue;

    const openMin = period.open.hour * 60 + period.open.minute;

    // No close means open 24 hours from this point
    if (!period.close) return minutesNow >= openMin;

    // Same-day window
    if (period.close.day === period.open.day) {
      const closeMin = period.close.hour * 60 + period.close.minute;
      if (minutesNow >= openMin && minutesNow < closeMin) return true;
      continue;
    }

    // Window wraps past midnight — open today from openMin
    if (minutesNow >= openMin) return true;
  }

  // Catch the case where the window opened yesterday and closes today
  const prevWeekday = (london.weekday + 6) % 7;
  for (const period of hours.periods) {
    if (period.open.day !== prevWeekday) continue;
    if (!period.close) continue;
    if (period.close.day === period.open.day) continue;
    const closeMin = period.close.hour * 60 + period.close.minute;
    if (minutesNow < closeMin) return true;
  }

  return false;
}

/**
 * Get a human-readable summary of today's hours in London time.
 * Returns `null` if the practice has no scheduled hours today (e.g. closed).
 */
export function getTodayHours(
  hours: CurrentOpeningHours | null | undefined,
  now: Date = new Date(),
): { open: string; close: string } | null {
  if (!hours?.periods?.length) return null;

  const london = londonTimeParts(now);
  const todays = hours.periods.filter((p) => p.open.day === london.weekday);
  if (!todays.length) return null;

  // Take the first period of the day (most practices have one; some have a
  // morning + afternoon split, in which case we surface the earliest open).
  const period = todays[0];
  const open = formatHM(period.open.hour, period.open.minute);
  const close = period.close ? formatHM(period.close.hour, period.close.minute) : '24h';
  return { open, close };
}

/**
 * Number of complete years between an opening date and now. Returns null when
 * input is missing or in the future.
 */
export function yearsOperating(openingDate: string | null | undefined): number | null {
  if (!openingDate) return null;
  const opened = new Date(openingDate);
  if (Number.isNaN(opened.getTime())) return null;
  const now = new Date();
  const diffMs = now.getTime() - opened.getTime();
  if (diffMs <= 0) return null;
  return Math.floor(diffMs / (365.25 * 24 * 60 * 60 * 1000));
}

interface LondonParts {
  weekday: number; // 0 = Sunday … 6 = Saturday (Google convention)
  hour: number;
  minute: number;
}

function londonTimeParts(now: Date): LondonParts {
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const parts = fmt.formatToParts(now);
  const weekdayShort = parts.find((p) => p.type === 'weekday')?.value ?? 'Mon';
  const hourStr = parts.find((p) => p.type === 'hour')?.value ?? '00';
  const minuteStr = parts.find((p) => p.type === 'minute')?.value ?? '00';
  const map: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return {
    weekday: map[weekdayShort] ?? 1,
    hour: parseInt(hourStr, 10) % 24, // Intl returns "24" at midnight
    minute: parseInt(minuteStr, 10),
  };
}

function formatHM(h: number, m: number): string {
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}
