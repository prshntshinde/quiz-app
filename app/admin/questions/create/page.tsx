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
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm mb-6">
        <PageHeader
          title="Create Question"
          breadcrumbs={[
            { label: "Admin", href: "/admin/dashboard" },
            { label: "Questions", href: "/admin/questions" },
            { label: "Create" },
          ]}
          noDivider
        />
      </div>
      <QuestionForm quizzes={quizzes} />
    </div>
  );
}

export function generateMetadata() {
  return {
    title: "Create Question | Quiz App",
  };
}