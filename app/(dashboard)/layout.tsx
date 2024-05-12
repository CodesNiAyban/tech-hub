import { ToastProvider } from "@/components/providers/toaster-provider";
import { siteConfig } from "@/config/site";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { SideBar } from "./_components/(sidebar)/sidebar";
import DashboardNavBar from "./_components/(navbar)/navbar";
import { ConfettiProvider } from "@/components/providers/confetti-provider";

//TODO: Improve page, add more contents, add animations
export const metadata: Metadata = {
    description: siteConfig.description
};

const MarketingLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div className="grid min-h-screen w-full 2xl:grid-cols-[220px_1fr] xl:grid-cols-[280px_1fr]">
                <SideBar />
                <div className="relative flex flex-col w-full">
                    <DashboardNavBar />
                    <main className="flex flex-1 flex-col absolute inset-0 overflow-y-auto mt-[70px]">
                        <ConfettiProvider />
                        <ToastProvider />
                        {children}
                    </main>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default MarketingLayout;


