
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const maxDuration = 60;

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

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
      enrollee: {
        where: {
          userId: userId,
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  const isEnrolled = await db.enrollees.findFirst({
    where: {
      userId: userId,
      courseId: params.courseId
    },
  });

  if (!isEnrolled) {
    return redirect("/");
  }

  return redirect(`/course/${course.id}/chapters/${course.chapters[0].id}`);
};

export default CourseIdPage;