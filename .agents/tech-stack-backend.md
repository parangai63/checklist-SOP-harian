# Aturan Tech Stack & Pedoman Backend (Backend Guidelines)

Stack **sama dengan Parang-ops, Kopi Parang Keuangan, dan Yantos Roastery**, tetapi project, database,
dan konfigurasinya **terpisah total**. Agen AI yang ditugaskan di Backend WAJIB mematuhi ini.

## 1. Teknologi Utama
*   **Runtime & Framework**: Node.js 20+ dengan Express.js.
*   **Bahasa**: TypeScript (`strict: true`).
*   **ORM**: Prisma (`@prisma/client` 5.x).
*   **Database**: PostgreSQL — database sendiri (`checklist_sop`), user sendiri.
*   **Development Server**: `ts-node-dev` (`npm run dev`, port **4200**).
*   **Auth**: PIN 4–8 angka tanpa pilih nama. `bcryptjs` (hash PIN), `jsonwebtoken` di cookie httpOnly `cks_session`.
*   **Deploy**: Vercel (`api/index.ts` + `vercel.json`, region `sin1`), database Supabase.

## 2. Struktur Arsitektur & Folder
Route → Controller (tipis) → Service (business logic + Prisma + audit).

```
backend/
  api/index.ts            entry Vercel (export app)
  prisma/
    schema.prisma         model data (PascalCase, tabel snake_case via @@map)
    migrations/           dibuat `prisma migrate dev` — jangan edit migrasi yang sudah di-deploy
    seed.ts               akun contoh
  src/
    app.ts / server.ts    konfigurasi Express / listener
    prismaClient.ts       satu instance PrismaClient
    middleware/auth.ts    sesi cookie, requireAuth, requireAdmin, requireLevel
    routes/index.ts       semua route + hak akses
    controllers/          parsing request → panggil service → JSON
    services/             business logic + transaksi + audit log
    utils/                httpError, dates (hari bisnis WIB)
```

## 3. Aturan Pengkodean
*   **Tanggal bisnis** = string `YYYY-MM-DD` (`@db.Date`), lewat `utils/dates.ts` (`businessToday()` memakai
    aturan ganti hari jam 03.00 WIB).
*   **Uang** (modal kasir, setoran) = integer Rupiah, kolom `Int`/`BigInt`, bukan float.
*   **Transaksi (ACID)**: operasi yang menulis lebih dari satu tabel + audit log WAJIB `prisma.$transaction`.
*   **Audit log**: setiap mutasi memanggil `logAudit(tx, …)`. Tidak ada endpoint hapus/ubah audit log.
*   **Soft delete**: hapus = `deletedAt`/`active=false`, bukan hapus fisik.
*   **Error**: lempar `HttpError` (`utils/httpError.ts`); handler dibungkus `asyncHandler`. Bentuk response
    `{ message }`. `400` validasi, `401` belum login, `403` tidak berhak, `404` tidak ada, `409` konflik,
    `429` terlalu banyak percobaan, `500` crash. Pesan dalam **bahasa Indonesia**.
*   **Jangan dump hasil Prisma** langsung ke JSON; format dulu (`serialize*` di service, tanpa `pinHash`).

## 4. Prisma
*   Setelah mengubah skema: `npx prisma migrate dev --name <nama_migrasi>`; produksi `npx prisma migrate deploy`.
*   Supabase: `DATABASE_URL` lewat pooler 6543 (`?pgbouncer=true&connection_limit=1`) untuk Vercel,
    `DIRECT_URL` lewat 5432 untuk migrasi.

## 5. Keamanan & Lingkungan
*   Jangan commit `.env`. Repo **private**.
*   Development cukup `DATABASE_URL` + `DIRECT_URL`. Variabel lain opsional dengan bawaan aman.
*   Production WAJIB `CKS_SESSION_SECRET` (≥16 karakter, beda dengan app lain) dan `CKS_CORS_ORIGIN`.
