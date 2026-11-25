# Business Logic — Checklist SOP Harian Kopi Parang

Ringkasan konsep dari `Original/KopiParang_SistemTigaDiri_Paket-E.html`. Detail lengkap dipindah ke
`docs/SPESIFIKASI.md` saat tiap modul dikerjakan.

## 1. Aplikasi ini BERDIRI SENDIRI

| | Parang-ops | Keuangan | Checklist SOP (repo ini) |
| --- | --- | --- | --- |
| Mencatat | Stok, resep, prep, absensi | Uang: omzet, jurnal, laporan | Pekerjaan staf: checklist, cek keliling, buka/tutup kasir, raport |
| Login | PIN staf | PIN 6 digit | PIN 4–8 angka sendiri |

- Database, sesi, dan secret **terpisah**. Jangan menambah koneksi otomatis ke app lain tanpa keputusan owner.

## 2. Waktu

- Zona `Asia/Jakarta`. **Hari bisnis berganti jam 03.00**: kegiatan jam 00.00–02.59 masuk hari sebelumnya.
- Shift operasional: **Pagi** (06.00–15.00) dan **Sore** (15.00–24.00).
- Jam kerja saat absen: Pagi, Middle 1 (09–18), Middle 2 (13–22), Sore. Middle ikut shift pagi lalu otomatis sore.
- Jam tiap tahap bisa diubah admin (bawaan di Original: opening 07.15, switch 14.30, closing 21.00, dst.).

## 3. Konsep inti

- **Tahap**: Pribadi, Opening, Closing pagi, Switch, Closing, Rutin (head), Buka kasir, Tutup kasir.
- **Area**: Bar, Guest area, Kamar mandi, Dapur, Halaman, Kasir, Umum: Head, Umum: Pribadi (area ber-QR).
- **Tugas checklist** = (tahap, area, grup, teks, petunjuk). Diisi per hari bisnis per staf.
  Alasan tidak selesai: Bahan habis, Alat rusak, Kurang waktu, Kurang orang, Lupa.
- **Cek keliling**: jadwal bersama (09, 11, 17, 20) per area dengan daftar temuan; bar khusus head (minimal 2× per shift).
- **Level staf**: Head bar, Senior bar, Junior bar; plus penanda admin. Posisi harian: Head bar, Bar, Runner/Dapur, Kasir.
- **Pemeriksa**: head/admin menyetujui atau menolak isian (approval) → raport harian & personal.
- Modul lain di Original: Kasir (modal awal bawaan Rp 500.000), SOP (buku saku), Info stok (supplier & prep),
  Laporan, Raport, Kalibrasi, Belajar, Perencana (staf, tugas, QR, jam).

## 4. Hak akses (awal)

| Peran | Boleh |
| --- | --- |
| Semua staf | Checklist sendiri, kasir sesuai posisi, SOP, profil |
| Head bar | + Pemeriksa (approval), rutin head, cek keliling bar |
| Admin | + Perencana (staf, tugas, jam), laporan, raport semua staf |

Hak akses sebenarnya dicek di server.
