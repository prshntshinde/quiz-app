import { fetchQuizzes } from '@/libs/data';
import Link from 'next/link';
import RulesModal from '@/app/components/RulesModal';
import Modal from '../components/Modal';



export default async function Quiz() {

  const quizzes = await fetchQuizzes();

  console.log(quizzes)

  return (
    <main>
      <p className='text-4xl'>Quiz List</p>
      {/*<Modal isVisible={true} /> */}


      {/* Quiz List*/}
      {quizzes.map((quiz) => (
        <div key={quiz._id} className='p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start'>
          <div>
            <h2 className='font-bold text-2xl'>{quiz.title}</h2>
            <div>{quiz.description}</div>
          </div>
          <div className='flex gap-3'>
            {/* Rules Component */}
            <RulesModal />
            <Link href={`/quiz/${quiz._id}`} className='text-zinc-950 text-lg font-bold outline outline-offset-0 outline-1 hover:bg-blue-500 py-2 px-4 hover:text-white'>
              Start
            </Link>
          </div>
        </div>
      ))}
    </main>
  )
}

export function generateMetadata({ params }) {
  return {
    title: "Quiz | Quiz App"
  }
}