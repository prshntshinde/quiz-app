"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createQuestion } from "@/lib/actions/questions";

export default function CreateQuiz() {
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState(0); // Assuming the correct answer is option1 by default
  const [explanation, setExplanation] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form
      action={async (formData) => {
        setIsLoading(true);
        await createQuestion(formData);
        setQuestion("");
        setOption1("");
        setOption2("");
        setOption3("");
        setOption4("");
        setExplanation("");

        alert("Question added successfully");
        router.push("/admin/questions");
      }}
      className="flex flex-col gap-4"
    >
      <textarea
        cols="40"
        name="question"
        placeholder="Question"
        className="p-2 border border-slate-500"
        onChange={(e) => setQuestion(e.target.value)}
        value={question}
        required
      />
      {/* <input
        type="text"
        name="question"
        placeholder="Question"
        className="p-2 border border-slate-500"
        onChange={(e) => setQuestion(e.target.value)}
        value={question}
        required
      /> */}
      <input
        type="text"
        name="option1"
        placeholder="Option 1"
        className="p-2 border border-slate-500"
        onChange={(e) => setOption1(e.target.value)}
        value={option1}
        required
      />

      <input
        type="text"
        name="option2"
        placeholder="Option 2"
        className="p-2 border border-slate-500"
        onChange={(e) => setOption2(e.target.value)}
        value={option2}
        required
      />

      <input
        type="text"
        name="option3"
        placeholder="Option 3"
        className="p-2 border border-slate-500"
        onChange={(e) => setOption3(e.target.value)}
        value={option3}
        required
      />

      <input
        type="text"
        name="option4"
        placeholder="Option 4"
        className="p-2 border border-slate-500"
        onChange={(e) => setOption4(e.target.value)}
        value={option4}
        required
      />

      <select
        name="answer"
        placeholder="Correct Answer"
        className="p-2 border border-slate-500"
        onChange={(e) => setAnswer(e.target.value)}
        value={answer}
        required
      >
        <option value="0">Option 1</option>
        <option value="1">Option 2</option>
        <option value="2">Option 3</option>
        <option value="3">Option 4</option>
      </select>

      <textarea
        cols="40"
        name="explanation"
        placeholder="Explanation"
        className="p-2 border border-slate-500"
        onChange={(e) => setExplanation(e.target.value)}
        value={explanation}
        required
      />

      <button type="submit" className="p-2 bg-blue-500 w-fit">
        {isLoading && "Adding..."}
        {!isLoading && "Add Question"}
      </button>
      {/* <FormSubmitButton value="Create Quiz" isLoading={isLoading} /> */}
    </form>
  );
}
