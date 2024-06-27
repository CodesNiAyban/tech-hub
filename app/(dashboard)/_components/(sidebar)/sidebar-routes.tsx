"use client"

import { usePathname } from "next/navigation";
import { teacherRoutes } from "../../(routes)/teacher/courses/_components/_utils/teacherRoutes";
import { guestRoutes } from "../../(routes)/teacher/courses/_components/_utils/guestRoutes";
import SideBarItem from "./sidebar-item";
import { Separator } from "@/components/ui/separator";
import React from "react";

export const SidebarRoutes = () => {
    const pathname = usePathname();

    const isTeacherPage = pathname?.includes("/teacher")

    const routes = isTeacherPage ? teacherRoutes : guestRoutes;

    return (
        <nav className="grid items-start text-sm font-medium lg:px-4">
            {routes.map((route) => (
                <React.Fragment key={route.href}>
                    <SideBarItem
                        key={route.href}
                        icon={route.icon}
                        label={route.label}
                        href={route.href}
                    />
                    {route.label === "AI Quiz" && <Separator className="m-1" />}
                </React.Fragment>
            ))}
        </nav>
    );
}
export { guestRoutes, teacherRoutes };

