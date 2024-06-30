import { chapterQuizSchema, endGameSchema } from "@/app/(dashboard)/(routes)/teacher/courses/_components/_utils/form-validation";
import db from "@/lib/db";
import axios from "axios";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { ZodError } from "zod";

export async function POST(
    req: Request,
    { params }: { params: { chapterId: string; courseId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const {
            amount,
            topic,
            type,
            level,
            courseTitle,
            chapterTitle,
            courseDescription,
            chapterDescription
        } = chapterQuizSchema.parse(body);

        const [game, { data }] = await Promise.all([
            db.chapterQuiz.create({
                data: {
                    gameType: type,
                    chapterId: params.chapterId,
                    userId: userId,
                    topic,
                    level,
                },
            }),
            axios.post(
                `${process.env.NEXT_PUBLIC_APP_URL as string}/api/courses/${params.courseId}/chapters/${params.chapterId}/quiz/questions`,
                {
                    amount,
                    topic,
                    type,
                    level,
                    courseTitle,
                    chapterTitle,
                    courseDescription,
                    chapterDescription,
                }
            ),
        ]);

        if (type === "mcq") {
            type mcqQuestion = {
                question: string;
                answer: string;
                option1: string;
                option2: string;
                option3: string;
            };

            const manyData = data.questions.map((question: mcqQuestion) => {
                const options = [
                    question.option1,
                    question.option2,
                    question.option3,
                    question.answer,
                ].sort(() => Math.random() - 0.5);
                return {
                    question: question.question,
                    answer: question.answer,
                    options: JSON.stringify(options),
                    gameId: game.id,
                    questionType: "mcq",
                };
            });

            await db.chapterQuestion.createMany({
                data: manyData,
            });
        } else if (type === "open_ended") {
            type openQuestion = {
                question: string;
                answer: string;
            };
            await db.chapterQuestion.createMany({
                data: data.questions.map((question: openQuestion) => {
                    return {
                        question: question.question,
                        answer: question.answer,
                        gameId: game.id,
                        questionType: "open_ended",
                    };
                }),
            });
        }

        return NextResponse.json({ gameId: game.id }, { status: 200 });
    } catch (error) {
        console.log("[CHAPTER_QUIZ_GAME]", error);
        if (error instanceof ZodError) {
            return NextResponse.json({ error: error.issues }, { status: 400 });
        } else {
            return new NextResponse("Internal Error", { status: 500 });
        }
    }
}

export async function PUT(
    req: Request,
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { gameId } = endGameSchema.parse(body);

        const game = await db.chapterQuiz.findUnique({
            where: {
                id: gameId,
            },
        });
        if (!game) {
            return NextResponse.json(
                {
                    message: "Quiz not found",
                },
                {
                    status: 404,
                }
            );
        }
        await db.chapterQuiz.update({
            where: {
                id: gameId,
            },
            data: {
                updatedAt: new Date(),
            }
        });

        return NextResponse.json({ gameId: game.id }, { status: 200 });
    } catch (error) {
        console.log("[CHAPTER_END_QUIZ]", error)
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: error.issues },
                {
                    status: 400,
                }
            );
        } else {
            return new NextResponse("Internal Error", { status: 500 })
        }
    }
}
