import { ThemeProvider } from "next-themes";
import { Footer } from "./_components/footer";
import { NavBar } from "./_components/navbar";
import { ModeToggle } from "@/components/theme-button";
import { dark } from "@clerk/themes";

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
            <div className="h-full relative">
                <NavBar />
                <main className="h-full pt-40 pb-20 overflow-y-auto">
                    {children}
                </main>
                <div className="fixed bottom-16 right-5 mb-5 isolate z-50">
                    <ModeToggle />
                </div>
            </div>
            <Footer />
        </ThemeProvider>
    )
}

export default MarketingLayout;
