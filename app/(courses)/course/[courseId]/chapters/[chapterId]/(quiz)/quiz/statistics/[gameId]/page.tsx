import { buttonVariants } from "@/components/ui/button";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { LucideLayoutDashboard } from "lucide-react";
import Link from "next/link";

import { redirect } from "next/navigation";
import React from "react";
import ResultsCard from "../_components/results-card";
import AccuracyCard from "../_components/accuracy-card";
import TimeTakenCard from "../_components/time-taken-card";
import QuestionsList from "../_components/questions-list";
import LevelCard from "../_components/level-card";
type Props = {
    params: {
        gameId: string;
    };
};

const Statistics = async ({ params: { gameId } }: Props) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/sign-in");
    }

    const userSubscription = await db.stripeCustomer.findUnique({
        where: {
            userId: userId,
        },
    });

    if ((userSubscription && userSubscription.subscription === "null") || !userSubscription) {
        return redirect("/");
    }

    const game = await db.game.findUnique({
        where: { id: gameId },
        include: { questions: true },
    });
    if (!game) {
        return redirect("/");
    }

    let accuracy: number = 0;

    if (game.gameType === "mcq") {
        let totalCorrect = game.questions.reduce((acc, question) => {
            if (question.isCorrect) {
                return acc + 1;
            }
            return acc;
        }, 0);
        accuracy = (totalCorrect / game.questions.length) * 100;
    } else if (game.gameType === "open_ended") {
        let totalPercentage = game.questions.reduce((acc, question) => {
            return acc + (question.percentageCorrect ?? 0);
        }, 0);
        accuracy = totalPercentage / game.questions.length;
    }
    accuracy = Math.round(accuracy * 100) / 100;

    return (
        <>
            <div className="p-8 mx-auto max-w-7xl">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Summary</h2>
                    <div className="flex items-center space-x-2">
                        <Link href="/ai-quiz" className={buttonVariants()}>
                            <LucideLayoutDashboard className="mr-2" />
                            Back to Dashboard
                        </Link>
                    </div>
                </div>

                <div className="grid gap-4 mt-4 md:grid-cols-7">
                    <ResultsCard accuracy={accuracy} />
                    <AccuracyCard accuracy={accuracy} />
                    <TimeTakenCard
                        timeEnded={game.updatedAt}
                        timeStarted={game.createdAt}
                    />
                    <LevelCard level={game.level} />
                </div>
                <QuestionsList questions={game.questions} />
            </div>
        </>
    );
};

export default Statistics;