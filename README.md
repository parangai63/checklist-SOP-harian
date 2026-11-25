# Kopi Parang — Checklist SOP Harian

Web app checklist SOP harian staf Kopi Parang (opening, switch, closing, cek keliling, kasir,
stok, raport), pengganti versi Apps Script "Sistem Tiga Diri" (`Original/KopiParang_SistemTigaDiri_Paket-E.html`).

**Stack sama dengan Parang-ops, Kopi Parang Keuangan, dan Yantos Roastery** (tapi project, database, dan sesi terpisah):

| | |
| --- | --- |
| Frontend | React 18 + TypeScript + Tailwind CSS (Vite), Lucide, xlsx, jsPDF |
| Backend | Node.js + Express + TypeScript |
| Database | PostgreSQL via Prisma ORM |
| Deploy | Vercel (2 project: `backend/` dan `frontend/`), database Supabase |

## Isi

| Path | Isi |
| --- | --- |
| `backend/` | API Express + Prisma |
| `frontend/` | UI React + Tailwind (mobile-first, dipakai staf di HP) |
| `.agents/` | Pedoman untuk agen AI: business logic, tech stack backend & frontend |
| `docs/SPESIFIKASI.md` | Spesifikasi (sumber kebenaran) — diisi bertahap |
| `Original/` | File Html Apps Script asli, untuk referensi saja (jangan diedit) |
| `docker-compose.yml` | PostgreSQL untuk development |

## Menjalankan (dev)

Butuh Node.js 20+ dan PostgreSQL (lokal lewat Docker, atau Supabase).

```bash
# 0. Database lokal (opsional, kalau tidak memakai Supabase) — localhost:5434
docker compose up -d

# 1. Backend — http://localhost:4200
cd backend
cp .env.example .env          # cukup isi DATABASE_URL
npm install
npx prisma migrate dev --name init   # pertama kali: buat tabel + folder migrations
npm run seed                  # 2 akun contoh (lihat di bawah)
npm run dev

# 2. Frontend — http://localhost:5175 (proxy /api → 4200)
cd ../frontend
npm install
npm run dev
```

Port 4200/5175 sengaja berbeda dari Parang-ops (4000/5173), Keuangan (4100/5174), dan
Yantos (4000/5174) supaya bisa jalan bersamaan.

### Login & akun contoh

Login memakai **PIN 4–8 angka** tanpa memilih nama (PIN unik antar staf), sama seperti app Kopi Parang lain.
`npm run seed` membuat:

| Nama | Level | Admin | PIN |
| --- | --- | --- | --- |
| Admin | Head bar | ya | 1111 |
| Staf Contoh | Junior bar | tidak | 2222 |

PIN ini hanya untuk mencoba. **Ganti sebelum dipakai sungguhan.**

## Cek sebelum commit

```bash
cd backend && npm run typecheck
cd frontend && npm run build
```

## Penting

Repo berisi data operasional staf. Buat repository GitHub sebagai **Private**. Jangan commit file `.env`.

## Kerja dengan Claude Code / agen AI

Buka folder ini lalu jalankan `claude`. Konteks proyek ada di `CLAUDE.md`, pedoman detail di `.agents/`.
"# checklist-SOP-harian" 
