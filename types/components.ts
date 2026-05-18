import type { ReactNode, MouseEvent } from "react";
import type { IQuestion, IQuiz } from "./database";

export interface IModalProps {
  children: ReactNode;
  isVisible: boolean;
  onClose: () => void;
}

export interface IQuestionProps {
  question_id: number;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: number;
  explanation: string;
}

export interface IQuizCardProps {
  quiz: Pick<IQuiz, "_id" | "title" | "description"> & { _id: { toString: () => string } };
}

export interface INavBarProps {
  children?: ReactNode;
}

export interface IEmptyStateProps {
  message?: string;
  showButton?: boolean;
}

export interface IErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export interface IRulesModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export interface IFormSubmitButtonProps {
  pendingText?: string;
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export type OptionKey = 0 | 1 | 2 | 3;

export interface IAnswerOption {
  key: OptionKey;
  label: string;
  text: string;
  isSelected: boolean;
  status?: "correct" | "wrong" | "fifty_fifty" | null;
}

export interface IRenderTimeProps {
  remainingTime: number;
}