import db from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { WebhookEvent } from "@clerk/nextjs/server";
import Mux from "@mux/mux-node";
import { headers } from 'next/headers';
import { Webhook } from "svix";

const mux = new Mux({
    tokenId: process.env.MUX_TOKEN_ID!,
    tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

export async function POST(req: Request) {
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
    const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if (!CLERK_WEBHOOK_SECRET) {
        throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occurred -- no svix headers', {
            status: 400
        })
    }

    // Get the body
    const payload = await req.json()
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(CLERK_WEBHOOK_SECRET);

    let evt: WebhookEvent

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occurred', {
            status: 400
        })
    }
    const eventType = evt.type;

    switch (eventType) {
        case "user.created": {
            let stripeCustomer = await db.stripeCustomer.findUnique({
                where: {
                    userId: evt.data.id,
                },
                select: {
                    stripeCustomerId: true,
                },
            });

            if (!stripeCustomer) {
                const email = evt.data.email_addresses[0]?.email_address;
                if (!email) {
                    return new Response('Error: No email address found', {
                        status: 400
                    });
                }

                const customer = await stripe.customers.create({
                    email: evt.data.email_addresses[0]?.email_address,
                });

                stripeCustomer = await db.stripeCustomer.create({
                    data: {
                        userId: evt.data.id!,
                        stripeCustomerId: customer.id,
                    },
                });
            }
            break;
        }
        case "user.deleted": {
            // Delete all data related to this userId
            await deleteUserData(evt.data.id!);
            break;
        }
        default:
            console.warn(`Unhandled event type: ${eventType}`);
            break;
    }

    return new Response('Success', { status: 200 })
}

async function deleteUserData(userId: string) {
    try {
        // Delete related data from Prisma models
        // Delete Mux videos associated with the user's chapters
        const userCourses = await db.course.findMany({
            where: {
                userId,
            },
            include: {
                chapters: {
                    include: {
                        muxData: true,
                    },
                },
            },
        });

        for (const course of userCourses) {
            for (const chapter of course.chapters) {
                if (chapter.muxData?.assetId) {
                    await mux.video.assets.delete(chapter.muxData!.assetId);
                }
            }
        }

        await db.course.deleteMany({
            where: {
                userId,
            },
        });

        // Delete StripeCustomer
        await db.stripeCustomer.delete({
            where: {
                userId,
            },
        });

        // Add deletion logic for other related data models as needed

    } catch (error) {
        console.error("Error deleting user data:", error);
        throw new Error("Error deleting user data");
    }
}
