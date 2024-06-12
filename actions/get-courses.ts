import { Category, Course, SubscriptionType } from "@prisma/client";

import { getProgress } from "@/actions/get-progress";
import { Categories } from "@/app/(dashboard)/(routes)/browse/_components/categories";
import db from "@/lib/db";
export interface CourseWithProgressWithCategory {
    code: string;
    id: string;
    userId?: string;
    title: string;
    description: string | null;
    imageUrl: string | null;
    price: number | null;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
    categories: Category[] | null;
    chapters: {
        id: string;
        subscription: SubscriptionType | null;
    }[];
    purchases: {
        id: string;
    }[];
    progress?: number | null;
}

export interface GetCoursesParams {
    code?: string;
    userId?: string | "";
    title?: string;
    categoryId?: string;
}

export const getCourses = async ({
    userId,
    title,
    categoryId,
    code
}: GetCoursesParams): Promise<CourseWithProgressWithCategory[]> => {
    try {
        const courses = await db.course.findMany({
            where: {
                isPublished: true,
                code: {
                    contains: code,
                },
                title: {
                    contains: title,
                },
                categories: {
                    some: {
                        id: categoryId,
                    },
                },
            },
            include: {
                categories: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                chapters: {
                    where: {
                        isPublished: true,
                    },
                    select: {
                        id: true,
                        subscription: true,
                    },
                },
                purchases: {
                    where: {
                        userId,
                    },
                    select: {
                        id: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        if (userId) {
            const coursesWithProgress: CourseWithProgressWithCategory[] = await Promise.all(
                courses.map(async course => {
                    if (course.purchases.length === 0) {
                        return {
                            ...course,
                            progress: null,
                        }
                    }

                    const progressPercentage = await getProgress(userId, course.id);

                    return {
                        ...course,
                        progress: progressPercentage,
                    };
                })
            );

            return coursesWithProgress;
        } else {
            return courses.map(course => ({
                ...course,
                progress: null,
            }));
        }
    } catch (error) {
        console.log("[GET_COURSES]: ", error);
        return [];
    }
}
