import { PageHeader } from "@/app/admin/components";
import CreateQuizForm from "./CreateQuizForm";

export default function CreateQuiz() {
  return (
    <div>
      <PageHeader
        title="Create Quiz"
        breadcrumbs={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Quizzes", href: "/admin/quiz" },
          { label: "Create" },
        ]}
      />
      <div className="max-w-2xl">
        <CreateQuizForm />
      </div>
    </div>
  );
}

export function generateMetadata() {
  return {
    title: "Create Quiz | Quiz App",
  };
}