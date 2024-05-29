import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export const MobileSubscriptionCard = () => {
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
                <Button size="sm" className="w-full" asChild>
                    <Link href="/pricing">
                        Upgrade
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
}
