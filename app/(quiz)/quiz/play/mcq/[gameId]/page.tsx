import MCQ from "@/app/(quiz)/_components/mcq";
import { QueryProvider } from "@/components/providers/query-provider";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const MCQPage = async ({ params }: { params: { gameId: string } }) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/sign-in");
    }

    const game = await db.game.findUnique({
        where: {
            id: params.gameId
        },
        include: {
            questions: {
                select: {
                    id: true,
                    question: true,
                    options: true,
                },
            },
        },
    });

    if (!game || game.gameType === "open_ended") {
        return redirect("/quiz");
    }

    return <QueryProvider><MCQ game={game} /></QueryProvider>;
}

export default MCQPage;