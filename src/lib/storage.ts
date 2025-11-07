import { ExerciseSession } from "@/types/exercise";

const STORAGE_KEY = "attention_sessions";

export const saveSessions = (sessions: ExerciseSession[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch (error) {
    console.error("Failed to save sessions:", error);
  }
};

export const loadSessions = (): ExerciseSession[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load sessions:", error);
    return [];
  }
};

export const addSession = (session: ExerciseSession) => {
  const sessions = loadSessions();
  sessions.push(session);
  saveSessions(sessions);
};

export const getTodaySessions = (): ExerciseSession[] => {
  const sessions = loadSessions();
  const today = new Date().toDateString();
  return sessions.filter(s => new Date(s.date).toDateString() === today);
};

export const getTotalSessions = (): number => {
  return loadSessions().length;
};
