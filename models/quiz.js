import mongoose from "mongoose";

const Schema = mongoose.Schema;

const quizSchema = new Schema(
  {
    title: String,
    description: String,
    isComplete: Boolean,
    isActive: Boolean,
    deletedAt: { type: Date, default: null },
    history: [
      {
        title: String,
        description: String,
        updatedAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const optionSchema = new Schema({
  0: String,
  1: String,
  2: String,
  3: String,
});

const questionSchema = new Schema(
  {
    question: String,
    options: {
      type: [optionSchema],
      required: true,
    },
    answer: Number,
    explanation: String,
    quiz_id: mongoose.Schema.ObjectId,
    question_id: Number,
    isUsed: Boolean,
  },
  {
    timestamps: true,
  }
);

console.log("Registering Quiz model...");
export const Quiz = mongoose.models?.Quiz || mongoose.model("Quiz", quizSchema);
console.log("Quiz model registered with fields:", Object.keys(Quiz.schema.paths));
export const Questions =
  mongoose.models?.Questions || mongoose.model("Questions", questionSchema);
