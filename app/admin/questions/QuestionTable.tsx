"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteQuestion } from "@/lib/actions/questions";
import { useToast } from "@/app/components/Toast";
import {
  ConfirmDialog,
  Badge,
} from "../components";

interface Question {
  _id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answer: number;
  quiz_id: string;
}

interface QuizMap {
  [key: string]: string;
}

interface QuestionTableProps {
  questions: Question[];
  quizMap: QuizMap;
  loading?: boolean;
}

const optionLabels = ["A", "B", "C", "D"];

function QuestionCard({
  question,
  quizName,
  onEdit,
  onDelete,
  isPending,
}: Readonly<{
  question: Question;
  quizName: string;
  onEdit: () => void;
  onDelete: () => void;
  isPending: boolean;
}>) {
  const options = [question.optionA, question.optionB, question.optionC, question.optionD];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-500 mb-1">
            {quizName}
          </p>
          <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
            {question.question}
          </h3>
        </div>
        <Badge variant="success" size="sm">
          {optionLabels[question.answer]}
        </Badge>
      </div>

      <div className="space-y-1.5 mb-4">
        {options.map((opt, idx) => (
          <div
            key={`option-${idx}`}
            className={`flex items-center gap-2 text-sm ${
              idx === question.answer ? "text-green-700 font-medium" : "text-gray-600"
            }`}
          >
            <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium ${
              idx === question.answer ? "bg-green-100" : "bg-gray-100"
            }`}>
              {optionLabels[idx]}
            </span>
            <span className="truncate">{opt}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 pt-3 border-t">
        <a
          href={`/admin/questions/${question._id}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit
        </a>
        <button
          onClick={onDelete}
          disabled={isPending}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
}

export default function QuestionTable({
  questions,
  quizMap,
  loading = false,
}: Readonly<QuestionTableProps>) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { addToast } = useToast();
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    question: Question | null;
  }>({ isOpen: false, question: null });

  const handleDeleteClick = (question: Question) => {
    setDeleteDialog({ isOpen: true, question });
  };

  const handleDeleteConfirm = () => {
    const question = deleteDialog.question;
    if (!question) return;

    startTransition(async () => {
      const formData = new FormData();
      formData.append("id", question._id);
      try {
        const result = await deleteQuestion(formData);
        addToast(result.message, "success");
        router.refresh();
      } catch {
        addToast("Failed to delete question", "error");
      } finally {
        setDeleteDialog({ isOpen: false, question: null });
      }
    });
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={`skeleton-${i}`} className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t">
              <div className="h-9 bg-gray-200 rounded flex-1"></div>
              <div className="h-9 bg-gray-200 rounded flex-1"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-12 bg-white border border-gray-200 rounded-lg">
        <svg
          className="w-16 h-16 mx-auto text-gray-300 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No questions found</h3>
        <p className="text-gray-500">Create your first question to get started.</p>
      </div>
    );
  }

  return (
    <>
      <div className="hidden lg:block">
        <div className="w-full overflow-hidden rounded-lg shadow-sm border border-gray-200">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-xs font-semibold tracking-wide text-left text-gray-600 uppercase w-full">
                    Question
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold tracking-wide text-left text-gray-600 uppercase">
                    Quiz
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold tracking-wide text-left text-gray-600 uppercase">
                    Answer
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold tracking-wide text-right text-gray-600 uppercase sticky right-0 bg-gray-50">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {questions.map((question) => (
                  <tr key={question._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <span className="block text-sm font-medium text-gray-900 max-w-md truncate">
                        {question.question}
                      </span>
                      <span className="block text-xs text-gray-500 mt-0.5">
                        A: {question.optionA} | B: {question.optionB} | C: {question.optionC} | D: {question.optionD}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="info" size="sm">
                        {quizMap[question.quiz_id] || "Unknown"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="success" size="sm">
                        {optionLabels[question.answer]}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 sticky right-0 bg-white">
                      <div className="flex items-center justify-end gap-1">
                        <a
                          href={`/admin/questions/${question._id}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </a>
                        <button
                          onClick={() => handleDeleteClick(question)}
                          disabled={isPending}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {questions.map((question) => (
            <QuestionCard
              key={question._id}
              question={question}
              quizName={quizMap[question.quiz_id] || "Unknown Quiz"}
              onEdit={() => {}}
              onDelete={() => handleDeleteClick(question)}
              isPending={isPending}
            />
          ))}
        </div>
      </div>

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Delete Question"
        message={
          <>
            Are you sure you want to delete this question?{" "}
            <strong>&ldquo;{deleteDialog.question?.question.slice(0, 50)}...&rdquo;</strong>
          </>
        }
        confirmLabel="Delete Question"
        variant="danger"
        isLoading={isPending}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteDialog({ isOpen: false, question: null })}
      />
    </>
  );
}