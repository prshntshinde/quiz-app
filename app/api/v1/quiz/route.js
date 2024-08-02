import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import { Quiz } from "@/models/quiz";

export async function GET() {
  try {
    await connectMongoDB();
    const quizzes = await Quiz.find();
    return NextResponse.json({ quizzes }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { title, description, isComplete, isActive } = await request.json();
    await connectMongoDB();
    await Quiz.create({ title, description, isComplete, isActive });
    return NextResponse.json({ message: "Quiz Created" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
