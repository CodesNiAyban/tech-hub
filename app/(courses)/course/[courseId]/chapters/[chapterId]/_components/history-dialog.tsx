import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, History, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import HistoryComponent from "./histories";

export const maxDuration = 60;

interface HistoryProps {
    userId: string;
    limit: number;
    chapterId: string
    courseId: string
}

export function HistoryDialog({ userId, limit, courseId, chapterId }: HistoryProps) {
    return (
        <AlertDialog>
            <Button asChild>
                <AlertDialogTrigger className="flex items-center">
                    Quiz history
                    <History className="h-4 w-4 ml-2" />
                </AlertDialogTrigger>
            </Button>
            <AlertDialogContent>
                <HistoryComponent
                    limit={limit}
                    userId={userId}
                    chapterId={chapterId!}
                    courseId={courseId}
                />
                <AlertDialogCancel asChild>
                    <Button variant="outline" >
                        Close
                    </Button>
                </AlertDialogCancel>
            </AlertDialogContent>
        </AlertDialog >
    )
}