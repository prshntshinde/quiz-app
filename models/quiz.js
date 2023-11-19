import mongoose, { Schema } from "mongoose";

const quizSchema = new Schema(
    {
        title: String,
        description: String,
        isComplete: Boolean,
        isActive: Boolean,
    },
    {
        timestamps: true,
    }
);

const optionSchema = new Schema(
    {
        0: String, 1: String, 2: String, 3: String

    }
)

const questionSchema = new Schema(
    {
        question: String,
        options: {
            type: [optionSchema],
            required: true
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

export const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);
export const Question = mongoose.models.Question || mongoose.model("Question", questionSchema);

