import Link from "next/link";
import { getAllQuizzes } from "@/lib/quizzes";
import { deleteQuiz } from "@/lib/actions/quiz";

export default async function Quiz() {
  const data = await getAllQuizzes();

  return (
    <div>
      <Link
        href="/admin/quiz/create"
        className="px-4 py-2 text-lg font-bold outline outline-offset-0 outline-1 text-zinc-950 hover:bg-blue-500 hover:text-white"
      >
        Add Quiz
      </Link>
      <br></br>
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              {data.map((quiz) => (
                <tr key={quiz._id} className="text-gray-700 dark:text-gray-400">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div>
                        <p className="font-semibold">{quiz.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{quiz.description}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-4 text-sm">
                      <Link href={`/edit/${quiz._id}`}>Edit</Link>
                      <Link href={`/view/${quiz._id}`}>Preview</Link>
                      <form action={deleteQuiz}>
                        <input type="hidden" name="id" value={`${quiz._id}`} />
                        <button
                          type="submit"
                          className="text-sm font-semibold text-red-500 hover:text-red-400"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function generateMetadata({ params }) {
  return {
    title: "Quiz | Quiz App",
  };
}
