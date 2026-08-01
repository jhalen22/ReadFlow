import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid md:grid-cols-[38%_62%] bg-white">
      {/* Left brand panel */}
      <div className="hidden md:flex flex-col justify-between items-center bg-ink-900 px-12 py-16 text-center">
        <div className="mt-16">
          <h1 className="text-4xl font-extrabold tracking-tight">
            <span className="text-slate-100">Read</span>
            <span className="text-flow-400">Flow</span>
          </h1>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-base font-medium text-slate-200 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Mobile top bar (shown only on small screens) */}
      <div className="flex md:hidden items-center justify-between bg-ink-900 px-6 py-5">
        <h1 className="text-2xl font-extrabold tracking-tight">
          <span className="text-slate-100">Read</span>
          <span className="text-flow-400">Flow</span>
        </h1>
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-slate-200 hover:text-white">
          <ArrowLeft size={16} />
          Home
        </Link>
      </div>

      {/* Right form panel */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[448px] rounded-2xl border border-slate-400 shadow-sm px-10 py-9">
          <div className="text-center mb-7">
            <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
            <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
