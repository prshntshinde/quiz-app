"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";
import CountdownTimer from "./CountdownTimer";
import { RxCheckCircled, RxCrossCircled } from "react-icons/rx";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { TbMath1Divide2 } from "react-icons/tb";

export default function Question1(props) {
  // console.log(props);
  const [showModal, setShowModal] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerStatus, setAnswerStatus] = useState("");
  const [showExplanation, setShowExplanation] = useState("hidden");

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
      // console.log("correct answer");
      // console.log(index);
      // console.log("Selected Answer: ", selectedAnswer);
      // element.target.classList.add("correct")
    } else {
      // element.target.classList.add("wrong")
      // console.log("wrong answer");
      // console.log(index);
      // console.log("Selected Answer: ", selectedAnswer);
    }
  };

  const checkAnswer = () => {
    // console.log("event ", e, "answer ", ans)
    // setOption(ans);
    // console.log("option ", option)
    if (props.answer === selectedAnswer) {
      var e = document.getElementById(selectedAnswer);
      e.classList.add("correct");
      // console.log("correct answer");
      // answerStatus = "Correct";
      setAnswerStatus("Correct");
      setShowExplanation("visible");
      document.getElementById("clock-audio").pause();
      document.getElementById("q-" + props.question_id).classList.add("hide");
      //document.getElementById("q-" + props.question_id).style.display = "none";
      // element1.target.classList.add("hide");
    } else {
      var e = document.getElementById(selectedAnswer);
      e.classList.add("wrong");
      // console.log("wrong answer");
      // answerStatus = "Wrong";
      setAnswerStatus("Wrong");
      setShowExplanation("visible");
    }
  };

  const fifty_fifty = () => {
    let listIndex = [0, 1, 2, 3]; // 4 values
    // console.log(listIndex);
    listIndex.splice(props.answer, 1); // 3 values - correct answer removed
    // console.log(listIndex);
    let randomNumber = Math.floor(Math.random() * listIndex.length);
    //alert(listIndex[randomNumber]);
    document
      .getElementById(listIndex[randomNumber])
      .classList.add("fifty_fifty");

    // console.log(listIndex);
    listIndex.splice(randomNumber, 1);
    // console.log(listIndex);
    let randomNumber1 = Math.floor(Math.random() * listIndex.length);
    //alert(listIndex[randomNumber1]);
    document
      .getElementById(listIndex[randomNumber1])
      .classList.add("fifty_fifty");
    // console.log(listIndex);
  };

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
      <button
        // id={props.question_id}
        className="w-32 shadow-xl outline outline-offset-0 outline-1 hover:bg-blue-500 text-black font-semibold hover:text-white border-solid border-stone-50 py-2 px-4 hover:border-transparent text-6xl"
        onClick={() => setShowModal(true)}
      >
        {props.question_id}
      </button>
      <div>
        <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
          <div>
            {/* <div className="flex justify-center text-4xl font-semibold">
              <CountdownTimer />
            </div> */}
            {/* <div className="flex justify-center">
              <button
                onClick={fifty_fifty}
                className=" mt-3 outline outline-offset-0 outline-1 border-solid border-stone-50 font-semibold bg-yellow-200"
              >
                50:50
              </button>
            </div> */}

            {/* <div className="flex justify-center mt-3 outline outline-offset-0 outline-1 border-solid border-stone-50 py-2 px-4 mb-3 font-semibold text-3xl">
              <p>
                {props.question_id}. {props.question}
              </p>
            </div> */}

            <div className="grid grid-cols-12 gap-1 text-3xl text-center py-2 mb-3 font-semibold outline outline-offset-1 outline-2 outline-green-500 rounded shadow-2xl">
              <div className="bg-yellow-0 m-auto">{props.question_id}.</div>
              <div className="bg-green-0 col-span-11  m-auto">
                {props.question}
              </div>
              {/* <p>
                {props.question_id}. {props.question}
              </p> */}
            </div>
            <div className="grid grid-cols-2 justify-center gap-3">
              {/* <div><button className="outline outline-offset-0 outline-1 border-solid border-stone-50 py-2 px-4 mb-3 font-semibold hover:bg-blue-500">{props.option1}</button></div>
                            <div><button className="outline outline-offset-0 outline-1 border-solid border-stone-50 py-2 px-4 mb-3 font-semibold hover:bg-blue-500">{props.option2}</button></div>
                            <div><button className="outline outline-offset-0 outline-1 border-solid border-stone-50 py-2 px-4 mb-3 font-semibold hover:bg-blue-500">{props.option3}</button></div>
                            <div><button className="outline outline-offset-0 outline-1 border-solid border-stone-50 py-2 px-4 mb-3 font-semibold hover:bg-blue-500">{props.option4}</button></div> */}

              {/* Other implementation for answer logic*/}
              {/* <ul>
                <div>
                  <li
                    id="0"
                    onClick={() => {
                      updateSelectedAnswer(0);
                    }}
                    className={
                      selectedAnswer === 0
                        ? "bg-blue-300 outline outline-offset-0 outline-1 border-solid border-stone-50 py-2 px-4 mb-3 font-semibold text-2xl"
                        : "" +
                          "outline outline-offset-0 outline-1 border-solid border-stone-50 py-2 px-4 mb-3 font-semibold text-2xl"
                    }
                  >
                    A. <span> </span>
                    {props.option1}
                  </li>
                </div>
              </ul> */}

              {/* <ul>
                <div>
                  <li
                    id="1"
                    onClick={() => {
                      updateSelectedAnswer(1);
                    }}
                    className={
                      selectedAnswer === 1
                        ? "bg-blue-300 outline outline-offset-0 outline-1 border-solid border-stone-50 py-2 px-4 mb-3 font-semibold text-2xl"
                        : "" +
                          "outline outline-offset-0 outline-1 border-solid border-stone-50 py-2 px-4 mb-3 font-semibold text-2xl"
                    }
                  >
                    B. <span> </span>
                    {props.option2}
                  </li>
                </div>
              </ul> */}
              {/* <ul>
                <div>
                  <li
                    id="2"
                    onClick={() => {
                      updateSelectedAnswer(2);
                    }}
                    className={
                      selectedAnswer === 2
                        ? "bg-blue-300 outline outline-offset-0 outline-1 border-solid border-stone-50 py-2 px-4 mb-3 font-semibold text-2xl"
                        : "" +
                          "outline outline-offset-0 outline-1 border-solid border-stone-50 py-2 px-4 mb-3 font-semibold text-2xl"
                    }
                  >
                    C. <span> </span>
                    {props.option3}
                  </li>
                </div>
              </ul> */}
              {/* <ul>
                <div>
                  <li
                    id="3"
                    onClick={() => {
                      updateSelectedAnswer(3);
                    }}
                    className={
                      selectedAnswer === 3
                        ? "bg-blue-300 outline outline-offset-0 outline-1 border-solid border-stone-50 py-2 px-4 mb-3 font-semibold text-2xl"
                        : "" +
                          "outline outline-offset-0 outline-1 border-solid border-stone-50 py-2 px-4 mb-3 font-semibold text-2xl"
                    }
                  >
                    D. <span> </span>
                    {props.option4}
                  </li>
                </div>
              </ul> */}
            </div>
            <div className="flex justify-center py-2 px-4 font-semibold mb-3 animate-bounce">
              <p
                className={
                  answerStatus === "Correct" ? "text-green-600" : "text-red-600"
                }
              >
                {answerStatus}{" "}
              </p>
              <p className="pl-1">
                {answerStatus === "Correct" ? (
                  <RxCheckCircled size={25} className="text-green-600" />
                ) : answerStatus === "Wrong" ? (
                  <RxCrossCircled size={25} className="text-red-600" />
                ) : (
                  ""
                )}{" "}
              </p>
            </div>

            {/* Add Options grid */}
            <div
              id="answersGrid"
              className="grid grid-cols-12 text-left gap-4 font-semibold text-3xl"
            >
              <div className="col-span-5 flex outline outline-1 outline-cyan-500 rounded place-items-center gap-1">
                <div className="">&nbsp; A.</div>
                <div className="">{props.option1}</div>
              </div>

              <div className="row-span-2 col-start-6">
                <CountdownTimer />
              </div>
              <div className="col-start-8 col-span-5 flex outline outline-1 outline-cyan-500 rounded place-items-center gap-1">
                <div className="">&nbsp; B.</div>
                <div className="">{props.option2}</div>
              </div>

              <div className="col-span-5  flex outline outline-1 outline-cyan-500 rounded place-items-center gap-1">
                <div className="">&nbsp; C.</div>
                <div className="">{props.option3}</div>
              </div>
              <div className="col-start-8 col-span-5 flex outline outline-1 outline-cyan-500 rounded place-items-center gap-1">
                <div className="">&nbsp; D.</div>
                <div className="">{props.option4}</div>
              </div>
            </div>
            <br></br>

            {/* Add new div for options panel contains all opitons like 50-50, double, submit and close. */}
            <div className="flex justify-evenly">
              <div>
                <button class="text-yellow-300 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-black dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900">
                  {/* <HiOutlineInformationCircle /> Show Answers */}
                  Show Answers
                </button>
              </div>
              <div>
                <button class="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900">
                  {/* <TbMath1Divide2 /> 50-50 */}
                  50-50
                </button>
              </div>
              <div>
                <button class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                  {/* <TbMath1Divide2 /> 50-50 */}
                  Submit
                </button>
              </div>
              <div>
                <button class="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900">
                  {/* <TbMath1Divide2 /> 50-50 */}
                  Double
                </button>
              </div>
              <div className="">
                <button
                  class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  onClick={() => setShowModal(false)}
                >
                  Close
                  {/* <TbMath1Divide2 /> 50-50 */}
                  {/* Close */}
                </button>
              </div>
            </div>
            {/* <div className="flex justify-center outline outline-offset-0 outline-1 hover:bg-blue-500 border-solid border-stone-50 py-2 px-4 font-semibold mb-3">
              <button onClick={checkAnswer} disabled={selectedAnswer === null}>
                Submit
              </button>
            </div> */}
            <div
              className={
                showExplanation +
                " flex justify-center outline-offset-0 outline-3 outline-yellow-500 bg-yellow-200 outline-dashed border-solid border-stone-50 py-2 px-4 font-semibold"
              }
            >
              {props.explanation}
              <audio autoPlay id="clock-audio" src="/clock.mp3">
                Audio
              </audio>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
