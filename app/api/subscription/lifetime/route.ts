import Stripe from "stripe";

import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";
import db from "@/lib/db";

export async function POST() {
    try {
        const user = await currentUser();

        if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        let stripeCustomer = await db.stripeCustomer.findUnique({
            where: {
                userId: user.id,
            },
            select: {
                stripeCustomerId: true,
            },
        });

        if (!stripeCustomer) {
            const customer = await stripe.customers.create({
                email: user.emailAddresses[0].emailAddress,
            });

            stripeCustomer = await db.stripeCustomer.create({
                data: {
                    userId: user.id,
                    stripeCustomerId: customer.id,
                },
            });
        }

        if (stripeCustomer.stripeCustomerId === null) {
            return new NextResponse("No stripe ID", { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            customer: stripeCustomer.stripeCustomerId,
            line_items: [
                {
                    price: process.env.STRIPE_LIFETIME_SUBSCRIPTION_ID,
                    quantity: 1,
                }
            ],
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
            metadata: {
                userId: user.id,
                type: "lifetime",
            },
        });

        if (!session.url) {
            return new NextResponse("BAD REQUEST: No Stripe Url", { status: 500 });
        }

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.log("[COURSE_ID_CHECKOUT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}