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

    // TODO: replace with real account creation call (e.g. Supabase auth)
    console.log("Creating account:", { fullName, email, password, role });
    navigate("/login");
  }

  return (
    <AuthLayout title="Create Your Account" subtitle="Join ReadFlow and start learning today">
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          id="fullName"
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          autoComplete="name"
        />

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
          placeholder="Create a strong password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />

        <TextField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
        />

        <div className="mb-5">
          <label htmlFor="role" className="block text-sm font-medium text-slate-800 mb-1.5">
            Role
          </label>
          <div className="relative">
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full appearance-none rounded-lg border border-slate-700 px-4 py-2.5 pr-10 text-sm
                         text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-flow-500/30
                         focus:border-flow-500 transition-colors"
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
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500"
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-lg bg-ink-900 py-3 text-sm font-semibold text-white
                     hover:bg-ink-800 transition-colors mt-2"
        >
          Sign-Up
        </button>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="text-flow-600 font-medium hover:underline">
            Log In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
