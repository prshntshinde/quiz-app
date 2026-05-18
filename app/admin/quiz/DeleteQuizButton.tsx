"use client";

import { useTransition } from "react";
import { deleteQuiz } from "@/lib/actions/quiz";

interface DeleteQuizButtonProps {
  id: string;
  title: string;
}

export default function DeleteQuizButton({ id, title }: DeleteQuizButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the quiz "${title}"? This will move it to the trash.`
    );

    if (confirmed) {
      startTransition(async () => {
        const formData = new FormData();
        formData.append("id", id);
        try {
          const result = await deleteQuiz(formData);
          alert(result.message);
        } catch (error) {
          alert(error instanceof Error ? error.message : "Delete failed");
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