"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateQuestion } from "@/lib/actions/questions";
import { useToast } from "@/app/components/Toast";
import { FormField, Input, Textarea, Select, Button } from "@/app/admin/components";

interface QuestionDoc {
  _id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answer: number;
  explanation: string;
  quiz_id: string;
}

interface QuizOption {
  _id: string;
  title: string;
}

interface EditQuestionFormProps {
  question: QuestionDoc;
  quizzes: QuizOption[];
}

const optionLabels = ["A", "B", "C", "D"];

export default function EditQuestionForm({ question, quizzes }: Readonly<EditQuestionFormProps>) {
  const [questionText, setQuestionText] = useState(question.question);
  const [option1, setOption1] = useState(question.optionA || "");
  const [option2, setOption2] = useState(question.optionB || "");
  const [option3, setOption3] = useState(question.optionC || "");
  const [option4, setOption4] = useState(question.optionD || "");
  const [answer, setAnswer] = useState(question.answer);
  const [explanation, setExplanation] = useState(question.explanation);
  const [quizId, setQuizId] = useState(String(question.quiz_id));
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { addToast } = useToast();

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      await updateQuestion(formData);
      addToast("Question updated successfully", "success");
      router.push("/admin/questions");
    } catch (error) {
      addToast(error instanceof Error ? error.message : "Failed to update question", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <form action={handleSubmit} className="space-y-5">
        <input type="hidden" name="id" value={String(question._id)} />

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
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
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

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
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
            Update Question
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