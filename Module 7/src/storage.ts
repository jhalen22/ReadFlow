import { Classroom } from "./types";
import { INITIAL_CLASSROOMS } from "./data";

const KEY = "readflow_classrooms_v1";

export function loadClassrooms(): Classroom[] {
  try {
    const saved = localStorage.getItem(KEY);
    return saved ? JSON.parse(saved) : INITIAL_CLASSROOMS;
  } catch {
    return INITIAL_CLASSROOMS;
  }
}

export function saveClassrooms(classrooms: Classroom[]) {
  localStorage.setItem(KEY, JSON.stringify(classrooms));
}

export function generateRoomCode(existing: Classroom[]) {
  let code = "";
  do {
    const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
    code = `RF-${new Date().getFullYear()}-${suffix}`;
  } while (existing.some((r) => r.roomCode === code));
  return code;
}
