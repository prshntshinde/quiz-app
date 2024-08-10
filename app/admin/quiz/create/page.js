"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createQuiz } from "@/lib/actions/quiz";

export default function CreateQuiz() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  return (
    <form
      action={async (formData) => {
        await createQuiz(formData);
        setTitle("");
        setDescription("");
        alert("Quiz created successfully");
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
      />
      <input
        type="text"
        name="description"
        placeholder="Quiz Description"
        className="p-2 border border-slate-500"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <button type="submit" className="p-2 bg-blue-500 w-fit">
        Create Quiz
      </button>
    </form>
  );
}
