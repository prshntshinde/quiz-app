"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateQuiz() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_BASE_URL}/api/v1/quiz`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
          }),
        }
      );

      if (res.ok) {
        router.push("/admin/quiz");
      } else {
        throw new Error("Failed to create quiz");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Quiz Title"
        className="p-2 border border-slate-500"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <input
        type="text"
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
