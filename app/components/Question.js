"use client"

import { VscClose } from "react-icons/vsc";
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
  
const Question = ({open,onClose,children}) =>{
return(
    <div onClick={onClose} className={` fixed inset-0 flex justify-center items-center
                                        transition-colors
                                        ${open ? "visible bg-black/20":"invisible"}`}>

    
    {/* modal */}
       <div
       onClick={(e) => e.stopPropagation()} 
       className={`bg-white rounded-xl shadow p-6 transition-all
       ${open ? "scale-100 opacity-100":"scale-125 opacity-0"}
       `}> 
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
       <button
       onClick={onClose} 
       className="absolute top-2 right-2 p-1 rounded-lg
                        text-red-600 bg-white hover:bg-gray-50
                        hover:text-red-900 mb-10">

        <VscClose />
       </button>
        {children}
       </div>
       <div>
        <button className=" shadow-xl outline outline-offset-0 outline-1 hover:bg-blue-500 text-black font-semibold hover:text-white border-solid border-stone-50 py-2 px-4 hover:border-transparent " onClick={() => alert("Question Id is: OK")}>Question ID</button>
    </div>
    </div>    
)
}
export default Question;