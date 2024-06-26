import { Category, Course, SubscriptionType } from "@prisma/client";

import { getProgress } from "@/actions/get-progress";
import db from "@/lib/db";

export interface CourseWithProgressWithCategory {
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
        userId: string;
    }[];
    progress?: number | null;
    averageRating?: number | null;
    totalRatings?: number | null;
}

export interface GetCoursesParams {
    userId?: string | "";
    title?: string;
    categoryId?: string;
}

export const getCourses = async ({
    userId,
    title,
    categoryId,
}: GetCoursesParams): Promise<CourseWithProgressWithCategory[]> => {
    try {
        const courses = await db.course.findMany({
            where: {
                isPublished: true,
                title: {
                    contains: title || '',
                },
                categories: {
                    some: {
                        id: categoryId || undefined,
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
                        userId: userId || undefined,
                    },
                    select: {
                        id: true,
                    },
                },
                ratings: {
                    select: {
                        rating: true,
                    },
                }
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const coursesWithProgressAndRatings = await Promise.all(
            courses.map(async course => {
                let progressPercentage = null;
                if (userId) {
                    progressPercentage = await getProgress(userId, course.id);
                }

                // Calculate average rating
                const totalRatings = course.ratings.length;
                const sumRatings = course.ratings.reduce((sum, rating) => sum + rating.rating, 0);
                const averageRating = totalRatings > 0 ? sumRatings / totalRatings : null;

                return {
                    ...course,
                    progress: progressPercentage,
                    purchases: course.purchases.map(purchase => ({
                        ...purchase,
                        userId: userId || "",
                    })),
                    averageRating: averageRating,
                    totalRatings: totalRatings,
                };
            })
        );

        return coursesWithProgressAndRatings;
    } catch (error) {
        console.error("[GET_COURSES]: ", error);
        return [];
    }
};
