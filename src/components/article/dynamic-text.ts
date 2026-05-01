/**
 * Substitutes dynamic-time tokens inside article body text.
 *
 * Authors can include tokens in markdown / callout / summary-box content
 * so that relative-time copy stays accurate as the article ages:
 *
 *   {{months_until:YYYY-MM-DD}}
 *     → renders e.g. "11 months", "less than a month", "approximately 1 year"
 *
 *   {{date:YYYY-MM-DD:long}}
 *     → renders e.g. "31 March 2027"
 *
 *   {{date:YYYY-MM-DD:month-year}}
 *     → renders e.g. "March 2027"
 *
 * If a token's date is in the past it returns "the deadline has now passed"
 * (months_until) or formats the date as normal (date:).
 */

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function monthsBetween(from: Date, to: Date): number {
  const months =
    (to.getFullYear() - from.getFullYear()) * 12 +
    (to.getMonth() - from.getMonth());
  // Round up if the day-of-month puts us past the threshold.
  if (to.getDate() < from.getDate() && months > 0) return months - 1;
  return months;
}

function monthsUntilPhrase(targetIso: string, now: Date = new Date()): string {
  const target = new Date(targetIso + 'T00:00:00Z');
  if (Number.isNaN(target.getTime())) return targetIso;

  const months = monthsBetween(now, target);
  if (months < 0) return 'the deadline has now passed';
  if (months === 0) return 'less than a month';
  if (months === 1) return 'one month';
  if (months < 12) return `${months} months`;
  if (months === 12) return 'approximately one year';
  if (months < 24) return `approximately ${Math.round(months / 12)} year`;
  return `approximately ${Math.round(months / 12)} years`;
}

function formatDate(targetIso: string, format: 'long' | 'month-year' = 'long'): string {
  const d = new Date(targetIso + 'T00:00:00Z');
  if (Number.isNaN(d.getTime())) return targetIso;
  const month = MONTH_NAMES[d.getUTCMonth()];
  if (format === 'month-year') return `${month} ${d.getUTCFullYear()}`;
  return `${d.getUTCDate()} ${month} ${d.getUTCFullYear()}`;
}

export function processDynamicTokens(content: string, now: Date = new Date()): string {
  if (!content) return content;
  return content
    .replace(/\{\{months_until:(\d{4}-\d{2}-\d{2})\}\}/g, (_, iso) =>
      monthsUntilPhrase(iso, now),
    )
    .replace(
      /\{\{date:(\d{4}-\d{2}-\d{2})(?::(long|month-year))?\}\}/g,
      (_, iso, fmt) => formatDate(iso, (fmt ?? 'long') as 'long' | 'month-year'),
    );
}
