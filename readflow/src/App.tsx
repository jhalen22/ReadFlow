import { Route, Routes } from "react-router-dom";
import DiagnosticStartPage from "./modules/module2/pages/DiagnosticStartPage";
import DiagnosticReadingPage from "./modules/module2/pages/DiagnosticReadingPage";
import DiagnosticQuestionsPage from "./modules/module2/pages/DiagnosticQuestionsPage";
import DiagnosticResultPage from "./modules/module2/pages/DiagnosticResultPage";
import LandingPage from "./pages/LandingPage";
import ForgotPasswordPage from "./pages/ForgotpasswordPage";
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetpasswordPage";
import SignupPage from "./pages/SignupPage";
import StudentDashboard from "./pages/StudentDashboard";
import VerificationPage from "./pages/VerificationPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/verification" element={<VerificationPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/diagnostic" element={<DiagnosticStartPage />} />
      <Route path="/diagnostic/reading" element={<DiagnosticReadingPage />} />
      <Route path="/diagnostic/questions" element={<DiagnosticQuestionsPage />} />
      <Route path="/diagnostic/result" element={<DiagnosticResultPage />} />
      <Route path="/dashboard" element={<StudentDashboard />} />
    </Routes>
  );
}

export default App;
