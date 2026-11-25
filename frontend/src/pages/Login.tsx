import { FormEvent, useState } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

/** Masuk dengan PIN 4–8 angka tanpa memilih nama (PIN unik antar staf). */
export default function LoginPage() {
  const { login } = useAuth();
  const [pin, setPin] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!/^\d{4,8}$/.test(pin)) return setError("PIN harus 4 sampai 8 angka.");
    setBusy(true);
    setError(null);
    try {
      await login(pin);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal masuk.");
      setPin("");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="brand-bar flex flex-col items-center px-6 pb-10 pt-14 text-center">
        <img src="/logo-parang.png" alt="" className="h-16 w-16 object-contain" />
        <h1 className="m-0 mt-4 text-2xl font-extrabold">Kopi Parang Checklist</h1>
        <p className="m-0 mt-1 text-sm text-brand-muted">SOP harian staf bar</p>
      </div>
      <form onSubmit={submit} className="mx-auto -mt-6 w-full max-w-sm rounded-2xl border border-line bg-surface p-6 shadow-card">
        <label htmlFor="pin" className="block text-sm font-semibold">
          Masukkan PIN
        </label>
        <input
          id="pin"
          type="password"
          inputMode="numeric"
          autoComplete="off"
          maxLength={8}
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
          className="mt-2 w-full rounded-xl border border-line-2 bg-paper px-4 py-3 text-center text-2xl tracking-[.4em] text-ink focus:border-accent focus:outline-none"
          autoFocus
        />
        {error && (
          <p role="alert" className="m-0 mt-3 text-sm text-miss">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={busy}
          className="mt-4 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-accent font-bold text-accent-ink disabled:opacity-60"
        >
          {busy && <Loader2 size={18} className="animate-spin" aria-hidden />} Masuk
        </button>
      </form>
    </div>
  );
}
