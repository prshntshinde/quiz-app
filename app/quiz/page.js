import Image from 'next/image'
import QuizList from '../components/QuizList'
import QuizMain from '../components/QuizMain'

export default function Quiz() {
  return (
    <main>
      <p className='text-xl'>Quiz Page</p>
      <QuizList/>
      <QuizMain />
    </main>
  )
}

export const metadata = {
    title: 'Quiz',
  }

