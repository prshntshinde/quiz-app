"use client";

import { useState, useEffect, useCallback } from "react";

interface QuizProgress {
  [quizId: string]: {
    [questionId: number]: boolean;
  };
}

const STORAGE_KEY = "quiz-app-progress";

function loadProgress(): QuizProgress {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveProgress(progress: QuizProgress) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    console.warn("Failed to save quiz progress to localStorage");
  }
}

export function useQuizProgress(quizId: string, totalQuestions: number) {
  const [progress, setProgress] = useState<QuizProgress>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setProgress(loadProgress());
  }, []);

  const quizProgress = progress[quizId] || {};
  const answeredCount = Object.values(quizProgress).filter(Boolean).length;
  const percentage = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  const markAnswered = useCallback((questionId: number) => {
    setProgress((prev) => {
      const updated = {
        ...prev,
        [quizId]: {
          ...prev[quizId],
          [questionId]: true,
        },
      };
      saveProgress(updated);
      return updated;
    });
  }, [quizId]);

  const isAnswered = useCallback((questionId: number): boolean => {
    return !!progress[quizId]?.[questionId];
  }, [progress, quizId]);

  const resetProgress = useCallback(() => {
    setProgress((prev) => {
      const updated = { ...prev };
      delete updated[quizId];
      saveProgress(updated);
      return updated;
    });
  }, [quizId]);

  return {
    answeredCount,
    totalQuestions,
    percentage,
    markAnswered,
    isAnswered: mounted ? isAnswered : () => false,
    resetProgress,
    mounted,
  };
}
