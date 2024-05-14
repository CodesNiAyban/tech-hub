import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { IconBadge } from "./icon-badge";
import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/format";

interface CourseCardProps {
    id: string;
    title: string;
    imageUrl: string;
    chaptersLength: number;
    price: number;
    progress: number | null;
    categories: {
        id: string;
        name: string;
    }[];
}

export const CourseCard = ({
    id,
    title,
    imageUrl,
    chaptersLength,
    price,
    progress,
    categories,
}: CourseCardProps) => {

    return (
        <Link href={`/course/${id}`}>
            <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
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
                            <div className="mt-2">
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                                </div>
                                <div className="mt-1 text-xs text-gray-600">
                                    {progress}% complete
                                </div>
                            </div>
                        ) : (
                            <p className="text-md md:text-sm font-md dark:text-slate-50 root:text-black">
                                {formatPrice(price)}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}
