import { getQuizById } from "@/lib/quizzes";
import EditQuizForm from "./EditQuizForm";
import { notFound } from "next/navigation";
import PropTypes from "prop-types";

export async function generateMetadata({ params }) {
    const { id } = await params;
    const quiz = await getQuizById(id);
    return {
        title: quiz ? `Edit Quiz: ${quiz.title} | Quiz App` : "Edit Quiz | Quiz App",
    };
}

export default async function EditQuizPage({ params }) {
    const { id } = await params;
    const quiz = await getQuizById(id);

    if (!quiz) {
        notFound();
    }

    // Convert Mongoose document to a plain object for the client component
    // We use JSON.parse-stringify here because it correctly flattens Mongoose ObjectIds to strings.
    // structuredClone would preserve the ObjectId type, which React renders as [object Object].
    const plainQuiz = JSON.parse(JSON.stringify(quiz));

    return <EditQuizForm quiz={plainQuiz} />;
}

EditQuizPage.propTypes = {
    params: PropTypes.instanceOf(Promise).isRequired,
};
