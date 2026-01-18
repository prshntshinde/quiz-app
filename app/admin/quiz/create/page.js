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
        router.refresh();
        router.push("/admin/quiz");
      }}
      className="flex flex-col gap-4"
    >
      <input
        type="text"
        name="title"
        placeholder="Quiz Title"
        className="p-2 border border-slate-500"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Quiz Description"
        className="p-2 border border-slate-500"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <FormSubmitButton value="Create Quiz" isLoading={isLoading} />
    </form>
  );
}
