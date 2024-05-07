import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export const NavBar = () => {
    return (
        <div className="fixed top-0 w-full shadow-sm flex h-14 items-center gap-4 border-b bg-white dark:bg-muted/40 px-4 lg:h-[60px] lg:px-6 backdrop-blur-sm duration-300 animate-in slide-in-from-top-12">
            <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
                <Logo />
                <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
                    <SignedOut>
                        <Button size="sm" variant="outline" asChild>
                            <Link href="/sign-in">
                                Login
                            </Link>
                        </Button>
                    </SignedOut>
                    <Button size="sm" asChild>
                        <Link href="/sign-in">
                            Try TechHub for free
                        </Link>
                    </Button>
                    
                </div>
            </div>
        </div>
    );
}