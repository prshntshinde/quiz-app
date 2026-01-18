import { getQuizById } from "@/lib/quizzes";
import EditQuizForm from "./EditQuizForm";
import { notFound } from "next/navigation";

export default async function EditQuizPage({ params }) {
    const { id } = await params;
    const quiz = await getQuizById(id);

    if (!quiz) {
        notFound();
    }

    // Convert Mongoose document to a plain object for the client component
    const plainQuiz = JSON.parse(JSON.stringify(quiz));

    return <EditQuizForm quiz={plainQuiz} />;
}
