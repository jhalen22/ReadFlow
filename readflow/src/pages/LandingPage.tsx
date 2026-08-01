import { Link } from "react-router-dom";
import { BookOpenCheck, LineChart, Languages, ArrowRight } from "lucide-react";

const FEATURES = [
  {
    icon: BookOpenCheck,
    title: "Structured comprehension paths",
    description:
      "Lessons scaffold learners from literal to critical comprehension, Aligned with educational standards.",
  },
  {
    icon: LineChart,
    title: "Real-time progress tracking",
    description:
      "Teachers see exactly where each learner is struggling, so support arrives before gaps widen.",
  },
  {
    icon: Languages,
    title: "Bilingual by design",
    description:
      "Content and prompts support both Filipino and English, meeting learners where they read best.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Nav */}
      <header className="bg-ink-900">
        <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
          <span className="text-xl font-extrabold tracking-tight">
            <span className="text-slate-100">Read</span>
            <span className="text-flow-400">Flow</span>
          </span>

          <nav className="hidden sm:flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-slate-200 hover:text-white transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-flow-400 text-ink-900 hover:bg-flow-500 transition-colors"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-ink-900">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-24 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto">
            Structured Reading for Every Learner
          </h1>
          <p className="mt-5 text-lg text-slate-300 max-w-2xl mx-auto">
            ReadFlow is a structured and interactive reading and comprehension platform designed for Grade 5 learners. Diagnose, guide, and monitor reading growth-all in one place.
          </p>

          <div className="mt-9 flex items-center justify-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-lg bg-flow-400 px-6 py-3 text-sm font-semibold text-ink-900 hover:bg-flow-500 transition-colors"
            >
              Get Started
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/login"
              className="rounded-lg border border-slate-600 px-6 py-3 text-sm font-semibold text-white hover:border-slate-400 transition-colors"
            >
              Log In
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Everything a reading intervention needs, in one place
          </h2>
          <p className="mt-3 text-slate-500 max-w-xl mx-auto">
            Designed for educational standards and grounded in reading research
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-2xl border border-slate-200 p-7">
              <div className="w-11 h-11 rounded-lg bg-flow-400/10 flex items-center justify-center mb-5">
                <Icon size={22} className="text-flow-600" />
              </div>
              <h3 className="text-base font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm font-bold">
            <span className="text-slate-900">Read</span>
            <span className="text-flow-500">Flow</span>
          </span>
          <p className="text-sm text-slate-500">
            A Capstone Project — Cebu Technological University, 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
