import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout.tsx";
import TextField from "../components/TextField.tsx";

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

    // TODO: replace with real authentication call (e.g. Supabase auth)
    console.log("Logging in with:", { email, password });
    navigate("/");
  }

  return (
    <AuthLayout title="Welcome Back" subtitle="Log in to continue your learning journey">
      <form onSubmit={handleSubmit} noValidate>
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
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        {error && <p className="text-sm text-red-600 -mt-2 mb-4">{error}</p>}

        <div className="flex justify-end mb-6">
          <Link to="/forgot-password" className="text-sm text-flow-600 hover:underline">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-ink-900 py-3 text-sm font-semibold text-white
                     hover:bg-ink-800 transition-colors"
        >
          Log In
        </button>

        <p className="mt-6 text-center text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-flow-600 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
