export type Difficulty = "Easy" | "Medium" | "Hard";
export type ReadingLevel = "Frustration" | "Instructional" | "Independent";
export type ModuleStatus = "completed" | "in_progress" | "locked" | "not_started";

export interface ModuleSummary {
  id: string;
  title: string;
  language: "English" | "Filipino";
  difficulty: Difficulty;
  questionCount: number;
  estMinutes: number;
  xpReward: number;
  status: ModuleStatus;
  progressPercent: number;
}

export const student = {
  firstName: "Demo",
  fullName: "Demo Student",
  initials: "DS",
  email: "demo.student@readflow.app",
  school: "Riverside Elementary School",
  gradeSection: "Grade 5 - Section Rizal",
  readingLevel: "Instructional" as ReadingLevel,
  difficultyTier: "Medium" as Difficulty,
  totalXp: 610,
  streakDays: 3,
  badgesEarned: 4,
  badgesTotal: 8,
  currentLevelLabel: "Level 4 Reader",
  xpToNextLevel: 190,
  // the module the student is actively mid-way through — used by the
  // sidebar "Read Aloud" shortcut to resume exactly where they left off
  currentModuleId: "bayani-ng-bayan",
};

export const assignedModules: ModuleSummary[] = [
  {
    id: "great-coral-reef",
    title: "The Great Coral Reef",
    language: "English",
    difficulty: "Medium",
    questionCount: 9,
    estMinutes: 15,
    xpReward: 50,
    status: "completed",
    progressPercent: 100,
  },
  {
    id: "bayani-ng-bayan",
    title: "Ang Bayani ng Bayan",
    language: "Filipino",
    difficulty: "Easy",
    questionCount: 6,
    estMinutes: 10,
    xpReward: 30,
    status: "in_progress",
    progressPercent: 60,
  },
  {
    id: "philippine-eagle",
    title: "Saving the Philippine Eagle",
    language: "English",
    difficulty: "Hard",
    questionCount: 12,
    estMinutes: 20,
    xpReward: 80,
    status: "locked",
    progressPercent: 0,
  },
  {
    id: "kalikasan-ng-pilipinas",
    title: "Ang Kalikasan ng Pilipinas",
    language: "Filipino",
    difficulty: "Medium",
    questionCount: 9,
    estMinutes: 15,
    xpReward: 50,
    status: "not_started",
    progressPercent: 0,
  },
];

export interface RankingEntry {
  rank: number;
  name: string;
  initials: string;
  xp: number;
  difficulty: Difficulty;
  isYou?: boolean;
}

export const classRanking: RankingEntry[] = [
  { rank: 1, name: "Ana Reyes", initials: "AR", xp: 1420, difficulty: "Hard" },
  { rank: 2, name: "Carlos Tan", initials: "CT", xp: 1180, difficulty: "Medium" },
  { rank: 3, name: "Maria Santos", initials: "MS", xp: 1050, difficulty: "Medium" },
  { rank: 4, name: "Pedro Bautista", initials: "PB", xp: 840, difficulty: "Easy" },
  { rank: 5, name: "You (Demo)", initials: "DS", xp: 610, difficulty: "Medium", isYou: true },
];

export const fullLeaderboard: RankingEntry[] = [
  ...classRanking,
  { rank: 6, name: "Juan dela Cruz", initials: "JD", xp: 520, difficulty: "Easy" },
  { rank: 7, name: "Liza Gomez", initials: "LG", xp: 380, difficulty: "Easy" },
];

export const xpEarningRules = [
  { label: "Complete Literal level", value: "+20 XP" },
  { label: "Complete Inferential level", value: "+15 XP" },
  { label: "Complete Critical level", value: "+15 XP" },
  { label: "Finish a full module", value: "+50–80 XP" },
  { label: "Complete a Read Aloud session", value: "+25 XP" },
];

export interface BadgeDef {
  id: string;
  name: string;
  description: string;
  earned: boolean;
  icon: "Star" | "Flame" | "BookOpenCheck" | "ArrowUpCircle" | "Target" | "Mic" | "Gem" | "GraduationCap";
}

export const badges: BadgeDef[] = [
  { id: "first-read", name: "First Read", description: "Completed your first module", earned: true, icon: "Star" },
  { id: "3-day-streak", name: "3-Day Streak", description: "Read 3 days in a row", earned: true, icon: "Flame" },
  { id: "bookworm", name: "Bookworm", description: "Read 5 modules", earned: true, icon: "BookOpenCheck" },
  { id: "level-up", name: "Level Up", description: "Unlock Inferential level", earned: true, icon: "ArrowUpCircle" },
  { id: "perfect-score", name: "Perfect Score", description: "Score 100% on a quiz", earned: false, icon: "Target" },
  { id: "brave-reader", name: "Brave Reader", description: "Complete Read Aloud 3x", earned: false, icon: "Mic" },
  { id: "diamond", name: "Diamond", description: "Reach 2000 XP", earned: false, icon: "Gem" },
  { id: "graduate", name: "Graduate", description: "Complete all modules", earned: false, icon: "GraduationCap" },
];

// Class/room codes a student can use to join a teacher's Learning Room in
// the "My Materials" section. In production this is validated server-side
// against the ROOM table (room_code column).
export const VALID_CLASS_CODES = ["RM-7A2K", "FIL-5B3X"];