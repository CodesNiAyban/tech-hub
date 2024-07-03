import { BaggageClaim, Brain, Compass, Home, Mail, Settings } from "lucide-react";

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
        icon: Brain,
        label: "AI Quiz",
        href: "/ai-quiz",
    },
    {
        icon: BaggageClaim,
        label: "Pricing",
        href: "/pricing",
    },
    {
        icon: Mail,
        label: "Announcements",
        href: "/mail",
    },
    {
        icon: Settings,
        label: "Settings",
        href: "/user-profile",
    },

] // TODO: Add Customers, Analytics and stuffs