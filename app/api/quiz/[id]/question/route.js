import connectMongoDB from "@/libs/mongodb";
import { Questions } from "@/models/quiz";
import { NextResponse } from "next/server";

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
  console.log(options);
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

export async function GET(request, { params }) {
  console.log(params);
  const { id } = params;
  await connectMongoDB();
  const questions = await Questions.find({ quiz_id: id });
  console.log(questions);
  return NextResponse.json({ questions }, { status: 200 });
}
