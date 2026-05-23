import Link from "next/link";
import { getAllQuizzesPaginated } from "@/lib/quizzes";
import { PageHeader, Pagination } from "@/app/admin/components";
import QuizTable from "./QuizTable";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Quiz({ searchParams }: Readonly<PageProps>) {
  const params = await searchParams;
  const page = Math.max(1, Number.parseInt(params.page || "1", 10) || 1);
  const { quizzes, total, totalPages } = await getAllQuizzesPaginated(page, 10);

  return (
    <div>
      <PageHeader
        title="Quizzes"
        subtitle={`${total} total quiz${total === 1 ? "" : "zes"}`}
        breadcrumbs={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Quizzes" },
        ]}
        actions={
          <Link
            href="/admin/quiz/create"
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
            Add Quiz
          </Link>
        }
      />

      <QuizTable quizzes={quizzes} />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        baseUrl="/admin/quiz"
      />
    </div>
  );
}

export function generateMetadata() {
  return {
    title: "Quiz | Quiz App",
  };
}