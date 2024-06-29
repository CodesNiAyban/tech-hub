import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@clerk/nextjs/server";
import { Activity, BarChart } from "lucide-react";
import { redirect } from "next/navigation";
import HistoryComponent from "./histories";
import db from "@/lib/db";

export const RecentActivityCard = async () => {
    const { userId } = auth();
    if (!userId) {
        return redirect("/sign-in");
    }

    const games_count = await db.game.count({
        where: {
            userId: userId,
        },
    });

    return (
        <Card className="lg:col-span-3 sm:col-span-4">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-2xl font-bold">
                    Recent Activity
                </CardTitle>
                <Activity className="h-8 w-8 text-primary" />
            </CardHeader>
            <CardContent className="max-h-[600px] overflow-auto">
                <CardDescription className="text-sm text-muted-foreground">
                    You have played a total of {games_count} quizzes.
                </CardDescription>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">
                        Recent Quizzes
                    </h3>
                    <div className="mt-2 space-y-2">
                        <HistoryComponent limit={5} userId={userId} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
