import { useMemo, useState } from "react";
import { Lock, Unlock, CheckCircle2, XCircle } from "lucide-react";
import type { ActivityContent, SkillGateLevel } from "../../../data/activityData";

interface Props {
  activity: ActivityContent;
  onComplete: () => void;
}

interface AnswerState {
  selected: number | null;
  correct: boolean;
}

const LEVEL_ORDER: SkillGateLevel[] = ["literal", "inferential", "critical"];

export default function ComprehensionQuizStep({ activity, onComplete }: Props) {
  const [activeLevel, setActiveLevel] = useState<SkillGateLevel>("literal");
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
  const [completed, setCompleted] = useState(false);

  const sectionsByLevel = useMemo(() => {
    const map = new Map<SkillGateLevel, (typeof activity.skillGate)[number]>();
    activity.skillGate.forEach((s) => map.set(s.level, s));
    return map;
  }, [activity]);

  function isLevelPassed(level: SkillGateLevel) {
    const section = sectionsByLevel.get(level);
    if (!section) return true;
    return section.questions.every((q) => answers[q.id]?.correct);
  }

  function isLevelUnlocked(level: SkillGateLevel) {
    const idx = LEVEL_ORDER.indexOf(level);
    if (idx === 0) return true;
    return isLevelPassed(LEVEL_ORDER[idx - 1]);
  }

  function handleSelect(questionId: string, optionIndex: number, correctIndex: number) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { selected: optionIndex, correct: optionIndex === correctIndex },
    }));
  }

  function handleContinue() {
    const idx = LEVEL_ORDER.indexOf(activeLevel);
    if (idx < LEVEL_ORDER.length - 1) {
      setActiveLevel(LEVEL_ORDER[idx + 1]);
    } else {
      setCompleted(true);
      onComplete();
    }
  }

  const allQuestions = activity.skillGate.flatMap((s) => s.questions);
  const answeredCorrectCount = allQuestions.filter((q) => answers[q.id]?.correct).length;
  const overallPercent = Math.round((answeredCorrectCount / allQuestions.length) * 100);

  const activeSection = sectionsByLevel.get(activeLevel);
  const activeLevelPassed = isLevelPassed(activeLevel);

  if (completed) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={26} className="text-emerald-500" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Module Complete!</h3>
        <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">
          You finished all three Skill-Gate levels for <span className="font-medium">{activity.title}</span> and
          earned <span className="font-semibold text-flow-600">+{activity.xpReward} XP</span>.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-center gap-2 mb-5">
        {LEVEL_ORDER.map((level) => {
          const section = sectionsByLevel.get(level);
          if (!section) return null;
          const unlocked = isLevelUnlocked(level);
          const passed = isLevelPassed(level);
          const active = activeLevel === level;

          return (
            <button
              key={level}
              disabled={!unlocked}
              onClick={() => unlocked && setActiveLevel(level)}
              className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "border-flow-500 bg-flow-400/10 text-flow-700"
                  : unlocked
                    ? "border-slate-200 text-slate-600 hover:border-slate-300"
                    : "border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed"
              }`}
            >
              {unlocked ? <Unlock size={14} /> : <Lock size={14} />}
              {section.label}
              <span
                className={`ml-1 text-[10px] font-semibold uppercase rounded-full px-1.5 py-0.5 ${
                  passed
                    ? "bg-emerald-100 text-emerald-600"
                    : unlocked
                      ? "bg-flow-400/20 text-flow-700"
                      : "bg-slate-200 text-slate-400"
                }`}
              >
                {passed ? "Done" : unlocked ? "Open" : "Locked"}
              </span>
            </button>
          );
        })}
      </div>

      {activeSection && (
        <>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-slate-900">{activeSection.label} Comprehension</h3>
              <p className="text-sm text-slate-500 mt-1">{activeSection.description}</p>
            </div>
            <span className="text-xs font-medium rounded-full bg-slate-100 text-slate-600 px-3 py-1 shrink-0">
              {activeSection.questions.length} questions
            </span>
          </div>

          <div className="space-y-6">
            {activeSection.questions.map((q, qi) => {
              const answer = answers[q.id];
              return (
                <div key={q.id} className="border-t border-slate-100 pt-5 first:border-t-0 first:pt-0">
                  <p className="text-xs font-semibold tracking-wide text-flow-600 uppercase mb-1.5">
                    Question {qi + 1} &middot; {activeSection.label}
                  </p>
                  <p className="text-sm font-medium text-slate-900 mb-3">{q.prompt}</p>

                  <div className="space-y-2">
                    {q.options.map((opt, oi) => {
                      const isSelected = answer?.selected === oi;
                      const showAsCorrect = answer && oi === q.correctIndex && answer.correct;
                      const showAsWrong = isSelected && answer && !answer.correct;

                      return (
                        <button
                          key={oi}
                          onClick={() => handleSelect(q.id, oi, q.correctIndex)}
                          className={`w-full text-left rounded-lg border px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${
                            showAsCorrect
                              ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                              : showAsWrong
                                ? "border-red-300 bg-red-50 text-red-700"
                                : "border-slate-200 text-slate-700 hover:border-flow-400 hover:bg-flow-400/5"
                          }`}
                        >
                          {opt}
                          {showAsCorrect && <CheckCircle2 size={16} />}
                          {showAsWrong && <XCircle size={16} />}
                        </button>
                      );
                    })}
                  </div>

                  {answer && !answer.correct && (
                    <p className="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mt-2">
                      Hint: {q.scaffold}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <p className="text-xs text-slate-500">
              Overall score: <span className="font-semibold text-slate-700">{overallPercent}%</span>
            </p>
            <button
              onClick={handleContinue}
              disabled={!activeLevelPassed}
              className="rounded-lg bg-flow-500 text-white text-sm font-semibold px-6 py-2.5 hover:bg-flow-600 transition-colors disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
            >
              {activeLevel === "critical" ? "Finish Module" : "Continue to Next Level"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}