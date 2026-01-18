"use server";

import connectMongoDB from "@/libs/mongodb";
import { Quiz } from "@/models/quiz";
import { revalidatePath } from "next/cache";

export async function createQuiz(formData) {
  try {
    const title = formData.get("title");
    const description = formData.get("description");
    const isComplete = false;
    const isActive = true;
    await connectMongoDB();
    await Quiz.create({
      title,
      description,
      isComplete,
      isActive,
      deletedAt: null,
      history: []
    });
    revalidatePath("/admin/quiz");
    revalidatePath("/quiz");

    return { message: "Quiz created successfully." };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create quiz." + error.message);
  }
}

export async function deleteQuiz(formData) {
  try {
    const id = formData.get("id");
    await connectMongoDB();
    const updated = await Quiz.findByIdAndUpdate(id, { deletedAt: new Date() });

    if (!updated) {
      throw new Error("Quiz not found");
    }

    revalidatePath("/admin/quiz");
    revalidatePath("/quiz");
    return { message: "Quiz deleted successfully." };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete quiz." + error.message);
  }
}
export async function updateQuiz(formData) {
  try {
    const id = formData.get("id");
    const title = formData.get("title");
    const description = formData.get("description");

    await connectMongoDB();

    const currentQuiz = await Quiz.findById(id);
    if (!currentQuiz) {
      throw new Error("Quiz not found");
    }

    // Preserve old values in history
    if (!currentQuiz.history) {
      currentQuiz.history = [];
    }

    currentQuiz.history.push({
      title: currentQuiz.title,
      description: currentQuiz.description,
      updatedAt: new Date(),
    });

    // Cap history at 10 entries to prevent unbounded growth
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
    console.log(error);
    throw new Error("Failed to update quiz." + error.message);
  }
}
