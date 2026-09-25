import { Link } from "react-router-dom";
import mascot from "../assets/mascot.png";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <main className="landing-page">
      <div className="landing-container">
        <section className="landing-mascot-card" aria-label="ReadFlow mascot">
          <div className="landing-mascot-frame">
            <img
              className="landing-mascot"
              src={mascot}
              alt="ReadFlow mascot"
            />
          </div>
          <p className="landing-brand">ReadFlow</p>
        </section>

        <section className="landing-content">
          <h1 className="landing-title">
            Welcome to ReadFlow:
            <span>Enhancing Reading and Comprehension Skills</span>
          </h1>

          <p className="landing-description">
            Welcome to ReadFlow, where we empower young learners to enhance
            their English and Filipino reading fluency and comprehension
            through engaging activities.
          </p>

          <Link className="landing-discover" to="/signup">
            <span>Discover More</span>
            <span className="landing-discover-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </section>
      </div>
    </main>
  );
}
