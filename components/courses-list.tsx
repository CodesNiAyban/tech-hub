// CoursesList.tsx

import React from "react";
import { CourseCard } from "./course-card";
import { CourseWithProgressWithCategory, getCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs/server";

interface CoursesListProps {
    items: CourseWithProgressWithCategory[];
    currentUserId?: string;
    userSubscription: string;
}

export const CoursesList = ({ items, userSubscription, currentUserId }: CoursesListProps) => {
    // const { userId } = auth(); // TODO: CHANGE TO NOT CHECK AUTH PER COURSE

    return (
        <div className="flex-1 flex flex-col p-3">
            {items.length > 0 ? (
                <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
                    {items.map((item) => {
                        // Check if the current user has purchased this course
                        const isPurchased = item.purchases?.some(purchase => purchase.userId ===  currentUserId);

                        return (
                            <CourseCard
                                key={item.id}
                                id={item.id}
                                code={item.code}
                                title={item.title}
                                imageUrl={item.imageUrl!}
                                chaptersLength={item.chapters.length}
                                chapters={item.chapters}
                                price={item.price!}
                                progress={item.progress!}
                                categories={item.categories!}
                                userId={item.userId || ""}
                                description={item.description}
                                createdAt={item.createdAt}
                                isPurchased={isPurchased}
                                userSubscription={userSubscription}
                            />
                        );
                    })}
                </div>
            ) : (
                <div
                    className="flex flex-1 flex-col items-center justify-center rounded-lg h-screen w-full border border-dashed shadow-sm p-80"
                    x-chunk="dashboard-02-chunk-1"
                >
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h3 className="text-2xl font-bold tracking-tight">No Courses Found</h3>
                        <p className="text-sm text-muted-foreground">
                            Please try to search another keyword or click a category.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};
