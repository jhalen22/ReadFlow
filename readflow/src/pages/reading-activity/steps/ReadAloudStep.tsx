import { useEffect, useMemo, useRef, useState } from "react";
import { Mic, Square, CheckCircle2 } from "lucide-react";
import type { ActivityContent } from "../../../data/activityData";

interface Props {
  activity: ActivityContent;
  onBack: () => void;
  onDone: () => void;
}

interface WordToken {
  text: string;
  /** flagged as a likely mispronunciation, precomputed from the module's known trouble words */
  flagged: boolean;
}

/** Groups sentences into short paragraphs so the reader advances one chunk at a time, Read-Along style. */
function splitIntoParagraphs(text: string, sentencesPerParagraph = 2): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+(\s+|$)/g)?.map((s) => s.trim()) ?? [text.trim()];
  const paragraphs: string[] = [];
  for (let i = 0; i < sentences.length; i += sentencesPerParagraph) {
    paragraphs.push(sentences.slice(i, i + sentencesPerParagraph).join(" "));
  }
  return paragraphs;
}

function buildWords(paragraph: string, transcript: ActivityContent["transcript"]): WordToken[] {
  const flaggedSet = new Set(
    transcript.segments
      .filter((s) => s.status === "mispronounced")
      .map((s) => s.text.trim().toLowerCase().replace(/[.,]/g, "")),
  );
  return paragraph.split(/\s+/).map((word) => ({
    text: word,
    flagged: flaggedSet.has(word.toLowerCase().replace(/[.,]/g, "")),
  }));
}

export default function ReadAloudStep({ activity, onBack, onDone }: Props) {
  const paragraphs = useMemo(() => splitIntoParagraphs(activity.passage), [activity]);
  const paragraphWordCounts = useMemo(() => paragraphs.map((p) => p.split(/\s+/).length), [paragraphs]);
  const totalWords = useMemo(() => paragraphWordCounts.reduce((a, b) => a + b, 0), [paragraphWordCounts]);

  const [paragraphIndex, setParagraphIndex] = useState(0);
  const [revealedInParagraph, setRevealedInParagraph] = useState(0);
  const [recording, setRecording] = useState(false);
  const [complete, setComplete] = useState(false);

  // Mutable runtime state so the interval/timeout chain always reads the
  // latest paragraph/reveal position instead of a stale closure.
  const runtime = useRef({ paragraphIndex: 0, revealed: 0 });
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const currentWords = useMemo(
    () => buildWords(paragraphs[paragraphIndex] ?? "", activity.transcript),
    [paragraphs, paragraphIndex, activity.transcript],
  );

  const wordsReadBeforeCurrent = paragraphWordCounts.slice(0, paragraphIndex).reduce((a, b) => a + b, 0);
  const totalRevealed = complete ? totalWords : wordsReadBeforeCurrent + revealedInParagraph;

  useEffect(() => {
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  function tick() {
    const words = buildWords(paragraphs[runtime.current.paragraphIndex] ?? "", activity.transcript);
    runtime.current.revealed += 1;
    setRevealedInParagraph(runtime.current.revealed);

    if (runtime.current.revealed >= words.length) {
      if (intervalRef.current) window.clearInterval(intervalRef.current);

      const isLastParagraph = runtime.current.paragraphIndex >= paragraphs.length - 1;
      if (isLastParagraph) {
        setRecording(false);
        setComplete(true);
      } else {
        // Brief pause on the finished paragraph, then pop to the next one.
        timeoutRef.current = window.setTimeout(() => {
          runtime.current.paragraphIndex += 1;
          runtime.current.revealed = 0;
          setParagraphIndex(runtime.current.paragraphIndex);
          setRevealedInParagraph(0);
          intervalRef.current = window.setInterval(tick, 180);
        }, 450);
      }
    }
  }

  function handleMicClick() {
    if (complete) {
      runtime.current = { paragraphIndex: 0, revealed: 0 };
      setParagraphIndex(0);
      setRevealedInParagraph(0);
      setComplete(false);
      setRecording(false);
      return;
    }
    if (recording) {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      setRecording(false);
      return;
    }
    setRecording(true);
    intervalRef.current = window.setInterval(tick, 180);
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase mb-1">Step 2 — Read Aloud</p>
          <h3 className="text-base font-semibold text-slate-900">Read the passage aloud</h3>
        </div>
        <span className="text-xs font-medium rounded-full bg-amber-50 text-amber-600 px-3 py-1 shrink-0">Required</span>
      </div>
      <p className="text-sm text-slate-500 mb-4">
        {activity.language} &middot; {activity.difficulty} Level &middot; {totalWords} words &middot; Paragraph{" "}
        {Math.min(paragraphIndex + 1, paragraphs.length)} of {paragraphs.length}
      </p>

      <div className="relative rounded-2xl border border-slate-200 bg-slate-50 px-6 py-10 sm:px-14 sm:py-16 min-h-[320px] flex flex-col items-center justify-center">
        {!complete && (
          <p
            key={paragraphIndex}
            className="paragraph-enter text-2xl sm:text-3xl leading-[2] font-medium text-justify max-w-4xl"
          >
            {currentWords.map((word, i) => {
              const revealed = i < revealedInParagraph;
              const colorClass = !revealed
                ? "text-slate-900"
                : word.flagged
                  ? "bg-rose-100 text-rose-700 underline decoration-rose-400 decoration-wavy rounded px-1"
                  : "bg-emerald-100 text-emerald-800 rounded px-1";
              return (
                <span key={i} className={`transition-colors duration-300 ${colorClass}`}>
                  {word.text}{" "}
                </span>
              );
            })}
          </p>
        )}

        <div className="flex justify-center mt-10">
          {complete ? (
            <div className="flex flex-col items-center gap-3">
              <div className="inline-flex items-center gap-2 text-emerald-600 font-semibold text-sm">
                <CheckCircle2 size={18} />
                Recording Complete
              </div>
              <button
                onClick={handleMicClick}
                className="text-xs font-medium text-slate-500 hover:text-slate-800 underline underline-offset-2"
              >
                Re-record
              </button>
            </div>
          ) : (
            <button
              onClick={handleMicClick}
              aria-label={recording ? "Stop recording" : "Start recording"}
              className={`w-16 h-16 rounded-full flex items-center justify-center shadow-sm transition-colors ${
                recording ? "bg-red-500 animate-pulse" : "bg-flow-500 hover:bg-flow-600"
              }`}
            >
              {recording ? <Square size={22} className="text-white" /> : <Mic size={24} className="text-white" />}
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 mt-5">
        <span className="text-xs font-medium text-slate-500 shrink-0">Progress</span>
        <div className="h-2 flex-1 rounded-full bg-slate-200">
          <div
            className="h-2 rounded-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${(totalRevealed / totalWords) * 100}%` }}
          />
        </div>
        <span className="text-xs font-semibold text-slate-600 shrink-0">
          {totalRevealed}/{totalWords}
        </span>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          Back to Passage
        </button>
        <button
          onClick={onDone}
          disabled={!complete}
          className="flex-1 rounded-lg bg-flow-500 text-white text-sm font-semibold py-3 hover:bg-flow-600 transition-colors disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
        >
          View Transcript &amp; Score
        </button>
      </div>
    </div>
  );
}