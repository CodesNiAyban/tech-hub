import { LogoPhone } from "@/components/logo-phone"
import { ModeToggle } from "@/components/theme-button"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SignedIn, UserButton } from "@clerk/nextjs"
import {
    Menu
} from "lucide-react"
import { MobileSubscriptionCard } from "../(sidebar)/mobile-subscription-card"
import { NavBarRoutes } from "./navbar-routes"
import SearchComponent from "./search"
import { TeacherStudentButton } from "./teacher-student-button"

export const DashboardNavBar = () => {
    return (
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 backdrop-blur-sm duration-1000 animate-in slide-in-from-top-12">
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
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
            <SignedIn>
                <UserButton afterSignOutUrl="/" />
            </SignedIn>
        </header>
    );
}

export default DashboardNavBar;