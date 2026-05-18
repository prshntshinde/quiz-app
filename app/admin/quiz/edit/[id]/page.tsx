import { getQuizById } from "@/lib/quizzes";
import EditQuizForm from "./EditQuizForm";
import { notFound } from "next/navigation";

interface EditQuizPageProps {
  readonly params: Promise<{ id: string }>;
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

  const plainQuiz = structuredClone(quiz);

  return <EditQuizForm quiz={plainQuiz} />;
}