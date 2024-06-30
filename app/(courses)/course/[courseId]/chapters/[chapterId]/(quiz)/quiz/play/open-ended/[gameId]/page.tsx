import { QueryProvider } from "@/components/providers/query-provider";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import OpenEnded from "../../../../_components/open-ended";

const MCQPage = async ({ params }: { params: { courseId: string, chapterId: string, gameId: string } }) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/sign-in");
    }

    const game = await db.chapterQuiz.findUnique({
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

    console.log("GAME_TYPE: " + game + game?.gameType);

    if (!game || game.gameType === "mcq") {
        return redirect(`/course/${params.courseId}/chapters/${params.chapterId}`);
    }

    return <QueryProvider><OpenEnded game={game} /></QueryProvider>;
}

export default MCQPage;