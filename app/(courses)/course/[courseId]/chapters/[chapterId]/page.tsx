
import { File } from "lucide-react";
import { redirect } from "next/navigation";

import { getChapter } from "@/actions/get-chapter";

import { Preview } from "@/components/preview";

import { getProgress } from "@/actions/get-progress";
import { Banner } from "@/components/banner";
import { CourseProgress } from "@/components/course-progress";
import { Separator } from "@/components/ui/separator";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { CourseEnrollButton } from "./_components/course-purchase-button";
import { CourseProgressButton } from "./_components/course-progress-button";
import { VideoPlayer } from "./_components/video-player";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const maxDuration = 60;

const ChapterIdPage = async ({
    params,
}: {
    params: { courseId: string; chapterId: string };
}) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/sign-in");
    }

    const {
        chapter,
        course,
        muxData,
        attachments,
        nextChapter,
        userProgress,
        purchase,
    } = await getChapter({
        userId,
        chapterId: params.chapterId,
        courseId: params.courseId,
    });

    if (!chapter || !course) {
        return redirect("/");
    }

    const user = await db.stripeCustomer.findUnique({
        where: {
            userId: userId,
        },
    });
    const isLocked = (chapterSubscription: string | null) => {
        if (purchase) return false;
        if (user) {
            if (user.subscription === "PRO" || user.subscription === "LIFETIME") return false;
            if (chapterSubscription === "null" || chapterSubscription === null) return false;
            if (user.subscription === chapterSubscription) return false;
        }
        return true;
    };


    const completeOnEnd = !isLocked && userProgress?.isCompleted;

    const progressCount = await getProgress(userId, params.courseId);

    return (
        <div>
            {userProgress?.isCompleted && (
                <Banner variant="success" label="You already completed this chapter." />
            )}
            {isLocked(chapter.subscription) && (
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
                        isLocked={isLocked(chapter.subscription)}
                        completeOnEnd={completeOnEnd}
                    />
                </div>
                <div>
                    <div className="p-4 flex flex-col md:flex-row items-center justify-between">
                        <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
                        {isLocked(chapter.subscription) ? (
                            <Button size='sm' asChild>
                                <Link href={`/pricing`}>
                                    Subscribe to {chapter.subscription}
                                </Link>
                            </Button>
                        ) : (
                            <div className="flex items-center justify-center gap-x-2">
                                <CourseProgressButton
                                    chapterId={params.chapterId}
                                    courseId={params.courseId}
                                    nextChapterId={nextChapter?.id}
                                    isCompleted={!!userProgress?.isCompleted}
                                />
                            </div>
                        )}
                    </div>
                    <Separator />
                    <div>
                        <Preview value={chapter.description!} />
                    </div>
                    {!!attachments.length && (
                        <>
                            <div className="p-4">
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
                    {!isLocked && (
                        <div className="mt-10">
                            <CourseProgress variant="success" value={progressCount || 0} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChapterIdPage;