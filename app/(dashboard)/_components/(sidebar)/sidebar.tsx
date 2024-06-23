import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import { SidebarRoutes } from "./sidebar-routes"
import { SubscriptionCard } from "./subscription-card"
import db from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export const SideBar = async () => {
  const { userId } = auth();

  let userSubscription;
  if (userId) {
    userSubscription = await db.stripeCustomer.findUnique({
      where: {
        userId: userId,
      }
    });
  }

  return (
    <div className="hidden border-r bg-muted/40 md:block backdrop-blur-sm duration-1000 animate-in slide-in-from-left-12">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Logo />
          {userSubscription?.subscription?.toString() !== "null" && (
            <Badge className="ml-1 text-xs xl:block lg:hidden md:hidden sm:hidden" variant="outline">
              <Link href="/pricing">{userSubscription?.subscription === "LIFETIME" ? "LT" : userSubscription?.subscription ? userSubscription?.subscription : "FREE"}</Link>
            </Badge>
          )}
          <Button variant="outline" size="icon" className="h-8 w-8 ml-auto">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <SidebarRoutes />
        </div>
        {(userSubscription?.subscription?.toString() === "BASIC" || !userSubscription?.subscription) && (
          <div className="mt-auto p-4">
            <SubscriptionCard />
          </div>
        )}
      </div>
    </div>
  );
}
