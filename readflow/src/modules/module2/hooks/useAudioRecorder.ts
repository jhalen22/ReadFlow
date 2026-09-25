import { useEffect, useRef, useState } from "react";

const INITIAL_MESSAGE = "Press the microphone button when you're ready.";

export function useAudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [isStopping, setIsStopping] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [message, setMessage] = useState(INITIAL_MESSAGE);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const mountedRef = useRef(false);
  const startingRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      const recorder = mediaRecorderRef.current;

      if (recorder) {
        recorder.ondataavailable = null;
        recorder.onstop = null;
        recorder.onerror = null;
        if (recorder.state !== "inactive") recorder.stop();
      }

      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  useEffect(() => {
    return () => {
      if (audioURL) URL.revokeObjectURL(audioURL);
    };
  }, [audioURL]);

  const startRecording = async () => {
    if (startingRef.current || mediaRecorderRef.current) return;

    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setMessage("Audio recording is unavailable. Use a supported browser on HTTPS or localhost.");
      return;
    }

    startingRef.current = true;
    setIsStarting(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      if (!mountedRef.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      streamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];
      let failed = false;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      recorder.onerror = () => {
        failed = true;
        recorder.ondataavailable = null;
        recorder.onstop = null;
        recorder.onerror = null;
        if (recorder.state !== "inactive") recorder.stop();
        stream.getTracks().forEach((track) => track.stop());
        mediaRecorderRef.current = null;
        streamRef.current = null;
        setIsRecording(false);
        setIsStopping(false);
        setMessage("Recording failed. Please try again.");
      };

      recorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        mediaRecorderRef.current = null;
        streamRef.current = null;
        setIsRecording(false);
        setIsStopping(false);

        if (failed) return;

        if (audioChunksRef.current.length === 0) {
          setMessage("No audio was captured. Please try again.");
          return;
        }

        const audio = new Blob(audioChunksRef.current, { type: recorder.mimeType });
        setAudioURL(URL.createObjectURL(audio));
        setMessage("Recording complete. You can listen to your reading below.");
      };

      recorder.start();
      setAudioURL(null);
      setIsRecording(true);
      setMessage("Recording... Read aloud, then press Stop recording.");
    } catch (error) {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      mediaRecorderRef.current = null;

      if (mountedRef.current) {
        setIsRecording(false);
        const name = error instanceof Error ? error.name : "";
        setMessage(
          name === "NotAllowedError"
            ? "Microphone access was denied. Allow microphone access in your browser's site settings, then try again."
            : name === "NotFoundError"
              ? "No microphone was found. Connect a microphone, then try again."
              : "Could not start recording. Check that your microphone is connected and not in use by another app, then try again.",
        );
      }
    } finally {
      startingRef.current = false;
      if (mountedRef.current) setIsStarting(false);
    }
  };

  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;

    if (recorder && recorder.state !== "inactive") {
      setIsStopping(true);
      setMessage("Finishing your recording...");
      recorder.stop();
    }
  };

  return {
    audioURL,
    isRecording,
    isStarting,
    isStopping,
    message,
    startRecording,
    stopRecording,
  };
}
