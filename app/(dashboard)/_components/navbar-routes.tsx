"use client"

import { Compass, BookOpen } from "lucide-react";
import NavBarItem from "./navbar-item";

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

export const NavBarRoutes = () => {
    const routes = guestRoutes;

    return (
        <nav className="grid gap-2 text-lg font-medium">
            {routes.map((route) => (
                <NavBarItem
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </nav>
    );
}
