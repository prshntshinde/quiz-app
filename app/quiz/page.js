"use client"
import Image from 'next/image'
import QuizList from '../components/QuizList'
import QuizMain from '../components/QuizMain'
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Question from '../components/Question';
import { useState } from 'react';

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

export default function Quiz() {
  const [open, setOpen] = useState(false);
  
  return (
    <main>
      <p className='text-xl'>Quiz Page</p>
      {/**/}
      
      <button className='bg-amber-400 border-spacing-2 p-2 rounded-6 font-bold' onClick={() => setOpen(true)}>
        Question 1
      </button>
      <Question open={open} onClose={()=>setOpen(false)}>
        {/* <FaTrash size={56} className='mx-auto text-red-500'/> */}
        <div className='mt-4'>
        <h1 className='font-bold text-4xl'>1. लीप इयर मध्ये एकूण किती दिवस असतात? लीप इयर मध्ये एकूण किती दिवस असतात?</h1>
        <h3 className='text-3xl'>A. 366</h3> 
        <h3 className='text-3xl'>B. 365</h3>
        <h3 className='text-3xl'>C. 360</h3>
        <h3 className='text-3xl'>D. यांपैकी नाही</h3>
        </div>
        <div className='flex gap-4 mt-4'>
        <button
          onClick={() => setOpen(false)} 
          className='bg-red-500 font-bold rounded-lg p-2 text-gray-50 w-full'>
          Cancel
        </button>
        <button 
          className='bg-green-500 font-bold rounded-lg p-2 text-gray-50 w-full'>
          Submit
        </button>
        </div>
      </Question>
      <QuizMain />
      
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
        </div>

    </main>
  )
}



