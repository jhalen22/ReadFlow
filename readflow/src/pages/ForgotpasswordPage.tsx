import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout.tsx";
import TextField from "../components/TextField.tsx";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    // TODO: replace with a real "send OTP" API call
    console.log("Sending OTP to:", email);
    navigate("/verification", { state: { email } });
  }

  return (
    <AuthLayout title="Forgot Password" backTo="/login" backLabel="Back to Login">
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          id="email"
          label="Enter your email address"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        {error && <p className="text-sm text-red-600 -mt-2 mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-lg bg-ink-900 py-3 text-sm font-semibold text-white
                     hover:bg-ink-800 transition-colors mt-2"
        >
          Send OTP
        </button>
      </form>
    </AuthLayout>
  );
}
