import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({ message: "Hello, Next.js!" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
