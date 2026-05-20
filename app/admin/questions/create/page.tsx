import { getAllQuizzes } from "@/lib/quizzes";
import QuestionForm from "./QuestionForm";
import { PageHeader } from "@/app/admin/components";

interface QuizOption {
  _id: string;
  title: string;
}

export default async function CreateQuestionPage() {
  const quizzes = await getAllQuizzes();

  return (
    <div>
      <PageHeader
        title="Create Question"
        breadcrumbs={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Questions", href: "/admin/questions" },
          { label: "Create" },
        ]}
      />
      <div className="max-w-2xl">
        <QuestionForm quizzes={quizzes} />
      </div>
    </div>
  );
}

export function generateMetadata() {
  return {
    title: "Create Question | Quiz App",
  };
}