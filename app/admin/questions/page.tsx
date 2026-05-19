import Link from "next/link";
import { getAllQuestions } from "@/lib/questions";
import { getAllQuizzes } from "@/lib/quizzes";
import DeleteQuestionButton from "./DeleteQuestionButton";

export const dynamic = "force-dynamic";

interface QuestionItem {
  _id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answer: number;
  quiz_id: string;
}

interface QuizItem {
  _id: string;
  title: string;
}

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Questions({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const { questions, total, totalPages } = await getAllQuestions(page, 10);
  const quizzes = await getAllQuizzes();

  const quizMap = new Map(quizzes.map((q) => [q._id, q.title]));

  return (
    <div>
      <Link
        href="/admin/questions/create"
        className="px-4 py-2 text-lg font-bold outline outline-offset-0 outline-1 text-zinc-950 hover:bg-blue-500 hover:text-white"
      >
        Add Question
      </Link>
      <br></br>
      {questions.length === 0 ? (
        <p className="mt-4 text-gray-500">No questions found.</p>
      ) : (
        <>
          <div className="w-full overflow-hidden rounded-lg shadow-xs">
            <div className="w-full overflow-x-auto">
              <table className="w-full whitespace-no-wrap">
                <thead>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                    <th className="px-4 py-3">Question</th>
                    <th className="px-4 py-3">Quiz</th>
                    <th className="px-4 py-3">Option 1</th>
                    <th className="px-4 py-3">Option 2</th>
                    <th className="px-4 py-3">Option 3</th>
                    <th className="px-4 py-3">Option 4</th>
                    <th className="px-4 py-3">Answer</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y">
                  {questions.map((question: QuestionItem) => (
                    <tr key={question._id} className="text-gray-700">
                      <td className="px-4 py-3 text-sm max-w-xs truncate">
                        {question.question}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {quizMap.get(question.quiz_id) || "Unknown"}
                      </td>
                      <td className="px-4 py-3 text-sm">{question.optionA || "-"}</td>
                      <td className="px-4 py-3 text-sm">{question.optionB || "-"}</td>
                      <td className="px-4 py-3 text-sm">{question.optionC || "-"}</td>
                      <td className="px-4 py-3 text-sm">{question.optionD || "-"}</td>
                      <td className="px-4 py-3 text-sm">
                        {["A", "B", "C", "D"][question.answer] || "-"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-4 text-sm">
                          <Link
                            href={`/admin/questions/${question._id}`}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            Edit
                          </Link>
                          <DeleteQuestionButton
                            id={question._id}
                            question={question.question}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              {page > 1 && (
                <Link
                  href={`/admin/questions?page=${page - 1}`}
                  className="px-3 py-1 border rounded hover:bg-gray-100"
                >
                  Previous
                </Link>
              )}
              <span className="text-sm">
                Page {page} of {totalPages}
              </span>
              {page < totalPages && (
                <Link
                  href={`/admin/questions?page=${page + 1}`}
                  className="px-3 py-1 border rounded hover:bg-gray-100"
                >
                  Next
                </Link>
              )}
            </div>
          )}
          <p className="mt-2 text-sm text-gray-500 text-center">
            Total: {total} question{total !== 1 ? "s" : ""}
          </p>
        </>
      )}
    </div>
  );
}

export function generateMetadata() {
  return {
    title: "Questions | Quiz App",
  };
}