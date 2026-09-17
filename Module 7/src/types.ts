export type Difficulty = "easy" | "medium" | "hard";

export interface Student {
  id: string;
  name: string;
  initials: string;
  difficulty: Difficulty;
  streak: number;
  badges: number;
  lastScore: number;
  average: number;
  atRisk?: boolean;
}

export interface Module {
  id: string;
  name: string;
  difficulty: Difficulty;
  description: string;
}

export interface Assignment {
  id: string;
  roomId: string;
  moduleId: string;
  moduleName: string;
  dueDate: string;
  assignedAt: string;
  status: "Assigned" | "Completed";
}

export interface Classroom {
  id: string;
  name: string;
  section: string;
  roomCode: string;
  createdAt: string;
  active: boolean;
  students: Student[];
  assignments: Assignment[];
}
