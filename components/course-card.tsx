import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { clerkClient } from "@clerk/nextjs/server";
import { CalendarIcon, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { IconBadge } from "./icon-badge";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "./course-progress";
import { SubscriptionType } from "@prisma/client";
import { CourseModal } from "./modals/course-modal";

interface CourseCardProps {
    code: string;
    id: string;
    title: string;
    imageUrl: string;
    chaptersLength: number;
    chapters: { id: string; subscription: SubscriptionType | null }[];
    description: string | null;
    price: number;
    progress: number | null;
    categories: {
        id: string;
        name: string;
    }[];
    createdAt: Date;
    userId: string;
    isPurchased: boolean;
}

const getSubscriptionBadges = (chapters: { subscription: SubscriptionType | null }[]) => {
    const subscriptions = new Set(chapters.map(chapter => chapter.subscription));
    const badges: { label: string, variant: "free" | "basic" | "pro" | "yellow" }[] = [];

    if (subscriptions.has(null)) {
        badges.push({ label: "Free", variant: "free" });
    }
    if (subscriptions.has("BASIC")) {
        badges.push({ label: "Basic", variant: "basic" });
    }
    if (subscriptions.has("PRO")) {
        badges.push({ label: "Pro", variant: "pro" });
    }
    if (subscriptions.has("LIFETIME")) {
        badges.push({ label: "Lifetime", variant: "yellow" });
    }

    return (
        <div className="absolute top-2 right-2 z-20 flex gap-1">
            {badges.map(badge => (
                <Badge key={badge.label} variant={badge.variant}>
                    {badge.label}
                </Badge>
            ))}
        </div>
    );
};

export const CourseCard = async ({
    id,
    title,
    imageUrl,
    chaptersLength,
    chapters,
    description,
    userId,
    price,
    progress,
    categories,
    createdAt,
    code,
    isPurchased
}: CourseCardProps) => {
    const user = JSON.parse(JSON.stringify(await clerkClient.users.getUser(userId)));

    return (
        <HoverCard>
            <CourseModal
                code={code}
                courseId={id}
                title={title}
                imageUrl={imageUrl}
                chaptersLength={chaptersLength}
                chapters={chapters}
                description={description}
                userId={userId}
                price={price}
                progress={progress}
                categories={categories}
                createdAt={createdAt}
                user={user}
            >
                <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 relative">
                    <div className="relative w-full aspect-video rounded-md overflow-hidden">
                        {getSubscriptionBadges(chapters)}
                        <HoverCardTrigger asChild>
                            <div className="relative w-full h-full">
                                <Image fill className="object-cover" alt={title} src={imageUrl} />
                            </div>
                        </HoverCardTrigger>
                    </div>
                    <div className="flex flex-col pt-2">
                        <div className="text-lg md:text-base font-medium group-hover:text-primary transition line-clamp-2">
                            {title}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                            {categories.map((category) => (
                                <Badge
                                    key={category.id}
                                    variant="success"
                                    className="text-xs rounded-full px-2 py-1"
                                >
                                    {category.name}
                                </Badge>
                            ))}
                        </div>
                        <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                            <div className="flex items-center gap-x-1">
                                <IconBadge size="sm" icon={BookOpen} variant="default" />
                                <span>
                                    {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
                                </span>
                            </div>
                        </div>
                        <div>
                            {progress !== null ? (
                                <CourseProgress
                                    size="sm"
                                    value={progress}
                                    variant={progress === 100 ? "success" : "default"}
                                />
                            ) : isPurchased ? (
                                <p className="text-md md:text-sm font-medium text-slate-700 dark:text-slate-50">
                                    Course Purchased
                                </p>
                            ) : (
                                <p className="text-md md:text-sm font-medium text-slate-700 dark:text-slate-50">
                                    {price ? formatPrice(price) : "Free"}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </CourseModal>

            <HoverCardContent>
                <div className="flex justify-between w-50">
                    <Avatar>
                        <AvatarImage src={user.imageUrl.toString()} alt="author" />
                        <AvatarFallback>
                            {user.firstName ? user.firstName[0] : ""}
                            {user.lastName ? user.lastName[0] : ""}
                        </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">Author: {user.username}</h4>
                        <p className="text-sm min-h-[1.5em]">{description}</p>
                        <div className="flex items-center pt-2">
                            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                            <span className="text-xs text-muted-foreground">
                                Created: {new Date(createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard >
    );
};
