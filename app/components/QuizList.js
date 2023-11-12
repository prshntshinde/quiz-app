import React from 'react'
import StartButton from './StartButton'
import { HiPencilAlt} from 'react-icons/hi'
import Link from 'next/link'

const QuizList = () => {
    return (
        <div className='p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start'>
            <div>
                <h2 className='font-bold text-2xl'>Quiz Title</h2>
                <div>Quiz Description</div>
            </div>
            <div className='flex gap-2'>
                <StartButton />
                <Link href={"/editQuiz/1"} className='text-yellow-300'>
                    <HiPencilAlt size={24} />
                </Link>
            </div>

        </div>
    )
}

export default QuizList