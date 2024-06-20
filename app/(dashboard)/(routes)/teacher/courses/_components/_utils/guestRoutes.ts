import { BaggageClaim, BarChartBig, BookOpen, Compass, Home, Users } from "lucide-react";

export const guestRoutes = [
    {
        icon: Home,
        label: "Dashboard",
        href: "/home",
    },
    {
        icon: Compass,
        label: "Browse",
        href: "/",
    },
    {
        icon: BaggageClaim,
        label: "Pricing",
        href: "/pricing",
    },
] // TODO: Add Customers, Analytics and stuffs