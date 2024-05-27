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
import { Calendar, BookOpen, CalendarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { IconBadge } from "./icon-badge";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "./course-progress";

interface CourseCardProps {
    id: string;
    userId: string;
    title: string;
    imageUrl: string;
    chaptersLength: number;
    description: string | null;
    price: number;
    progress: number | null;
    categories: {
        id: string;
        name: string;
    }[];
    createdAt: Date;
}

export const CourseCard = async ({
    id,
    title,
    imageUrl,
    chaptersLength,
    description,
    userId,
    price,
    progress,
    categories,
    createdAt
}: CourseCardProps) => {
    const user = await clerkClient.users.getUser(userId);

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Link href={`/course/${id}`}>
                    <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3">
                        <div className="relative w-full aspect-video rounded-md overflow-hidden">
                            <Image
                                fill
                                className="object-cover"
                                alt={title}
                                src={imageUrl}
                            />
                        </div>
                        <div className="flex flex-col pt-2">
                            <div className="text-lg md:text-base font-medium group-hover:text-primary transition line-clamp-2">
                                {title}
                            </div>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {categories.map((category) => (
                                    <Badge key={category.id} variant="success" className="text-xs rounded-full px-2 py-1">
                                        {category.name}
                                    </Badge>
                                ))}
                            </div>
                            <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                                <div className="flex items-center gap-x-1">
                                    <IconBadge size="sm" icon={BookOpen} variant="default" />
                                    <span>
                                        {chaptersLength} {chaptersLength === 1 ? 'Chapter' : 'Chapters'}
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
                                ) : (
                                    <p className="text-md md:text-sm font-medium text-slate-700 dark:text-slate-50">
                                        {formatPrice(price)}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </Link>
            </HoverCardTrigger>
            <HoverCardContent>
                <div className="flex justify-between w-50">
                    <Avatar>
                        <AvatarImage src={user.imageUrl.toString()} alt="author" />
                        <AvatarFallback>{user.firstName ? user.firstName[0] : ''}{user.lastName ? user.lastName[0] : ''}</AvatarFallback>
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
        </HoverCard>
    );
};
