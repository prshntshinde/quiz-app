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
    const query = { _id: id, $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }] };
    const quiz = await Quiz.findOne(query);
    if (!quiz) {
      return NextResponse.json({ message: "Quiz not found or deleted" }, { status: 404 });
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
