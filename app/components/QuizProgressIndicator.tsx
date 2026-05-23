"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";

interface QuizProgressIndicatorProps {
  quizId: string;
  totalQuestions: number;
}

const STORAGE_KEY = "quiz-app-progress";

function loadProgress(quizId: string): Record<string, boolean> {
  if (typeof globalThis.window === "undefined") return {};
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const allProgress: Record<string, Record<string, boolean>> = stored ? JSON.parse(stored) : {};
    return allProgress[quizId] || {};
  } catch {
    return {};
  }
}

function saveProgress(quizId: string, answeredMap: Record<string, boolean>) {
  if (typeof globalThis.window === "undefined") return;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const allProgress: Record<string, Record<string, boolean>> = stored ? JSON.parse(stored) : {};
    allProgress[quizId] = answeredMap;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
  } catch {
    console.warn("Failed to save quiz progress");
  }
}

export default function QuizProgressIndicator({ quizId, totalQuestions }: Readonly<QuizProgressIndicatorProps>) {
  const [answeredMap, setAnsweredMap] = useState<Record<string, boolean>>({});
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  useEffect(() => {
    setAnsweredMap(loadProgress(quizId));
  }, [quizId]);

  useEffect(() => {
    const handleQuestionAnswered = (e: Event) => {
      const detail = (e as CustomEvent).detail as { question_id: number };
      const qId = String(detail.question_id);
      setAnsweredMap((prev) => {
        if (prev[qId]) return prev;
        const updated = { ...prev, [qId]: true };
        saveProgress(quizId, updated);
        return updated;
      });
    };

    globalThis.addEventListener("questionAnswered", handleQuestionAnswered);
    return () => globalThis.removeEventListener("questionAnswered", handleQuestionAnswered);
  }, [quizId]);

  const answeredCount = Object.values(answeredMap).filter(Boolean).length;
  const percentage = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  const resetProgress = useCallback(() => {
    setAnsweredMap({});
    saveProgress(quizId, {});
  }, [quizId]);

  if (!mounted) {
    return (
      <div className="flex items-center gap-3 bg-white dark:bg-gray-800 px-4 py-3 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 animate-pulse" />
        <div className="space-y-1">
          <div className="w-16 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="w-24 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 bg-white dark:bg-gray-800 px-4 py-3 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="relative w-12 h-12">
        <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-gray-200 dark:text-gray-700"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={`${percentage}, 100`}
            strokeLinecap="round"
            className="text-purple-600 dark:text-purple-400 transition-all duration-500 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-gray-900 dark:text-white">{percentage}%</span>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-500 dark:text-gray-400">Progress</p>
        <p className="text-lg font-semibold text-gray-900 dark:text-white">
          {answeredCount} / {totalQuestions}
        </p>
      </div>

      {answeredCount > 0 && (
        <button
          onClick={resetProgress}
          className="p-2 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          aria-label="Reset progress"
          title="Reset progress"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      )}
    </div>
  );
}
