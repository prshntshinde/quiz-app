import { fetchQuizzes } from "@/libs/data";
import QuizCard from "@/app/components/QuizCard";
import EmptyState from "@/app/components/EmptyState";

export default async function Quiz() {
  const quizzes = await fetchQuizzes();

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      {/* Page Header */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
            <span className="block mb-2">Choose Your</span>
            <span className="block bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Challenge
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Select a quiz below to test your knowledge and track your progress
          </p>
        </div>
      </section>

      {/* Quiz List */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {quizzes && quizzes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {quizzes.map((quiz) => (
                <QuizCard key={quiz._id} quiz={quiz} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </section>
    </main>
  );
}

export function generateMetadata({ params }) {
  return {
    title: "Available Quizzes - Quiz App | Test Your Knowledge",
    description: "Browse and select from our collection of quizzes. Challenge yourself and track your progress across various topics.",
  };
}
