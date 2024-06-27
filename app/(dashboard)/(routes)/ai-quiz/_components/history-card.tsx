import { IconBadge } from "@/components/icon-badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { History, Eye, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HistoryCard = () => {
    return (
        <Card className="mb-6 hover:cursor-pointer hover:opacity-75">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-2xl font-bold">
                    <div className="flex items-center gap-x-2">
                        History
                    </div>
                </CardTitle>
                <History className="h-8 w-8 text-primary" />
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    View past quiz attempts and analyze your performance over time.
                </p>
                <div className="mt-4 space-y-2">
                    <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-2 text-primary" />
                        <p className="text-sm">
                            Review detailed quiz results.
                        </p>
                    </div>
                    <div className="flex items-center">
                        <Trash className="h-4 w-4 mr-2 text-primary" />
                        <p className="text-sm">
                            Clear your quiz history.
                        </p>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Eye className="h-5 w-5 text-primary mr-2" />
                <p className="text-sm font-medium text-primary">
                View History
                </p>
            </CardFooter>
        </Card>
    );
}

