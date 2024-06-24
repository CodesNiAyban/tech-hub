import { NextResponse } from "next/server";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function PATCH(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
    try {
        const { userId } = auth();
        const { comment, parentId } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const newComment = await db.comments.create({
            data: {
                userId: userId,
                chapterId: params.chapterId,
                comment: comment,
                parentId: parentId || undefined,
            },
        });

        return NextResponse.json(newComment);
    } catch (error) {
        console.error("[PATCH /api/courses/[courseId]/chapters/[chapterId]/comments]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}