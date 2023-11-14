import connectMongoDB from "@/libs/mongodb"
import Quiz from "@/models/quiz";
import { NextResponse } from "next/server";

export async function POST(request) {
    const {title, description, isComplete, isActive} = await request.json();
    await connectMongoDB();
    await Quiz.create({title, description, isComplete, isActive});
    return NextResponse.json({message: "Quiz Created"}, {status: 201});

}

export async function GET() {
    await connectMongoDB();
    const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    })
    const data = await res.json()
   
    return Response.json({ data })
  }