import connectMongoDB from "@/libs/mongodb";
import { Question } from "@/models/quiz";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { question, options, answer, explanation, quiz_id, question_id } = await request.json();
    console.log(options);
    await connectMongoDB();
    await Question.create({ question, options, answer, explanation, quiz_id, question_id });
    return NextResponse.json({ message: "Question Created" }, { status: 201 });

}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const questions = await Question.find({ quiz_id: id });
    return NextResponse.json({ questions }, { status: 200 });

}