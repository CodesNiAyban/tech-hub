import { Category, Chapter, Course } from "@prisma/client";
import { getProgress } from "@/actions/get-progress";
import db from "@/lib/db";

type CourseWithProgressWithCategory = Course & {
  categories: Category[];
  chapters: Chapter[];
  progress: number | null;
  purchases: {
    id: string;
    userId: string;
  }[];
  averageRating?: number | null;
  totalRatings?: number | null;
};
type DashboardCourses = {
  completedCourses: CourseWithProgressWithCategory[];
  coursesInProgress: CourseWithProgressWithCategory[];
};

export const getDashboardCourses = async (
  userId: string
): Promise<DashboardCourses> => {
  try {
    // Fetch enrolled courses
    const enrolledCourses = await db.enrollees.findMany({
      where: {
        userId: userId,
      },
      select: {
        course: {
          include: {
            categories: true,
            chapters: {
              where: {
                isPublished: true,
              },
            },
            ratings: {
              select: {
                rating: true,
              },
            },
          },
        },
      },
    });

    // Fetch courses with user progress
    const progressCourses = await db.userProgress.findMany({
      where: {
        userId: userId,
      },
      select: {
        chapter: {
          select: {
            course: {
              include: {
                categories: true,
                chapters: {
                  where: {
                    isPublished: true,
                  },
                },
                ratings: {
                  select: {
                    rating: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // Combine and deduplicate courses
    const allCoursesMap = new Map<string, CourseWithProgressWithCategory>();

    enrolledCourses.forEach((enrollee) => {
      const course = enrollee.course as unknown as CourseWithProgressWithCategory;
      const totalRatings = enrollee.course.ratings.length;
      const sumRatings = enrollee.course.ratings.reduce((sum, rating) => sum + rating.rating, 0);
      const averageRating = totalRatings > 0 ? sumRatings / totalRatings : null;

      if (!allCoursesMap.has(course.id)) {
        allCoursesMap.set(course.id, {
          ...course,
          progress: null,
          averageRating: averageRating,
          totalRatings: totalRatings,
        });
      }
    });


    const allCourses = Array.from(allCoursesMap.values());

    // Calculate progress for each course
    for (let course of allCourses) {
      const progress = await getProgress(userId, course.id);
      course["progress"] = progress;
    }

    // Split courses into completed and in-progress
    const completedCourses = allCourses.filter(
      (course) => course.progress === 100
    );
    const coursesInProgress = allCourses.filter(
      (course) => (course.progress ?? 0) < 100
    );

    return {
      completedCourses,
      coursesInProgress,
    };
  } catch (error) {
    console.log("[GET_DASHBOARD_COURSES]", error);
    return {
      completedCourses: [],
      coursesInProgress: [],
    };
  }
};
