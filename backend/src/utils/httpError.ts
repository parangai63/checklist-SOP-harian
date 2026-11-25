import { NextFunction, Request, RequestHandler, Response } from "express";
import { Prisma } from "@prisma/client";

/** Error dengan HTTP status. 400 validasi, 401 belum login, 403 tidak berhak,
 * 404 tidak ditemukan, 409 konflik, 429 terlalu banyak percobaan. */
export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export const badRequest = (msg: string) => new HttpError(400, msg);
export const unauthorized = (msg = "Silakan masuk terlebih dahulu.") => new HttpError(401, msg);
export const forbidden = (msg = "Kamu tidak punya akses untuk tindakan ini.") => new HttpError(403, msg);
export const notFound = (msg: string) => new HttpError(404, msg);
export const conflict = (msg: string) => new HttpError(409, msg);

/** Membungkus handler async supaya error otomatis diteruskan ke errorMiddleware. */
export function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>): RequestHandler {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}

// Bentuk error sama dengan app Kopi Parang lain: { message }.
export function errorMiddleware(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof HttpError) return res.status(err.status).json({ message: err.message });
  if (err instanceof SyntaxError && "body" in err) return res.status(400).json({ message: "Format JSON tidak valid." });
  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
    return res.status(409).json({ message: "Data dengan nilai yang sama sudah ada." });
  }
  console.error(err);
  res.status(500).json({ message: "Terjadi kesalahan di server." });
}
