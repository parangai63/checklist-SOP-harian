export const HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
export const BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

const parse = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d, 12);
};

/** "2026-11-25" → "Rabu, 25 Nov". */
export const tglHari = (s: string) => {
  const d = parse(s);
  return `${HARI[d.getDay()]}, ${d.getDate()} ${BULAN[d.getMonth()]}`;
};

/** "2026-11-25" → "25 Nov 2026". */
export const tgl = (s: string) => {
  const d = parse(s);
  return `${d.getDate()} ${BULAN[d.getMonth()]} ${d.getFullYear()}`;
};

const nf = new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 });
/** Rupiah tanpa desimal: 500000 → "Rp 500.000". */
export const rp = (n: number) => `Rp ${nf.format(n)}`;
