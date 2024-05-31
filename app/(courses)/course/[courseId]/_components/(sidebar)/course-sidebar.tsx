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
    progressCount: number;
}

export const CourseSidebar = async ({
    course,
    progressCount,
}: CourseSideBarProps) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
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

    const chapter = await db.chapter.findUnique({
        where: {
            id: course.id,
        }
    })

    const isLocked = (() => {
        if (purchase) return false;
        if (user) {
            if (user.subscription === "PRO" || user.subscription === "LIFETIME") return false;
            if (chapter?.subscription === "BASIC" && user.subscription === "BASIC") return false;
        }
        if (chapter?.subscription === null) return false;
        return true;
    })();


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
                        isLocked={isLocked}
                    />
                ))}
            </div>
        </div>
    );
}
