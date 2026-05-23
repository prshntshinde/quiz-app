"use client";

import { cn } from "@/lib/utils";

interface ExplanationPanelProps {
  explanation: string;
  isVisible: boolean;
}

export default function ExplanationPanel({ explanation, isVisible }: Readonly<ExplanationPanelProps>) {
  if (!isVisible) return null;

  return (
    <section
      aria-label="Explanation"
      className={cn(
        "mt-4 p-4 rounded-lg border-2 border-dashed transition-all duration-300",
        "bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-700"
      )}
    >
      <div className="flex items-start gap-2">
        <span className="flex-shrink-0 text-amber-600 dark:text-amber-400 font-bold text-sm uppercase tracking-wide">
          Explanation:
        </span>
        <p className="flex-1 text-gray-800 dark:text-gray-200 leading-relaxed">
          {explanation || "No explanation provided."}
        </p>
      </div>
    </section>
  );
}
