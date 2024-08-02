import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import { Quiz } from "@/models/quiz";
import { NextRequest } from "next/server";

export async function GET(request) {
  try {
    const id = request.url.split("quiz/")[1];
    console.log(id);
    await connectMongoDB();
    const quiz = await Quiz.findOne({ _id: id });
    return NextResponse.json({ quiz }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const id = request.url.split("quiz/")[1];
    console.log(id);
    const {
      newTitle: title,
      newDescription: description,
      newisComplete: isComplete,
      newisActive: isActive,
    } = await request.json();
    await connectMongoDB();
    await Quiz.findByIdAndUpdate(id, {
      title,
      description,
      isComplete,
      isActive,
    });
    return NextResponse.json({ message: "Quiz Updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const id = request.url.split("quiz/")[1];
    await connectMongoDB();
    await Quiz.findByIdAndDelete(id);
    return NextResponse.json({ message: "Quiz Deleted." }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
