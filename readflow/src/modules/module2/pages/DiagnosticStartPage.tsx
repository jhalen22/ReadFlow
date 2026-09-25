import { useNavigate } from "react-router-dom";
import "./DiagnosticStartPage.css";

export default function DiagnosticStartPage() {
  const navigate = useNavigate();

  return (
    <div className="diagnostic-page">
      <main className="diagnostic-card">

        <div className="shape-yellow"></div>
        <div className="shape-blue"></div>

        <section className="diagnostic-content">

          <span className="assessment-label">
            📚 Diagnostic Assessment
          </span>

          <h1>
            Let’s Find Your
            <br />
            Reading Level!
          </h1>

          <p className="description">
            You’ll read a short story aloud and answer a few questions.
            Just do your best!
          </p>

          <button
            className="start-btn"
            onClick={() => navigate("/diagnostic/reading")}
          >
            Start Assessment →
          </button>

          <div className="progress">
            <div className="progress-step active"></div>
            <div className="progress-step"></div>
            <div className="progress-step"></div>
            <div className="progress-step"></div>
          </div>

          <p className="progress-text">
            Step 1 of 4 • Get Ready
          </p>

        </section>

      </main>
    </div>
  );
}
