"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateQuiz } from "@/lib/actions/quiz";
import { useToast } from "@/app/components/Toast";
import { FormField, Input, Textarea, Button } from "@/app/admin/components";

interface HistoryEntry {
  readonly title: string;
  readonly description?: string;
  readonly updatedAt: string;
}

interface QuizData {
  readonly _id: string;
  readonly title?: string;
  readonly description?: string;
  readonly history?: readonly HistoryEntry[];
}

interface EditQuizFormProps {
  readonly quiz: QuizData;
}

export default function EditQuizForm({ quiz }: EditQuizFormProps) {
  const [title, setTitle] = useState(quiz.title || "");
  const [description, setDescription] = useState(quiz.description || "");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { addToast } = useToast();

  const lastHistory = quiz.history?.at(-1) ?? null;

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const result = await updateQuiz(formData);
      addToast(result.message, "success");
      router.push("/admin/quiz");
    } catch (error) {
      addToast(error instanceof Error ? error.message : "An error occurred", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
      {lastHistory && (
        <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-lg text-sm">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div className="flex-1">
              <p className="font-semibold text-amber-800 dark:text-amber-300 mb-2">Safety Backup Available</p>
              <div className="space-y-1 text-amber-700 dark:text-amber-400">
                <p><span className="font-medium">Title:</span> {lastHistory.title}</p>
                <p><span className="font-medium">Description:</span> {lastHistory.description || "N/A"}</p>
                <p className="text-xs italic text-amber-600 dark:text-amber-400 mt-2">
                  Saved on: {new Date(lastHistory.updatedAt).toLocaleString()}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setTitle(lastHistory.title);
                  setDescription(lastHistory.description || "");
                }}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Restore these values
              </button>
            </div>
          </div>
        </div>
      )}

      <form action={handleSubmit} className="space-y-5">
        <input type="hidden" name="id" value={String(quiz._id)} />

        <FormField
          label="Quiz Title"
          htmlFor="quiz-title"
          required
        >
          <Input
            type="text"
            name="title"
            id="quiz-title"
            placeholder="Enter quiz title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormField>

        <FormField
          label="Quiz Description"
          htmlFor="quiz-description"
          hint="Optional: Provide a brief description of this quiz"
        >
          <Textarea
            name="description"
            id="quiz-description"
            placeholder="Enter quiz description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormField>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t dark:border-gray-700">
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            leftIcon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            }
          >
            Update Quiz
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}