"use server";

import connectMongoDB from "@/libs/mongodb";
import { Questions } from "@/models/quiz";
import { revalidatePath } from "next/cache";

export async function createQuestion(formData) {
  try {
    const quiz_id = formData.get("quiz_id") || "66acc22c5333d0d9cab6fed8";
    const question = formData.get("question");
    const options = [
      {
        0: formData.get("option1"),
        1: formData.get("option2"),
        2: formData.get("option3"),
        3: formData.get("option4"),
      },
    ];
    const answer = formData.get("answer");
    const explanation = formData.get("explanation");
    await connectMongoDB();
    await Questions.create({
      quiz_id,
      question,
      options,
      answer,
      explanation,
    });
    revalidatePath("/admin/questions");
    revalidatePath("/quiz");
    return { message: "Question created successfully." };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create question." + error.message);
  }
}
