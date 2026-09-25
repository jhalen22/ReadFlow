import { Link } from "react-router-dom";
import { Zap, BarChart3, BookMarked, Award, Flame, CheckCircle2, BookOpen, Lock } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout.tsx";
import ProgressBar from "../components/ProgressBar.tsx";
import { student, assignedModules, classRanking, type ModuleSummary } from "../data/dashboardData";

function ModuleRow({ mod }: { mod: ModuleSummary }) {
  const isLocked = mod.status === "locked";
  const meta = `${mod.language} · ${mod.difficulty} · ${mod.questionCount} questions · ~${mod.estMinutes} min`;

  return (
    <div className="py-4 first:pt-0 last:pb-0">
      <div className="flex items-start gap-3">
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
            mod.status === "completed"
              ? "bg-emerald-50 text-emerald-600"
              : isLocked
                ? "bg-slate-100 text-slate-400"
                : "bg-flow-400/10 text-flow-600"
          }`}
        >
          {mod.status === "completed" && <CheckCircle2 size={18} />}
          {mod.status === "in_progress" && <BookOpen size={18} />}
          {mod.status === "not_started" && <BookOpen size={18} />}
          {isLocked && <Lock size={16} />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className={`text-sm font-semibold ${isLocked ? "text-slate-400" : "text-slate-900"}`}>{mod.title}</p>
              <p className="text-xs text-slate-500 mt-0.5">{meta}</p>
            </div>
            <div className="text-right shrink-0">
              {mod.status === "completed" && (
                <span className="text-xs font-medium text-emerald-600">Completed</span>
              )}
              {mod.status === "in_progress" && <span className="text-xs font-medium text-flow-600">In Progress</span>}
              {mod.status === "not_started" && <span className="text-xs font-medium text-slate-500">Not Started</span>}
              {isLocked && <span className="text-xs font-medium text-slate-400">Locked</span>}
              <p className="text-xs text-slate-400 mt-0.5">+{mod.xpReward} XP</p>
            </div>
          </div>

          {mod.status !== "not_started" && !isLocked && (
            <div className="mt-2.5">
              <ProgressBar
                value={mod.progressPercent}
                barClassName={mod.status === "completed" ? "bg-emerald-500" : undefined}
              />
            </div>
          )}

          <div className="mt-2.5 flex justify-end">
            {mod.status === "completed" && (
              <Link
                to={`/dashboard/activity/${mod.id}`}
                className="text-xs font-semibold rounded-lg border border-slate-200 px-3.5 py-1.5 hover:bg-slate-50 transition-colors"
              >
                Review
              </Link>
            )}
            {mod.status === "in_progress" && (
              <Link
                to={`/dashboard/activity/${mod.id}`}
                className="text-xs font-semibold rounded-lg bg-flow-500 text-white px-3.5 py-1.5 hover:bg-flow-600 transition-colors"
              >
                Continue
              </Link>
            )}
            {mod.status === "not_started" && (
              <Link
                to={`/dashboard/activity/${mod.id}`}
                className="text-xs font-semibold rounded-lg bg-ink-900 text-white px-3.5 py-1.5 hover:bg-ink-800 transition-colors"
              >
                Start
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudentDashboard() {
  return (
    <DashboardLayout breadcrumb={["Dashboard", "My Learning"]}>
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <p className="text-sm text-slate-500">Welcome back</p>
          <h2 className="text-2xl font-bold text-slate-900 mt-0.5">{student.fullName}</h2>
          <p className="text-sm text-slate-500 mt-1">
            Reading Level: <span className="font-medium text-slate-700">{student.readingLevel}</span> &middot;
            Difficulty: <span className="font-medium text-slate-700">{student.difficultyTier}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5">
            <Flame size={16} className="text-amber-500" />
            <div className="leading-tight">
              <p className="text-sm font-bold text-slate-900">{student.streakDays}</p>
              <p className="text-[11px] text-slate-500">day streak</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5">
            <Zap size={16} className="text-flow-500" />
            <div className="leading-tight">
              <p className="text-sm font-bold text-slate-900">{student.totalXp}</p>
              <p className="text-[11px] text-slate-500">total XP</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[11px] font-semibold tracking-wide text-slate-400">TOTAL XP</p>
            <Zap size={16} className="text-flow-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{student.totalXp}</p>
          <p className="text-xs text-slate-500 mt-1">Experience points</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[11px] font-semibold tracking-wide text-slate-400">READING LEVEL</p>
            <BarChart3 size={16} className="text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{student.readingLevel}</p>
          <p className="text-xs text-slate-500 mt-1">Assigned after diagnostic</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[11px] font-semibold tracking-wide text-slate-400">DIFFICULTY TIER</p>
            <BookMarked size={16} className="text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{student.difficultyTier}</p>
          <p className="text-xs text-slate-500 mt-1">Current challenge level</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[11px] font-semibold tracking-wide text-slate-400">BADGES EARNED</p>
            <Award size={16} className="text-flow-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {student.badgesEarned}
            <span className="text-slate-400">/{student.badgesTotal}</span>
          </p>
          <p className="text-xs text-slate-500 mt-1">Collect all badges</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-semibold text-slate-900">Assigned Modules</h3>
              <Link to="/dashboard/materials" className="text-sm font-medium text-flow-600 hover:underline">
                View all
              </Link>
            </div>
            <p className="text-sm text-slate-500 mb-2">Your current reading activities</p>
            <div className="divide-y divide-slate-100">
              {assignedModules.map((mod) => (
                <ModuleRow key={mod.id} mod={mod} />
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-semibold text-slate-900">XP Progress</h3>
              <span className="text-xs font-medium text-slate-500">{student.currentLevelLabel}</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 mt-2">
              {student.totalXp} <span className="text-sm font-medium text-slate-400">XP</span>
            </p>
            <div className="mt-3">
              <ProgressBar value={(student.totalXp / (student.totalXp + student.xpToNextLevel)) * 100} />
            </div>
            <p className="text-xs text-slate-500 mt-2">{student.xpToNextLevel} XP to reach Level 5</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-slate-900">Class Ranking</h3>
              <span className="text-xs font-medium text-slate-500">This week</span>
            </div>
            <ul className="space-y-3">
              {classRanking.map((entry) => (
                <li
                  key={entry.rank}
                  className={`flex items-center justify-between rounded-lg px-2 py-1.5 ${
                    entry.isYou ? "bg-flow-400/10" : ""
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-xs font-medium text-slate-400 w-5 shrink-0">#{entry.rank}</span>
                    <div className="w-7 h-7 rounded-full bg-ink-900 text-white text-[11px] font-semibold flex items-center justify-center shrink-0">
                      {entry.initials}
                    </div>
                    <span className={`text-sm truncate ${entry.isYou ? "font-semibold text-flow-700" : "text-slate-700"}`}>
                      {entry.name}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-slate-600 shrink-0">{entry.xp} XP</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}