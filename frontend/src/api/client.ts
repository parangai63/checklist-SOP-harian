export const API_URL = import.meta.env.VITE_API_URL || "";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

/** Semua panggilan API lewat sini: cookie sesi ikut terkirim (credentials: include),
 * dan pesan error dari server (bahasa Indonesia) diteruskan apa adanya ke UI. */
export async function api<T>(path: string, init: { method?: string; body?: unknown } = {}): Promise<T> {
  const headers: Record<string, string> = {};
  if (init.body !== undefined) headers["Content-Type"] = "application/json";
  let res: Response;
  try {
    res = await fetch(`${API_URL}/api${path}`, {
      method: init.method ?? "GET",
      credentials: "include",
      headers,
      body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
    });
  } catch {
    throw new ApiError(0, "Tidak bisa terhubung ke server. Cek koneksi lalu coba lagi.");
  }
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    if (res.status === 401 && !path.startsWith("/auth/")) window.dispatchEvent(new Event("cks:unauthorized"));
    throw new ApiError(res.status, data?.message ?? `Permintaan gagal (${res.status}).`);
  }
  return data as T;
}
