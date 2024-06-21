import { getCourses } from "@/actions/get-courses";
import { CoursesList } from "@/components/courses-list";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Categories } from "../_components/categories";
import { SubscriptionSuccess } from "../_components/subscription-success";

export const maxDuration = 60;

interface BrowseProps {
    searchParams: {
        title: string;
        categoryId: string;
        success: string;
    };
}

const Browse = async ({ searchParams }: BrowseProps) => {
    let { userId } = auth();
    
    const categories = await db.category.findMany({
        orderBy: {
            name: "asc",
        },
    });

    const courses = await getCourses({
        userId: userId || "",
        ...searchParams,
    });

    const user = await db.stripeCustomer.findUnique({
        where: {
            userId: userId || "",
        },
    });

    return (
        <>
            <div className="mt-10 flex-1 flex flex-col p-3">
                <SubscriptionSuccess user={user} success={searchParams.success} />
                <Categories items={categories} />

                {user?.subscription !== "null" || user?.subscription !== null && <CoursesList items={courses} userSubscription={user?.subscription || "null"}/>}
            </div>
        </>
    );
};

export default Browse;
