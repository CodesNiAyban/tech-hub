import { ThemeProvider } from "next-themes";
import { DashboardNavBar } from "./_components/(navbar)/navbar";
import { SideBar } from "./_components/(sidebar)/sidebar";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Inter } from "next/font/google";
import { ToastProvider } from "@/components/providers/toaster-provider";

const inter = Inter({ subsets: ["latin"] });

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
        <html lang="en">
            <head>
                <link rel="icon" href="/logo.svg" />
            </head>
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                        <SideBar />
                        <div className="flex flex-col">
                            <DashboardNavBar />
                            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                                <ToastProvider />
                                {children}
                            </main>
                        </div>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}

export default MarketingLayout;
