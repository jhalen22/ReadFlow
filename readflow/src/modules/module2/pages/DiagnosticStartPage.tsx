import { useNavigate } from "react-router-dom";
import mascot from "../../../assets/mascot.png";
import { setActiveDiagnosticStatus } from "../../../utils/diagnosticOnboarding";
import DiagnosticLayout from "../components/DiagnosticLayout";
import "./DiagnosticStartPage.css";

export default function DiagnosticStartPage() {
  const navigate = useNavigate();

  function startAssessment() {
    setActiveDiagnosticStatus("in_progress");
    navigate("/diagnostic/reading");
  }

  return (
    <DiagnosticLayout
      className="diagnostic-start-panel"
      labelledBy="diagnostic-start-title"
    >
      <img
        className="diagnostic-start-mascot"
        src={mascot}
        alt="ReadFlow mascot"
      />

      <div className="diagnostic-start-content">
        <h1 id="diagnostic-start-title">
          Let&rsquo;s Find Your Reading Level!
        </h1>

        <p className="diagnostic-start-description">
          Read a short story aloud and answer a few questions.
          <br />
          Just do your best and have fun!
        </p>

        <button
          className="diagnostic-primary-button"
          type="button"
          onClick={startAssessment}
        >
          Start Assessment
        </button>

        <p className="diagnostic-start-note">It only takes a few minutes.</p>
      </div>
    </DiagnosticLayout>
  );
}
