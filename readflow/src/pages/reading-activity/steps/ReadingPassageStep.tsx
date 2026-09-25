import { BookOpen } from "lucide-react";
import type { ActivityContent } from "../../../data/activityData";

interface Props {
  activity: ActivityContent;
  onDone: () => void;
}

const DIFFICULTY_STYLES: Record<string, string> = {
  Easy: "bg-emerald-50 text-emerald-600",
  Medium: "bg-amber-50 text-amber-600",
  Hard: "bg-red-50 text-red-600",
};

export default function ReadingPassageStep({ activity, onDone }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase mb-1">Step 1 — Reading Passage</p>
          <h3 className="text-base font-semibold text-slate-900">Read the full passage carefully</h3>
          <p className="text-sm text-slate-500 mt-1">
            Take your time before proceeding to the Read Aloud step.
          </p>
        </div>
        <span className="text-xs font-medium rounded-full bg-slate-100 text-slate-600 px-3 py-1 shrink-0">
          ~{Math.max(3, Math.round(activity.passage.split(" ").length / 130))} min read
        </span>
      </div>

      <div className="rounded-xl border border-slate-100 bg-slate-50 p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-5">
          <BookOpen size={15} className="text-flow-600" />
          <p className="text-xs font-bold tracking-wide text-slate-700 uppercase">{activity.title}</p>
          <span className={`text-[11px] font-medium rounded-full px-2 py-0.5 ml-auto ${DIFFICULTY_STYLES[activity.difficulty]}`}>
            {activity.difficulty}
          </span>
        </div>
        <p className="text-xl sm:text-2xl leading-[1.9] text-slate-800 whitespace-pre-line font-normal text-justify">
          {activity.passage}
        </p>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={onDone}
          className="rounded-lg bg-flow-500 text-white text-sm font-semibold px-6 py-3 hover:bg-flow-600 transition-colors"
        >
          Done Reading — Start Read Aloud
        </button>
      </div>
    </div>
  );
}