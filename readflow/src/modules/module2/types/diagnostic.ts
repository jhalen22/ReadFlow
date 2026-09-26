import type { Difficulty, ReadingLevel } from "../../../data/dashboardData";

/**
 * Frontend representation of the future Diagnostic_Result record.
 * Optional values stay unavailable until a real scoring/STT source provides them.
 */
export interface DiagnosticResult {
  orv_score?: number;
  comprehension_score?: number;
  reading_level?: ReadingLevel;
  difficulty_tier?: Difficulty;
  readingSpeedWpm?: number;
  pronunciationAccuracy?: number;
}

export interface DiagnosticResultRouteState {
  result?: DiagnosticResult;
}
