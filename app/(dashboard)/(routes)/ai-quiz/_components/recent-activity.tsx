import { IconBadge } from "@/components/icon-badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { History, Eye, Trash, BarChart, PlusCircle, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export const RecentActivityCard = () => {
    return (
        <Card className="lg:col-span-3 sm:col-span-4">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-2xl font-bold">
                    Recent Activity
                </CardTitle>
                <Activity className="h-8 w-8 text-primary" />
            </CardHeader>
            <CardContent className="max-h-[600px] overflow-auto">
                <CardDescription className="text-sm text-muted-foreground">
                    You have played a total of 43 quizzes.
                </CardDescription>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">
                        Statistics
                    </h3>
                    <div className="flex items-center mt-2">
                        <BarChart className="h-5 w-5 text-primary mr-2" />
                        <p className="text-sm">
                            Quizzes Taken: <a className="font-bold">12</a>
                        </p>
                    </div>
                    <div className="flex items-center mt-2">
                        <BarChart className="h-5 w-5 text-primary mr-2" />
                        <p className="text-sm">
                            Average Score: <a className="font-bold">85%</a>
                        </p>
                    </div>
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-semibold">
                        Recent Quizzes
                    </h3>
                    <div className="mt-2 space-y-2">
                        <div className="flex items-center justify-between">
                            <p className="text-sm">
                                Quiz on React Basics
                            </p>
                            <Button size="sm" variant="ghost">
                                Retry
                            </Button>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm">
                                JavaScript Fundamentals
                            </p>
                            <Button size="sm" variant="ghost">
                                Retry
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
