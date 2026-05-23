import Link from "next/link";
import { getAllQuestions } from "@/lib/questions";
import { getAllQuizzes } from "@/lib/quizzes";
import { PageHeader, Pagination } from "@/app/admin/components";
import QuestionTable from "./QuestionTable";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Questions({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1", 10) || 1);
  const { questions, total, totalPages } = await getAllQuestions(page, 10);
  const quizzes = await getAllQuizzes();

  const quizMap = Object.fromEntries(quizzes.map((q) => [q._id, q.title]));

  return (
    <div>
      <PageHeader
        title="Questions"
        subtitle={`${total} total question${total > 1 ? "s" : ""} across ${quizzes.length} quiz${quizzes.length > 1 ? "zes" : ""}`}
        breadcrumbs={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Questions" },
        ]}
        actions={
          <Link
            href="/admin/questions/create"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Question
          </Link>
        }
      />

      <QuestionTable questions={questions} quizMap={quizMap} />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        baseUrl="/admin/questions"
      />
    </div>
  );
}

export function generateMetadata() {
  return {
    title: "Questions | Quiz App",
  };
}