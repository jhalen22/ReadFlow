import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import ForgotPasswordPage from "./pages/Forgotpasswordpage.tsx";
import VerificationPage from "./pages/Verificationpage.tsx";
import ResetPasswordPage from "./pages/Resetpasswordpage.tsx";
import StudentDashboard from "./pages/StudentDashboard.tsx";
import MyMaterials from "./pages/MyMaterials.tsx";
import Leaderboard from "./pages/Leaderboard.tsx";
import MyBadges from "./pages/MyBadges.tsx";
import Settings from "./pages/Settings.tsx";
import ReadingActivityPage from "./pages/reading-activity/ReadingActivityPage.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/verify" element={<VerificationPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      <Route path="/dashboard" element={<StudentDashboard />} />
      <Route path="/dashboard/materials" element={<MyMaterials />} />
      <Route path="/dashboard/leaderboard" element={<Leaderboard />} />
      <Route path="/dashboard/badges" element={<MyBadges />} />
      <Route path="/dashboard/settings" element={<Settings />} />
      <Route path="/dashboard/activity/:moduleId" element={<ReadingActivityPage />} />
    </Routes>
  );
}

export default App;