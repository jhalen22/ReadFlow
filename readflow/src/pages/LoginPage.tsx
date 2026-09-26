import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout.tsx";
import TextField from "../components/TextField.tsx";
import {
  getDiagnosticStatus,
  getTemporaryUserRole,
  normalizeDiagnosticEmail,
  requiresDiagnostic,
  setActiveDiagnosticLearner,
} from "../utils/diagnosticOnboarding.ts";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    const normalizedEmail = normalizeDiagnosticEmail(email);

    // Frontend prototype: replace these lookups with the authenticated user's
    // role and `diagnostic_completed` database field later.
    const role = getTemporaryUserRole(normalizedEmail);

    if (!requiresDiagnostic(role)) {
      setActiveDiagnosticLearner(null);
      navigate("/dashboard");
      return;
    }

    setActiveDiagnosticLearner(normalizedEmail);
    const diagnosticStatus = getDiagnosticStatus(normalizedEmail);
    navigate(diagnosticStatus === "completed" ? "/dashboard" : "/diagnostic");
  }

  return (
    <AuthLayout title="Welcome Back!" subtitle="Log in to continue your learning journey">
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <TextField
          id="email"
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        <TextField
          id="password"
          label="Password"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          showPasswordToggle
        />

        {error && (
          <p className="auth-error" role="alert">
            {error}
          </p>
        )}

        <div className="auth-forgot-row">
          <Link to="/forgot-password" className="auth-text-link">
            Forgot password?
          </Link>
        </div>

        <button type="submit" className="auth-submit">
          Log In
        </button>

        <p className="auth-footer-link">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="auth-text-link">
            Sign Up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
