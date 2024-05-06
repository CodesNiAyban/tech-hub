import { ThemeProvider } from "next-themes";
import { DashboardNavBar } from "../(dashboard)/_components/navbar";
import { SideBar } from "./_components/sidebar";

//TODO: Improve page, add more contents, add animations

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
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                <SideBar />
                <div className="flex flex-col">
                    <DashboardNavBar />
                    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                        {children}
                    </main>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default MarketingLayout;
