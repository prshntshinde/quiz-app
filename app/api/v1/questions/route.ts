import { NextResponse, type NextRequest } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import { Questions } from "@/models/quiz";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

function validateQuestion(data: Record<string, unknown>): string[] {
  const errors: string[] = [];

  if (!data.question || typeof data.question !== "string") {
    errors.push("question is required and must be a string");
  } else if (data.question.length < 1 || data.question.length > 1000) {
    errors.push("question must be between 1 and 1000 characters");
  }

  const requiredFields = ["optionA", "optionB", "optionC", "optionD"];
  for (const field of requiredFields) {
    if (!data[field] || typeof data[field] !== "string") {
      errors.push(`${field} is required and must be a string`);
    }
  }

  if (typeof data.answer !== "number" || data.answer < 0 || data.answer > 3) {
    errors.push("answer must be a number between 0 and 3");
  }

  if (data.explanation !== undefined && typeof data.explanation !== "string") {
    errors.push("explanation must be a string");
  }

  if (!data.quiz_id || typeof data.quiz_id !== "string") {
    errors.push("quiz_id is required and must be a string");
  }

  return errors;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || String(DEFAULT_PAGE), 10);
    const limit = parseInt(searchParams.get("limit") || String(DEFAULT_LIMIT), 10);

    if (isNaN(page) || page < 1) {
      return NextResponse.json({ error: "Invalid page parameter" }, { status: 400 });
    }
    if (isNaN(limit) || limit < 1 || limit > 100) {
      return NextResponse.json({ error: "Invalid limit parameter" }, { status: 400 });
    }

    await connectMongoDB();

    const query = {
      $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
    };

    const skip = (page - 1) * limit;
    const [questions, total] = await Promise.all([
      Questions.find(query).sort({ createdAt: -1, _id: 1 }).skip(skip).limit(limit).lean(),
      Questions.countDocuments(query),
    ]);

    return NextResponse.json(
      {
        questions,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/v1/questions error:", error);
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!request.headers.get("content-type")?.includes("application/json")) {
      return NextResponse.json({ error: "Content-Type must be application/json" }, { status: 415 });
    }

    const body = await request.json();
    const errors = validateQuestion(body);

    if (errors.length > 0) {
      return NextResponse.json({ error: "Validation failed", details: errors }, { status: 400 });
    }

    await connectMongoDB();

    const lastQuestion = await Questions.findOne({ quiz_id: body.quiz_id })
      .sort({ question_id: -1 })
      .select("question_id")
      .lean();

    const question_id = lastQuestion ? (lastQuestion.question_id as number) + 1 : 1;

    const question = await Questions.create({
      question: body.question,
      optionA: body.optionA,
      optionB: body.optionB,
      optionC: body.optionC,
      optionD: body.optionD,
      answer: body.answer,
      explanation: body.explanation || "",
      quiz_id: body.quiz_id,
      question_id,
      isUsed: body.isUsed || false,
      deletedAt: null,
    });

    return NextResponse.json({ message: "Question created", question }, { status: 201 });
  } catch (error) {
    console.error("POST /api/v1/questions error:", error);
    return NextResponse.json({ error: "Failed to create question" }, { status: 500 });
  }
}