"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createQuestion } from "@/lib/actions/questions";
import FormSubmitButton from "@/app/components/forms/FormSubmitButton";

interface QuizOption {
  _id: string;
  title: string;
}

interface QuestionFormProps {
  quizzes: QuizOption[];
}

export default function QuestionForm({ quizzes }: QuestionFormProps) {
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState(0);
  const [explanation, setExplanation] = useState("");
  const [quizId, setQuizId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <form
      action={async (formData) => {
        setIsLoading(true);
        try {
          await createQuestion(formData);
          alert("Question created successfully");
          router.push("/admin/questions");
        } catch (error) {
          alert(error instanceof Error ? error.message : "Failed to create question");
        } finally {
          setIsLoading(false);
        }
      }}
      className="flex flex-col gap-4 max-w-2xl"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="quiz_id" className="font-semibold text-gray-700">
          Select Quiz <span className="text-red-500">*</span>
        </label>
        <select
          name="quiz_id"
          id="quiz_id"
          value={quizId}
          onChange={(e) => setQuizId(e.target.value)}
          className="p-2 border border-slate-500"
          required
        >
          <option value="">Select a quiz</option>
          {quizzes.map((quiz) => (
            <option key={String(quiz._id)} value={String(quiz._id)}>
              {quiz.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="question" className="font-semibold text-gray-700">
          Question <span className="text-red-500">*</span>
        </label>
        <textarea
          name="question"
          id="question"
          placeholder="Enter your question"
          className="p-2 border border-slate-500"
          rows={3}
          onChange={(e) => setQuestion(e.target.value)}
          value={question}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="option1" className="font-semibold text-gray-700">
          Option 1 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="option1"
          id="option1"
          placeholder="First option"
          className="p-2 border border-slate-500"
          onChange={(e) => setOption1(e.target.value)}
          value={option1}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="option2" className="font-semibold text-gray-700">
          Option 2 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="option2"
          id="option2"
          placeholder="Second option"
          className="p-2 border border-slate-500"
          onChange={(e) => setOption2(e.target.value)}
          value={option2}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="option3" className="font-semibold text-gray-700">
          Option 3 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="option3"
          id="option3"
          placeholder="Third option"
          className="p-2 border border-slate-500"
          onChange={(e) => setOption3(e.target.value)}
          value={option3}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="option4" className="font-semibold text-gray-700">
          Option 4 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="option4"
          id="option4"
          placeholder="Fourth option"
          className="p-2 border border-slate-500"
          onChange={(e) => setOption4(e.target.value)}
          value={option4}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="answer" className="font-semibold text-gray-700">
          Correct Answer <span className="text-red-500">*</span>
        </label>
        <select
          name="answer"
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(parseInt(e.target.value, 10))}
          className="p-2 border border-slate-500"
          required
        >
          <option value="0">{option1 || "Option 1"}</option>
          <option value="1">{option2 || "Option 2"}</option>
          <option value="2">{option3 || "Option 3"}</option>
          <option value="3">{option4 || "Option 4"}</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="explanation" className="font-semibold text-gray-700">
          Explanation
        </label>
        <textarea
          name="explanation"
          id="explanation"
          placeholder="Explain why this is the correct answer"
          className="p-2 border border-slate-500"
          rows={3}
          onChange={(e) => setExplanation(e.target.value)}
          value={explanation}
        />
      </div>

      <FormSubmitButton value="Create Question" isLoading={isLoading} />
    </form>
  );
}