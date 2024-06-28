import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Quiz",
}

const PricingPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const userSubscription = await db.stripeCustomer.findUnique({
    where: {
      userId: userId,
    },
  });

  const SubscriptionPrices = await db.subscriptionPrices.findMany();

  // ADD MORE DETAILS FROM DATABASE E.G. ACTIVE SUBSCRIPTION, RESUME SUBSCRIPTION ETC.

  return (
    <>QUIZ</>
  );
}

export default PricingPage;