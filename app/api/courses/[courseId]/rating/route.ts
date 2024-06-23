import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import db from "@/lib/db";
import { Rating } from "@prisma/client";

export async function POST(
    req: Request,
    { params }: { params: { courseId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { courseId } = params;
        const { rating } = await req.json();

        // Check if the courseId exists
        const course = await db.course.findUnique({
            where: { id: courseId },
        });

        if (!course) {
            return new NextResponse("Course not found", { status: 404 });
        }

        // Check if the user has already rated the course
        const existingRating = await db.rating.findFirst({
            where: {
                courseId,
                userId,
            },
        });

        if (existingRating) {
            // Update existing rating
            await db.rating.update({
                where: { id: existingRating.id },
                data: {
                    rating: Number(rating),
                },
            });
        } else {
            // Create new rating
            await db.rating.create({
                data: {
                    rating: Number(rating),
                    courseId,
                    userId,
                },
            });
        }

        return new NextResponse("Rating updated successfully", { status: 200 });

    } catch (error) {
        console.error("[PUT_ERROR]", error);
        throw new Error("Failed to update rating");
    }
}
