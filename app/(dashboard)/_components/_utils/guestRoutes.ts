import { BookOpen, Compass, Home } from "lucide-react";

export const guestRoutes = [
    {
        icon: Home,
        label: "Dashboard",
        href: "/home",
    },
    {
        icon: BookOpen,
        label: "Courses",
        href: "/teacher/courses",
    },
    {
        icon: Compass,
        label: "Browse",
        href: "/browse",
    }
] // TODO: Add Customers, Analytics and stuffs