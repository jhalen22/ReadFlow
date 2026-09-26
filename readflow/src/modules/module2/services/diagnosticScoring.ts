import type { Difficulty, ReadingLevel } from "../../../data/dashboardData";
import type { DiagnosticQuestion } from "../data/diagnosticData";
import type { DiagnosticResult } from "../types/diagnostic";

export type DiagnosticAnswers = Record<string, string>;

export function calculateComprehensionScore(
  answers: DiagnosticAnswers,
  questions: readonly DiagnosticQuestion[],
) {
  if (questions.length === 0) return undefined;

  const correctAnswers = questions.filter(
    (question) => answers[question.id] === question.correctChoiceId,
  ).length;

  return Math.round((correctAnswers / questions.length) * 100);
}

export function assignDifficultyTier(readingLevel: ReadingLevel): Difficulty {
  const difficultyByLevel: Record<ReadingLevel, Difficulty> = {
    Frustration: "Easy",
    Instructional: "Medium",
    Independent: "Hard",
  };

  return difficultyByLevel[readingLevel];
}

export function createDiagnosticResult(
  answers: DiagnosticAnswers,
  questions: readonly DiagnosticQuestion[],
): DiagnosticResult {
  return {
    comprehension_score: calculateComprehensionScore(answers, questions),
  };
}

export function hasValidDiagnosticPlacement(result?: DiagnosticResult) {
  return Boolean(
    result?.reading_level &&
      result.difficulty_tier &&
      Number.isFinite(result.orv_score) &&
      Number.isFinite(result.comprehension_score),
  );
}

// Reading-level thresholds intentionally do not live here yet. Add a
// classifier only after the approved Phil-IRI/ORV thresholds are available.
