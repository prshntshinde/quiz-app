"use client";

import { cn } from "@/lib/utils";

export type OptionStatus = "correct" | "wrong" | "fifty_fifty" | "selected" | null;

interface AnswerOptionProps {
  id: string;
  label: string;
  text: string;
  index: number;
  isSelected: boolean;
  status: OptionStatus;
  disabled: boolean;
  onSelect: (index: number) => void;
}

const statusStyles: Record<string, string> = {
  correct: "bg-green-600 border-green-500 text-white shadow-green-500/50",
  wrong: "bg-red-600 border-red-500 text-white shadow-red-500/50",
  fifty_fifty: "bg-gray-300 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-500 opacity-50 cursor-not-allowed",
  selected: "bg-blue-600 border-blue-500 text-white shadow-blue-500/50",
  default: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20",
};

export default function AnswerOption({
  id,
  label,
  text,
  index,
  isSelected,
  status,
  disabled,
  onSelect,
}: Readonly<AnswerOptionProps>) {
  const baseClasses =
    "w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 font-semibold text-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900";

  const getStatusClass = (): string => {
    if (status === "correct") return statusStyles.correct;
    if (status === "wrong") return statusStyles.wrong;
    if (status === "fifty_fifty") return statusStyles.fifty_fifty;
    if (isSelected) return statusStyles.selected;
    return statusStyles.default;
  };

  const handleClick = () => {
    if (!disabled && status !== "fifty_fifty") {
      onSelect(index);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      type="button"
      id={id}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled || status === "fifty_fifty"}
      aria-label={`Option ${label}: ${text}`}
      aria-pressed={isSelected}
      aria-disabled={disabled || status === "fifty_fifty"}
      className={cn(baseClasses, getStatusClass(), {
        "cursor-not-allowed": disabled || status === "fifty_fifty",
        "cursor-pointer": !disabled && status !== "fifty_fifty",
        "shadow-lg": status === "correct" || status === "wrong" || isSelected,
      })}
    >
      <span
        className={cn(
          "flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm transition-colors duration-200",
          {
            "bg-white/20 text-white": status === "correct" || status === "wrong" || isSelected,
            "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300": !status && !isSelected,
          }
        )}
      >
        {label}
      </span>
      <span className="flex-1 text-left break-words">{text}</span>
    </button>
  );
}
