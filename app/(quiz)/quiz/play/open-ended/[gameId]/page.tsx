import OpenEnded from "@/app/(quiz)/_components/open-ended";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query';
import { QueryProvider } from "@/components/providers/query-provider";

const MCQPage = async ({ params }: { params: { gameId: string } }) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/sign-in");
    }

    const game = await db.game.findUnique({
        where: {
            id: params.gameId,
        },
        include: {
            questions: {
                select: {
                    id: true,
                    question: true,
                    answer: true,
                },
            },
        },
    });

    if (!game || game.gameType === "mcq") {
        return redirect("/quiz");
    }

    return <QueryProvider><OpenEnded game={game} /></QueryProvider>;
}

export default MCQPage;