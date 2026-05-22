"use client";

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { QUIZ_TIMER_DURATION } from "@/lib/constants";

interface QuizTimerProps {
  isPlaying: boolean;
  onComplete?: () => void;
  size?: number;
  strokeWidth?: number;
}

export default function QuizTimer({
  isPlaying,
  onComplete,
  size = 120,
  strokeWidth = 12,
}: Readonly<QuizTimerProps>) {
  const renderTime = ({ remainingTime }: { remainingTime: number }) => {
    if (remainingTime === 0) {
      return (
        <div className="text-2xl font-bold text-red-600" aria-label="Time is up">
          Late
        </div>
      );
    }

    const isUrgent = remainingTime <= 10;

    return (
      <div className="text-center" role="timer" aria-live="polite" aria-label={`${remainingTime} seconds remaining`}>
        <div className={`text-3xl font-bold tabular-nums transition-colors duration-300 ${isUrgent ? "text-red-600" : "text-gray-900 dark:text-white"}`}>
          {remainingTime}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">sec</div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-2" aria-label="Quiz timer">
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={QUIZ_TIMER_DURATION}
        colors={["#22c55e", "#eab308", "#ef4444"]}
        colorsTime={[30, 15, 0]}
        size={size}
        strokeWidth={strokeWidth}
        onComplete={() => {
          onComplete?.();
          return { shouldRepeat: false, delay: 1 };
        }}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
}
