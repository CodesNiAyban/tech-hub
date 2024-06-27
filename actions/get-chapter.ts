import db from "@/lib/db";
import { Attachment, Chapter } from "@prisma/client";

interface GetChapterProps {
    userId: string;
    courseId: string;
    chapterId: string;
}

export const getChapter = async ({
    userId,
    courseId,
    chapterId,
}: GetChapterProps) => {
    try {
        // Fetch necessary details in parallel
        const [purchase, course, chapter, userProgress] = await Promise.all([
            db.purchase.findUnique({
                where: {
                    userId_courseId: {
                        userId,
                        courseId,
                    },
                },
            }),
            db.course.findUnique({
                where: {
                    id: courseId,
                    isPublished: true,
                },
                select: {
                    id: true,
                    price: true,
                    chapters: {
                        select: {
                            id: true,
                            position: true,
                            subscription: true,
                            pdfUrl: true,
                            userProgress: {
                                where: {
                                    userId,
                                },
                                select: {
                                    isCompleted: true,
                                    userId: true,
                                },
                            },
                            comments: {
                                select: {
                                    id: true,
                                    comment: true,
                                },
                            },
                        },
                        orderBy: {
                            position: 'asc',
                        },
                    },
                },
            }),
            db.chapter.findUnique({
                where: {
                    id: chapterId,
                    isPublished: true,
                },
            }),
            db.userProgress.findUnique({
                where: {
                    userId_chapterId: {
                        userId,
                        chapterId,
                    },
                },
            })
        ]);

        if (!course) {
            throw new Error("Course not found or not published");
        }

        if (!chapter) {
            throw new Error("Chapter not found or not published");
        }

        let muxData = null;
        let attachments: Attachment[] = [];
        let nextChapter: Chapter | null = null;

        // Fetch additional data if the chapter requires subscription or the user has purchased the course
        if (chapter.subscription || purchase) {
            const [fetchedAttachments, fetchedMuxData, fetchedNextChapter] = await Promise.all([
                db.attachment.findMany({
                    where: {
                        courseId: courseId,
                    },
                }),
                db.muxData.findUnique({
                    where: {
                        chapterId: chapterId,
                    },
                }),
                db.chapter.findFirst({
                    where: {
                        courseId: courseId,
                        isPublished: true,
                        position: {
                            gt: chapter.position,
                        },
                    },
                    orderBy: {
                        position: "asc",
                    },
                })
            ]);

            attachments = fetchedAttachments;
            muxData = fetchedMuxData;
            nextChapter = fetchedNextChapter;
        }

        // Return the gathered data
        return {
            chapter,
            course,
            muxData,
            attachments,
            nextChapter,
            userProgress,
            purchase,
        };
    } catch (error) {
        console.log("[GET_CHAPTER]", error);
        return {
            chapter: null,
            course: null,
            muxData: null,
            attachments: [],
            nextChapter: null,
            userProgress: null,
            purchase: null,
        };
    }
};
