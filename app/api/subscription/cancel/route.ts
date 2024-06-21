import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";
import db from "@/lib/db";

export async function PATCH(req: Request) {
    try {
        const user = await currentUser();

        if (!user || !user.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const stripeCustomer = await db.stripeCustomer.findUnique({
            where: {
                userId: user.id,
            },
            select: {
                stripeCustomerId: true,
                subscription: true,
            },
        });

        if (!stripeCustomer || !stripeCustomer.stripeCustomerId) {
            return new NextResponse("No stripe ID or subscription found", { status: 400 });
        }

        if (stripeCustomer.subscription === "LIFETIME") {
            return new NextResponse("Cannot cancel a lifetime subscription", { status: 400 });
        }

        // Retrieve the subscription details
        const subscriptions = await stripe.subscriptions.list({
            customer: stripeCustomer.stripeCustomerId,
            status: 'active',
        });

        if (subscriptions.data.length === 0) {
            return new NextResponse("No active subscription found", { status: 400 });
        }

        const subscriptionId = subscriptions.data[0].id;

        // Cancel the subscription
        await stripe.subscriptions.update(subscriptionId, {
            cancel_at_period_end: true,
            metadata: {
                userId: user.id,
            }
        })

        await db.stripeCustomer.update({
            where: {
                userId: user.id,
            },
            data: {
                status: "INACTIVE",
            },
        });

        return new NextResponse("Subscription cancelled", { status: 200 });
    } catch (error) {
        console.log("[CANCEL_SUBSCRIPTION]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
