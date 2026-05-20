"use client";

import { useTransition } from "react";
import { deleteQuiz } from "@/lib/actions/quiz";
import { useToast } from "@/app/components/Toast";

interface DeleteQuizButtonProps {
  readonly id: string;
  readonly title: string;
}

export default function DeleteQuizButton({ id, title }: DeleteQuizButtonProps) {
  const [isPending, startTransition] = useTransition();
  const { addToast } = useToast();

  const handleDelete = async () => {
    const confirmed = globalThis.confirm(
      `Are you sure you want to delete the quiz "${title}"? This will move it to the trash.`
    );

    if (confirmed) {
      startTransition(async () => {
        const formData = new FormData();
        formData.append("id", id);
        try {
          const result = await deleteQuiz(formData);
          addToast(result.message, "success");
        } catch (error) {
          addToast(error instanceof Error ? error.message : "Delete failed", "error");
        }
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className={`text-sm font-semibold text-red-500 hover:text-red-400 ${
        isPending ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}