import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { HistoryCard } from "./_components/history-card";
import { TakeAQuizCard } from "./_components/take-quiz-card";
import { HotTopicsCard } from "./_components/hot-topics";
import { RecentActivityCard } from "./_components/recent-activity";
import db from "@/lib/db";

export const metadata = {
    title: "AI Quiz"
}

const AIQuizPage = async () => {
    const { userId } = auth();
    if (!userId) {
        return redirect("/sign-in");
    }

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
                <div className="grid gap-4 mt-4 md:grid-cols-2">
                    <TakeAQuizCard />
                    <HistoryCard />
                </div>
                <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">
                    <HotTopicsCard formattedTopics={formattedTopics} />
                    <RecentActivityCard />
                </div>
            </div>
        </main>
    );
}

export default AIQuizPage;