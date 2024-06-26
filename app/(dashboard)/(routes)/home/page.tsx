import { CheckCircle, Clock } from "lucide-react";
import { redirect } from "next/navigation";
import InfoCard from "./_components/info-card";
import { auth } from "@clerk/nextjs/server";
import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";
import db from "@/lib/db";

export const maxDuration = 60;

export const metadata = {
  title: "Home",
}

export default async function Dashboard() {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  );

  const userSubscription = await db.stripeCustomer.findUnique({
    where: {
      userId: userId || "",
    },
  });
  return (
    <div className="p-6 space-y-4 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="In progress"
          numberOfItems={coursesInProgress.length}
          variant="default"
        />

        <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedCourses.length}
          variant="success"
        />
      </div>
      <CoursesList
        items={[...coursesInProgress, ...completedCourses]}
        currentUserId={userId} 
        userSubscription={userSubscription?.subscription || "null"}
      />
    </div>
  );
}