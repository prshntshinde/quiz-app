import autoprefixer from "autoprefixer";
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

const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);

export default Quiz;