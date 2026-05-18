"use server";

import { Quiz, type IQuizDocument } from "@/models/quiz";
import connectMongoDB from "@/libs/mongodb";
import { revalidatePath } from "next/cache";

export interface CreateQuizResult {
  message: string;
}

export interface DeleteQuizResult {
  message: string;
}

export interface UpdateQuizResult {
  message: string;
}

export async function createQuiz(
  formData: FormData
): Promise<CreateQuizResult> {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!title || !description) {
      throw new Error("Title and description are required");
    }

    await connectMongoDB();
    await Quiz.create({
      title,
      description,
      isComplete: false,
      isActive: true,
      deletedAt: null,
      history: [],
    });
    revalidatePath("/admin/quiz");
    revalidatePath("/quiz");

    return { message: "Quiz created successfully." };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error("Failed to create quiz: " + message);
  }
}

export async function deleteQuiz(
  formData: FormData
): Promise<DeleteQuizResult> {
  try {
    const id = formData.get("id") as string;

    if (!id) {
      throw new Error("Quiz ID is required");
    }

    await connectMongoDB();
    const updated = await Quiz.findByIdAndUpdate(id, { deletedAt: new Date() });

    if (!updated) {
      throw new Error("Quiz not found");
    }

    revalidatePath("/admin/quiz");
    revalidatePath("/quiz");
    return { message: "Quiz deleted successfully." };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error("Failed to delete quiz: " + message);
  }
}

export async function updateQuiz(
  formData: FormData
): Promise<UpdateQuizResult> {
  try {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!id || !title || !description) {
      throw new Error("ID, title, and description are required");
    }

    await connectMongoDB();

    const currentQuiz = (await Quiz.findById(id)) as IQuizDocument | null;
    if (!currentQuiz) {
      throw new Error("Quiz not found");
    }

    if (!currentQuiz.history) {
      currentQuiz.history = [];
    }

    currentQuiz.history.push({
      title: currentQuiz.title,
      description: currentQuiz.description,
      updatedAt: new Date(),
    });

    if (currentQuiz.history.length > 10) {
      currentQuiz.history = currentQuiz.history.slice(-10);
    }

    currentQuiz.title = title;
    currentQuiz.description = description;

    await currentQuiz.save();

    revalidatePath("/admin/quiz");
    revalidatePath("/quiz");

    return { message: "Quiz updated successfully." };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error("Failed to update quiz: " + message);
  }
}