import { BookOpen, Gauge, Mic, Timer } from "lucide-react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mascot from "../../../assets/mascot.png";
import { setActiveDiagnosticStatus } from "../../../utils/diagnosticOnboarding";
import DiagnosticLayout from "../components/DiagnosticLayout";
import { hasValidDiagnosticPlacement } from "../services/diagnosticScoring";
import type { DiagnosticResultRouteState } from "../types/diagnostic";
import "./DiagnosticResultPage.css";

function displayNumber(value: number | undefined, suffix = "") {
  return Number.isFinite(value) ? `${value}${suffix}` : "—";
}

export default function DiagnosticResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { result } = (location.state ?? {}) as DiagnosticResultRouteState;
  const placementIsValid = hasValidDiagnosticPlacement(result);

  useEffect(() => {
    if (placementIsValid) {
      setActiveDiagnosticStatus("completed");
    }
  }, [placementIsValid]);

  const cards = [
    {
      label: "Reading Level",
      value: result?.reading_level ?? "—",
      icon: BookOpen,
      tone: "green",
    },
    {
      label: "Assigned Difficulty",
      value: result?.difficulty_tier ?? "—",
      icon: Gauge,
      tone: "yellow",
    },
    {
      label: "Reading Speed",
      value: displayNumber(result?.readingSpeedWpm, " WPM"),
      icon: Timer,
      tone: "blue",
    },
    {
      label: "Pronunciation",
      value: displayNumber(result?.pronunciationAccuracy, "%"),
      icon: Mic,
      tone: "coral",
    },
  ] as const;

  return (
    <DiagnosticLayout
      className="diagnostic-result-panel"
      labelledBy="diagnostic-result-title"
    >
      <h1 id="diagnostic-result-title">Your Reading Result</h1>

      <div className="diagnostic-result-layout">
        <div className="diagnostic-result-mascot-wrap">
          <img src={mascot} alt="Happy ReadFlow mascot" />
          {Number.isFinite(result?.comprehension_score) && (
            <p>
              Comprehension score: <strong>{result?.comprehension_score}%</strong>
            </p>
          )}
        </div>

        <div className="diagnostic-result-grid">
          {cards.map(({ label, value, icon: Icon, tone }) => (
            <article
              className={`diagnostic-result-card diagnostic-result-card--${tone}`}
              key={label}
            >
              <Icon size={28} strokeWidth={2.25} aria-hidden="true" />
              <p>{label}</p>
              <strong>{value}</strong>
            </article>
          ))}
        </div>
      </div>

      {!placementIsValid && (
        <p className="diagnostic-result-pending" role="status">
          Reading-level placement is pending approved ORV scoring and
          speech-to-text assessment.
        </p>
      )}

      <div className="diagnostic-result-actions">
        <button
          className="diagnostic-primary-button"
          type="button"
          onClick={() => navigate("/dashboard")}
        >
          Go to homepage
        </button>
      </div>
    </DiagnosticLayout>
  );
}
