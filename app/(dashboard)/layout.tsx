import { ToastProvider } from "@/components/providers/toaster-provider";
import { siteConfig } from "@/config/site";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { DashboardNavBar } from "./_components/(navbar)/navbar";
import { SideBar } from "./_components/(sidebar)/sidebar";

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
        <ClerkProvider
            appearance={{
                layout: {
                    logoImageUrl: "/logo.svg"
                },
                baseTheme: dark
            }}
        >
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <div className="grid min-h-screen w-full 2xl:grid-cols-[220px_1fr] xl:grid-cols-[280px_1fr]">
                    <SideBar />
                    <div className="flex flex-col">
                        <DashboardNavBar />
                        <main className="flex flex-1 flex-col gap-4 p-4 xl:gap-6 xl:p-6">
                            <ToastProvider />
                            {children}
                        </main>
                    </div>
                </div>
            </ThemeProvider>
        </ClerkProvider>
    )
}

export default MarketingLayout;
