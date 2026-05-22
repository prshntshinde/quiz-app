import Question from "@/app/components/Question";
import { fetchQuestions } from "@/libs/data";
import { fetchQuizzes } from "@/libs/data";
import EmptyState from "@/app/components/EmptyState";
import ErrorState from "@/app/components/ErrorState";
import Link from "next/link";
import QuizProgressIndicator from "@/app/components/QuizProgressIndicator";

interface QuestionData {
  _id: string;
  question_id: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answer: number;
  explanation: string;
}

interface QuizData {
  _id: string;
  title: string;
}

interface AnswerPageProps {
  params: Promise<{ id: string }>;
}

export default async function AnswerPage({ params }: Readonly<AnswerPageProps>) {
  const { id } = await params;

  let questions: QuestionData[] = [];
  let quiz: QuizData | null = null;
  let error: string | null = null;

  try {
    const [fetchedQuestions, fetchedQuizzes] = await Promise.all([
      fetchQuestions(id),
      fetchQuizzes(),
    ]);

    questions = fetchedQuestions as QuestionData[];
    quiz = (fetchedQuizzes as QuizData[]).find((q) => q._id === id) || null;
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load quiz questions";
  }

  if (error) {
    return (
      <main id="main-content" className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 mb-6 font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 rounded-lg px-3 py-2 -ml-3"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Quizzes
          </Link>
          <ErrorState message={error} />
        </div>
      </main>
    );
  }

  if (questions.length === 0) {
    return (
      <main id="main-content" className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 mb-6 font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 rounded-lg px-3 py-2 -ml-3"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Quizzes
          </Link>
          <EmptyState
            message="No Questions Available"
            description="This quiz doesn't have any questions yet. Check back later or contact the admin."
          />
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 mb-4 font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 rounded-lg px-3 py-2 -ml-3"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Quizzes
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                {quiz?.title || "Quiz"}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {questions.length} question{questions.length !== 1 ? "s" : ""} • Select a question to begin
              </p>
            </div>

            <QuizProgressIndicator quizId={id} totalQuestions={questions.length} />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {questions.map((q) => (
            <div key={q._id} className="pb-3" id={"q-" + q.question_id}>
              <Question
                question_id={q.question_id}
                question={q.question}
                option1={q.optionA}
                option2={q.optionB}
                option3={q.optionC}
                option4={q.optionD}
                explanation={q.explanation}
                answer={q.answer}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export function generateMetadata() {
  return {
    title: "Questions | Quiz App",
  };
}
