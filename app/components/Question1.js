"use client"

import { useEffect, useState } from "react";
import Modal from "./Modal";
import CountdownTimer from "./CountdownTimer";
import { RxCheckCircled, RxCrossCircled } from "react-icons/rx";

export default function Question1(props) {
    console.log(props);
    const [showModal, setShowModal] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answerStatus, setAnswerStatus] = useState("");

    // const onAnswerSelected = (answer, index) => {
    //     setSelectedAnswerIndex(index)

    // }

    // useEffect(() => {
    //     console.log("use effect called");
    // }, [selectedAnswer])

    // var answerStatus = "R";

    const updateSelectedAnswer = (index) => {
        setSelectedAnswer(index);
        if (props.answer === index) {
            console.log("correct answer");
            console.log(index);
            console.log("Selected Answer: ", selectedAnswer);

            // element.target.classList.add("correct")
        }
        else {
            // element.target.classList.add("wrong")
            console.log("wrong answer");
            console.log(index);
            console.log("Selected Answer: ", selectedAnswer);

        }

    }

    const checkAnswer = () => {
        // console.log("event ", e, "answer ", ans)
        // setOption(ans);
        // console.log("option ", option)
        if (props.answer === selectedAnswer) {
            // e.target.classList.add("correct");
            console.log("correct answer");
            // answerStatus = "Correct";
            setAnswerStatus("Correct");
        }
        else {
            // e.target.classList.add("wrong");
            console.log("wrong answer");
            // answerStatus = "Wrong";
            setAnswerStatus("Wrong");
        }
    }

    // const ssetSelectedAnswer = (element, ans) => {
    //     console.log("props ans ", props.answer);
    //     console.log("ans ", ans);
    //     if (props.answer === ans) {
    //         console.log("con true");
    //         element.target.classList.add("correct")
    //     }
    //     else {
    //         element.target.classList.add("wrong")
    //     }
    // }
    return (
        <div>
            <button className="w-32 shadow-xl outline outline-offset-0 outline-1 hover:bg-blue-500 text-black font-semibold hover:text-white border-solid border-stone-50 py-2 px-4 hover:border-transparent text-6xl" onClick={() => setShowModal(true)}>{props.question_id}</button>
            <div>
                <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
                    <div>
                        <div className="flex justify-center text-4xl font-semibold"><CountdownTimer /></div>

                        <div className="flex justify-center mt-3 outline outline-offset-0 outline-1 border-solid border-stone-50 py-2 px-4 mb-3 font-semibold text-2xl"><p>{props.question_id}. {props.question}</p></div>
                        <div className="grid grid-cols-2 justify-center gap-3">
                            {/* <div><button className="outline outline-offset-0 outline-1 border-solid border-stone-50 py-2 px-4 mb-3 font-semibold hover:bg-blue-500">{props.option1}</button></div>
                            <div><button className="outline outline-offset-0 outline-1 border-solid border-stone-50 py-2 px-4 mb-3 font-semibold hover:bg-blue-500">{props.option2}</button></div>
                            <div><button className="outline outline-offset-0 outline-1 border-solid border-stone-50 py-2 px-4 mb-3 font-semibold hover:bg-blue-500">{props.option3}</button></div>
                            <div><button className="outline outline-offset-0 outline-1 border-solid border-stone-50 py-2 px-4 mb-3 font-semibold hover:bg-blue-500">{props.option4}</button></div> */}

                            {/* Other implementation for answer logic*/}
                            <ul >
                                <div><li onClick={() => { updateSelectedAnswer(0) }} className="outline outline-offset-0 outline-1 border-solid border-stone-50 py-2 px-4 mb-3 font-semibold hover:bg-blue-300">{props.option1}</li></div>
                            </ul>


                            <ul >
                                <div><li onClick={() => { updateSelectedAnswer(1) }} className="outline outline-offset-0 outline-1 border-solid border-stone-50 py-2 px-4 mb-3 font-semibold hover:bg-blue-300">{props.option2}</li></div>
                            </ul>
                            <ul >
                                <div><li onClick={() => { updateSelectedAnswer(2) }} className="outline outline-offset-0 outline-1 border-solid border-stone-50 py-2 px-4 mb-3 font-semibold hover:bg-blue-300">{props.option3}</li></div>
                            </ul>
                            <ul >
                                <div><li onClick={() => { updateSelectedAnswer(3) }} className="outline outline-offset-0 outline-1 border-solid border-stone-50 py-2 px-4 mb-3 font-semibold hover:bg-blue-300">{props.option4}</li></div>
                            </ul>

                        </div>
                        <div className="flex justify-center py-2 px-4 font-semibold mb-3 animate-bounce">
                            <p className={answerStatus === "Correct" ? "text-green-600" : "text-red-600"}>{answerStatus} </p>
                            <p className="pl-1">{answerStatus === "Correct" ? <RxCheckCircled size={25} className="text-green-600" /> : answerStatus === "Wrong" ? <RxCrossCircled size={25} className="text-red-600" /> : ""} </p>
                        </div>
                        <div className="flex justify-center outline outline-offset-0 outline-1 hover:bg-blue-500 border-solid border-stone-50 py-2 px-4 font-semibold mb-3">
                            <button onClick={checkAnswer} disabled={selectedAnswer === null}>Submit</button>
                        </div>
                        <div className="flex justify-center outline outline-offset-0 outline-3 outline-yellow-500 hover:bg-yellow-200 hover:outline-dashed border-solid border-stone-50 py-2 px-4 font-semibold">
                            {props.explanation}
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )

}

