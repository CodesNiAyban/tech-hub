
import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";
import { CourseNavbar } from "./_components/(navbar)/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@/components/providers/toaster-provider";


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

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div className="h-full">
                <div className="fixed w-full z-50">
                    <CourseNavbar />
                </div>
                <main className="pt-[80px] h-full">{children}
                    <ToastProvider />
                </main>
            </div>
        </ThemeProvider>
    );
};

export default CourseLayout;