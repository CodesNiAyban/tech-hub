import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import db from "@/lib/db";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return new NextResponse(`⚠️ Webhook Error: ${error.message}`, { status: 400 });
    }
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session?.metadata?.userId;
    const courseId = session?.metadata?.courseId;
    const type = session?.metadata?.type;

    try {
        switch (event.type) {
            case "checkout.session.completed":
                if (!type || !userId) {
                    return new NextResponse(`Webhook Error: Missing Metadata`, {
                        status: 400,
                    });
                }
                if (type === "course") {
                    if (!courseId) {
                        return new NextResponse(`Webhook Error: Missing Metadata`, {
                            status: 400,
                        });
                    }
                    await db.purchase.create({
                        data: {
                            courseId: courseId,
                            userId: userId,
                        },
                    });
                } else if (type === "lifetime") {
                    await db.stripeCustomer.update({
                        where: {
                            userId: userId,
                        },
                        data: {
                            status: "ACTIVE",
                            subscription: "LIFETIME"
                        }
                    })
                }
                break;
            case "customer.subscription.created":
                if (!userId || !type) {
                    return new NextResponse(`Webhook Error: Missing Metadata`, {
                        status: 400,
                    });
                }

                if (type === "basic") {
                    await db.stripeCustomer.update({
                        where: {
                            userId: userId,
                        },
                        data: {
                            status: "ACTIVE",
                            subscription: "BASIC",
                        },
                    })
                } else if (type === "pro") {
                    await db.stripeCustomer.update({
                        where: {
                            userId: userId,
                        },
                        data: {
                            status: "ACTIVE",
                            subscription: "PRO",
                        },
                    })
                }
                break;
            case "customer.subscription.deleted":
                await db.stripeCustomer.update({
                    where: {
                        userId: userId,
                    },
                    data: {
                        status: "INACTIVE",
                        subscription: null,
                    },
                })
                break;
            default:
                return new NextResponse(
                    `Webhook Error: Unhandled Event type ${event.type}`,
                    { status: 200 }
                );
        }
        return new NextResponse("Success", { status: 200 });
    } catch (error: any) {
        console.log(error)
        return new NextResponse("Failed", { status: 500 });

    }
}


