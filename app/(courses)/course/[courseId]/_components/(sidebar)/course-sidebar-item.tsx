"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface CourseSidebarItemProps {
    label: string;
    id: string;
    isCompleted: boolean;
    courseId: string;
    isLocked: boolean;
}

export const CourseSidebarItem = ({
    label,
    id,
    isCompleted,
    courseId,
    isLocked,
}: CourseSidebarItemProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle;

    const isActive = pathname?.includes(id);
    const onClick = () => {
        router.push(`/course/${courseId}/chapters/${id}`);
    };

    return (
        <button
            onClick={onClick}
            type="button"
            className={cn(
                "flex items-center gap-x-2 text-sm font-[500] pl-6 transition-all hover:bg-primary/70 hover:text-slate-40",
                isActive &&
                " bg-primary/40 hover:bg-primary/70 hover:text-slate-40",
                isCompleted && "text-emerald-700 hover:text-emerald-700",
                isCompleted && isActive && "bg-emerald-200/20"
            )}
        >
            <div className="flex items-center gap-x-2 py-4">
                <Icon
                    size={22}
                    className={cn(
                        isActive && "text-destructive",
                        isCompleted && "text-emerald-700"
                    )}
                />
                {label}
            </div>
            <div
                className={cn(
                    "ml-auto opacity-0 border-2 bg-primary/40 h-full transition-all",
                    isActive && "opacity-100",
                    isCompleted && "border-emerald-700"
                )}
            />
        </button>
    );
};