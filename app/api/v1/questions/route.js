import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import { Questions } from "@/models/quiz";

export async function GET() {
  await connectMongoDB();
  const questions = await Questions.find();
  return NextResponse.json({ questions }, { status: 200 });
}

export async function POST(request) {
  const {
    question,
    options,
    answer,
    explanation,
    quiz_id,
    question_id,
    isUsed,
  } = await request.json();
  await connectMongoDB();
  await Questions.create({
    question,
    options,
    answer,
    explanation,
    quiz_id,
    question_id,
    isUsed,
  });
  return NextResponse.json({ message: "Question Created" }, { status: 201 });
}
