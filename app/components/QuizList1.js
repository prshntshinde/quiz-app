import StartButton from './StartButton'
import { HiPencilAlt } from 'react-icons/hi'
import Link from 'next/link'

const getQuiz = async() => {
    try {
        const res = await fetch('http://localhost:3000/api/quiz', {cache: "no-store"},);
        
        if(!res.ok) {
            throw new Error("Failed to fetch Quizzes")
        }

        return res.json();
        
    } catch (error) {
        console.log("Error while fetching Quiz", error);
    }
}

const data = await getQuiz();
console.log(data)

export default async function QuiList1() {

    
    
    return (
        {data.map((d) => (
        <div key={d._id} className='p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start'>
            <div>
                <h2 className='font-bold text-2xl'>d.title Title</h2>
                <div>Description</div>
            </div>
            <div className='flex gap-2'>
                <StartButton />
                <Link href={"/editQuiz/1"} className='text-yellow-300'>
                    <HiPencilAlt size={24} />
                </Link>
            </div>

        </div>
        ))}
    );
}

