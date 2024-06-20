import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export const MobileSubscriptionCard = async () => {
    const { userId } = auth();

    let userSubscription;
    if (userId) {
        userSubscription = await db.stripeCustomer.findUnique({
            where: {
                userId: userId,
            }
        });
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                    Unlock all features and get unlimited access to our
                    support team.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {(userSubscription?.subscription?.toString() === "BASIC" || userSubscription?.subscription === "null") &&
                    <Button size="sm" className="w-full" asChild>
                        <Link href="/pricing">
                            Upgrade
                        </Link>
                    </Button>
                }
            </CardContent>
        </Card>
    );
}
