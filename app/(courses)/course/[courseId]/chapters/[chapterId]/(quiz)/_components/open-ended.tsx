"use client";
import { cn, formatTimeDelta } from "@/lib/utils";
import { Game, Question } from "@prisma/client";
import { differenceInSeconds } from "date-fns";
import { BarChart, ChevronRight, Loader2, Timer } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import axios from "axios";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { checkAnswerSchema, endGameSchema } from "@/app/(dashboard)/(routes)/teacher/courses/_components/_utils/form-validation";
import toast from "react-hot-toast";
import BlankAnswerInput from "./blank-answer";
import OpenEndedPercentage from "./open-ended-percentage";

type Props = {
    game: Game & { questions: Pick<Question, "id" | "question" | "answer">[] };
    courseId: string;
    chapterId: string;
};

const OpenEnded = ({ game, courseId, chapterId }: Props) => {
    const [hasEnded, setHasEnded] = useState(false);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [blankAnswer, setBlankAnswer] = useState("");
    const [averagePercentage, setAveragePercentage] = useState(0);
    const currentQuestion = useMemo(() => {
        return game.questions[questionIndex];
    }, [questionIndex, game.questions]);
    const [now, setNow] = useState(new Date());
    const { mutate: checkAnswer, isPending: isChecking } = useMutation({
        mutationFn: async () => {
            let filledAnswer = blankAnswer;
            document.querySelectorAll("#user-blank-input").forEach((input) => {
                const htmlInputElement = input as HTMLInputElement;
                filledAnswer = filledAnswer.replace("_____", htmlInputElement.value);
                htmlInputElement.value = ""; // Reset the input
            });
            const payload: z.infer<typeof checkAnswerSchema> = {
                questionId: currentQuestion.id,
                userInput: filledAnswer,
            };
            const response = await axios.post(`/api/courses/${courseId}/chapters/${chapterId}/quiz/check-answer`, payload);
            return response.data;
        },
    });

    useEffect(() => {
        if (!hasEnded) {
            const interval = setInterval(() => {
                setNow(new Date());
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [hasEnded]);

    const { mutate: endGame } = useMutation({
        mutationFn: async () => {
            const payload: z.infer<typeof endGameSchema> = {
                gameId: game.id,
            };
            const response = await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/quiz/game`, payload);
            return response.data;
        },
    });

    const handleNext = useCallback(() => {
        checkAnswer(undefined, {
            onSuccess: ({ percentageSimilar }) => {
                toast.success(`Your answer is ${percentageSimilar}% similar to the correct answer`)
                setAveragePercentage((prev: any) => {
                    return (prev + percentageSimilar) / (questionIndex + 1);
                });
                if (questionIndex === game.questions.length - 1) {
                    endGame();
                    setHasEnded(true);
                    return;
                }
                setQuestionIndex((prev: number) => prev + 1);
            },
            onError: (error) => {
                console.error(error);
                toast.error("Something went wrong");
            },
        });
    }, [checkAnswer, questionIndex, game.questions.length, endGame]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const key = event.key;
            if (key === "Enter") {
                handleNext();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleNext]);

    if (hasEnded) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center justify-center">
                    <div className="px-4 py-2 mt-2 font-semibold text-white bg-green-500 rounded-md whitespace-nowrap">
                        You Completed in{" "}
                        {formatTimeDelta(differenceInSeconds(now, game.createdAt))}
                    </div>
                    <Link
                        href={`/course/${courseId}/chapters/${chapterId}/quiz/statistics/${game.id}`}
                        className={cn(buttonVariants({ size: "lg" }), "mt-2")}
                    >
                        View Statistics
                        <BarChart className="w-4 h-4 ml-2" />
                    </Link>
                </div>
            </div>
        );
    }

    const getLevelClass = (level: string) => {
        switch (level) {
            case "Easy":
                return "bg-green-500 dark:bg-green-700";
            case "Medium":
                return "bg-yellow-500";
            case "Hard":
                return "bg-red-500";
            case "HARDCORE":
                return "bg-purple-500";
            default:
                return "bg-slate-800";
        }
    };

    return (
        <div className="p-8">
            <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                    {/* topic */}
                    <div className="flex">
                        <p>
                            <span className="text-slate-400">Topic</span> &nbsp;
                            <span className="px-2 py-1 text-white rounded-lg bg-slate-800">
                                {game.topic}
                            </span>
                        </p>
                        <p className="ml-4">
                            <span className="text-slate-400">Level</span> &nbsp;
                            <span className={`px-2 py-1 text-white rounded-lg ${getLevelClass(game.level)}`}>
                                {game.level}
                            </span>
                        </p>
                    </div>
                    <div className="flex self-start mt-3 text-slate-400">
                        <Timer className="mr-2" />
                        {formatTimeDelta(differenceInSeconds(now, game.createdAt))}
                    </div>
                </div>
                <OpenEndedPercentage percentage={averagePercentage} />
            </div>
            <Card className="w-full mt-4">
                <CardHeader className="flex flex-row items-center">
                    <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
                        <div>{questionIndex + 1}</div>
                        <div className="text-base text-slate-400">
                            {game.questions.length}
                        </div>
                    </CardTitle>
                    <CardDescription className="flex-grow text-lg">
                        {currentQuestion?.question}
                    </CardDescription>
                </CardHeader>
            </Card>
            <div className="flex flex-col items-center justify-center w-full mt-4">
                <BlankAnswerInput
                    setBlankAnswer={setBlankAnswer}
                    answer={currentQuestion.answer}
                />
                <Button
                    variant="outline"
                    className="mt-4"
                    disabled={isChecking || hasEnded}
                    onClick={() => {
                        handleNext();
                    }}
                >
                    {isChecking && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Next <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    );
};

export default OpenEnded;