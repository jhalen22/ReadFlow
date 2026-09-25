import { useAudioRecorder } from "../hooks/useAudioRecorder";
import "./DiagnosticReadingPage.css";

export default function DiagnosticReadingPage() {
  const {
    audioURL,
    isRecording,
    isStarting,
    isStopping,
    message,
    startRecording,
    stopRecording,
  } = useAudioRecorder();

  return (
    <main className="reading-page">
      <section className="reading-card" aria-label="Diagnostic reading">
        <h1>Read the Story Aloud</h1>

        <p className="instruction">
          Read the story below. When you're ready, press the microphone button
          and begin reading.
        </p>

        <div className="story-box">
          <h2>The Lost Kite</h2>

          <p>
            Mia went to the park with her red kite. The wind was strong,
            and the kite flew high in the sky. Mia smiled as she held
            the string tightly.
          </p>

          <p>
            Suddenly, the string slipped from her hand. The kite flew
            over the trees and disappeared.
          </p>

          <p>
            Mia looked around and saw a boy holding the red kite near
            the playground. He gave it back to her, and Mia thanked him.
            She held the string more carefully and continued flying her kite.
          </p>
        </div>
        <p role="status">{message}</p>
        <button
          className="record-button"
          type="button"
          disabled={isStarting || isStopping}
          onClick={isRecording ? stopRecording : startRecording}
        >
          {isStarting
            ? "Opening microphone..."
            : isStopping
              ? "Finishing recording..."
              : isRecording
                ? "Stop recording"
                : "Start recording"}
        </button>
        {audioURL && (
          <audio controls src={audioURL} aria-label="Your reading recording" />
        )}
      </section>
    </main>
  );
}
