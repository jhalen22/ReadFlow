import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { KeyRound, Users, Lock, CheckCircle2, BookOpen, ChevronRight } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout.tsx";
import { assignedModules, VALID_CLASS_CODES, type Difficulty } from "../data/dashboardData";

const STORAGE_KEY = "readflow_room_code";
const FILTERS: ("All" | Difficulty)[] = ["All", "Easy", "Medium", "Hard"];

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  Easy: "bg-emerald-50 text-emerald-600 border-emerald-100",
  Medium: "bg-amber-50 text-amber-600 border-amber-100",
  Hard: "bg-red-50 text-red-600 border-red-100",
};

export default function MyMaterials() {
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [codeInput, setCodeInput] = useState("");
  const [error, setError] = useState("");
  const [browsingGeneral, setBrowsingGeneral] = useState(false);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) setRoomCode(saved);
  }, []);

  function handleJoin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const normalized = codeInput.trim().toUpperCase();
    if (!normalized) {
      setError("Please enter a class code.");
      return;
    }
    if (!VALID_CLASS_CODES.includes(normalized)) {
      setError("Invalid class code. Please check with your teacher and try again.");
      return;
    }
    setError("");
    setRoomCode(normalized);
    window.localStorage.setItem(STORAGE_KEY, normalized);
  }

  function handleLeaveRoom() {
    window.localStorage.removeItem(STORAGE_KEY);
    setRoomCode(null);
    setCodeInput("");
  }

  const unlocked = roomCode !== null || browsingGeneral;
  const visibleModules = assignedModules.filter((m) => filter === "All" || m.difficulty === filter);

  return (
    <DashboardLayout breadcrumb={["Dashboard", "My Materials"]}>
      {!unlocked ? (
        <div className="max-w-md mx-auto mt-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <div className="w-12 h-12 rounded-xl bg-flow-400/10 flex items-center justify-center mx-auto mb-5">
              <KeyRound size={22} className="text-flow-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Join Your Classroom</h2>
            <p className="text-sm text-slate-500 mt-2">
              Enter the class code your teacher gave you to unlock the reading materials assigned
              to your Learning Room.
            </p>

            <form onSubmit={handleJoin} className="mt-6 text-left">
              <label htmlFor="classCode" className="block text-sm font-medium text-slate-800 mb-1.5">
                Class Code
              </label>
              <input
                id="classCode"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                placeholder="e.g. RM-7A2K"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-center tracking-widest
                           uppercase text-slate-900 placeholder-slate-400 placeholder:tracking-normal placeholder:normal-case
                           focus:outline-none focus:ring-2 focus:ring-flow-500/30 focus:border-flow-500 transition-colors"
              />
              {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

              <button
                type="submit"
                className="w-full mt-4 rounded-lg bg-ink-900 py-3 text-sm font-semibold text-white hover:bg-ink-800 transition-colors"
              >
                Join Classroom
              </button>
            </form>

            <div className="mt-5 pt-5 border-t border-slate-100">
              <p className="text-xs text-slate-500">
                Don't have a code yet?{" "}
                <button
                  onClick={() => setBrowsingGeneral(true)}
                  className="text-flow-600 font-medium hover:underline"
                >
                  Browse general reading modules
                </button>{" "}
                instead.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">My Materials</h2>
              {roomCode ? (
                <p className="text-sm text-slate-500 mt-1 flex items-center gap-1.5">
                  <Users size={14} />
                  Connected to classroom <span className="font-medium text-slate-700">{roomCode}</span>
                </p>
              ) : (
                <p className="text-sm text-slate-500 mt-1">Browsing general reading modules</p>
              )}
            </div>

            {roomCode ? (
              <button
                onClick={handleLeaveRoom}
                className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors self-start sm:self-auto"
              >
                Leave classroom
              </button>
            ) : (
              <button
                onClick={() => setBrowsingGeneral(false)}
                className="text-sm font-medium text-flow-600 hover:underline self-start sm:self-auto"
              >
                Have a class code? Join now
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 mb-5">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-sm font-medium rounded-lg px-3.5 py-1.5 border transition-colors ${
                  filter === f
                    ? "bg-ink-900 text-white border-ink-900"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {visibleModules.map((mod) => {
              const isLocked = mod.status === "locked";
              return (
                <div
                  key={mod.id}
                  className={`rounded-2xl border bg-white p-5 flex flex-col ${
                    isLocked ? "border-slate-200 opacity-70" : "border-slate-200"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        isLocked ? "bg-slate-100 text-slate-400" : "bg-flow-400/10 text-flow-600"
                      }`}
                    >
                      {isLocked ? <Lock size={16} /> : <BookOpen size={17} />}
                    </div>
                    {mod.status === "completed" && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                        <CheckCircle2 size={13} />
                        Completed
                      </span>
                    )}
                  </div>

                  <p className={`text-sm font-semibold ${isLocked ? "text-slate-400" : "text-slate-900"}`}>
                    {mod.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{mod.language}</p>

                  <div className="flex items-center gap-2 mt-3">
                    <span className={`text-[11px] font-medium rounded-full border px-2 py-0.5 ${DIFFICULTY_STYLES[mod.difficulty]}`}>
                      {mod.difficulty}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {mod.questionCount} questions &middot; ~{mod.estMinutes} min
                    </span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400">+{mod.xpReward} XP</span>
                    {isLocked ? (
                      <span className="text-xs font-medium text-slate-400">Locked</span>
                    ) : (
                      <Link
                        to={`/dashboard/activity/${mod.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-flow-600 hover:underline"
                      >
                        {mod.status === "completed" ? "Review" : mod.status === "in_progress" ? "Continue" : "Start"}
                        <ChevronRight size={13} />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {visibleModules.length === 0 && (
            <p className="text-sm text-slate-500 text-center py-12">No materials match this filter yet.</p>
          )}
        </>
      )}
    </DashboardLayout>
  );
}