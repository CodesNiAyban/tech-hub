"use client"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { CreateCourse } from "./create-course-title"

export const maxDuration = 60;

export function CreateCourseDialog() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="default"> <PlusCircle className="h-4 w-4 mr-2" />Add Course</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <CreateCourse />
            </AlertDialogContent>
        </AlertDialog>
    )
}
