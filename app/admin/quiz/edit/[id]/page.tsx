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
    <div>
      <PageHeader
        title="Edit Quiz"
        subtitle={`Editing "${quiz.title}"`}
        breadcrumbs={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Quizzes", href: "/admin/quiz" },
          { label: quiz.title },
        ]}
      />
      <div className="max-w-2xl">
        <EditQuizForm quiz={plainQuiz} />
      </div>
    </div>
  );
}