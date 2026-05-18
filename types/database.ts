import type { Types } from "mongoose";

export interface IOption {
  0: string;
  1: string;
  2: string;
  3: string;
}

export interface IQuestion {
  _id?: Types.ObjectId;
  question: string;
  options: IOption[];
  answer: number;
  explanation: string;
  quiz_id: Types.ObjectId;
  question_id: number;
  isUsed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IHistoryEntry {
  title: string;
  description: string;
  updatedAt: Date;
}

export interface IQuiz {
  _id?: Types.ObjectId;
  title: string;
  description: string;
  isComplete: boolean;
  isActive: boolean;
  deletedAt: Date | null;
  history: IHistoryEntry[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IQuizSanitized {
  _id: string;
  title: string;
  description: string;
  isComplete: boolean;
  isActive: boolean;
  deletedAt: string | null;
  history: IHistoryEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface IQuestionSanitized {
  _id: string;
  question: string;
  options: IOption[];
  answer: number;
  explanation: string;
  quiz_id: string;
  question_id: number;
  isUsed: boolean;
  createdAt: string;
  updatedAt: string;
}