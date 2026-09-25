import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import AuthLayout from "../components/AuthLayout.tsx";
import TextField from "../components/TextField.tsx";

const ROLES = ["Student", "Teacher", "General User"];

export default function SignupPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!fullName || !email || !password || !confirmPassword || !role) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Frontend prototype: account creation will be connected later.
    navigate("/login");
  }

  return (
    <AuthLayout title="Create Your Account" subtitle="Join and start learning today">
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <TextField
          id="fullName"
          label="Full Name"
          type="text"
          placeholder="Enter your Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          autoComplete="name"
        />

        <TextField
          id="email"
          label="Email Address"
          type="email"
          placeholder="Enter Email"
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
          autoComplete="new-password"
          showPasswordToggle
        />

        <TextField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
          showPasswordToggle
        />

        <div className="auth-field">
          <label htmlFor="role">Role</label>
          <div className="auth-select-wrapper">
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="auth-input auth-select"
            >
              <option value="" disabled>
                Select your role
              </option>
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="auth-select-icon"
              aria-hidden="true"
            />
          </div>
        </div>

        {error && (
          <p className="auth-error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="auth-submit">
          Sign Up
        </button>

        <p className="auth-footer-link">
          Already have an account?{" "}
          <Link to="/login" className="auth-text-link">
            Log In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
