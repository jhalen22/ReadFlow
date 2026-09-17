import { Classroom, Module, Student } from "./types";

export const MODULES: Module[] = [
  { id: "easy-1", name: "Easy Module 1", difficulty: "easy", description: "Short Grade 5 passages with basic literal comprehension." },
  { id: "medium-1", name: "Medium Module 1", difficulty: "medium", description: "Grade 5 passages with literal and inferential questions." },
  { id: "hard-1", name: "Hard Module 1", difficulty: "hard", description: "Grade 5 passages with inferential and critical-thinking questions." },
];

export const DEMO_STUDENTS: Student[] = [
  { id: "s1", name: "Maria Santos", initials: "MS", difficulty: "medium", streak: 7, badges: 3, lastScore: 85, average: 85 },
  { id: "s2", name: "Juan dela Cruz", initials: "JD", difficulty: "easy", streak: 2, badges: 1, lastScore: 62, average: 62, atRisk: true },
  { id: "s3", name: "Ana Reyes", initials: "AR", difficulty: "hard", streak: 14, badges: 6, lastScore: 97, average: 95 },
  { id: "s4", name: "Pedro Bautista", initials: "PB", difficulty: "medium", streak: 5, badges: 2, lastScore: 71, average: 71 },
  { id: "s5", name: "Liza Gomez", initials: "LG", difficulty: "easy", streak: 1, badges: 0, lastScore: 55, average: 55, atRisk: true },
  { id: "s6", name: "Carlos Tan", initials: "CT", difficulty: "medium", streak: 9, badges: 4, lastScore: 80, average: 80 },
];

export const INITIAL_CLASSROOMS: Classroom[] = [
  {
    id: "room-1",
    name: "Grade 5",
    section: "Section A",
    roomCode: "RF-2026-G5A",
    createdAt: "Feb 20, 2026",
    active: true,
    students: DEMO_STUDENTS,
    assignments: [
      { id: "a1", roomId: "room-1", moduleId: "easy-1", moduleName: "Easy Module 1", dueDate: "2026-09-25", assignedAt: "2026-09-17", status: "Assigned" },
      { id: "a2", roomId: "room-1", moduleId: "medium-1", moduleName: "Medium Module 1", dueDate: "2026-09-30", assignedAt: "2026-09-17", status: "Assigned" },
    ],
  },
];
