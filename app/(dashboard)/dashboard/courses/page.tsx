
import { Button } from "@/components/ui/button"
import Link from "next/link";

const Courses = () => {
    return (
        <>
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Courses</h1>
            </div>
            <div
                className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
            >
                <div className="flex flex-col items-center gap-1 text-center">
                    <h3 className="text-2xl font-bold tracking-tight">
                        You have no courses
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        You can start selling as soon as you add a course.
                    </p>
                    <Button size="sm" variant="outline" className="mt-4" asChild>
                            <Link href="/dashboard/courses/create">
                                Add Course
                            </Link>
                        </Button>
                </div>
            </div>
        </>
    )
}

export default Courses;