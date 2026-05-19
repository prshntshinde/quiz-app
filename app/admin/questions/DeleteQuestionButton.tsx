"use client";

import { useTransition } from "react";
import { deleteQuestion } from "@/lib/actions/questions";

interface DeleteQuestionButtonProps {
  readonly id: string;
  readonly question: string;
}

export default function DeleteQuestionButton({ id, question }: DeleteQuestionButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    const confirmed = globalThis.confirm(
      `Are you sure you want to delete the question "${question}"? This will move it to the trash.`
    );

    if (confirmed) {
      startTransition(async () => {
        const formData = new FormData();
        formData.append("id", id);
        try {
          const result = await deleteQuestion(formData);
          alert(result.message);
          window.location.reload();
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