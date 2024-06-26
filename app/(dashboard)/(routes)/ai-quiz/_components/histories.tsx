// "use server" (assuming this code is in a Next.js API route or server-side function)
import { IconBadge } from "@/components/icon-badge"; // Assuming you have an IconBadge component
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Clock, CopyCheck, Edit2 } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from 'date-fns'; // Import date-fns for relative time formatting
import { Card, CardHeader } from "@/components/ui/card";

type Props = {
    limit: number;
    userId: string;
};

const HistoryComponent = async ({ limit, userId }: Props) => {
    const games = await db.game.findMany({
        take: limit,
        where: {
            userId: userId!,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const getLevelInfo = (level: string) => {
        switch (level) {
            case "Easy":
                return { className: "bg-green-500 dark:bg-green-900 ", label: "Easy" };
            case "Medium":
                return { className: "bg-yellow-500 dark:bg-yellow-900", label: "Medium" };
            case "Hard":
                return { className: "bg-red-500 dark:bg-red-900", label: "Hard" };
            case "HARDCORE":
                return { className: "bg-purple-500 dark:bg-purple-900", label: "Hardcore" };
            default:
                return { className: "bg-slate-800", label: "Unknown" };
        }
    };

    return (
        <div className="history-component max-h-[400px] overflow-y-auto">
            {games.map((game) => (
                <Link key={game.id} href={`/quiz/statistics/${game.id}`} passHref>
                    <div className="block">
                        <Card className="p-4 m-2">
                            <CardHeader>
                                <div className="flex items-center">
                                    {game.gameType === "mcq" ? (
                                        <IconBadge icon={CopyCheck} size={"md"} variant={"default"} />
                                    ) : (
                                        <IconBadge icon={Edit2} size={"md"} variant={"default"} />
                                    )}
                                    <div className="flex ml-2 items-center justify-between w-full">
                                        <div>
                                            <div className="flex items-center gap-x-1">
                                                <p className="flex text-md font-medium leading-tight hover:text-blue-600">
                                                    {game.topic}
                                                </p>
                                                <div className={`flex items-center px-1 py-1 text-xs text-white rounded-lg ${getLevelInfo(game.level).className}`}>
                                                    {getLevelInfo(game.level).label}
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                {game.gameType === "mcq" ? "Multiple Choice" : "Open-Ended"}
                                            </p>
                                        </div>
                                        <p className="flex items-center px-2 py-1 text-xs text-white rounded-lg w-fit bg-slate-800">
                                            <Clock className="w-4 h-4 mr-1" />
                                            {formatDistanceToNow(game.updatedAt, { addSuffix: true })}
                                        </p>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default HistoryComponent;
