import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import * as authApi from "../api/auth";
import type { SessionUser } from "../types";

interface AuthState {
  user: SessionUser | null;
  businessDate: string | null;
  checking: boolean;
  login: (pin: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

/** Profil staf dari /auth/me. Sesi = cookie httpOnly dari server. */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [businessDate, setBusinessDate] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    authApi
      .fetchMe()
      .then((r) => {
        setUser(r.user);
        setBusinessDate(r.businessDate);
      })
      .catch(() => setUser(null))
      .finally(() => setChecking(false));
    const onUnauthorized = () => setUser(null);
    window.addEventListener("cks:unauthorized", onUnauthorized);
    return () => window.removeEventListener("cks:unauthorized", onUnauthorized);
  }, []);

  const login = useCallback(async (pin: string) => {
    const r = await authApi.loginPin(pin);
    setUser(r.user);
    setBusinessDate(r.businessDate);
  }, []);

  const logout = useCallback(async () => {
    await authApi.logout().catch(() => undefined);
    setUser(null);
  }, []);

  return <AuthContext.Provider value={{ user, businessDate, checking, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus dipakai di dalam AuthProvider");
  return ctx;
}
