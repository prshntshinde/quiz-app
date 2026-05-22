"use client";

interface QuestionHeaderProps {
  questionId: number;
  question: string;
}

export default function QuestionHeader({ questionId, question }: Readonly<QuestionHeaderProps>) {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-xl p-4 shadow-lg border border-gray-700">
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-yellow-500 text-gray-900 font-bold text-lg">
          {questionId}
        </span>
        <h2 className="flex-1 text-lg sm:text-xl font-semibold text-white leading-relaxed">
          {question || "Question text not available"}
        </h2>
      </div>
    </div>
  );
}
