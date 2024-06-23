import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import { CourseSidebarItem } from "./course-sidebar-item";
import { CourseProgress } from "@/components/course-progress";

interface CourseSideBarProps {
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null;
        })[];
    };
    progressCount: number | null;
}

export const CourseSidebar = async ({
    course,
    progressCount,
}: CourseSideBarProps) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/sign-in");
    }

    const purchase = await db.purchase.findUnique({
        where: {
            userId_courseId: {
                userId,
                courseId: course.id,
            }
        }
    });

    const user = await db.stripeCustomer.findUnique({
        where: {
            userId: userId || "",
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

    const badgeLock = (chapter: Chapter) => {
        if (user) {
            if (course.price === 0 ||
                purchase ||
                (user.subscription === "PRO" || user.subscription === "LIFETIME") ||
                (user.subscription === chapter.subscription) ||
                chapter.subscription === "null"
            )
                return false
            else
                return true

        }
    }

    return (
        <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <h1 className="font-semibold">{course.title}</h1>
                {/* Check purchase */}
            </div>
            <div className="flex flex-col w-full">
                {course.chapters.map((chapter) => (
                    <CourseSidebarItem
                        key={chapter.id}
                        id={chapter.id}
                        label={chapter.title}
                        isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
                        courseId={course.id}
                        isLocked={isLocked(chapter)}
                        requiredSubscription={chapter.subscription} // Pass requiredSubscription
                        badgeLock={badgeLock(chapter)}
                    />
                ))}
            </div>
            <div className="p-4">
                <CourseProgress variant="success" value={progressCount || 0} />
            </div>
        </div>
    );
};
