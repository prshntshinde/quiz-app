import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import { Quiz } from "@/models/quiz";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    await connectMongoDB();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
    }
    return NextResponse.json(quiz, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ message: "Error", error: error.message }, { status: 500 });
  }
}
