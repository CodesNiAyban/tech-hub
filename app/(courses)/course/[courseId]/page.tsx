
import db from "@/lib/db";
import { redirect } from "next/navigation";

export const maxDuration = 60;

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: { isPublished: true },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/sign-in");
  }

  return redirect(`/course/${course.id}/chapters/${course.chapters[0].id}`);
};

export default CourseIdPage;