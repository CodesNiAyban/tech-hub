import { LogoPhone } from "@/components/logo-phone"
import { ModeToggle } from "@/components/theme-button"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import {
    Link,
    Loader2,
    Menu
} from "lucide-react"
import { MobileSubscriptionCard } from "../(sidebar)/mobile-subscription-card"
import { NavBarRoutes } from "./navbar-routes"
import SearchComponent from "./search"
import { TeacherStudentButton } from "./teacher-student-button"

export const DashboardNavBar = () => {
    return (
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] xl:px-6 backdrop-blur-sm duration-1000 animate-in slide-in-from-top-12">
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 xl:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                    <LogoPhone />
                    <NavBarRoutes />
                    <div className="mt-auto">
                        <MobileSubscriptionCard />
                    </div>
                </SheetContent>
            </Sheet>
            <div className="w-full flex items-center justify-between"> {/* Added flex and justify-between classes */}
                <div className="flex-1"> {/* Added flex-1 class to make it take remaining space */}
                    <SearchComponent />
                </div>
                <div className="ml-4 mr-2">
                    <ModeToggle />
                </div>
                <TeacherStudentButton />
            </div>
            <ClerkLoading>
                <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />
            </ClerkLoading>
            <ClerkLoaded>
                <SignedOut>
                    <Button size="sm" variant="outline" asChild>
                        <Link href="/sign-in">
                            Login
                        </Link>
                    </Button>
                </SignedOut>
                <SignedIn>
                    <UserButton
                    // afterSignOutUrl="/"
                    />
                </SignedIn>
            </ClerkLoaded>
        </header>
    );
}

export default DashboardNavBar;