"use client"

import { useState } from "react";
import Modal from "./Modal";
import CountdownTimer from "./CountdownTimer";

export default function Question1(props) {
    console.log(props);
    const [showModal, setShowModal] = useState(false);
    return (
        <div>
            <button className="w-32 shadow-xl outline outline-offset-0 outline-1 hover:bg-blue-500 text-black font-semibold hover:text-white border-solid border-stone-50 py-2 px-4 hover:border-transparent text-6xl" onClick={() => setShowModal(true)}>{props.question_id}</button>
            <div>
                <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
                    <div>
                        <div className="flex justify-center text-4xl font-semibold"><CountdownTimer /></div>

                        <div className="flex justify-center mt-3 outline outline-offset-0 outline-1 border-solid border-stone-50 py-2 px-4 mb-3 font-semibold text-2xl"><p>{props.question}</p></div>
                        <div className="grid grid-cols-2 justify-center">
                            <div><button className="outline outline-offset-0 outline-1 border-solid border-stone-50 py-2 px-4 mb-3 font-semibold">{props.option1}</button></div>
                            <div><button className="outline outline-offset-0 outline-1 border-solid border-stone-50 py-2 px-4 mb-3 font-semibold">{props.option2}</button></div>
                            <div><button className="outline outline-offset-0 outline-1 border-solid border-stone-50 py-2 px-4 mb-3 font-semibold">{props.option3}</button></div>
                            <div><button className="outline outline-offset-0 outline-1 border-solid border-stone-50 py-2 px-4 mb-3 font-semibold">{props.option4}</button></div>

                        </div>
                        <div className="flex justify-center outline outline-offset-0 outline-1 hover:bg-blue-500 border-solid border-stone-50 py-2 px-4 font-semibold">
                            <button className="">Submit</button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )

}

