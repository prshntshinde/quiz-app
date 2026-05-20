import { notFound } from "next/navigation";
import { getQuestionById } from "@/lib/questions";
import { getAllQuizzes } from "@/lib/quizzes";
import EditQuestionForm from "./EditQuestionForm";
import { PageHeader } from "@/app/admin/components";

interface QuizOption {
  _id: string;
  title: string;
}

interface QuestionDoc {
  _id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answer: number;
  explanation: string;
  quiz_id: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const question = await getQuestionById(id);
  return {
    title: question ? `Edit Question | Quiz App` : "Question Not Found | Quiz App",
  };
}

export default async function EditQuestionPage({ params }: PageProps) {
  const { id } = await params;
  const [question, quizzes] = await Promise.all([
    getQuestionById(id),
    getAllQuizzes(),
  ]);

  if (!question) {
    notFound();
  }

  const plainQuestion: QuestionDoc = {
    _id: String(question._id),
    question: question.question,
    optionA: question.optionA,
    optionB: question.optionB,
    optionC: question.optionC,
    optionD: question.optionD,
    answer: question.answer,
    explanation: question.explanation,
    quiz_id: String(question.quiz_id),
  };

  return (
    <div>
      <PageHeader
        title="Edit Question"
        breadcrumbs={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Questions", href: "/admin/questions" },
          { label: "Edit" },
        ]}
      />
      <div className="max-w-2xl">
        <EditQuestionForm question={plainQuestion} quizzes={quizzes} />
      </div>
    </div>
  );
}