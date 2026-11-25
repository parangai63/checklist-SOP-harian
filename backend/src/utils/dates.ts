// Tanggal bisnis = string "YYYY-MM-DD" zona Asia/Jakarta.
// Hari bisnis berganti jam 03.00 WIB: kegiatan 00.00–02.59 masih dihitung hari kemarin (sama dengan Original).

const TZ = "Asia/Jakarta";
export const DAY_CHANGE_MINUTE = 3 * 60;

const dayFmt = new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" });
const timeFmt = new Intl.DateTimeFormat("en-GB", { timeZone: TZ, hour: "2-digit", minute: "2-digit", hourCycle: "h23" });

export const isISODate = (s: unknown): s is string =>
  typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s) && toISODate(fromISODate(s)) === s;

/** "YYYY-MM-DD" → Date (UTC tengah malam), untuk kolom @db.Date. */
export const fromISODate = (s: string) => new Date(`${s}T00:00:00.000Z`);
export const toISODate = (d: Date) => d.toISOString().slice(0, 10);

export function addDays(s: string, n: number): string {
  const d = fromISODate(s);
  d.setUTCDate(d.getUTCDate() + n);
  return toISODate(d);
}

/** Tanggal kalender WIB sekarang. */
export const calendarTodayJakarta = (now = new Date()) => dayFmt.format(now);

/** Jam WIB sekarang "HH:MM". */
export const nowJakartaHM = (now = new Date()) => timeFmt.format(now).replace(/^24/, "00");

export const minuteOf = (hm: string) => {
  const [h, m] = hm.split(":").map(Number);
  return h * 60 + m;
};

/** Hari bisnis sekarang (sebelum 03.00 WIB = hari kemarin). */
export function businessToday(now = new Date()): string {
  const d = calendarTodayJakarta(now);
  return minuteOf(nowJakartaHM(now)) < DAY_CHANGE_MINUTE ? addDays(d, -1) : d;
}
