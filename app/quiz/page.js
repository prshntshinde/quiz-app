import { fetchQuizzes } from "@/libs/data";
import Link from "next/link";
import RulesModal from "@/app/components/RulesModal";

export default async function Quiz() {
  const quizzes = await fetchQuizzes();

  // console.log(quizzes);

  return (
    <main>
      <p className="text-4xl">Quiz List</p>
      {/*<Modal isVisible={true} /> */}

      {/* Quiz List*/}
      {quizzes.map((quiz) => (
        <div
          key={quiz._id}
          className="flex items-start justify-between gap-5 p-4 my-3 border border-slate-300"
        >
          <div>
            <h2 className="text-2xl font-bold">{quiz.title}</h2>
            <div>{quiz.description}</div>
          </div>
          <div className="flex gap-3">
            {/* Rules Component */}
            <RulesModal />
            <Link
              href={`/quiz/${quiz._id}`}
              className="px-4 py-2 text-lg font-bold text-zinc-950 outline outline-offset-0 outline-1 hover:bg-blue-500 hover:text-white"
            >
              Start
            </Link>
          </div>
        </div>
      ))}
    </main>
  );
}

export function generateMetadata({ params }) {
  return {
    title: "Quiz | Quiz App",
  };
}
