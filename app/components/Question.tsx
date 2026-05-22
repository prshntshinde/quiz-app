"use client";

import { useState, useRef, useEffect } from "react";
import Modal from "./Modal";
import QuizTimer from "./QuizTimer";
import AnswerOption, { type OptionStatus } from "./AnswerOption";
import QuestionHeader from "./QuestionHeader";
import AnswerStatus, { type AnswerStatusType } from "./AnswerStatus";
import ExplanationPanel from "./ExplanationPanel";
import ActionButtons from "./ActionButtons";
import { CLOCK_AUDIO_PATH } from "@/lib/constants";

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

function getSecureRandomIndex(max: number): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
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
}: Readonly<QuestionProps>) {
  const [showModal, setShowModal] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerStatus, setAnswerStatus] = useState<AnswerStatusType>("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [optionStatus, setOptionStatus] = useState<Record<number, OptionStatus>>({});
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = document.getElementById("clock-audio") as HTMLAudioElement | null;
  }, []);

  const stopTimer = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleSelectAnswer = (index: number) => {
    if (optionStatus[index] !== "fifty_fifty") {
      setSelectedAnswer(index);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const newStatus: Record<number, OptionStatus> = {};

    if (answer === selectedAnswer) {
      newStatus[selectedAnswer] = "correct";
      setAnswerStatus("Correct");
    } else {
      newStatus[selectedAnswer] = "wrong";
      newStatus[answer] = "correct";
      setAnswerStatus("Wrong");
    }

    setShowExplanation(true);
    audioRef.current?.pause();
    setIsPlaying(false);
    setOptionStatus(newStatus);

    const event = new CustomEvent("questionAnswered", {
      detail: { question_id },
    });
    window.dispatchEvent(event);
  };

  const handleShowOptions = () => {
    setShowOptions(true);
    stopTimer();
    audioRef.current?.play();
  };

  const handleFiftyFifty = () => {
    const remainingOptions = [0, 1, 2, 3].filter((i) => i !== answer);

    const firstRemoveIndex = getSecureRandomIndex(remainingOptions.length);
    const firstToRemove = remainingOptions[firstRemoveIndex];
    const updatedStatus1: Record<number, OptionStatus> = { ...optionStatus, [firstToRemove]: "fifty_fifty" };

    remainingOptions.splice(firstRemoveIndex, 1);
    const secondRemoveIndex = getSecureRandomIndex(remainingOptions.length);
    const secondToRemove = remainingOptions[secondRemoveIndex];
    const updatedStatus2: Record<number, OptionStatus> = { ...updatedStatus1, [secondToRemove]: "fifty_fifty" };

    setOptionStatus(updatedStatus2);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedAnswer(null);
    setAnswerStatus("");
    setShowExplanation(false);
    setShowOptions(false);
    setIsPlaying(false);
    setOptionStatus({});
    audioRef.current?.pause();
  };

  const handleTimerComplete = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const options = [option1, option2, option3, option4];
  const labels = ["A", "B", "C", "D"];

  return (
    <div>
      <button
        type="button"
        className="w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 text-5xl sm:text-6xl font-bold text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-lg hover:bg-blue-500 hover:text-white hover:border-blue-500 dark:hover:bg-blue-600 dark:hover:border-blue-500 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        onClick={() => setShowModal(true)}
        aria-label={`Open question ${question_id}`}
      >
        {question_id}
      </button>

      <Modal
        isVisible={showModal}
        onClose={handleClose}
        title={`Question ${question_id}`}
      >
        <div className="space-y-4">
          <QuestionHeader questionId={question_id} question={question} />

          <AnswerStatus status={answerStatus} />

          {showOptions && (
            <div className="space-y-3" role="group" aria-label="Answer options">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-3">
                  {options.slice(0, 2).map((option, index) => (
                    <AnswerOption
                      key={index}
                      id={`option-${index}`}
                      label={labels[index]}
                      text={option}
                      index={index}
                      isSelected={selectedAnswer === index}
                      status={optionStatus[index]}
                      disabled={!!answerStatus}
                      onSelect={handleSelectAnswer}
                    />
                  ))}
                </div>

                <div className="flex flex-col items-center justify-center gap-4">
                  <QuizTimer
                    isPlaying={isPlaying}
                    onComplete={handleTimerComplete}
                  />
                </div>

                <div className="space-y-3 md:col-span-2">
                  {options.slice(2).map((option, index) => {
                    const actualIndex = index + 2;
                    return (
                      <AnswerOption
                        key={actualIndex}
                        id={`option-${actualIndex}`}
                        label={labels[actualIndex]}
                        text={option}
                        index={actualIndex}
                        isSelected={selectedAnswer === actualIndex}
                        status={optionStatus[actualIndex]}
                        disabled={!!answerStatus}
                        onSelect={handleSelectAnswer}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {!showOptions && (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
              Click &quot;Show Options&quot; to reveal answer choices and start the timer
            </p>
          )}

          <ActionButtons
            showOptions={showOptions}
            hasSelectedAnswer={selectedAnswer !== null}
            hasSubmitted={!!answerStatus}
            onShowOptions={handleShowOptions}
            onFiftyFifty={handleFiftyFifty}
            onSubmit={handleSubmit}
            onClose={handleClose}
          />

          <ExplanationPanel explanation={explanation} isVisible={showExplanation} />
        </div>
      </Modal>

      <audio id="clock-audio" src={CLOCK_AUDIO_PATH} preload="auto" aria-hidden="true">
        Timer countdown sound
      </audio>
    </div>
  );
}
