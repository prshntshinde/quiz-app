import Image from 'next/image'
import QuizList from '../components/QuizList'

export default function Quiz() {
  return (
    <main>
      <p className='text-xl'>Quiz Page</p>
      <QuizList/>
      
    </main>
  )
}

export const metadata = {
    title: 'Quiz',
  }

