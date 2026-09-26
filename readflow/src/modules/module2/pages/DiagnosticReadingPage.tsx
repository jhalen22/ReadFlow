import { Mic, Square } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DiagnosticLayout from "../components/DiagnosticLayout";
import { diagnosticPassage } from "../data/diagnosticData";
import { useAudioRecorder } from "../hooks/useAudioRecorder";
import "./DiagnosticReadingPage.css";

export default function DiagnosticReadingPage() {
  const navigate = useNavigate();
  const {
    audioURL,
    isRecording,
    isStarting,
    isStopping,
    message,
    startRecording,
    stopRecording,
  } = useAudioRecorder();

  const recordingBusy = isStarting || isStopping;

  return (
    <DiagnosticLayout
      className="diagnostic-reading-panel"
      labelledBy="diagnostic-reading-title"
    >
      <header className="diagnostic-reading-header">
        <h1 id="diagnostic-reading-title">Read the Story Aloud</h1>

        <p>
          Read the story below. When you're ready, press the microphone button
          and begin reading.
        </p>
      </header>

      <article className="diagnostic-story-card">
        <h2>{diagnosticPassage.title}</h2>
        {diagnosticPassage.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </article>

      <div className="diagnostic-recording-controls">
        <button
          className={`diagnostic-primary-button diagnostic-record-button${
            isRecording ? " diagnostic-record-button--active" : ""
          }`}
          type="button"
          disabled={recordingBusy}
          onClick={isRecording ? stopRecording : startRecording}
        >
          {isRecording ? (
            <Square size={19} fill="currentColor" aria-hidden="true" />
          ) : (
            <Mic size={21} aria-hidden="true" />
          )}
          {isStarting
            ? "Opening microphone..."
            : isStopping
              ? "Finishing recording..."
              : isRecording
                ? "Stop recording"
                : "Start recording"}
        </button>

        <p className="diagnostic-recording-status" role="status" aria-live="polite">
          {message}
        </p>

        {audioURL && (
          <div className="diagnostic-recording-review">
            <audio controls src={audioURL} aria-label="Your reading recording" />
            <button
              className="diagnostic-primary-button"
              type="button"
              onClick={() => navigate("/diagnostic/questions")}
            >
              Continue to Questions
            </button>
          </div>
        )}
      </div>
    </DiagnosticLayout>
  );
}
