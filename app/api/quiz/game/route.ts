import { endGameSchema, quizCreationSchema } from "@/app/(dashboard)/(routes)/teacher/courses/_components/_utils/form-validation";
import db from "@/lib/db";
import { strict_output } from "@/lib/gpt";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { NextResponse } from "next/server"
import { ZodError } from "zod";

export async function POST(
    req: Request,
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { amount, topic, type, level } = quizCreationSchema.parse(body);

        const [game, topicCount, { data }] = await Promise.all([
            await db.game.create({
                data: {
                    gameType: type,
                    userId: userId,
                    topic,
                    level,
                },
            }),
            await db.topic_count.upsert({
                where: {
                    topic,
                },
                create: {
                    topic,
                    count: 1,
                },
                update: {
                    count: {
                        increment: 1,
                    },
                },
            }),
            await axios.post(
                `${process.env.NEXT_PUBLIC_APP_URL as string}/api/quiz/questions`,
                {
                    amount,
                    topic,
                    type,
                    level,
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
                // mix up the options lol
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

            await db.question.createMany({
                data: manyData,
            });
        } else if (type === "open_ended") {
            type openQuestion = {
                question: string;
                answer: string;
            };
            await db.question.createMany({
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
        console.log("[QUIZ]", error)
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: error.issues },
                {
                    status: 400,
                }
            );
        } else {
            return new NextResponse("Internal Error 2", { status: 500 })
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

        const game = await db.game.findUnique({
            where: {
                id: gameId,
            },
        });
        if (!game) {
            return NextResponse.json(
                {
                    message: "Game not found",
                },
                {
                    status: 404,
                }
            );
        }
        await db.game.update({
            where: {
                id: gameId,
            },
            data: {
                updatedAt: new Date(),
            }
        });

        return NextResponse.json({ gameId: game.id }, { status: 200 });
    } catch (error) {
        console.log("[QUIZ]", error)
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: error.issues },
                {
                    status: 400,
                }
            );
        } else {
            return new NextResponse("Internal Error 2", { status: 500 })
        }
    }
}
