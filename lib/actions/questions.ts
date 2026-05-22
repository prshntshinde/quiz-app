"use server";

import mongoose from "mongoose";
import { Questions, type IQuestionDocument } from "@/models/quiz";
import connectMongoDB from "@/libs/mongodb";
import { revalidatePath } from "next/cache";

export interface CreateQuestionResult {
  message: string;
}

export interface DeleteQuestionResult {
  message: string;
}

export interface UpdateQuestionResult {
  message: string;
}

export async function createQuestion(
  formData: FormData
): Promise<CreateQuestionResult> {
  try {
    const question = formData.get("question") as string;
    const option1 = formData.get("option1") as string;
    const option2 = formData.get("option2") as string;
    const option3 = formData.get("option3") as string;
    const option4 = formData.get("option4") as string;
    const answer = parseInt(formData.get("answer") as string, 10);
    const explanation = formData.get("explanation") as string;
    const quiz_id = formData.get("quiz_id") as string;

    if (!question || !option1 || !option2 || !option3 || !option4 || isNaN(answer) || !quiz_id) {
      throw new Error("All fields are required");
    }

    if (answer < 0 || answer > 3) {
      throw new Error("Answer must be between 0 and 3");
    }

    await connectMongoDB();

    const lastQuestion = await Questions.findOne({ quiz_id })
      .sort({ question_id: -1 })
      .select("question_id")
      .lean();
    const question_id = lastQuestion ? lastQuestion.question_id + 1 : 1;

    await Questions.create({
      question,
      optionA: option1,
      optionB: option2,
      optionC: option3,
      optionD: option4,
      answer,
      explanation,
      quiz_id,
      question_id,
      isUsed: false,
      deletedAt: null,
    });

    revalidatePath("/admin/questions");
    revalidatePath("/quiz");

    return { message: "Question created successfully." };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error("Failed to create question: " + message);
  }
}

export async function deleteQuestion(
  formData: FormData
): Promise<DeleteQuestionResult> {
  try {
    const id = formData.get("id") as string;

    if (!id) {
      throw new Error("Question ID is required");
    }

    await connectMongoDB();
    const updated = await Questions.findByIdAndUpdate(id, { deletedAt: new Date() });

    if (!updated) {
      throw new Error("Question not found");
    }

    revalidatePath("/admin/questions");
    revalidatePath("/quiz");
    return { message: "Question deleted successfully." };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error("Failed to delete question: " + message);
  }
}

export async function updateQuestion(
  formData: FormData
): Promise<UpdateQuestionResult> {
  try {
    const id = formData.get("id") as string;
    const question = formData.get("question") as string;
    const option1 = formData.get("option1") as string;
    const option2 = formData.get("option2") as string;
    const option3 = formData.get("option3") as string;
    const option4 = formData.get("option4") as string;
    const answer = parseInt(formData.get("answer") as string, 10);
    const explanation = formData.get("explanation") as string;
    const quiz_id = formData.get("quiz_id") as string;

    if (!id || !question || !option1 || !option2 || !option3 || !option4 || isNaN(answer) || !quiz_id) {
      throw new Error("All fields are required");
    }

    if (answer < 0 || answer > 3) {
      throw new Error("Answer must be between 0 and 3");
    }

    await connectMongoDB();

    const currentQuestion = (await Questions.findById(id)) as IQuestionDocument | null;
    if (!currentQuestion) {
      throw new Error("Question not found");
    }

    currentQuestion.question = question;
    currentQuestion.optionA = option1;
    currentQuestion.optionB = option2;
    currentQuestion.optionC = option3;
    currentQuestion.optionD = option4;
    currentQuestion.answer = answer;
    currentQuestion.explanation = explanation;

    const newQuizId = new mongoose.Types.ObjectId(quiz_id);
    const quizChanged = !currentQuestion.quiz_id?.equals(newQuizId);

    if (quizChanged) {
      currentQuestion.quiz_id = newQuizId;
      const lastQuestion = await Questions.findOne({ quiz_id })
        .sort({ question_id: -1 })
        .select("question_id")
        .lean();
      currentQuestion.question_id = lastQuestion ? lastQuestion.question_id + 1 : 1;
    }

    await currentQuestion.save();

    revalidatePath("/admin/questions");
    revalidatePath("/quiz");

    return { message: "Question updated successfully." };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error("Failed to update question: " + message);
  }
}