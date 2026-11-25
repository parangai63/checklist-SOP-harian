import { BookOpen, ClipboardCheck, Home, Receipt, ShieldCheck, SlidersHorizontal, type LucideIcon } from "lucide-react";
import { NavItem, PageId } from "../types/navigation";

const ICONS: Record<PageId, LucideIcon> = {
  beranda: Home,
  checklist: ClipboardCheck,
  kasir: Receipt,
  sop: BookOpen,
  pemeriksa: ShieldCheck,
  perencana: SlidersHorizontal,
};

/** Navigasi bawah (mobile-first, seperti tab di Original). Hanya menu yang diizinkan untuk staf ini. */
export default function BottomNav({ items, active, onNavigate }: { items: NavItem[]; active: PageId; onNavigate: (p: PageId) => void }) {
  return (
    <nav
      aria-label="Menu utama"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="mx-auto flex max-w-3xl list-none justify-around p-0 m-0">
        {items.map((n) => {
          const Icon = ICONS[n.id];
          const on = n.id === active;
          return (
            <li key={n.id} className="flex-1">
              <button
                onClick={() => onNavigate(n.id)}
                aria-current={on ? "page" : undefined}
                className={`flex min-h-[56px] w-full flex-col items-center justify-center gap-0.5 text-xs font-semibold ${
                  on ? "text-accent" : "text-muted"
                }`}
              >
                <Icon size={20} aria-hidden />
                {n.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
