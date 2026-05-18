import mongoose, { Schema, Model, Document, Types } from "mongoose";

const quizSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    isComplete: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    deletedAt: { type: Date, default: null },
    history: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const optionSchema = new Schema({
  0: { type: String, required: true },
  1: { type: String, required: true },
  2: { type: String, required: true },
  3: { type: String, required: true },
});

const questionSchema = new Schema(
  {
    question: { type: String, required: true },
    options: {
      type: [optionSchema],
      required: true,
    },
    answer: { type: Number, required: true },
    explanation: { type: String, default: "" },
    quiz_id: { type: Schema.Types.ObjectId, required: true },
    question_id: { type: Number, required: true },
    isUsed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export interface IQuizDocument extends Document {
  title: string;
  description: string;
  isComplete: boolean;
  isActive: boolean;
  deletedAt: Date | null;
  history: Array<{
    title: string;
    description: string;
    updatedAt: Date;
  }>;
}

export interface IQuestionDocument extends Document {
  question: string;
  options: Array<{
    0: string;
    1: string;
    2: string;
    3: string;
  }>;
  answer: number;
  explanation: string;
  quiz_id: Types.ObjectId;
  question_id: number;
  isUsed: boolean;
}

export const Quiz: Model<IQuizDocument> =
  mongoose.models?.Quiz || mongoose.model<IQuizDocument>("Quiz", quizSchema);
export const Questions: Model<IQuestionDocument> =
  mongoose.models?.Questions ||
  mongoose.model<IQuestionDocument>("Questions", questionSchema);