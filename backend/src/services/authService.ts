import bcrypt from "bcryptjs";
import prisma from "../prismaClient";
import { HttpError, badRequest } from "../utils/httpError";
import type { SessionUser } from "../middleware/auth";

export const PIN_RE = /^\d{4,8}$/;

// Batas percobaan PIN per IP: 5 salah → dikunci 15 menit (pola Yantos-Roastery).
// Di memori per instance; cukup untuk setup awal.
const MAX_FAIL = 5;
const LOCK_MS = 15 * 60 * 1000;
const fails = new Map<string, { n: number; until: number }>();

function checkLock(ip: string) {
  const f = fails.get(ip);
  if (f && f.until > Date.now()) {
    const min = Math.ceil((f.until - Date.now()) / 60000);
    throw new HttpError(429, `Terlalu banyak PIN salah. Coba lagi dalam ${min} menit.`);
  }
}

function noteFail(ip: string) {
  const f = fails.get(ip) ?? { n: 0, until: 0 };
  f.n += 1;
  if (f.n >= MAX_FAIL) {
    f.until = Date.now() + LOCK_MS;
    f.n = 0;
  }
  fails.set(ip, f);
}

/** Login PIN tanpa pilih nama: PIN dicocokkan ke semua staf aktif (PIN unik antar staf). */
export async function loginWithPin(pin: unknown, ip: string): Promise<SessionUser> {
  if (typeof pin !== "string" || !PIN_RE.test(pin)) throw badRequest("PIN harus 4 sampai 8 angka.");
  checkLock(ip);
  const staff = await prisma.staff.findMany({ where: { active: true, deletedAt: null } });
  for (const s of staff) {
    if (await bcrypt.compare(pin, s.pinHash)) {
      fails.delete(ip);
      return { id: s.id, name: s.name, level: s.level, isAdmin: s.isAdmin };
    }
  }
  noteFail(ip);
  throw new HttpError(401, "PIN tidak cocok.");
}
