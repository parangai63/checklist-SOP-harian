import { useEffect, useState } from "react";
import BottomNav from "./components/BottomNav";
import { Loading } from "./components/ui";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { NAV, PageId } from "./types/navigation";
import LoginPage from "./pages/Login";
import BerandaPage from "./pages/Beranda";
import PlaceholderPage from "./pages/Placeholder";

function AppContent() {
  const { user, checking } = useAuth();
  const [page, setPage] = useState<PageId>("beranda");
  const allowed = user ? NAV.filter((n) => n.allow(user)) : [];

  // Pastikan halaman aktif diizinkan untuk staf yang sedang login.
  useEffect(() => {
    if (user && !NAV.some((n) => n.id === page && n.allow(user))) setPage("beranda");
  }, [user, page]);

  if (checking) return <Loading label="Memeriksa sesi…" />;
  if (!user) return <LoginPage />;

  const current = NAV.find((n) => n.id === page) ?? NAV[0];
  return (
    <div className="min-h-screen pb-24">
      <main>{page === "beranda" ? <BerandaPage /> : <PlaceholderPage title={current.label} hint={current.hint} />}</main>
      <BottomNav
        items={allowed}
        active={page}
        onNavigate={(p) => {
          setPage(p);
          window.scrollTo(0, 0);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </AuthProvider>
  );
}
