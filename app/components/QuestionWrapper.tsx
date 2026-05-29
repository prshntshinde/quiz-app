"use client";

import dynamic from "next/dynamic";

const QuestionComponent = dynamic(() => import("@/app/components/Question"), {
  ssr: false,
});

interface QuestionWrapperProps {
  question_id: number;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: number;
  explanation: string;
}

export default function QuestionWrapper(props: QuestionWrapperProps) {
  return <QuestionComponent {...props} />;
}
