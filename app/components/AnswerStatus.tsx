import { RxCheckCircled, RxCrossCircled } from "react-icons/rx";
import { cn } from "@/lib/utils";

export type AnswerStatusType = "Correct" | "Wrong" | "";

interface AnswerStatusProps {
  status: AnswerStatusType;
}

export default function AnswerStatus({ status }: Readonly<AnswerStatusProps>) {
  if (!status) return null;

  const isCorrect = status === "Correct";

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold text-lg transition-all duration-300",
        {
          "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400": isCorrect,
          "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400": !isCorrect,
        }
      )}
      role="status"
      aria-live="polite"
    >
      {isCorrect ? (
        <RxCheckCircled size={24} className="text-green-600 dark:text-green-400" aria-hidden="true" />
      ) : (
        <RxCrossCircled size={24} className="text-red-600 dark:text-red-400" aria-hidden="true" />
      )}
      <span>{status}</span>
    </div>
  );
}
