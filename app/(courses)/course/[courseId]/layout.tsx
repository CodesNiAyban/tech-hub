
import { redirect } from "next/navigation";
import { getProgress } from "@/actions/get-progress";
import { auth } from "@clerk/nextjs/server";
import db from "@/lib/db";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@/components/providers/toaster-provider";
import { CourseNavbar } from "./_components/(navbar)/navbar";
import { CourseSidebar } from "./_components/(sidebar)/course-sidebar";

const CourseLayout = async ({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { courseId: string };
}) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/sign-in");
    }

    const course = await db.course.findUnique({
        where: {
            id: params.courseId,
        },
        include: {
            chapters: {
                where: {
                    isPublished: true,
                },
                include: {
                    userProgress: {
                        where: {
                            userId,
                        },
                    },
                },
                orderBy: {
                    position: "asc",
                },
            },
        },
    });

    if (!course) {
        return redirect("/sign-in");
    }

    const progressCount = await getProgress(userId, course.id);

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div className="h-full">
                <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
                    <CourseNavbar course={course} progressCount={progressCount} />
                </div>
                <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
                    <ToastProvider />
                    <CourseSidebar course={course} progressCount={progressCount} />
                </div>
                <main className="md:pl-80 pt-[60px] h-full">{children}</main>
            </div>
        </ThemeProvider>
    );
};

export default CourseLayout;