import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";
import Link from "next/link";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const headingFont = localFont({
    src: "../../public/fonts/CalSans-SemiBold.woff2"
});

const textFont = Poppins({
    subsets: ["latin"],
    weight: [
        "100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900",
    ],
});

const MarketingPage = () => {
    return (
        <div className="flex items-center justify-center flex-col">
            <div className={cn(
                "flex items-center justify-center flex-col",
                headingFont.className)
            }>
                <h1 className="text-3xl xl:text-6xl text-center mb-1
                ">
                    Empower Learning with{' '}
                    <strong className="dark:bg-gradient-to-r from-blue-500 to-purple-500 dark:text-transparent text-black  bg-clip-text underline decoration-sky-500/[.33]">
                        TechHub
                    </strong>
                </h1>
                <div className={cn("text-sm md:text-xl mt-4 max-w-xs md:max-w-2xl text-muted-foreground text-center mx-auto pt-1 pb-4",
                    textFont.className
                )}>
                    Elevate your skills with TechHub. Dive into our curated courses, connect with industry experts, and accelerate your career in tech. Join our community of learners and discover your true potential today!
                </div>
                <Button className="text-md px-5 py-2 mt-2 font-bold text-white rounded-lg shadow-md bg-gradient-to-tl uppercase transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 dark:hover:bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-gradient-to-r from-fuchsia-600 to-pink-600 duration-300 ..." asChild>
                    <Link href="/home">
                        EXPLORE NOW!
                    </Link>
                </Button>
            </div>
        </div>
    );
}

export default MarketingPage;