import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DiagnosticLayout from "../components/DiagnosticLayout";
import { diagnosticQuestions } from "../data/diagnosticData";
import {
  createDiagnosticResult,
  type DiagnosticAnswers,
} from "../services/diagnosticScoring";
import "./DiagnosticQuestionsPage.css";

export default function DiagnosticQuestionsPage() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<DiagnosticAnswers>({});

  const totalQuestions = diagnosticQuestions.length;
  const currentQuestion = diagnosticQuestions[currentQuestionIndex];
  const selectedChoiceId = currentQuestion
    ? answers[currentQuestion.id]
    : undefined;
  const isFinalQuestion = currentQuestionIndex === totalQuestions - 1;

  if (!currentQuestion) {
    return (
      <DiagnosticLayout
        className="diagnostic-questions-panel"
        labelledBy="diagnostic-questions-title"
      >
        <h1 id="diagnostic-questions-title">Answer the Questions</h1>
        <p>No diagnostic questions are available yet.</p>
      </DiagnosticLayout>
    );
  }

  function selectAnswer(choiceId: string) {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [currentQuestion.id]: choiceId,
    }));
  }

  function continueAssessment() {
    if (!selectedChoiceId) return;

    if (!isFinalQuestion) {
      setCurrentQuestionIndex((index) => index + 1);
      return;
    }

    const result = createDiagnosticResult(answers, diagnosticQuestions);
    navigate("/diagnostic/result", { state: { result } });
  }

  return (
    <DiagnosticLayout
      className="diagnostic-questions-panel"
      labelledBy="diagnostic-questions-title"
    >
      <header className="diagnostic-questions-header">
        <h1 id="diagnostic-questions-title">Answer the Questions</h1>
        <p>Choose the best answer. Take your time!</p>
      </header>

      <section
        className="diagnostic-question-card"
        aria-labelledby="diagnostic-question-prompt"
      >
        <p className="diagnostic-question-counter">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </p>
        <h2 id="diagnostic-question-prompt">{currentQuestion.prompt}</h2>

        <fieldset className="diagnostic-answer-list">
          <legend className="diagnostic-visually-hidden">
            Select one answer
          </legend>
          {currentQuestion.choices.map((choice) => (
            <label
              className={`diagnostic-answer${
                selectedChoiceId === choice.id
                  ? " diagnostic-answer--selected"
                  : ""
              }`}
              key={choice.id}
            >
              <input
                type="radio"
                name={currentQuestion.id}
                value={choice.id}
                checked={selectedChoiceId === choice.id}
                onChange={() => selectAnswer(choice.id)}
              />
              <span className="diagnostic-answer-indicator" aria-hidden="true" />
              <span>{choice.label}</span>
            </label>
          ))}
        </fieldset>
      </section>

      <div className="diagnostic-question-actions">
        <button
          className="diagnostic-primary-button"
          type="button"
          disabled={!selectedChoiceId}
          onClick={continueAssessment}
        >
          {isFinalQuestion ? "View Result" : "Next"}
        </button>
      </div>
    </DiagnosticLayout>
  );
}
