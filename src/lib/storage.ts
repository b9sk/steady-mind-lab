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

export const getSessionsByExercise = (exerciseId: string): ExerciseSession[] => {
  return loadSessions().filter(s => s.exerciseId === exerciseId);
};

export const getDailyStats = (days: number = 7): { date: string; total: number; [exerciseId: string]: number | string }[] => {
  const sessions = loadSessions();
  const stats: { [date: string]: { total: number; [exerciseId: string]: number } } = {};
  
  // Get last N days
  const today = new Date();
  const dates: string[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    dates.push(dateStr);
    stats[dateStr] = { total: 0 };
  }
  
  // Count sessions per day per exercise
  sessions.forEach(session => {
    const dateStr = new Date(session.date).toISOString().split('T')[0];
    if (stats[dateStr]) {
      stats[dateStr].total = (stats[dateStr].total || 0) + 1;
      stats[dateStr][session.exerciseId] = (stats[dateStr][session.exerciseId] || 0) + 1;
    }
  });
  
  return dates.map(date => ({
    date,
    ...stats[date]
  }));
};
