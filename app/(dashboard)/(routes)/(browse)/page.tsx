import { getCourses } from "@/actions/get-courses";
import { CoursesList } from "@/components/courses-list";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Categories } from "./_components/categories";
import { SubscriptionSuccess } from "./_components/subscription-success";

interface BrowseProps {
    searchParams: {
        title: string;
        categoryId: string;
    }
}

const Browse = async ({
    searchParams,
}: BrowseProps) => {
    const { userId } = auth();

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    });

    const courses = await getCourses({
        userId: userId || "",
        ...searchParams,
    })

    const user = await db.stripeCustomer.findUnique({
        where: {
            userId: userId || "",
        },
    });

    return (
        <>
            <div className="mt-10 flex-1 flex flex-col p-3">

                {user?.subscription !== null && <SubscriptionSuccess user={user} />}
                <Categories
                    items={categories}
                />
                <CoursesList
                    items={courses}
                />
            </div>
        </>
    );
}

export default Browse;