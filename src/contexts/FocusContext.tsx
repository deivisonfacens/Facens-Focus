import React, { createContext, useContext, useState, useEffect } from "react";

interface FocusSession {
  date: string;
  focusMinutes: number;
  tasksCompleted: number;
}

interface FocusContextType {
  addFocusSession: (minutes: number) => void;
  addCompletedTask: () => void;
  getWeeklyStats: () => {
    totalFocusMinutes: number;
    totalTasksCompleted: number;
    sessionsThisWeek: number;
    dailyStats: { day: string; focusMinutes: number; tasksCompleted: number }[];
  };
}

const FocusContext = createContext<FocusContextType | undefined>(undefined);

const STORAGE_KEY = "facens-focus-data";

export const FocusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessions, setSessions] = useState<FocusSession[]>([]);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSessions(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to load stored data");
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  }, [sessions]);

  const addFocusSession = (minutes: number) => {
    const today = new Date().toISOString().split("T")[0];
    setSessions((prev) => {
      const existingIndex = prev.findIndex((s) => s.date === today);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          focusMinutes: updated[existingIndex].focusMinutes + minutes,
        };
        return updated;
      }
      return [...prev, { date: today, focusMinutes: minutes, tasksCompleted: 0 }];
    });
  };

  const addCompletedTask = () => {
    const today = new Date().toISOString().split("T")[0];
    setSessions((prev) => {
      const existingIndex = prev.findIndex((s) => s.date === today);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          tasksCompleted: updated[existingIndex].tasksCompleted + 1,
        };
        return updated;
      }
      return [...prev, { date: today, focusMinutes: 0, tasksCompleted: 1 }];
    });
  };

  const getWeeklyStats = () => {
    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 6);

    const weekSessions = sessions.filter((s) => {
      const sessionDate = new Date(s.date);
      return sessionDate >= sevenDaysAgo && sessionDate <= now;
    });

    const totalFocusMinutes = weekSessions.reduce((sum, s) => sum + s.focusMinutes, 0);
    const totalTasksCompleted = weekSessions.reduce((sum, s) => sum + s.tasksCompleted, 0);

    // Generate daily stats for last 7 days
    const dailyStats = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      const daySession = weekSessions.find((s) => s.date === dateStr);

      dailyStats.push({
        day: date.toLocaleDateString("pt-BR", { weekday: "short" }),
        focusMinutes: daySession?.focusMinutes || 0,
        tasksCompleted: daySession?.tasksCompleted || 0,
      });
    }

    return {
      totalFocusMinutes,
      totalTasksCompleted,
      sessionsThisWeek: weekSessions.length,
      dailyStats,
    };
  };

  return (
    <FocusContext.Provider value={{ addFocusSession, addCompletedTask, getWeeklyStats }}>
      {children}
    </FocusContext.Provider>
  );
};

export const useFocus = () => {
  const context = useContext(FocusContext);
  if (!context) {
    throw new Error("useFocus must be used within FocusProvider");
  }
  return context;
};
