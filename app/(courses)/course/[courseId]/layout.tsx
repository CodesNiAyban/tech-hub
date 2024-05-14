import { ConfettiProvider } from "@/components/providers/confetti-provider";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { ThemeProvider } from "next-themes";
import { redirect } from "next/navigation";
import { CourseSideBar } from "./_components/(sidebar)/course-sidebar";
import { ToastProvider } from "@/components/providers/toaster-provider";
import { CourseNavBar } from "./_components/(navbar)/navbar";
import { getProgress } from "@/actions/get-progress";

const CourseLayout = async ({
    children,
    params
}: {
    children: React.ReactNode;
    params: { courseId: string };
}) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/")
    }

    const course = await db.course.findUnique({
        where: {
            id: params.courseId,
        },
        include: {
            chapters: {
                where: {
                    isPublished: true
                },
                include: {
                    userProgress: {
                        where: {
                            userId,
                        }
                    }
                },
                orderBy: {
                    position: "asc"
                },
            },
        }
    });

    if (!course) {
        return redirect("/");
    }

    const progressCount = await getProgress(userId, course.id)

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] xl:grid-cols-[280px_1fr]">
                <CourseSideBar
                    course={course}
                    progressCount={progressCount}
                />
                <div className="relative flex flex-col w-full">
                    <CourseNavBar />
                    <main className="flex flex-1 flex-col absolute inset-0 gap-4 p-4 overflow-y-auto xl:gap-6 xl:p-6">
                        <ConfettiProvider />
                        <ToastProvider />
                        {children}
                    </main>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default CourseLayout;