import { ClipboardEvent, FormEvent, KeyboardEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

const CODE_LENGTH = 4;

export default function VerificationPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [error, setError] = useState("");
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  function updateDigit(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const nextCode = [...code];
    nextCode[index] = digit;
    setCode(nextCode);
    if (error) setError("");

    if (digit && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      return;
    }

    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowRight" && index < CODE_LENGTH - 1) {
      event.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    const pastedDigits = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, CODE_LENGTH);

    if (!pastedDigits) return;

    event.preventDefault();
    const nextCode = Array(CODE_LENGTH).fill("");
    pastedDigits.split("").forEach((digit, index) => {
      nextCode[index] = digit;
    });
    setCode(nextCode);
    setError("");
    inputRefs.current[Math.min(pastedDigits.length, CODE_LENGTH) - 1]?.focus();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (code.some((digit) => !digit)) {
      setError("Please enter all four digits.");
      return;
    }

    setError("");
    navigate("/reset-password");
  }

  function handleResend() {
    setCode(Array(CODE_LENGTH).fill(""));
    setError("");
    inputRefs.current[0]?.focus();
  }

  return (
    <AuthLayout title="Verification" subtitle="Enter verification code">
      <form className="auth-form auth-verification-form" onSubmit={handleSubmit} noValidate>
        <div className="auth-otp-group" role="group" aria-label="Four-digit verification code">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(element) => {
                inputRefs.current[index] = element;
              }}
              className="auth-otp-input"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              aria-label={`Verification digit ${index + 1}`}
              autoComplete={index === 0 ? "one-time-code" : "off"}
              onChange={(event) => updateDigit(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              onPaste={handlePaste}
            />
          ))}
        </div>

        {error && (
          <p className="auth-error auth-otp-error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="auth-submit">
          Next
        </button>

        <p className="auth-footer-link">
          Didn&apos;t get a code?{" "}
          <button type="button" className="auth-inline-button" onClick={handleResend}>
            Resend
          </button>
        </p>
      </form>
    </AuthLayout>
  );
}
