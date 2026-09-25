import { CheckCircle2, RotateCcw } from "lucide-react";
import type { ActivityContent } from "../../../data/activityData";

interface Props {
  activity: ActivityContent;
  onReRecord: () => void;
  onDone: () => void;
}

function ScoreRow({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
        <span>{label}</span>
        <span className="font-semibold text-slate-800">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-200">
        <div
          className="h-2 rounded-full bg-flow-500"
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}

export default function TranscriptReviewStep({ activity, onReRecord, onDone }: Props) {
  const { transcript } = activity;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase mb-1">Step 3 — Transcript Review</p>
          <h3 className="text-base font-semibold text-slate-900">Review your pronunciation results</h3>
          <p className="text-sm text-slate-500 mt-1">
            Correct words are highlighted in green; mispronounced words in red.
          </p>
        </div>
        <span className="text-xs font-medium rounded-full bg-emerald-50 text-emerald-600 px-3 py-1 shrink-0">
          {transcript.oralAccuracy}% accuracy
        </span>
      </div>

      <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-5 py-4 flex items-start gap-3">
        <CheckCircle2 size={18} className="text-emerald-600 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-emerald-700">
            Oral Reading Accuracy: {transcript.oralAccuracy}%
          </p>
          <p className="text-xs text-emerald-700/80 mt-0.5">
            {transcript.wordsCorrect} of {transcript.wordsTotal} words correctly pronounced — good reading fluency!
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-5 mb-2 text-xs">
        <span className="inline-flex items-center gap-1.5 text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          Correctly pronounced
        </span>
        <span className="inline-flex items-center gap-1.5 text-slate-500">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          Mispronounced / flagged
        </span>
      </div>

      <div className="rounded-xl border border-slate-100 bg-slate-50 p-5 text-sm leading-relaxed">
        {transcript.segments.map((seg, i) => (
          <span
            key={i}
            className={
              seg.status === "mispronounced"
                ? "text-red-600 font-medium underline decoration-red-300 decoration-wavy"
                : "text-slate-700"
            }
          >
            {seg.text}
          </span>
        ))}
        <span className="text-slate-400">&nbsp;...continue reading</span>
      </div>

      <div className="grid sm:grid-cols-3 gap-5 mt-6">
        <ScoreRow label="Pronunciation Accuracy" value={transcript.pronunciationAccuracy} />
        <ScoreRow label="Reading Fluency" value={transcript.readingFluency} />
        <ScoreRow label="Pace Score" value={transcript.paceScore} />
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={onReRecord}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <RotateCcw size={15} />
          Re-record
        </button>
        <button
          onClick={onDone}
          className="flex-1 rounded-lg bg-flow-500 text-white text-sm font-semibold py-3 hover:bg-flow-600 transition-colors"
        >
          Proceed to Comprehension Quiz
        </button>
      </div>
    </div>
  );
}