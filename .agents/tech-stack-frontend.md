# Aturan Tech Stack & Pedoman Frontend (Frontend Guidelines)

Stack **sama dengan Parang-ops, Kopi Parang Keuangan, dan Yantos Roastery**, aplikasinya terpisah.
**Tampilan mengikuti rancangan Original** (`Original/KopiParang_SistemTigaDiri_Paket-E.html`): hijau daun
kopi di atas abu kehijauan, header espresso bermotif parang, emas sogan hanya untuk "menunggu",
merah bata hanya untuk yang terlewat/ditolak.

## 1. Teknologi Utama
*   **Framework**: React 18 + Vite (dev port **5175**, proxy `/api` → 4200).
*   **Bahasa**: TypeScript `strict`; tipe data API di `src/types/index.ts`, samakan dengan response backend.
*   **Styling**: token CSS di `src/index.css` (`:root`, mode gelap otomatis) + Tailwind untuk utility.
    `tailwind.config.js` memetakan warna ke variabel CSS (`paper`, `surface`, `ink`, `muted`, `accent`, `gold`, `miss`, `brand`).
*   **Font**: Plus Jakarta Sans. **Ikon**: Lucide React.
*   **Library ekstra**: `xlsx` (Excel), `jspdf` + `jspdf-autotable` (PDF) — muat lazily lewat `import()`.

## 2. Struktur
```
src/
  api/          client.ts (fetch + credentials + error), auth.ts, satu file per modul
  context/      AuthContext (profil dari /auth/me), ToastContext
  components/   ui.tsx (PageHeader, Panel, Loading, ErrorBox), Sidebar/nav
  pages/        satu file per menu: Login, Beranda, Checklist, Kasir, Sop, Pemeriksa, Perencana, …
  types/        index.ts (data API), navigation.ts (menu + hak akses)
  utils/        format.ts (tanggal & Rupiah Indonesia), useApi.ts
```
*   File `.tsx` maksimal ±300–400 baris; pecah tabel/form/modal jadi sub-komponen.
*   State lokal `useState`/`useReducer`; data server lewat `useApi` (loading + error + reload).
    Tidak ada state global selain auth & toast.
*   Navigasi: menu di `types/navigation.ts`. Menyembunyikan menu hanyalah kenyamanan.

## 3. Aturan UI
*   **Mobile-first**: staf memakai HP. Semua halaman staf wajib nyaman di lebar **360 px**; tombol minimal 44 px.
*   **Bahasa UI: Indonesia**, lembut dan singkat. Pesan error dari server ditampilkan apa adanya.
*   **Warna** selalu lewat variabel CSS / kelas Tailwind yang dipetakan, jangan hex langsung.
*   Setiap fetch WAJIB menampilkan `Loading` dan `ErrorBox` (tombol coba lagi); setiap aksi simpan memberi toast.
*   Laporan/raport punya tombol ekspor Excel & PDF dengan kop "KOPI PARANG", judul, periode, tanggal cetak.
