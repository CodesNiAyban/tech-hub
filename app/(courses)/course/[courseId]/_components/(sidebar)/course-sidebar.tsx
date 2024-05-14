import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import { CourseSidebarItem } from "./course-sidebar-item";

interface CourseSideBarProps {
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null;
        })[];
    };
    progressCount: number;
}

export const CourseSideBar = async ({
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

    return (
        <div className="hidden border-r bg-muted/40 md:block backdrop-blur-sm duration-1000 animate-in slide-in-from-left-12">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <h1 className="font-semibold">
                        {course.title}
                    </h1>
                </div>
                <div className="overflow-y-auto">
                    {course.chapters.map((chapter) => (
                        <CourseSidebarItem
                            key={chapter.id}
                            id={chapter.id}
                            label={chapter.title}
                            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
                            courseId={course.id}
                            isLocked={!chapter.isFree && !purchase}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
