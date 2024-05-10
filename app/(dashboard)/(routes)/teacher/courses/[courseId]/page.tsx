import { CourseAttachment } from "@/app/(dashboard)/_components/(course)/(attachments)/course-attachments";
import { CourseChapters } from "@/app/(dashboard)/_components/(course)/(chapters)/course-chapters";
import { CustomizeCourse } from "@/app/(dashboard)/_components/(course)/(customize)/course-customize";
import { CoursePrice } from "@/app/(dashboard)/_components/(course)/(sell)/course-price";
import db from "@/lib/db";
import { redirect } from "next/navigation";

const CourseIdPage = async ({
    params
}: {
    params: { courseId: string }
}) => {
    const course = await db.course.findUnique({
        where: {
            id: params.courseId
        },
        include: {
            categories: {
                orderBy: {
                    name: "desc"
                }
            },
            attachments: {
                orderBy: {
                    createdAt: "desc"
                }
            }
        },
    })

    if (!course) {
        return redirect("/teacher/course"); // TODO: Add toast that course not found
    }

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc",
        }
    })

    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categories.length > 0
    ]

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length

    const completionText = `(${completedFields}/${totalFields})`

    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">
                        Course Setup
                    </h1>
                    <span className="text-sm root:text-slate-700">
                        Complete all fields {completionText}
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-10">
                <div>
                    <div className="flexcenter gap-x-2">
                        <CustomizeCourse
                            initialData={course}
                            courseId={course.id}
                            categories={categories}
                        />
                    </div>
                </div>
                <div>
                    <div className="flexcenter gap-x-2">
                        <CourseChapters
                            initialData={course}
                            courseId={course.id}
                        />
                        <CoursePrice
                            initialData={course}
                            courseId={course.id}
                        />
                        <CourseAttachment
                            initialData={course}
                            courseId={course.id}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseIdPage;