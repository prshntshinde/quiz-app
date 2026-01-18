"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createQuiz } from "@/lib/actions/quiz";
import FormSubmitButton from "@/app/components/forms/FormSubmitButton";

export default function CreateQuiz() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form
      action={async (formData) => {
        setIsLoading(true);
        await createQuiz(formData);
        setTitle("");
        setDescription("");
        alert("Quiz created successfully");
        router.push("/admin/quiz");
      }}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="create-quiz-title" className="font-semibold text-gray-700">Quiz Title</label>
        <input
          type="text"
          name="title"
          id="create-quiz-title"
          placeholder="Quiz Title"
          className="p-2 border border-slate-500"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="create-quiz-description" className="font-semibold text-gray-700">Quiz Description</label>
        <input
          type="text"
          name="description"
          id="create-quiz-description"
          placeholder="Quiz Description"
          className="p-2 border border-slate-500"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>
      <FormSubmitButton value="Create Quiz" isLoading={isLoading} />
    </form>
  );
}
