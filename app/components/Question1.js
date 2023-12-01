"use client"

import { useState } from "react";
import Modal from "./Modal";

export default function Question1(props) {
    console.log(props);
    const [showModal, setShowModal] = useState(false);
    return (
        <div>
            <button className="w-32 shadow-xl outline outline-offset-0 outline-1 hover:bg-blue-500 text-black font-semibold hover:text-white border-solid border-stone-50 py-2 px-4 hover:border-transparent text-6xl" onClick={() => setShowModal(true)}>{props.question_id}</button>
            <div>
                <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
                    <div>
                        <p>{props.question_id}</p>
                        <div><p>{props.question}</p></div>
                        <ul>
                            <li>{props.option1}</li>
                            <li>{props.option2}</li>
                            <li>{props.option3}</li>
                            <li>{props.option4}</li>
                        </ul>
                        <div>
                            <button className="bg-blue-500">Submit</button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )

}

