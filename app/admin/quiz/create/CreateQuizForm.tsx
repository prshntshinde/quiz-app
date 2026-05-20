"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createQuiz } from "@/lib/actions/quiz";
import { useToast } from "@/app/components/Toast";
import { FormField, Input, Textarea, Button } from "@/app/admin/components";

export default function CreateQuizForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      await createQuiz(formData);
      setTitle("");
      setDescription("");
      addToast("Quiz created successfully", "success");
      router.push("/admin/quiz");
    } catch (error) {
      addToast(error instanceof Error ? error.message : "Failed to create quiz", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <form action={handleSubmit} className="space-y-5">
        <FormField
          label="Quiz Title"
          htmlFor="quiz-title"
          required
          hint="Enter a descriptive title for your quiz"
        >
          <Input
            type="text"
            name="title"
            id="quiz-title"
            placeholder="e.g., JavaScript Fundamentals"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormField>

        <FormField
          label="Quiz Description"
          htmlFor="quiz-description"
          hint="Optional: Provide a brief overview of this quiz"
        >
          <Textarea
            name="description"
            id="quiz-description"
            placeholder="Describe what this quiz covers..."
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormField>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            leftIcon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            }
          >
            Create Quiz
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push("/admin/quiz")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}