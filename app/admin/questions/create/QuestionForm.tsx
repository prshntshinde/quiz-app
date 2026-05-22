"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createQuestion } from "@/lib/actions/questions";
import { useToast } from "@/app/components/Toast";
import { FormField, Input, Textarea, Select, Button } from "@/app/admin/components";

interface QuizOption {
  _id: string;
  title: string;
}

interface QuestionFormProps {
  quizzes: QuizOption[];
}

export default function QuestionForm({ quizzes }: Readonly<QuestionFormProps>) {
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
  const { addToast } = useToast();

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      await createQuestion(formData);
      addToast("Question created successfully", "success");
      router.push("/admin/questions");
    } catch (error) {
      addToast(error instanceof Error ? error.message : "Failed to create question", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
      <form action={handleSubmit} className="space-y-5">
        <FormField
          label="Select Quiz"
          htmlFor="quiz_id"
          required
          hint="Choose which quiz this question belongs to"
        >
          <Select
            name="quiz_id"
            id="quiz_id"
            value={quizId}
            onChange={(e) => setQuizId(e.target.value)}
            required
          >
            <option value="">Select a quiz</option>
            {quizzes.map((quiz) => (
              <option key={String(quiz._id)} value={String(quiz._id)}>
                {quiz.title}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField
          label="Question"
          htmlFor="question"
          required
          hint="Enter the question text"
        >
          <Textarea
            name="question"
            id="question"
            placeholder="Enter your question"
            rows={3}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Option A" htmlFor="option1" required>
            <Input
              type="text"
              name="option1"
              id="option1"
              placeholder="First option"
              value={option1}
              onChange={(e) => setOption1(e.target.value)}
              required
            />
          </FormField>

          <FormField label="Option B" htmlFor="option2" required>
            <Input
              type="text"
              name="option2"
              id="option2"
              placeholder="Second option"
              value={option2}
              onChange={(e) => setOption2(e.target.value)}
              required
            />
          </FormField>

          <FormField label="Option C" htmlFor="option3" required>
            <Input
              type="text"
              name="option3"
              id="option3"
              placeholder="Third option"
              value={option3}
              onChange={(e) => setOption3(e.target.value)}
              required
            />
          </FormField>

          <FormField label="Option D" htmlFor="option4" required>
            <Input
              type="text"
              name="option4"
              id="option4"
              placeholder="Fourth option"
              value={option4}
              onChange={(e) => setOption4(e.target.value)}
              required
            />
          </FormField>
        </div>

        <FormField
          label="Correct Answer"
          htmlFor="answer"
          required
          hint="Select the correct answer"
        >
          <Select
            name="answer"
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(parseInt(e.target.value, 10))}
            required
          >
            <option value="0">{option1 || "Option A"}</option>
            <option value="1">{option2 || "Option B"}</option>
            <option value="2">{option3 || "Option C"}</option>
            <option value="3">{option4 || "Option D"}</option>
          </Select>
        </FormField>

        <FormField
          label="Explanation"
          htmlFor="explanation"
          hint="Optional: Explain why this is the correct answer (shown after answering)"
        >
          <Textarea
            name="explanation"
            id="explanation"
            placeholder="Explain why this is the correct answer"
            rows={3}
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
          />
        </FormField>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t dark:border-gray-700">
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
            Create Question
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push("/admin/questions")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}