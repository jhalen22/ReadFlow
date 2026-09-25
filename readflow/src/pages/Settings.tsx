import { FormEvent, useMemo, useState } from "react";
import { Eye, EyeOff, Check, Save } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout.tsx";
import TextField from "../components/TextField.tsx";
import { student } from "../data/dashboardData";

interface PasswordCheck {
  label: string;
  test: (value: string) => boolean;
}

const PASSWORD_CHECKS: PasswordCheck[] = [
  { label: "8+ characters", test: (v) => v.length >= 8 },
  { label: "Lowercase letter", test: (v) => /[a-z]/.test(v) },
  { label: "Uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { label: "Contains number", test: (v) => /[0-9]/.test(v) },
  { label: "Special character", test: (v) => /[^A-Za-z0-9]/.test(v) },
];

function passwordStrengthLabel(passed: number, total: number) {
  if (passed === 0) return "No password";
  if (passed < total / 2) return "Weak";
  if (passed < total) return "Good";
  return "Strong";
}

export default function Settings() {
  const [email, setEmail] = useState(student.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fullName, setFullName] = useState(student.fullName);
  const [school, setSchool] = useState(student.school);
  const [gradeSection, setGradeSection] = useState(student.gradeSection);

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const passedChecks = useMemo(() => PASSWORD_CHECKS.filter((c) => c.test(password)).length, [password]);
  const strengthLabel = passwordStrengthLabel(passedChecks, PASSWORD_CHECKS.length);

  function handleSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (password && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password && passedChecks < PASSWORD_CHECKS.length) {
      setError("Please satisfy all password requirements, or leave the password fields blank.");
      return;
    }

    // TODO: replace with a real PATCH /users/:id call (multipart if a new photo was selected)
    console.log("Saving profile:", { email, password: password ? "(changed)" : "(unchanged)", fullName, school, gradeSection });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function handleCancel() {
    setEmail(student.email);
    setPassword("");
    setConfirmPassword("");
    setFullName(student.fullName);
    setSchool(student.school);
    setGradeSection(student.gradeSection);
    setError("");
  }

  return (
    <DashboardLayout breadcrumb={["Dashboard", "Settings"]} backLink={{ label: "Dashboard", to: "/dashboard" }}>
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Edit Profile</h2>

        <form onSubmit={handleSave} className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          {/* Account Information */}
          <h3 className="text-base font-semibold text-slate-900 mb-4">Account Information</h3>

          <TextField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="mb-2">
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="password" className="block text-sm font-medium text-slate-800">
                Password <span className="text-slate-400 font-normal">(leave blank if unchanged)</span>
              </label>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New password"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 pr-11 text-sm text-slate-900 placeholder-slate-400
                           focus:outline-none focus:ring-2 focus:ring-flow-500/30 focus:border-flow-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end mb-2">
            <span className="text-xs font-medium text-slate-400">{strengthLabel}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5 mb-5">
            {PASSWORD_CHECKS.map((check) => {
              const passed = check.test(password);
              return (
                <div key={check.label} className="flex items-center gap-1.5">
                  <span
                    className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center shrink-0 ${
                      passed ? "bg-emerald-500 border-emerald-500" : "border-slate-300"
                    }`}
                  >
                    {passed && <Check size={10} className="text-white" />}
                  </span>
                  <span className={`text-xs ${passed ? "text-slate-700" : "text-slate-400"}`}>{check.label}</span>
                </div>
              );
            })}
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-800 mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 pr-11 text-sm text-slate-900 placeholder-slate-400
                           focus:outline-none focus:ring-2 focus:ring-flow-500/30 focus:border-flow-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {/* Personal Information */}
          <h3 className="text-base font-semibold text-slate-900 mb-4 pt-2 border-t border-slate-100">
            <span className="block pt-6">Personal Information</span>
          </h3>

          <TextField id="fullName" label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />

          <div className="grid sm:grid-cols-2 gap-4">
            <TextField id="school" label="School" value={school} onChange={(e) => setSchool(e.target.value)} />
            <TextField
              id="gradeSection"
              label="Grade / Section"
              value={gradeSection}
              onChange={(e) => setGradeSection(e.target.value)}
            />
          </div>

          {error && <p className="text-sm text-red-600 mt-5">{error}</p>}

          <div className="flex items-center gap-3 mt-7">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-flow-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-flow-600 transition-colors"
            >
              <Save size={16} />
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            {saved && <span className="text-sm text-emerald-600">Saved.</span>}
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}