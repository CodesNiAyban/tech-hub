import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { TakeAQuizCard } from "./_components/take-quiz-card";
import { HotTopicsCard } from "./_components/hot-topics";
import { RecentActivityCard } from "./_components/recent-activity";
import db from "@/lib/db";
import { HistoryDialog } from "./_components/history-dialog";

export const metadata = {
    title: "AI Quiz"
}

const AIQuizPage = async () => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/sign-in");
    }

    const userSubscription = await db.stripeCustomer.findUnique({
        where: {
            userId: userId,
        },
    });

    // if ((userSubscription && userSubscription.subscription === "null") || !userSubscription) {
    //     return redirect("/pricing");
    // }

    const topics = await db.topic_count.findMany({});
    const formattedTopics = topics.map((topic) => {
        return {
            text: topic.topic,
            value: topic.count,
        };
    });

    return (
        <main className="mt-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center">
                    <h2 className="mr-3 text-3xl font-bold tracking-tight dark:text-white sm:text-5xl">WELCOME TO AI QUIZ</h2>
                </div>
                <div className="grid gap-4 mt-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                    <TakeAQuizCard />
                    <HistoryDialog userId={userId} />
                </div>
                <div className="grid gap-4 mt-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
                    <HotTopicsCard formattedTopics={formattedTopics} />
                    <RecentActivityCard />
                </div>
            </div>
        </main>
    );
}

export default AIQuizPage;
