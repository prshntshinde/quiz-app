import { getQuizById } from "@/lib/quizzes";
import { notFound } from "next/navigation";
import EditQuizForm from "./EditQuizForm";
import { PageHeader } from "@/app/admin/components";

interface EditQuizPageProps {
  readonly params: Promise<{ id: string }>;
}

interface HistoryEntry {
  readonly title: string;
  readonly description?: string;
  readonly updatedAt: string;
}

interface QuizData {
  readonly _id: string;
  readonly title?: string;
  readonly description?: string;
  readonly history?: readonly HistoryEntry[];
}

export async function generateMetadata({ params }: EditQuizPageProps) {
  const { id } = await params;
  const quiz = await getQuizById(id);
  return {
    title: quiz ? `Edit Quiz: ${quiz.title} | Quiz App` : "Edit Quiz | Quiz App",
  };
}

export default async function EditQuizPage({ params }: EditQuizPageProps) {
  const { id } = await params;
  const quiz = await getQuizById(id);

  if (!quiz) {
    notFound();
  }

  const plainQuiz: QuizData = {
    _id: quiz._id,
    title: quiz.title,
    description: quiz.description,
    history: [],
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm mb-6">
        <PageHeader
          title="Edit Quiz"
          subtitle={`Editing "${quiz.title}"`}
          breadcrumbs={[
            { label: "Admin", href: "/admin/dashboard" },
            { label: "Quizzes", href: "/admin/quiz" },
            { label: quiz.title },
          ]}
          noDivider
        />
      </div>
      <EditQuizForm quiz={plainQuiz} />
    </div>
  );
}