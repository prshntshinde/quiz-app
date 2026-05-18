import { getQuizById } from "@/lib/quizzes";
import EditQuizForm from "./EditQuizForm";
import { notFound } from "next/navigation";

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
    _id: quiz._id.toString(),
    title: quiz.title,
    description: quiz.description,
    history: quiz.history?.map((h) => ({
      title: h.title,
      description: h.description,
      updatedAt: h.updatedAt.toString(),
    })),
  };

  return <EditQuizForm quiz={plainQuiz} />;
}