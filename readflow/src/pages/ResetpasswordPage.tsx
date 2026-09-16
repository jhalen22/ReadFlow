import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout.tsx";
import TextField from "../components/TextField.tsx";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!password || !confirmPassword) {
      setError("Please fill in both fields.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // TODO: replace with a real "reset password" API call
    console.log("Resetting password");
    navigate("/login");
  }

  return (
    <AuthLayout title="Reset Password" backTo="/" backLabel="Back to Home">
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          id="newPassword"
          label="Enter New Password"
          type="password"
          placeholder="Enter your new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />

        <TextField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
        />

        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-lg bg-ink-900 py-3 text-sm font-semibold text-white
                     hover:bg-ink-800 transition-colors mt-2"
        >
          Save
        </button>
      </form>
    </AuthLayout>
  );
}