"use client";

import { useState } from "react";
import Modal from "./Modal";
import { RxCheckCircled, RxCrossCircled } from "react-icons/rx";
import { cn } from "@/lib/utils";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

interface QuestionProps {
  question_id: number;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: number;
  explanation: string;
}

type AnswerStatus = "Correct" | "Wrong" | "";
type OptionStatus = "correct" | "wrong" | "fifty_fifty" | null;

function getSecureRandomIndex(max: number): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

interface AnswerOptionProps {
  id: string;
  label: string;
  text: string;
  index: number;
  selectedAnswer: number | null;
  optionStatus: Record<number, OptionStatus>;
  onSelect: (index: number) => void;
}

function AnswerOption({
  id,
  label,
  text,
  index,
  selectedAnswer,
  optionStatus,
  onSelect,
}: AnswerOptionProps) {
  const baseClass = "outline outline-offset-0 outline-1 border-solid border-stone-50 py-2 px-4 mb-3 font-semibold text-3xl flex rounded place-items-center gap-1 bg-black text-white transition duration-150 ease-in-out hover:scale-110";

  let className = baseClass;
  if (optionStatus[index] === "correct") {
    className = `${baseClass} bg-green-600`;
  } else if (optionStatus[index] === "wrong") {
    className = `${baseClass} bg-red-600`;
  } else if (optionStatus[index] === "fifty_fifty") {
    className = `${baseClass} bg-gray-600 opacity-50`;
  } else if (selectedAnswer === index) {
    className = `${baseClass} bg-blue-400`;
  }

  return (
    <button
      type="button"
      id={id}
      onClick={() => onSelect(index)}
      className={className}
    >
      <span>&nbsp; {label}.</span>
      <span>{text}</span>
    </button>
  );
}

export default function Question({
  question_id,
  question,
  option1,
  option2,
  option3,
  option4,
  answer,
  explanation,
}: QuestionProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [optionStatus, setOptionStatus] = useState<Record<number, OptionStatus>>({});

  const renderTime = ({ remainingTime }: { remainingTime: number }) => {
    if (remainingTime === 0) {
      return <div className="timer">Late</div>;
    }
    return (
      <div className="timer">
        <div className="value">{remainingTime}</div>
      </div>
    );
  };

  const stopTimer = () => {
    setIsPlaying((prev) => !prev);
  };

  const updateSelectedAnswer = (index: number) => {
    setSelectedAnswer(index);
  };

  const checkAnswer = () => {
    if (selectedAnswer === null) return;

    const newStatus: Record<number, OptionStatus> = {};

    if (answer === selectedAnswer) {
      newStatus[selectedAnswer] = "correct";
      setAnswerStatus("Correct");
      setShowExplanation(true);
      const audio = document.getElementById("clock-audio") as HTMLAudioElement | null;
      audio?.pause();
      setIsPlaying(false);
    } else {
      newStatus[selectedAnswer] = "wrong";
      newStatus[answer] = "correct";
      setAnswerStatus("Wrong");
      setShowExplanation(true);
      const audio = document.getElementById("clock-audio") as HTMLAudioElement | null;
      audio?.pause();
      setIsPlaying(false);
    }

    setOptionStatus(newStatus);
  };

  const showOptionsButton = () => {
    setShowOptions(true);
    stopTimer();
    const audio = document.getElementById("clock-audio") as HTMLAudioElement | null;
    audio?.play();
  };

  const fifty_fifty = () => {
    const listIndex = [0, 1, 2, 3];
    listIndex.splice(answer, 1);

    const randomIndex = getSecureRandomIndex(listIndex.length);
    const updatedStatus1: Record<number, OptionStatus> = { ...optionStatus };
    updatedStatus1[listIndex[randomIndex]] = "fifty_fifty";

    listIndex.splice(randomIndex, 1);
    const randomIndex1 = getSecureRandomIndex(listIndex.length);
    const updatedStatus2: Record<number, OptionStatus> = { ...updatedStatus1 };
    updatedStatus2[listIndex[randomIndex1]] = "fifty_fifty";

    setOptionStatus(updatedStatus2);
  };

  const options = [
    { id: "option-0", label: "A", text: option1 },
    { id: "option-1", label: "B", text: option2 },
    { id: "option-2", label: "C", text: option3 },
    { id: "option-3", label: "D", text: option4 },
  ];

  return (
    <div>
      <button
        className="w-32 px-4 py-2 text-6xl font-semibold text-black border-solid shadow-xl outline outline-offset-0 outline-1 hover:bg-blue-500 hover:text-white border-stone-50 hover:border-transparent"
        onClick={() => setShowModal(true)}
      >
        {question_id}
      </button>
      <div>
        <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
          <div>
            <div className="grid grid-cols-12 gap-1 py-2 mb-3 text-4xl font-semibold text-center bg-black rounded shadow-2xl outline outline-offset-1 outline-2 outline-pink-600">
              <div className="m-auto text-yellow-400">{question_id}.</div>
              <div className="col-span-11 m-auto text-yellow-400">{question}</div>
            </div>
            <div className="grid justify-center grid-cols-2 gap-3"></div>
            <div className="flex justify-center px-4 py-2 mb-3 font-semibold animate-bounce">
              <p className={answerStatus === "Correct" ? "text-green-600" : "text-red-600"}>
                {answerStatus}
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
            <div
              id="answersGrid"
              className={cn(
                "hidden grid-cols-12 gap-4 text-3xl font-semibold text-left",
                { "grid grid-cols-12 gap-4 text-3xl font-semibold text-left": showOptions }
              )}
            >
              <AnswerOption
                id="option-0"
                label="A"
                text={option1}
                index={0}
                selectedAnswer={selectedAnswer}
                optionStatus={optionStatus}
                onSelect={updateSelectedAnswer}
              />

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
              </div>
              <AnswerOption
                id="option-1"
                label="B"
                text={option2}
                index={1}
                selectedAnswer={selectedAnswer}
                optionStatus={optionStatus}
                onSelect={updateSelectedAnswer}
              />

              <AnswerOption
                id="option-2"
                label="C"
                text={option3}
                index={2}
                selectedAnswer={selectedAnswer}
                optionStatus={optionStatus}
                onSelect={updateSelectedAnswer}
              />

              <AnswerOption
                id="option-3"
                label="D"
                text={option4}
                index={3}
                selectedAnswer={selectedAnswer}
                optionStatus={optionStatus}
                onSelect={updateSelectedAnswer}
              />
            </div>
            <br></br>

            <div className="flex justify-evenly">
              <div>
                <button
                  onClick={showOptionsButton}
                  className="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900 transition duration-150 ease-in-out hover:scale-110"
                >
                  Show Options
                </button>
              </div>
              <div>
                <button
                  onClick={fifty_fifty}
                  className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 transition duration-150 ease-in-out hover:scale-110"
                >
                  50-50
                </button>
              </div>
              <div>
                <button
                  onClick={checkAnswer}
                  disabled={selectedAnswer === null}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition duration-150 ease-in-out hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit
                </button>
              </div>
              <div>
                <button className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 transition duration-150 ease-in-out hover:scale-110">
                  Double
                </button>
              </div>
              <div className="">
                <button
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 transition duration-150 ease-in-out hover:scale-110"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>

            <br></br>
            <div
              className={cn("hidden ", {
                "visible flex justify-center outline-offset-0 outline-3 outline-yellow-500 bg-yellow-200 outline-dashed border-solid border-stone-50 py-2 px-4 text-2xl font-semibold rounded":
                  showExplanation,
              })}
            >
              {explanation}
              <audio id="clock-audio" src="/clock-45s.mp3">
                Audio
                <track kind="captions" label="Timer countdown sound" default />
              </audio>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}