"use client"

import { guestRoutes } from "../_utils/guestRoutes";
import SideBarItem from "./sidebar-item";

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
export { guestRoutes };

