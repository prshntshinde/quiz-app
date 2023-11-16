//"use client"
import Image from 'next/image'
import QuizList from '../components/QuizList'
import QuizMain from '../components/QuizMain'
import Question from '../components/Question';
import { fetchQuizzes } from '@/libs/data';
import StartButton from '../components/StartButton';
import Link from 'next/link';
import { HiPencilAlt } from 'react-icons/hi';

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">Too late...</div>;
  }

  return (
    <div className="timer">
      <div className="text">Remaining</div>
      <div className="value">{remainingTime}</div>
      <div className="text">seconds</div>
    </div>
  );
};

export default async function Quiz() {
  //const [open, setOpen] = useState(false);
  const quizzes = await fetchQuizzes();

  console.log(quizzes)
  
  
  return (
    <main>
      <p className='text-xl'>Quiz Page</p>
       {/* QuizList1 Component */}
       
       {/**/}
      {/**/}
      {quizzes.map((quiz) => (
        <div key={quiz._id} className='p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start'>
        <div>
            <h2 className='font-bold text-2xl'>{quiz.title}</h2>
            <div>{quiz.description}</div>
        </div>
        <div className='flex gap-2'>
            
            <Link href={`/quiz/${quiz._id}`} className='text-zinc-950 text-lg font-bold'>
                Start
            </Link>
            
        </div>

    </div>
      ))}
      {/*
      <h1>
        CountdownCircleTimer
        <br />
        React Component
      </h1>
      <div className="timer-wrapper">
        <CountdownCircleTimer
          isPlaying
          duration={10}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[10, 6, 3, 0]}
          onComplete={() => ({ shouldRepeat: true, delay: 1 })}
        >
          {renderTime}
        </CountdownCircleTimer>
        </div>*/}

    </main>
  )
}



