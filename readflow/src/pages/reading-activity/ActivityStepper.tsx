import { BookOpen, Mic, FileText, CheckCircle2 } from "lucide-react";

export type ActivityStep = "passage" | "readAloud" | "transcript" | "quiz";

const STEPS: { key: ActivityStep; label: string; icon: typeof BookOpen }[] = [
  { key: "passage", label: "Reading Passage", icon: BookOpen },
  { key: "readAloud", label: "Read Aloud", icon: Mic },
  { key: "transcript", label: "Transcript Review", icon: FileText },
  { key: "quiz", label: "Comprehension Quiz", icon: CheckCircle2 },
];

export default function ActivityStepper({ current }: { current: ActivityStep }) {
  const currentIndex = STEPS.findIndex((s) => s.key === current);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 mb-6">
      <div className="flex items-center">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const done = i < currentIndex;
          const active = i === currentIndex;

          return (
            <div key={step.key} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center text-center w-24 sm:w-28">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    done
                      ? "bg-emerald-500 text-white"
                      : active
                        ? "bg-flow-500 text-white"
                        : "bg-slate-100 text-slate-400"
                  }`}
                >
                  <Icon size={17} />
                </div>
                <p
                  className={`mt-2 text-xs font-medium leading-tight ${
                    done ? "text-emerald-600" : active ? "text-flow-600" : "text-slate-400"
                  }`}
                >
                  {step.label}
                </p>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-0.5 flex-1 mx-1 mb-6 ${i < currentIndex ? "bg-emerald-500" : "bg-slate-200"}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}