/** @type {import('tailwindcss').Config} */
// Warna = variabel CSS di src/index.css (diambil dari Original), jadi mode gelap otomatis ikut.
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        surface: "var(--surface)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        line: { DEFAULT: "var(--line)", 2: "var(--line-2)" },
        accent: { DEFAULT: "var(--accent)", ink: "var(--accent-ink)", soft: "var(--accent-soft)", faint: "var(--accent-faint)" },
        gold: { DEFAULT: "var(--gold)", soft: "var(--gold-soft)", ink: "var(--gold-ink)" },
        miss: { DEFAULT: "var(--miss)", soft: "var(--miss-soft)" },
        brand: { DEFAULT: "var(--brand)", 2: "var(--brand-2)", ink: "var(--brand-ink)", muted: "var(--brand-muted)" },
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Segoe UI", "system-ui", "-apple-system", "Roboto", "sans-serif"],
      },
      boxShadow: {
        card: "var(--shadow)",
      },
    },
  },
  plugins: [],
};
