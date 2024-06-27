"use client"

import NavBarItem from "./navbar-item";
import { guestRoutes } from "../(sidebar)/sidebar-routes";
import { Separator } from "@/components/ui/separator";
import React from "react";

export const NavBarRoutes = () => {
    const routes = guestRoutes;

    return (
        <nav className="grid gap-2 text-lg font-medium">
            {routes.map((route, index) => (
                <React.Fragment key={route.href}>
                    <NavBarItem
                        key={route.href}
                        icon={route.icon}
                        label={route.label}
                        href={route.href}
                    />
                    {route.label === "AI Quiz" && <Separator />}
                </React.Fragment>
            ))}
        </nav>
    );
}
