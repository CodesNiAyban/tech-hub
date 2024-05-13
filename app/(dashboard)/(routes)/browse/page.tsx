import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Categories } from "./_components/categories";
import { getCourses } from "@/actions/get-courses";
import { CoursesList } from "@/components/courses-list";

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

    if (!userId) {
        return redirect("/")
    }
    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    });

    const courses = await getCourses({
        userId,
        ...searchParams,
    })

    return (
        <>
            <div className="mt-16 flex-1 flex flex-col p-6">
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