"use server";

import connectMongoDB from "@/libs/mongodb";
import { Quiz } from "@/models/quiz";
import { revalidatePath } from "next/cache";

export async function createQuiz(formData) {
  try {
    console.log(formData);
    const title = formData.get("title");
    const description = formData.get("description");
    const isComplete = false;
    const isActive = true;
    await connectMongoDB();
    await Quiz.create({ title, description, isComplete, isActive });
    revalidatePath("/admin/quiz");
    revalidatePath("/quiz");

    return { message: "Quiz created successfully." };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create quiz." + error.message);
  }
}
