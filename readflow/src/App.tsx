import { Route, Routes } from "react-router-dom";
import DiagnosticStartPage from "./modules/module2/pages/DiagnosticStartPage";
import DiagnosticReadingPage from "./modules/module2/pages/DiagnosticReadingPage";
import LandingPage from "./pages/LandingPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SignupPage from "./pages/SignupPage";
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
    </Routes>
  );
}

export default App;