import connectMongoDB from "@/libs/mongodb";
import { Answer } from "@/models/quiz";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { question, options, answer, explanation, quiz_id, question_id } = await request.json();
    await connectMongoDB();
    await Answer.create({ question, options, answer, explanation, quiz_id, question_id });
    return NextResponse.json({ message: "Answer Created" }, { status: 201 });

}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const questions = await Answer.findOne({ _id: id });
    return NextResponse.json({ questions }, { status: 200 });

}