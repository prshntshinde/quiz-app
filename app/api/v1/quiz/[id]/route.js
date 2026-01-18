import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import { Quiz } from "@/models/quiz";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }
    await connectMongoDB();
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
    }
    return NextResponse.json(quiz, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    const isProduction = process.env.NODE_ENV === "production";
    return NextResponse.json(
      {
        message: "Internal server error",
        ...(isProduction ? {} : { error: error.message }),
      },
      { status: 500 }
    );
  }
}
