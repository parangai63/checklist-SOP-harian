// Semua route API + hak akses. Hak akses dicek DI SERVER untuk setiap permintaan.
import { Router } from "express";
import { requireAdmin, requireAuth } from "../middleware/auth";
import { asyncHandler as h } from "../utils/httpError";
import * as auth from "../controllers/authController";
import * as staff from "../controllers/staffController";

// ---------- auth (publik kecuali /me) ----------
export const authRoutes = Router();
authRoutes.post("/pin", h(auth.postPinLogin));
authRoutes.post("/logout", h(auth.postLogout));
authRoutes.get("/me", requireAuth, h(auth.getMe));

// ---------- semua route di bawah wajib login ----------
export const apiRoutes = Router();
apiRoutes.use(requireAuth);

// Staf: admin saja (Perencana).
apiRoutes.get("/staff", requireAdmin, h(staff.getStaff));

// Modul berikutnya (lihat docs/SPESIFIKASI.md): /checklist, /kasir, /rounds, /sop, /stock, /reports, /planner
