"use client"

import { Compass, BookOpen } from "lucide-react";
import SideBarItem from "./sidebar-item";

const guestRoutes = [
    {
        icon: BookOpen,
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

export const SidebarRoutes = () => {
    const routes = guestRoutes;

    return (
        <nav className="grid items-start text-sm font-medium lg:px-4">
            {routes.map((route) => (
                <SideBarItem
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </nav>
    );
}
