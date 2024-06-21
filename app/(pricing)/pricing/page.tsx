import db from "@/lib/db";
import { PricingCards } from "../_components/pricing-cards";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

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
    <PricingCards userSubscription={userSubscription} subscriptionPrices={SubscriptionPrices}/>
  );
}

export default PricingPage;