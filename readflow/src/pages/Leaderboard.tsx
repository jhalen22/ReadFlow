import { Trophy, Zap } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout.tsx";
import { fullLeaderboard, xpEarningRules, student } from "../data/dashboardData";

const DIFFICULTY_STYLES: Record<string, string> = {
  Easy: "text-emerald-600",
  Medium: "text-amber-600",
  Hard: "text-red-600",
};

const AVATAR_COLORS = ["bg-blue-500", "bg-violet-500", "bg-emerald-500", "bg-orange-500", "bg-flow-500", "bg-pink-500", "bg-rose-500"];

export default function Leaderboard() {
  const you = fullLeaderboard.find((e) => e.isYou);
  const leader = fullLeaderboard[0];
  const pointsToFirst = leader && you ? leader.xp - you.xp : 0;

  return (
    <DashboardLayout breadcrumb={["Leaderboard", "Class Rankings"]} backLink={{ label: "Dashboard", to: "/dashboard" }}>
      <div className="rounded-2xl border border-flow-400/30 bg-flow-400/5 px-6 py-4 mb-6 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Trophy size={20} className="text-flow-600" />
          <div>
            <p className="text-xs text-slate-500">Your current rank</p>
            <p className="text-base font-bold text-slate-900">
              #{you?.rank} in class &middot; {you?.xp} XP
            </p>
          </div>
        </div>
        <span className="text-xs font-medium rounded-full bg-white border border-slate-200 px-3 py-1 text-slate-600">
          {student.difficultyTier} Tier
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-base font-semibold text-slate-900">Top Readers This Week</h3>
            <span className="text-xs font-medium rounded-full bg-slate-100 text-slate-600 px-2.5 py-1">This Week</span>
          </div>
          <p className="text-sm text-slate-500 mb-4">Ranked by total XP earned in your classroom</p>

          <ul className="divide-y divide-slate-100">
            {fullLeaderboard.map((entry, i) => (
              <li
                key={entry.rank}
                className={`flex items-center justify-between py-3.5 px-2 rounded-lg ${
                  entry.isYou ? "bg-flow-400/10" : ""
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-sm font-semibold text-slate-400 w-6 shrink-0">#{entry.rank}</span>
                  <div
                    className={`w-9 h-9 rounded-full ${AVATAR_COLORS[i % AVATAR_COLORS.length]} text-white text-xs font-semibold flex items-center justify-center shrink-0`}
                  >
                    {entry.initials}
                  </div>
                  <span className={`text-sm truncate ${entry.isYou ? "font-semibold text-flow-700" : "text-slate-800"}`}>
                    {entry.name}
                  </span>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className={`text-xs font-medium ${DIFFICULTY_STYLES[entry.difficulty]}`}>{entry.difficulty}</span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900">
                    <Zap size={13} className="text-flow-500" />
                    {entry.xp.toLocaleString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-base font-semibold text-slate-900 mb-4">Your Stats</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">Your Rank</dt>
                <dd className="font-medium text-slate-900">#{you?.rank}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Total XP</dt>
                <dd className="font-medium text-slate-900">{you?.xp} XP</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Points to #1</dt>
                <dd className="font-medium text-slate-900">{pointsToFirst} XP</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Difficulty</dt>
                <dd className="font-medium text-slate-900">{student.difficultyTier}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Level</dt>
                <dd className="font-medium text-slate-900">{student.readingLevel}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-base font-semibold text-slate-900 mb-4">How to Earn XP</h3>
            <ul className="space-y-2.5 text-sm">
              {xpEarningRules.map((rule) => (
                <li key={rule.label} className="flex items-center justify-between">
                  <span className="text-slate-600">{rule.label}</span>
                  <span className="font-medium text-flow-600">{rule.value}</span>
                </li>
              ))}
            </ul>
            <button className="w-full mt-5 rounded-lg bg-flow-500 py-2.5 text-sm font-semibold text-white hover:bg-flow-600 transition-colors">
              Start Reading to Earn XP
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}