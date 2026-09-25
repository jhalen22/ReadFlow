import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Lock, CheckCircle2, Circle } from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout.tsx";
import { getActivity } from "../../data/activityData";
import ActivityStepper, { type ActivityStep } from "./ActivityStepper.tsx";
import ReadingPassageStep from "./steps/ReadingPassageStep.tsx";
import ReadAloudStep from "./steps/ReadAloudStep.tsx";
import TranscriptReviewStep from "./steps/TranscriptReviewStep.tsx";
import ComprehensionQuizStep from "./steps/ComprehensionQuizStep.tsx";

const STEP_ORDER: ActivityStep[] = ["passage", "readAloud", "transcript", "quiz"];
const STEP_LABELS: Record<ActivityStep, string> = {
  passage: "Reading Passage",
  readAloud: "Read Aloud",
  transcript: "Transcript Review",
  quiz: "Comprehension Quiz",
};

export default function ReadingActivityPage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const activity = moduleId ? getActivity(moduleId) : undefined;

  const [step, setStep] = useState<ActivityStep>("passage");
  const [quizStarted, setQuizStarted] = useState(false);

  if (!activity) {
    return (
      <DashboardLayout breadcrumb={["Reading Activity"]} backLink={{ label: "My Materials", to: "/dashboard/materials" }}>
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center max-w-md mx-auto">
          <Lock size={26} className="text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-900">This module isn't ready yet</h3>
          <p className="text-sm text-slate-500 mt-2">
            Its content is still being prepared. Head back to My Materials to pick another module.
          </p>
          <Link
            to="/dashboard/materials"
            className="inline-block mt-5 rounded-lg bg-ink-900 text-white text-sm font-semibold px-5 py-2.5 hover:bg-ink-800 transition-colors"
          >
            Back to My Materials
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const stepIndex = STEP_ORDER.indexOf(step);
  const overallCompletion = Math.round((stepIndex / STEP_ORDER.length) * 100 + (quizStarted ? 25 : 0));

  return (
    <DashboardLayout
      breadcrumb={["Reading Activity", activity.title]}
      backLink={{ label: "My Materials", to: "/dashboard/materials" }}
    >
      <div className="flex items-center justify-between flex-wrap gap-3 mb-1">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-slate-900">{activity.title}</h2>
          <span className="text-xs font-medium rounded-full bg-slate-100 text-slate-600 px-2.5 py-1">
            {activity.language}
          </span>
        </div>
        <span className="text-xs font-medium rounded-full bg-flow-400/10 text-flow-600 px-2.5 py-1">
          +{activity.xpReward} XP
        </span>
      </div>
      <p className="text-sm text-slate-500 mb-5">
        {activity.difficulty} &middot; ~{activity.estMinutes} min &middot; {activity.questionCount} questions
      </p>

      <ActivityStepper current={step} />

      {(() => {
        const stepContent = (
          <>
            {step === "passage" && <ReadingPassageStep activity={activity} onDone={() => setStep("readAloud")} />}
            {step === "readAloud" && (
              <ReadAloudStep activity={activity} onBack={() => setStep("passage")} onDone={() => setStep("transcript")} />
            )}
            {step === "transcript" && (
              <TranscriptReviewStep
                activity={activity}
                onReRecord={() => setStep("readAloud")}
                onDone={() => {
                  setQuizStarted(true);
                  setStep("quiz");
                }}
              />
            )}
            {step === "quiz" && <ComprehensionQuizStep activity={activity} onComplete={() => {}} />}
          </>
        );

        if (step === "readAloud") {
          return stepContent;
        }

        return (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">{stepContent}</div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-slate-900">Activity Progress</h3>
                  <span className="text-xs font-medium text-slate-500">{overallCompletion}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 mt-3 mb-4">
                  <div className="h-2 rounded-full bg-flow-500 transition-all" style={{ width: `${overallCompletion}%` }} />
                </div>
                <ul className="space-y-2.5">
                  {STEP_ORDER.map((s, i) => {
                    const done = i < stepIndex || (s === "quiz" && quizStarted && step === "quiz");
                    const isCurrent = s === step;
                    return (
                      <li key={s} className="flex items-center gap-2.5 text-sm">
                        {i < stepIndex ? (
                          <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                        ) : (
                          <Circle size={16} className={`shrink-0 ${isCurrent ? "text-flow-500" : "text-slate-300"}`} />
                        )}
                        <span className={isCurrent ? "font-medium text-flow-700" : done ? "text-slate-700" : "text-slate-400"}>
                          {STEP_LABELS[s]}
                        </span>
                        {isCurrent && <span className="ml-auto text-xs text-flow-500 font-medium">Now</span>}
                      </li>
                    );
                  })}
                </ul>
              </div>

              {step === "passage" && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="text-sm font-semibold text-slate-900 mb-4">Module Details</h3>
                  <dl className="space-y-2.5 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-slate-500">Difficulty</dt>
                      <dd className="font-medium text-slate-800">{activity.difficulty}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-slate-500">Questions</dt>
                      <dd className="font-medium text-slate-800">{activity.questionCount} total</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-slate-500">Est. Time</dt>
                      <dd className="font-medium text-slate-800">~{activity.estMinutes} min</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-slate-500">XP Reward</dt>
                      <dd className="font-medium text-slate-800">+{activity.xpReward} XP</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-slate-500">Reading Level</dt>
                      <dd className="font-medium text-slate-800">{activity.readingLevel}</dd>
                    </div>
                  </dl>
                </div>
              )}

              {step === "quiz" && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="text-sm font-semibold text-slate-900 mb-4">Session Summary</h3>
                  <dl className="space-y-2.5 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-slate-500">Oral Accuracy</dt>
                      <dd className="font-medium text-slate-800">{activity.transcript.oralAccuracy}%</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-slate-500">Difficulty</dt>
                      <dd className="font-medium text-slate-800">{activity.difficulty}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-slate-500">XP Reward</dt>
                      <dd className="font-medium text-slate-800">+{activity.xpReward} XP</dd>
                    </div>
                  </dl>
                </div>
              )}
            </div>
          </div>
        );
      })()}
    </DashboardLayout>
  );
}