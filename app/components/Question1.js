"use client";

import { useState } from "react";
import Modal from "./Modal";
import { RxCheckCircled, RxCrossCircled } from "react-icons/rx";
import { twMerge } from "@/libs/utils";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

export default function Question1(props) {
  const [showModal, setShowModal] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerStatus, setAnswerStatus] = useState("");
  const [showExplanation, setShowExplanation] = useState("hidden");
  const [showOptions, setShowOptions] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">Late</div>;
    }

    return (
      <div className="timer">
        <div className="value">{remainingTime}</div>
      </div>
    );
  };

  function stopTimer(params) {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  }
  const updateSelectedAnswer = (index) => {
    setSelectedAnswer(index);
  };

  const checkAnswer = () => {
    if (props.answer === selectedAnswer) {
      let e = document.getElementById(selectedAnswer);
      e.classList.add("correct");

      setAnswerStatus("Correct");
      setShowExplanation("visible");
      document.getElementById("clock-audio").pause();
      document.getElementById("q-" + props.question_id).classList.add("hide");
      setIsPlaying(false);
    } else {
      let e = document.getElementById(selectedAnswer);
      e.classList.add("wrong");

      setAnswerStatus("Wrong");
      setShowExplanation("visible");
      document.getElementById("clock-audio").pause();
      setIsPlaying(false);
    }
  };

  const showOptionsButton = () => {
    setShowOptions(true);
    stopTimer();
    document.getElementById("clock-audio").play();
  };

  const fifty_fifty = () => {
    let listIndex = [0, 1, 2, 3]; // 4 values

    listIndex.splice(props.answer, 1); // 3 values - correct answer removed

    let randomNumber = Math.floor(Math.random() * listIndex.length);

    document
      .getElementById(listIndex[randomNumber])
      .classList.add("fifty_fifty");

    listIndex.splice(randomNumber, 1);

    let randomNumber1 = Math.floor(Math.random() * listIndex.length);

    document
      .getElementById(listIndex[randomNumber1])
      .classList.add("fifty_fifty");
  };

  return (
    <div>
      <button
        className="w-32 px-4 py-2 text-6xl font-semibold text-black border-solid shadow-xl outline outline-offset-0 outline-1 hover:bg-blue-500 hover:text-white border-stone-50 hover:border-transparent"
        onClick={() => setShowModal(true)}
      >
        {props.question_id}
      </button>
      <div>
        <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
          <div>
            <div className="grid grid-cols-12 gap-1 py-2 mb-3 text-4xl font-semibold text-center bg-black rounded shadow-2xl outline outline-offset-1 outline-2 outline-pink-600">
              <div className="m-auto text-yellow-400">{props.question_id}.</div>
              <div className="col-span-11 m-auto text-yellow-400">
                {props.question}
              </div>
            </div>
            <div className="grid justify-center grid-cols-2 gap-3"></div>
            <div className="flex justify-center px-4 py-2 mb-3 font-semibold animate-bounce">
              <p
                className={
                  answerStatus === "Correct" ? "text-green-600" : "text-red-600"
                }
              >
                {answerStatus}{" "}
              </p>
              <p className="pl-1">
                {answerStatus === "Correct" && (
                  <RxCheckCircled size={25} className="text-green-600" />
                )}
                {answerStatus === "Wrong" && (
                  <RxCrossCircled size={25} className="text-red-600" />
                )}
              </p>
            </div>

            {/* Add Options grid */}
            <div
              id="answersGrid"
              className={twMerge(
                "hidden grid-cols-12 gap-4 text-3xl font-semibold text-left",
                {
                  "grid grid-cols-12 gap-4 text-3xl font-semibold text-left":
                    showOptions === true,
                }
              )}
            >
              <div
                id="0"
                onClick={() => {
                  updateSelectedAnswer(0);
                }}
                className={twMerge(
                  "outline outline-offset-0 outline-1 border-solid border-stone-50 py-2 px-4 mb-3 font-semibold text-3xl col-span-5 flex rounded place-items-center gap-1 bg-black text-white transition duration-150 ease-in-out hover:scale-110",
                  { "bg-blue-400": selectedAnswer === 0 }
                )}
                role="button"
                tabIndex={0}
              >
                <div className="">&nbsp; A.</div>
                <div className="">{props.option1}</div>
              </div>

              <div id="counter" className="col-start-6 row-span-2">
                <div>
                  <CountdownCircleTimer
                    isPlaying={isPlaying}
                    strokeWidth={15}
                    duration={45}
                    colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                    colorsTime={[45, 30, 15, 0]}
                    onComplete={() => ({ shouldRepeat: false, delay: 10 })}
                    size={130}
                  >
                    {renderTime}
                  </CountdownCircleTimer>
                </div>

                {/* <CountdownTimer /> */}
              </div>
              <div
                id="1"
                onClick={() => {
                  updateSelectedAnswer(1);
                }}
                className={twMerge(
                  "outline outline-offset-0 outline-1 border-solid border-stone-50 py-2 px-4 mb-3 font-semibold text-3xl col-start-8 col-span-5 flex rounded place-items-center gap-1 bg-black text-white transition duration-150 ease-in-out hover:scale-110",
                  { "bg-blue-400": selectedAnswer === 1 }
                )}
                role="button"
                tabIndex={1}
              >
                <div className="">&nbsp; B.</div>
                <div className="">{props.option2}</div>
              </div>

              <div
                id="2"
                onClick={() => {
                  updateSelectedAnswer(2);
                }}
                className={twMerge(
                  "outline outline-offset-0 outline-1 border-solid border-stone-50 py-2 px-4 mb-3 font-semibold text-3xl col-span-5 flex rounded place-items-center gap-1 bg-black text-white transition duration-150 ease-in-out hover:scale-110",
                  { "bg-blue-400": selectedAnswer === 2 }
                )}
                role="button"
                tabIndex={2}
              >
                <div className="">&nbsp; C.</div>
                <div className="">{props.option3}</div>
              </div>
              <div
                id="3"
                onClick={() => {
                  updateSelectedAnswer(3);
                }}
                className={twMerge(
                  "outline outline-offset-0 outline-1 border-solid border-stone-50 py-2 px-4 mb-3 font-semibold text-3xl col-start-8 col-span-5 flex rounded place-items-center gap-1 bg-black text-white transition duration-150 ease-in-out hover:scale-110",
                  {
                    "bg-blue-400": selectedAnswer === 3,
                  }
                )}
                role="button"
                tabIndex={3}
              >
                <div className="">&nbsp; D.</div>
                <div className="">{props.option4}</div>
              </div>
            </div>
            <br></br>

            {/* Add new div for options panel contains all opitons like 50-50, double, submit and close. */}
            <div className="flex justify-evenly">
              <div>
                <button
                  onClick={showOptionsButton}
                  className="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900 transition duration-150 ease-in-out hover:scale-110"
                >
                  {/* <HiOutlineInformationCircle /> Show Answers */}
                  Show Options
                </button>
              </div>
              <div>
                <button
                  onClick={fifty_fifty}
                  className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 transition duration-150 ease-in-out hover:scale-110"
                >
                  {/* <TbMath1Divide2 /> 50-50 */}
                  50-50
                </button>
              </div>
              <div>
                <button
                  onClick={checkAnswer}
                  disabled={selectedAnswer === null}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition duration-150 ease-in-out hover:scale-110"
                >
                  {/* <TbMath1Divide2 /> 50-50 */}
                  Submit
                </button>
              </div>
              <div>
                <button className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 transition duration-150 ease-in-out hover:scale-110">
                  {/* <TbMath1Divide2 /> 50-50 */}
                  Double
                </button>
              </div>
              <div className="">
                <button
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 transition duration-150 ease-in-out hover:scale-110"
                  onClick={() => setShowModal(false)}
                >
                  Close
                  {/* <TbMath1Divide2 /> 50-50 */}
                  {/* Close */}
                </button>
              </div>
            </div>

            <br></br>
            <div
              className={twMerge("hidden ", {
                "visible flex justify-center outline-offset-0 outline-3 outline-yellow-500 bg-yellow-200 outline-dashed border-solid border-stone-50 py-2 px-4 text-2xl font-semibold rounded":
                  showExplanation == "visible",
              })}
            >
              {props.explanation}
              <audio id="clock-audio" src="/clock-45s.mp3">
                Audio
              </audio>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
