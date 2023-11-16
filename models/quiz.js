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

export const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);

