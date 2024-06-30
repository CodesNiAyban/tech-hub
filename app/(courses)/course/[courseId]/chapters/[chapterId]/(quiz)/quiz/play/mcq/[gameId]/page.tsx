
import { QueryProvider } from "@/components/providers/query-provider";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import MCQ from "../../../../_components/mcq";

const MCQPage = async ({ params }: { params: { courseId: string, chapterId: string, gameId: string } }) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/sign-in");
    }

    const game = await db.chapterQuiz.findUnique({
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
        return redirect(`/course/${params.courseId}/chapters/${params.chapterId}`);
    }

    return (
        <div className="w-full h-full items-center justify-center">
            <QueryProvider>
                <MCQ game={game} />
            </QueryProvider>
        </div>
    )
}

export default MCQPage;