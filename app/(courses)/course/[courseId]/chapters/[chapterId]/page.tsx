import { File } from "lucide-react";
import { redirect } from "next/navigation";

import { getChapter } from "@/actions/get-chapter";
import { Preview } from "@/components/preview";
import { getProgress } from "@/actions/get-progress";
import { Banner } from "@/components/banner";
import { CourseProgress } from "@/components/course-progress";
import { Separator } from "@/components/ui/separator";
import db from "@/lib/db";
import { User, auth, clerkClient } from "@clerk/nextjs/server";
import { CourseEnrollButton } from "./_components/course-purchase-button";
import { CourseProgressButton } from "./_components/course-progress-button";
import { VideoPlayer } from "./_components/video-player";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Chapter } from "@prisma/client";
import CommentSection from "./_components/comment-section";

export const maxDuration = 60;

const ChapterIdPage = async ({
    params,
}: {
    params: { courseId: string; chapterId: string };
}) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const [isEnrolled, chapterData, userResponse, comments] = await Promise.all([
        db.enrollees.findFirst({
            where: {
                userId: userId,
                courseId: params.courseId
            },
        }),
        getChapter({
            userId,
            chapterId: params.chapterId,
            courseId: params.courseId,
        }),
        clerkClient.users.getUserList(),
        db.comments.findMany({
            where: {
                chapterId: params.chapterId,
            },
            include: {
                replies: true
            },
            orderBy: {
                createdAt: "asc"
            }
        }),
    ]);

    if (!isEnrolled) {
        return redirect("/");
    }

    const {
        chapter,
        course,
        muxData,
        attachments,
        nextChapter,
        userProgress,
        purchase,
    } = chapterData;

    if (!chapter || !course) {
        return redirect("/");
    }

    const user = await db.stripeCustomer.findUnique({
        where: {
            userId: userId,
        },
    });
    const isLocked = (chapter: Chapter) => {
        let unlock = false;

        // Check all previous chapters completion status and subscription requirement
        for (let i = 1; i <= chapter.position; i++) {
            if (user) {
                if (course.price === 0 ||
                    purchase ||
                    (user.subscription === "PRO" || user.subscription === "LIFETIME") ||
                    (user.subscription === chapter.subscription) ||
                    ((chapter.subscription === "null" || chapter.subscription === null || !chapter.subscription) && (user.subscription === "null" || user.subscription === null || !user.subscription))
                ) {
                    if (chapter.position === 1) return false

                    const prevChapter = course.chapters[i - 1];

                    // Fetch user progress for the previous chapter
                    const userProgress = prevChapter.userProgress?.find(
                        (progress) => progress.userId === userId
                    );

                    // If the previous chapter is not completed, lock the next chapter
                    if (userProgress?.isCompleted) return false;

                    // If the previous chapter is locked and doesn't match the subscription, lock the next chapter
                    if (prevChapter.subscription !== user.subscription && prevChapter.subscription !== "null") {
                        return true;
                    }

                    // If previous chapter is completed and meets conditions, unlock subsequent chapters
                    if (userProgress?.isCompleted) {
                        unlock = true;
                    }
                } else {
                    return true
                }
            } else {
                return true;
            }
        }

        return !unlock;
    };

    const users: User[] = JSON.parse(JSON.stringify(userResponse.data));
    const currentUser = users.find(user => user.id === userId);
    const completeOnEnd = !isLocked(chapter);



    return (
        <div>
            {userProgress?.isCompleted && (
                <Banner variant="success" label="You already completed this chapter." />
            )}
            {isLocked(chapter) && (
                <Banner
                    variant="warning"
                    label={`You need to be subscribed to TechHub ${chapter.subscription} or purchase this course to watch this chapter`}
                />
            )}
            <div className="flex flex-col max-w-4xl mx-auto pb-20">
                <div className="p-4">
                    <VideoPlayer
                        chapterId={params.chapterId}
                        title={chapter.title}
                        courseId={params.courseId}
                        nextChapterId={nextChapter?.id}
                        playbackId={muxData?.playbackId!}
                        isLocked={isLocked(chapter)}
                        completeOnEnd={completeOnEnd}
                    />
                </div>
                <div>
                    <div className="p-4 flex flex-col md:flex-row items-center justify-between">
                        <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
                        {isLocked(chapter) ? (
                            <div className="flex items-center justify-center gap-x-2">
                                <Button size='sm' asChild>
                                    <Link href={`/pricing`}>
                                        Subscribe to TechHub {chapter.subscription}
                                    </Link>
                                </Button>
                                {!course.price || course.price > 0 && <CourseEnrollButton price={course.price || 0} courseId={params.courseId} />}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center gap-x-2">
                                <CourseProgressButton
                                    chapterId={params.chapterId}
                                    courseId={params.courseId}
                                    nextChapterId={nextChapter?.id}
                                    isCompleted={!!userProgress?.isCompleted}
                                />
                                {chapter.quiz &&
                                    <Button>
                                        Take the Quiz😱
                                    </Button>
                                }
                            </div>
                        )}
                    </div>
                    <Separator />
                    <div>
                        <Preview value={chapter.description!} />
                    </div>
                    {chapter.pdfUrl && (
                        <iframe
                            src={chapter.pdfUrl}
                            width="100%"
                            height="500px"
                            className="border rounded-md"
                        />
                    )}
                    {!!attachments.length && (
                        <>
                            <div className="p-4">
                                Attachments
                                {attachments.map((attachment) => (
                                    <a
                                        href={attachment.url}
                                        target="_blank"
                                        key={attachment.id}
                                        className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                                    >
                                        <File />
                                        <p className="line-clamp-1">{attachment.name}</p>
                                    </a>
                                ))}
                            </div>
                        </>
                    )}
                    <CommentSection comments={comments} users={users} currentUser={currentUser} courseId={params.courseId} chapterId={params.chapterId} />
                </div>
            </div>
        </div>
    );
};

export default ChapterIdPage;
