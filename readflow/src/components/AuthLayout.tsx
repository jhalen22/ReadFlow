import { ReactNode } from "react";
import mascot from "../assets/mascot.png";
import "./AuthLayout.css";

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <main className="auth-page">
      <div className="auth-card">
        <section className="auth-brand-panel" aria-label="ReadFlow branding">
          <div className="auth-mascot-frame">
            <img className="auth-mascot" src={mascot} alt="ReadFlow mascot" />
          </div>
          <p className="auth-brand-name">ReadFlow</p>
        </section>

        <section className="auth-form-panel">
          <div className="auth-form-container">
            <header className="auth-header">
              <h1 className="auth-heading">{title}</h1>
              {subtitle && <p className="auth-subtitle">{subtitle}</p>}
            </header>

            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
