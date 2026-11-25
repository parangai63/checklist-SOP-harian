import type { SessionUser } from "./index";

export type PageId = "beranda" | "checklist" | "kasir" | "sop" | "pemeriksa" | "perencana";

export interface NavItem {
  id: PageId;
  label: string;
  hint: string;
  /** Siapa yang boleh melihat menu ini. Server tetap mengecek ulang. */
  allow: (u: SessionUser) => boolean;
}

const everyone = () => true;

/** Menu utama, urutan mengikuti tab Original. Modul selain Beranda belum dipindah. */
export const NAV: NavItem[] = [
  { id: "beranda", label: "Beranda", hint: "ringkasan shift", allow: everyone },
  { id: "checklist", label: "Checklist", hint: "kerjakan dan centang", allow: everyone },
  { id: "kasir", label: "Kasir", hint: "buka, tutup, laporan", allow: everyone },
  { id: "sop", label: "SOP", hint: "buku saku", allow: everyone },
  { id: "pemeriksa", label: "Pemeriksa", hint: "approval dan raport", allow: (u) => u.isAdmin || u.level === "HEAD" },
  { id: "perencana", label: "Perencana", hint: "staf, tugas, QR", allow: (u) => u.isAdmin },
];
