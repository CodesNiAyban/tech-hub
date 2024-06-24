import { NextResponse } from "next/server";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function PUT(req: Request, { params }: { params: { courseId: string; chapterId: string; commentId: string } }) {
    try {
        const { userId } = auth();
        const { comment } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const existingComment = await db.comments.findUnique({
            where: {
                id: params.commentId,
            },
        });

        if (!existingComment || existingComment.userId !== userId) {
            return new NextResponse("Forbidden", { status: 403 });
        }

        const updatedComment = await db.comments.update({
            where: {
                id: params.commentId,
            },
            data: {
                comment: comment,
            },
        });

        return NextResponse.json(updatedComment);
    } catch (error) {
        console.error("[PUT /api/courses/[courseId]/chapters/[chapterId]/comments/[commentId]]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { courseId: string; chapterId: string; commentId: string } }) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const existingComment = await db.comments.findUnique({
            where: {
                id: params.commentId,
            },
        });

        if (!existingComment || existingComment.userId !== userId) {
            return new NextResponse("Forbidden", { status: 403 });
        }

        // Handle cascading deletion of replies
        await db.comments.deleteMany({
            where: {
                OR: [
                    { id: params.commentId },
                    { parentId: params.commentId },
                ],
            },
        });

        return new NextResponse("Comment deleted", { status: 200 });
    } catch (error) {
        console.error("[DELETE /api/courses/[courseId]/chapters/[chapterId]/comments/[commentId]]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

