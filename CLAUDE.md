# Kopi Parang Checklist SOP Harian — konteks untuk Claude Code

Web app checklist SOP harian staf Kopi Parang, pengganti versi Apps Script "Sistem Tiga Diri"
(`Original/KopiParang_SistemTigaDiri_Paket-E.html`, Paket E, 21 Nov 2026).
Stack sama dengan Parang-ops / Keuangan / Yantos: **React 18 + TS + Tailwind (Vite)** di `frontend/`,
**Express + TS + Prisma + PostgreSQL** di `backend/`.

Sumber kebenaran: `docs/SPESIFIKASI.md`. Selama spesifikasi belum lengkap, acuan perilaku & tampilan
adalah file di `Original/` (jangan diedit).

**Baca dulu sebelum mengerjakan:**
- `.agents/business-logic.md` — konsep (hari bisnis, shift, tahap, area), batas dengan app lain, hak akses
- `.agents/tech-stack-backend.md` — struktur & aturan backend
- `.agents/tech-stack-frontend.md` — struktur & aturan frontend

## Status

Baru **setup awal**: login PIN, model `Staff` + `AuditLog`, halaman Login + Beranda + menu kosong.
Modul checklist, kasir, SOP, stok, raport, dan perencana belum dipindah dari `Original/`.

## Peta kode

```
backend/src/routes/index.ts      semua route + hak akses
backend/src/services/            business logic + Prisma + audit
backend/src/controllers/         tipis: parsing request → service → JSON
backend/src/utils/               httpError, dates (hari bisnis WIB, ganti hari jam 03.00)
backend/prisma/schema.prisma     model data; seed.ts = akun contoh
frontend/src/pages/              satu halaman per menu (lihat types/navigation.ts)
frontend/src/index.css           token warna dari Original (hijau daun kopi, header espresso)
```

## Menjalankan

```
cd backend && npm run dev            # API :4200 (butuh .env, lihat .env.example)
cd frontend && npm run dev           # UI :5175 (proxy /api → 4200)
cd backend && npm run typecheck      # typecheck backend
cd frontend && npm run build         # typecheck + build frontend
```

## Aturan kerja

- Tanggal bisnis = string `YYYY-MM-DD` zona `Asia/Jakarta`; **hari bisnis berganti jam 03.00**
  (sebelum 03.00 masih hari kemarin). Pakai `utils/dates.ts`, jangan hitung sendiri.
- Hapus = soft delete. Setiap mutasi menulis `audit_logs` di transaksi yang sama.
- Hak akses dicek di server (`requireRole` / `requireAdmin`), menu yang disembunyikan hanya kenyamanan.
- Pesan error & teks UI bahasa Indonesia, lembut dan singkat (pengguna staf bar di HP).
- Repo berisi data staf: harus **private**. Jangan commit `.env` atau kredensial.
