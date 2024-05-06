import { LogoPhone } from "@/components/logo-phone"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SignedIn, UserButton } from "@clerk/nextjs"
import {
    Menu
} from "lucide-react"
import { NavBarRoutes } from "./navbar-routes"
import SearchComponent from "./search"
import { MobileSubscriptionCard } from "./mobile-subscription-card"

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
                        <MobileSubscriptionCard/>
                    </div>
                </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
                <SearchComponent />
            </div>
            <SignedIn>
                <UserButton />
            </SignedIn>

        </header>
    );
}

export default DashboardNavBar;