"use client"
import Image from 'next/image'
import QuizList from '../components/QuizList'
import QuizMain from '../components/QuizMain'
import { CountdownCircleTimer } from "react-countdown-circle-timer";

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
  
  return (
    <main>
      <p className='text-xl'>Quiz Page</p>
      <QuizList/>
      <QuizList/>
      <QuizList/>
      <QuizList/>
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



