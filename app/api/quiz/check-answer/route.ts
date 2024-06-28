import { checkAnswerSchema } from "@/app/(dashboard)/(routes)/teacher/courses/_components/_utils/form-validation";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import stringSimilarity from "string-similarity";

export async function POST(
    req: Request,
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { questionId, userInput } = checkAnswerSchema.parse(body);
        const question = await db.question.findUnique({
            where: { id: questionId },
        });

        if (!question) {
            return NextResponse.json(
                {
                    message: "Question not found",
                },
                {
                    status: 404,
                }
            );
        }

        await db.question.update({
            where: { id: questionId },
            data: { userAnswer: userInput },
        });
        if (question.questionType === "mcq") {
            const isCorrect =
                question.answer.toLowerCase().trim() === userInput.toLowerCase().trim();
            await db.question.update({
                where: { id: questionId },
                data: { isCorrect },
            });
            return NextResponse.json({
                isCorrect,
            });
        } else if (question.questionType === "open_ended") {
            let percentageSimilar = stringSimilarity.compareTwoStrings(
                question.answer.toLowerCase().trim(),
                userInput.toLowerCase().trim()
            );
            percentageSimilar = Math.round(percentageSimilar * 100);
            await db.question.update({
                where: { id: questionId },
                data: { percentageCorrect: percentageSimilar },
            });
            return NextResponse.json({
                percentageSimilar,
            });
        }
    } catch (error) {
        console.log("[CHECK_ANSWER]", error)
        if (error instanceof ZodError) {
            return NextResponse.json({ error: error.issues }, { status: 400 });
        } else {
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        }
    }
}