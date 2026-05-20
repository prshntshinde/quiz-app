"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteQuiz } from "@/lib/actions/quiz";
import { useToast } from "@/app/components/Toast";
import {
  ConfirmDialog,
  Badge,
} from "../components";

interface Quiz {
  _id: string | { toString(): string };
  title: string;
  description: string;
  questionCount?: number;
  isPublished?: boolean;
}

interface QuizTableProps {
  quizzes: Quiz[];
  loading?: boolean;
}

function QuizCard({
  quiz,
  onDelete,
  isPending,
}: Readonly<{
  quiz: Quiz;
  onDelete: () => void;
  isPending: boolean;
}>) {
  const quizId = String(quiz._id);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-gray-900 truncate">
            {quiz.title}
          </h3>
          {quiz.description && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {quiz.description}
            </p>
          )}
        </div>
        {quiz.isPublished !== undefined && (
          <Badge variant={quiz.isPublished ? "success" : "neutral"} size="sm">
            {quiz.isPublished ? "Published" : "Draft"}
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-2 pt-3 border-t">
        <a
          href={`/admin/quiz/edit/${quizId}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit
        </a>
        <a
          href={`/view/${quizId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Preview
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

export default function QuizTable({ quizzes, loading = false }: Readonly<QuizTableProps>) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { addToast } = useToast();
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    quiz: Quiz | null;
  }>({ isOpen: false, quiz: null });

  const handleDeleteClick = (quiz: Quiz) => {
    setDeleteDialog({ isOpen: true, quiz });
  };

  const handleDeleteConfirm = () => {
    const quiz = deleteDialog.quiz;
    if (!quiz) return;

    startTransition(async () => {
      const formData = new FormData();
      formData.append("id", String(quiz._id));
      try {
        const result = await deleteQuiz(formData);
        addToast(result.message, "success");
        router.refresh();
      } catch {
        addToast("Failed to delete quiz", "error");
      } finally {
        setDeleteDialog({ isOpen: false, quiz: null });
      }
    });
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={`skeleton-${i}`} className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
            <div className="flex gap-2 pt-4 border-t">
              <div className="h-9 bg-gray-200 rounded flex-1"></div>
              <div className="h-9 bg-gray-200 rounded flex-1"></div>
              <div className="h-9 bg-gray-200 rounded flex-1"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (quizzes.length === 0) {
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
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No quizzes found</h3>
        <p className="text-gray-500">Create your first quiz to get started.</p>
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
                    Name
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold tracking-wide text-left text-gray-600 uppercase">
                    Description
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold tracking-wide text-right text-gray-600 uppercase sticky right-0 bg-gray-50">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {quizzes.map((quiz) => (
                  <tr key={String(quiz._id)} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 truncate max-w-md">
                          {quiz.title}
                        </span>
                        {quiz.isPublished !== undefined && (
                          <Badge variant={quiz.isPublished ? "success" : "neutral"} size="sm">
                            {quiz.isPublished ? "Published" : "Draft"}
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="block text-sm text-gray-600 max-w-xs truncate" title={quiz.description}>
                        {quiz.description || "-"}
                      </span>
                    </td>
                    <td className="px-4 py-3 sticky right-0 bg-white">
                      <div className="flex items-center justify-end gap-1">
                        <a
                          href={`/admin/quiz/edit/${quiz._id}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </a>
                        <a
                          href={`/view/${quiz._id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-green-600 hover:text-green-800 hover:bg-green-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Preview
                        </a>
                        <button
                          onClick={() => handleDeleteClick(quiz)}
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
          {quizzes.map((quiz) => (
            <QuizCard
              key={String(quiz._id)}
              quiz={quiz}
              onDelete={() => handleDeleteClick(quiz)}
              isPending={isPending}
            />
          ))}
        </div>
      </div>

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Delete Quiz"
        message={
          <>
            Are you sure you want to delete{" "}
            <strong>&ldquo;{deleteDialog.quiz?.title}&rdquo;</strong>? This action
            cannot be undone and will remove all associated questions.
          </>
        }
        confirmLabel="Delete Quiz"
        variant="danger"
        isLoading={isPending}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteDialog({ isOpen: false, quiz: null })}
      />
    </>
  );
}