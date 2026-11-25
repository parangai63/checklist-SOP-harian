import { NextFunction, Request, Response } from "express";
import { randomBytes } from "crypto";
import jwt from "jsonwebtoken";
import { StaffLevel } from "@prisma/client";
import prisma from "../prismaClient";
import { HttpError, forbidden, unauthorized } from "../utils/httpError";

// Sesi = JWT di cookie httpOnly. Nama cookie & secret SENGAJA beda dengan app Kopi Parang lain.
export const SESSION_COOKIE = "cks_session";
/** Sesi berakhir setelah 12 jam tidak aktif (diperpanjang di setiap request). */
const IDLE_HOURS = 12;

export interface SessionUser {
  id: number;
  name: string;
  level: StaffLevel;
  isAdmin: boolean;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: SessionUser;
    }
  }
}

// Development: dibuat acak tiap server start. Production: WAJIB diset (banyak instance di Vercel).
let devSecret: string | undefined;
function secret(): string {
  const s = process.env.CKS_SESSION_SECRET;
  if (s && s.length >= 16) return s;
  if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
    throw new Error("CKS_SESSION_SECRET wajib diset di production (min. 16 karakter).");
  }
  return (devSecret ??= randomBytes(32).toString("hex"));
}

const crossSite = () => Boolean(process.env.VERCEL || process.env.NODE_ENV === "production");

export function issueSession(res: Response, user: SessionUser) {
  const token = jwt.sign({ sub: user.id }, secret(), { expiresIn: `${IDLE_HOURS}h` });
  res.cookie(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: crossSite(),
    maxAge: IDLE_HOURS * 3600 * 1000,
    path: "/",
  });
}

export function clearSession(res: Response) {
  res.clearCookie(SESSION_COOKIE, { path: "/" });
}

/** Wajib login. User dicek ulang di database supaya penonaktifan langsung berlaku. */
export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.[SESSION_COOKIE];
    if (!token) throw unauthorized();
    let payload: jwt.JwtPayload;
    try {
      payload = jwt.verify(token, secret()) as jwt.JwtPayload;
    } catch {
      throw new HttpError(401, "Sesi berakhir. Silakan masuk lagi.");
    }
    const staff = await prisma.staff.findUnique({ where: { id: Number(payload.sub) } });
    if (!staff || !staff.active || staff.deletedAt) throw new HttpError(401, "Akun tidak aktif.");
    req.user = { id: staff.id, name: staff.name, level: staff.level, isAdmin: staff.isAdmin };
    issueSession(res, req.user);
    next();
  } catch (err) {
    next(err);
  }
}

/** Khusus admin (Perencana, kelola staf). */
export function requireAdmin(req: Request, _res: Response, next: NextFunction) {
  if (!req.user) return next(unauthorized());
  if (!req.user.isAdmin) return next(forbidden());
  next();
}

/** Batasi berdasarkan level staf; admin selalu boleh. */
export function requireLevel(...levels: StaffLevel[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) return next(unauthorized());
    if (!req.user.isAdmin && !levels.includes(req.user.level)) return next(forbidden());
    next();
  };
}
