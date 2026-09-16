import { ClipboardEvent, KeyboardEvent, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout.tsx";

const CODE_LENGTH = 4;

export default function VerificationPage() {
  const navigate = useNavigate();
  const location = useLocation() as { state?: { email?: string } };
  const email = location.state?.email;

  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  function updateDigit(index: number, value: string) {
    const char = value.replace(/[^0-9]/g, "").slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = char;
      return next;
    });
    if (char && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, CODE_LENGTH);
    if (!pasted) return;
    const next = Array(CODE_LENGTH).fill("");
    pasted.split("").forEach((char, i) => (next[i] = char));
    setDigits(next);
    inputRefs.current[Math.min(pasted.length, CODE_LENGTH - 1)]?.focus();
  }

  function handleSubmit() {
    const code = digits.join("");
    setError("");

    if (code.length < CODE_LENGTH) {
      setError("Please enter the full verification code.");
      return;
    }

    // TODO: replace with a real "verify OTP" API call
    console.log("Verifying code:", code, "for", email);
    navigate("/reset-password", { state: { email } });
  }

  return (
    <AuthLayout title="Verification" backTo="/login" backLabel="Back to Login">
      <div>
        <label className="block text-sm font-medium text-slate-800 mb-3">
          Enter verification code
          {email && <span className="block text-xs font-normal text-slate-500 mt-1">Sent to {email}</span>}
        </label>

        <div className="flex items-center gap-3 mb-2">
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              value={digit}
              onChange={(e) => updateDigit(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              inputMode="numeric"
              maxLength={1}
              className="w-16 h-16 text-center text-xl font-semibold rounded-lg border border-slate-300 text-slate-900
                         focus:outline-none focus:ring-2 focus:ring-flow-500/30 focus:border-flow-500 transition-colors"
            />
          ))}
        </div>

        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full rounded-lg bg-ink-900 py-3 text-sm font-semibold text-white
                     hover:bg-ink-800 transition-colors mt-4"
        >
          Next
        </button>

        <p className="mt-5 text-center text-sm text-slate-500">
          Didn&apos;t get a code?{" "}
          <button
            type="button"
            onClick={() => console.log("Resending OTP to:", email)}
            className="text-flow-600 font-medium hover:underline"
          >
            Resend
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}