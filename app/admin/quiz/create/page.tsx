import { PageHeader } from "@/app/admin/components";
import CreateQuizForm from "./CreateQuizForm";

export default function CreateQuiz() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm mb-6">
        <PageHeader
          title="Create Quiz"
          breadcrumbs={[
            { label: "Admin", href: "/admin/dashboard" },
            { label: "Quizzes", href: "/admin/quiz" },
            { label: "Create" },
          ]}
          noDivider
        />
      </div>
      <CreateQuizForm />
    </div>
  );
}

export function generateMetadata() {
  return {
    title: "Create Quiz | Quiz App",
  };
}