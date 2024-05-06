"use client"

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
    icon: LucideIcon;
    label: string,
    href: string;
}

const SideBarItem = ({
    icon,
    label,
    href
}: SidebarItemProps) => {
    const pathname = usePathname();
    const Icon = icon;

    const isActive =
        (pathname === "/dashboard" && href === "/dashboard") ||
        pathname === href ||
        pathname?.startsWith(`${href}/`);

    return (
        <Link
            href={href}
            className={cn("flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary ",
                isActive && "flex items-center gap-3 rounded-lg bg-muted px-3 py-3 text-primary transition-all hover:text-primary",
            )}
        >
            <Icon className="h-4 w-4" />
            {label}
        </Link>
    );
}

export default SideBarItem;