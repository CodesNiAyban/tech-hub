"use client"
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface CourseSidebarItemProps {
    label: string;
    id: string;
    isCompleted: boolean;
    courseId: string;
    isLocked: boolean | undefined;
    requiredSubscription?: string | null; // Add requiredSubscription prop
    badgeLock: boolean | undefined
}

export const CourseSidebarItem = ({
    label,
    id,
    isCompleted,
    courseId,
    isLocked,
    requiredSubscription, 
    badgeLock
}: CourseSidebarItemProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle;

    const isActive = pathname?.includes(id);
    const onClick = () => {
        if (!isLocked) {
            router.push(`/course/${courseId}/chapters/${id}`);
        } else if (badgeLock) {
            toast.error(`This chapter is locked. Subscribe to TechHub ${requiredSubscription} or purchase the course`);
        } else {
            toast.error("This chapter is locked, complete previous chapters first.");
        }
    };

    return (
        <button
            onClick={onClick}
            type="button"
            className={cn(
                "flex items-center gap-x-2 text-sm font-medium pl-6 transition-all",
                isActive
                    ? "bg-ring dark:bg-ring/30 text-slate-900 dark:text-primary"
                    : "text-slate-700 dark:text-primary hover:bg-primary/30 dark:hover:bg-primary/30",
                isCompleted && "text-emerald-700 dark:text-emerald-500",
                isCompleted && isActive && "bg-emerald-200/20 dark:bg-emerald-500/20"
            )}
        >
            <div className="flex items-center gap-x-2 py-4">
                <Icon
                    size={22}
                    className={cn(
                        isActive ? "text-secondary-foreground" : "",
                        isCompleted ? "text-emerald-700 dark:text-emerald-500" : "text-current"
                    )}
                />
                {label}
                {badgeLock && requiredSubscription && (
                    <Badge variant="default" className="ml-auto">
                        {requiredSubscription}
                    </Badge>
                )}
            </div>
            <div
                className={cn(
                    "ml-auto opacity-0 border-2 bg-secondary h-full transition-all",
                    isActive ? "opacity-100" : "",
                    isCompleted ? "border-emerald-700 dark:border-emerald-500" : "border-yellow-500"
                )}
            />
        </button>
    );
};
