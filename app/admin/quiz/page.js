import Link from "next/link";

async function getQuizzes() {
  console.log(process.env.NEXT_PUBLIC_SITE_BASE_URL);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_BASE_URL}/api/v1/quiz`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Quiz() {
  let quizzes = {};
  quizzes = await getQuizzes();

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
              {quizzes.quizzes.map((quiz) => (
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
                      <Link href={`/delete/${quiz._id}`}>Delete</Link>
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
