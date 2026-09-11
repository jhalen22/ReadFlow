interface ProgressBarProps {
  value: number;
  trackClassName?: string;
  barClassName?: string;
}

export default function ProgressBar({ value, trackClassName, barClassName }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={`h-2 w-full rounded-full bg-slate-200 ${trackClassName ?? ""}`}>
      <div
        className={`h-2 rounded-full bg-flow-500 transition-all ${barClassName ?? ""}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}