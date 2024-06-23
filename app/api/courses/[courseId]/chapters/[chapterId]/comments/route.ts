import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import Mux from "@mux/mux-node";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string; chapterId: string } }
) {
    try {
        const { userId } = auth();
        const { isPublished, ...values } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const newComment = await db.comments.create({
            data: {
              userId: userId,
              chapterId: params.chapterId,
              ...values,
            },
          });
      
        return NextResponse.json(newComment);
    } catch (error) {
        console.log("[COURSES_CHAPTER_ID", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}