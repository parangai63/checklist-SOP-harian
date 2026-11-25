// Komponen UI kecil yang dipakai di semua halaman. Warna lewat token Tailwind → variabel CSS (index.css).
import { ReactNode } from "react";
import { AlertCircle, Loader2, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { LEVEL_LABEL } from "../types";
import { tglHari } from "../utils/format";

/** Header espresso bermotif parang: nama staf, hari bisnis, tombol keluar, lalu judul halaman. */
export function PageHeader({ title, subtitle }: { title: string; subtitle?: ReactNode }) {
  const { user, businessDate, logout } = useAuth();
  return (
    <header className="brand-bar px-4 pb-5 pt-4">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 text-sm">
        <span className="text-brand-muted">{businessDate ? tglHari(businessDate) : ""}</span>
        {user && (
          <span className="flex items-center gap-3">
            <span className="text-right leading-tight">
              <b className="block">{user.name}</b>
              <small className="text-brand-muted">{user.isAdmin ? "Admin" : LEVEL_LABEL[user.level]}</small>
            </span>
            <button
              onClick={logout}
              className="flex min-h-[44px] items-center gap-1.5 rounded-full border border-white/20 px-3 text-brand-ink hover:bg-white/10"
            >
              <LogOut size={16} aria-hidden /> Keluar
            </button>
          </span>
        )}
      </div>
      <div className="mx-auto mt-3 max-w-3xl">
        <h1 className="m-0 text-2xl font-extrabold tracking-tight">{title}</h1>
        {subtitle && <p className="m-0 mt-1 text-sm text-brand-muted">{subtitle}</p>}
      </div>
    </header>
  );
}

export function Panel({ title, children }: { title?: ReactNode; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-surface p-4 shadow-card">
      {title && <h2 className="m-0 mb-2 text-base font-bold">{title}</h2>}
      {children}
    </section>
  );
}

export function Loading({ label = "Memuat…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 p-8 text-muted">
      <Loader2 className="animate-spin" size={18} aria-hidden /> {label}
    </div>
  );
}

export function ErrorBox({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div role="alert" className="flex flex-wrap items-center gap-3 rounded-2xl bg-miss-soft p-4 text-miss">
      <AlertCircle size={18} aria-hidden />
      <span className="flex-1">{message}</span>
      {onRetry && (
        <button onClick={onRetry} className="min-h-[44px] rounded-full border border-miss px-4 font-semibold">
          Coba lagi
        </button>
      )}
    </div>
  );
}
