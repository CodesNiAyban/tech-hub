import { BookOpen, Compass, Home } from "lucide-react";

export const guestRoutes = [
    {
        icon: Home,
        label: "Dashboard",
        href: "/dashboard/home",
    },
    {
        icon: BookOpen,
        label: "Courses",
        href: "/dashboard/courses",
    },
    {
        icon: Compass,
        label: "Browse",
        href: "/dashboard/browse",
    }
] // TODO: Add Customers, Analytics and stuffs