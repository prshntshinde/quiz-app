import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import { Quiz } from "@/models/quiz";
import { NextRequest } from "next/server";

export async function GET(request, { params }) {
  try {
    const id = params.id;
    await connectMongoDB();
    const quiz = await Quiz.findOne({ _id: id });
    return NextResponse.json({ quiz }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const id = params.id;
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

export async function DELETE(request, { params }) {
  try {
    const id = params.id;
    await connectMongoDB();
    await Quiz.findByIdAndDelete(id);
    return NextResponse.json({ message: "Quiz Deleted." }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
