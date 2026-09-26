export type DiagnosticStatus = "not_started" | "in_progress" | "completed";
export type TemporaryUserRole = "student" | "teacher" | "admin" | "general_user";

const DIAGNOSTIC_STORAGE_PREFIX = "readflow:diagnostic:";
const ROLE_STORAGE_PREFIX = "readflow:role:";
const ACTIVE_LEARNER_KEY = "readflow:active-diagnostic-learner";

export function normalizeDiagnosticEmail(email: string) {
  return email.trim().toLowerCase();
}

function getStorageKey(email: string) {
  const normalizedEmail = normalizeDiagnosticEmail(email);
  return normalizedEmail
    ? `${DIAGNOSTIC_STORAGE_PREFIX}${normalizedEmail}`
    : null;
}

function getRoleStorageKey(email: string) {
  const normalizedEmail = normalizeDiagnosticEmail(email);
  return normalizedEmail ? `${ROLE_STORAGE_PREFIX}${normalizedEmail}` : null;
}

export function getDiagnosticStatus(email: string): DiagnosticStatus {
  const storageKey = getStorageKey(email);

  if (!storageKey) return "not_started";

  // Temporary frontend-only state. Replace this with the authenticated user's
  // `diagnostic_completed` database field when real auth and persistence exist.
  const status = window.localStorage.getItem(storageKey);

  if (status === "in_progress" || status === "completed") return status;
  // Treat the earlier prototype's `pending` value as not started.
  return "not_started";
}

export function setDiagnosticStatus(email: string, status: DiagnosticStatus) {
  const storageKey = getStorageKey(email);

  if (storageKey) {
    window.localStorage.setItem(storageKey, status);
  }
}

export function initializeDiagnosticOnboarding(
  email: string,
  role: TemporaryUserRole,
) {
  const roleStorageKey = getRoleStorageKey(email);

  if (roleStorageKey) {
    window.localStorage.setItem(roleStorageKey, role);
  }

  setDiagnosticStatus(email, "not_started");
}

export function getTemporaryUserRole(email: string): TemporaryUserRole | null {
  const roleStorageKey = getRoleStorageKey(email);
  if (!roleStorageKey) return null;

  const role = window.localStorage.getItem(roleStorageKey);
  return role === "student" ||
    role === "teacher" ||
    role === "admin" ||
    role === "general_user"
    ? role
    : null;
}

export function requiresDiagnostic(role: TemporaryUserRole | null) {
  // Unknown prototype accounts retain the existing learner-style onboarding.
  return role === null || role === "student" || role === "general_user";
}

export function setActiveDiagnosticLearner(email: string | null) {
  if (!email) {
    window.sessionStorage.removeItem(ACTIVE_LEARNER_KEY);
    return;
  }

  window.sessionStorage.setItem(
    ACTIVE_LEARNER_KEY,
    normalizeDiagnosticEmail(email),
  );
}

export function setActiveDiagnosticStatus(status: DiagnosticStatus) {
  const email = window.sessionStorage.getItem(ACTIVE_LEARNER_KEY);

  if (email) {
    setDiagnosticStatus(email, status);
  }
}
