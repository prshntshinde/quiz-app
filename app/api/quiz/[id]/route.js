import connectMongoDB from "@/libs/mongodb";
import {Quiz} from "@/models/quiz";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newTitle: title, newDescription: description, newisComplete: isComplete, newisActive: isActive } = await request.json();
    await connectMongoDB();
    await Quiz.findByIdAndUpdate(id, { title, description, isComplete, isActive });
    return NextResponse.json({ message: "Quiz Updated" }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const quiz = await Quiz.findOne({ _id: id });
    return NextResponse.json({ quiz }, { status: 200 });

}