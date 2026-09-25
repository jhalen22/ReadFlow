import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  BookOpen,
  Mic,
  Trophy,
  Award,
  Settings as SettingsIcon,
  LogOut,
  Menu,
  X,
  ArrowLeft,
} from "lucide-react";
import { student } from "../data/dashboardData";

interface NavItem {
  label: string;
  to: string;
  icon: typeof LayoutGrid;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutGrid },
  { label: "My Materials", to: "/dashboard/materials", icon: BookOpen },
  { label: "Read Aloud", to: `/dashboard/activity/${student.currentModuleId}`, icon: Mic },
  { label: "Leaderboard", to: "/dashboard/leaderboard", icon: Trophy },
  { label: "My Badges", to: "/dashboard/badges", icon: Award },
  { label: "Settings", to: "/dashboard/settings", icon: SettingsIcon },
];

interface DashboardLayoutProps {
  breadcrumb: string[];
  backLink?: { label: string; to: string };
  children: ReactNode;
}

export default function DashboardLayout({ breadcrumb, backLink, children }: DashboardLayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  function isActive(to: string) {
    if (to === "/dashboard") return location.pathname === "/dashboard";
    if (to.startsWith("/dashboard/activity/")) return location.pathname.startsWith("/dashboard/activity/");
    return location.pathname === to;
  }

  const NavList = (
    <nav className="flex-1 px-3 py-2 space-y-1">
      {NAV_ITEMS.map(({ label, to, icon: Icon }) => {
        const active = isActive(to);
        return (
          <Link
            key={label}
            to={to}
            onClick={() => setMobileNavOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              active ? "bg-flow-400/15 text-flow-400" : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Icon size={18} />
            {label}
          </Link>
        );
      })}
    </nav>
  );

  const ProfileBlock = (
    <div className="px-3 py-4 border-t border-white/10">
      <div className="flex items-center gap-3 px-3 py-2">
        <div className="w-9 h-9 rounded-full bg-flow-400 text-ink-900 flex items-center justify-center text-sm font-semibold shrink-0">
          {student.initials}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-white truncate">{student.fullName}</p>
          <p className="text-xs text-slate-400 truncate">
            {student.readingLevel} &middot; {student.difficultyTier}
          </p>
        </div>
      </div>
      <button
        onClick={() => navigate("/login")}
        className="mt-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-white/5 transition-colors w-full"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      {/* Sidebar (desktop) */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:h-screen lg:sticky lg:top-0 bg-ink-900 text-white">
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
          <div className="px-6 py-6 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-flow-400 flex items-center justify-center shrink-0">
              <BookOpen size={16} className="text-ink-900" />
            </div>
            <div className="leading-tight">
              <p className="text-base font-extrabold tracking-tight">
                <span className="text-slate-100">Read</span>
                <span className="text-flow-400">Flow</span>
              </p>
              <p className="text-[11px] text-slate-400">Learning Platform</p>
            </div>
          </div>
          <p className="px-6 pb-1 text-[11px] font-semibold tracking-wide text-slate-500">NAVIGATION</p>
          {NavList}
        </div>
        {ProfileBlock}
      </aside>

      {/* Sidebar (mobile drawer) */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileNavOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64 flex flex-col bg-ink-900 text-white">
            <div className="px-6 py-6 flex items-center justify-between">
              <span className="text-xl font-extrabold tracking-tight">
                <span className="text-slate-100">Read</span>
                <span className="text-flow-400">Flow</span>
              </span>
              <button onClick={() => setMobileNavOpen(false)} aria-label="Close menu" className="text-slate-300 hover:text-white">
                <X size={20} />
              </button>
            </div>
            {NavList}
            {ProfileBlock}
          </aside>
        </div>
      )}

      {/* Main column */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
          <div className="flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setMobileNavOpen(true)}
                aria-label="Open menu"
                className="lg:hidden text-slate-600 hover:text-slate-900 shrink-0"
              >
                <Menu size={22} />
              </button>
              <p className="text-sm text-slate-500 truncate">
                {breadcrumb.map((crumb, i) => (
                  <span key={crumb}>
                    {i > 0 && <span className="mx-1.5 text-slate-300">/</span>}
                    <span className={i === breadcrumb.length - 1 ? "text-slate-900 font-medium" : ""}>
                      {crumb}
                    </span>
                  </span>
                ))}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {backLink && (
                <Link
                  to={backLink.to}
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  <ArrowLeft size={15} />
                  {backLink.label}
                </Link>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">{children}</main>
      </div>
    </div>
  );
}