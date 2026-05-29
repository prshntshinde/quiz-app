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

const questionSchema = new Schema(
  {
    question: { type: String, required: true },
    optionA: { type: String, required: true },
    optionB: { type: String, required: true },
    optionC: { type: String, required: true },
    optionD: { type: String, required: true },
    answer: { type: Number, required: true, min: 0, max: 3 },
    explanation: { type: String, default: "" },
    quiz_id: { type: Schema.Types.ObjectId, required: true },
    question_id: { type: Number, required: true },
    isUsed: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

quizSchema.index({ deletedAt: 1, createdAt: -1 });
questionSchema.index({ quiz_id: 1, question_id: 1 }, { unique: true });
questionSchema.index({ deletedAt: 1, isUsed: 1, quiz_id: 1, question_id: 1 });
questionSchema.index({ createdAt: -1, _id: 1 });

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
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answer: number;
  explanation: string;
  quiz_id: Types.ObjectId;
  question_id: number;
  isUsed: boolean;
  deletedAt: Date | null;
}

export const Quiz: Model<IQuizDocument> =
  mongoose.models?.Quiz || mongoose.model<IQuizDocument>("Quiz", quizSchema);
export const Questions: Model<IQuestionDocument> =
  mongoose.models?.Questions ||
  mongoose.model<IQuestionDocument>("Questions", questionSchema);