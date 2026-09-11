import {
  Star,
  Flame,
  BookOpenCheck,
  ArrowUpCircle,
  Target,
  Mic,
  Gem,
  GraduationCap,
  Check,
  type LucideIcon,
} from "lucide-react";
import DashboardLayout from "../components/DashboardLayout.tsx";
import { badges, student } from "../data/dashboardData";

const ICONS: Record<string, LucideIcon> = {
  Star,
  Flame,
  BookOpenCheck,
  ArrowUpCircle,
  Target,
  Mic,
  Gem,
  GraduationCap,
};

export default function MyBadges() {
  const earned = badges.filter((b) => b.earned);
  const locked = badges.filter((b) => !b.earned);

  return (
    <DashboardLayout breadcrumb={["My Badges", `${student.badgesEarned} of ${student.badgesTotal} earned`]} backLink={{ label: "Dashboard", to: "/dashboard" }}>
      <div className="rounded-2xl border border-flow-400/30 bg-flow-400/5 px-6 py-4 mb-6 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Star size={20} className="text-flow-600" />
          <div>
            <p className="text-xs text-slate-500">Badge Progress</p>
            <p className="text-base font-bold text-slate-900">
              {student.badgesEarned} of {student.badgesTotal} badges earned
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {badges.map((b) => (
            <span key={b.id} className={`w-2.5 h-2.5 rounded-full ${b.earned ? "bg-flow-500" : "bg-slate-200"}`} />
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-semibold text-slate-900">Earned Badges</h3>
              <span className="text-xs font-medium rounded-full bg-emerald-50 text-emerald-600 px-2.5 py-1">
                {earned.length} earned
              </span>
            </div>
            <p className="text-sm text-slate-500 mb-4">Collect all {student.badgesTotal} badges to complete your achievement set.</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {earned.map((b) => {
                const Icon = ICONS[b.icon];
                return (
                  <div key={b.id} className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-center">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mx-auto mb-2.5 text-emerald-600">
                      <Icon size={19} />
                    </div>
                    <p className="text-sm font-semibold text-slate-900">{b.name}</p>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug">{b.description}</p>
                    <span className="inline-block mt-2 text-[10px] font-semibold uppercase tracking-wide text-emerald-600 bg-white rounded-full px-2 py-0.5">
                      Earned
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-semibold text-slate-900">Locked Badges</h3>
              <span className="text-xs font-medium rounded-full bg-slate-100 text-slate-500 px-2.5 py-1">
                {locked.length} remaining
              </span>
            </div>
            <p className="text-sm text-slate-500 mb-4">Keep reading and practicing to unlock these next.</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {locked.map((b) => {
                const Icon = ICONS[b.icon];
                return (
                  <div key={b.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center opacity-80">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mx-auto mb-2.5 text-slate-400">
                      <Icon size={19} />
                    </div>
                    <p className="text-sm font-semibold text-slate-500">{b.name}</p>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">{b.description}</p>
                    <span className="inline-block mt-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400 bg-white rounded-full px-2 py-0.5">
                      Locked
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-base font-semibold text-slate-900 mb-4">How to Earn Badges</h3>
            <ul className="space-y-3.5">
              {badges.map((b) => (
                <li key={b.id} className="flex items-start justify-between gap-3">
                  <div>
                    <p className={`text-sm font-medium ${b.earned ? "text-slate-900" : "text-slate-600"}`}>{b.name}</p>
                    <p className="text-xs text-slate-500">{b.description}</p>
                  </div>
                  {b.earned && <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />}
                </li>
              ))}
            </ul>
          </div>

          <button className="w-full rounded-lg bg-flow-500 py-3 text-sm font-semibold text-white hover:bg-flow-600 transition-colors">
            Continue Reading to Earn Badges
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}