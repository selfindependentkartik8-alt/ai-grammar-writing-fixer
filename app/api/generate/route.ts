import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || ""
);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const text = body?.text?.trim();
    const style = body?.style || "Professional";
    const fixLevel = body?.fixLevel || "Grammar + Clarity";
    const instruction = body?.instruction?.trim() || "";

    if (!text) {
      return NextResponse.json(
        {
          error: "Please enter some text first.",
        },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          error: "GEMINI_API_KEY is not configured.",
        },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
    });

    const prompt = `
You are an expert grammar editor and professional writing assistant.

Your job is to improve the user's text while preserving its original meaning.

USER TEXT:
"""
${text}
"""

WRITING STYLE:
${style}

FIX LEVEL:
${fixLevel}

OPTIONAL USER INSTRUCTION:
${instruction || "None"}

Follow these rules carefully:

1. Correct grammar, spelling, punctuation and sentence structure.
2. Improve clarity and readability according to the selected fix level.
3. Preserve the original meaning and important information.
4. Do not invent facts, names, numbers or details.
5. Keep the writing natural and human.
6. Match the requested writing style.
7. Do not mention that AI was used.
8. Do not explain your process before the result.

Return the response using this structure:

CORRECTED TEXT:
[The complete improved text]

IMPROVEMENTS:
[Briefly mention the main improvements made]

Do not use Markdown code blocks.
`;

    const result = await model.generateContent(prompt);

    const response = result.response;
    const output = response.text()?.trim();

    if (!output) {
      return NextResponse.json(
        {
          error: "AI returned an empty response.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      result: output,
    });
  } catch (error) {
    console.error("GRAMMAR FIXER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to process the text.",
      },
      { status: 500 }
    );
  }
}