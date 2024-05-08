"use client"

import { IconBadge } from "@/components/icon-badge"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { LayoutDashboard } from "lucide-react"
import { useState } from "react"
import { EditTitleDialog } from "./(title)/edit-title-dialog"
import { CourseDescription } from "./(description)/course-description"
import { CourseTitle } from "./(title)/course-title"
import { Course } from "@prisma/client"
import { CourseImage } from "./(image)/course-image"
import db from "@/lib/db"

interface TitleFormProps {
    initialData: Course
    courseId: string;
}

export const EditCourse = async ({
    initialData,
    courseId
}: TitleFormProps) => {
    const [modalOpen, setModalOpen] = useState(false);
    const toggleModal = () => setModalOpen((current) => !current);

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc",
        }
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className="flex items-center center gap-x-2">
                        <IconBadge icon={LayoutDashboard} size={"default"} variant={"default"} />
                        Customize your Course
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <CourseTitle
                    initialData={initialData}
                    courseId={courseId}
                    toggleModal={toggleModal}
                />
                <CourseDescription
                    initialData={initialData}
                    courseId={courseId}
                    toggleModal={toggleModal}
                />
                <CourseImage
                    initialData={initialData}
                    courseId={courseId}
                    toggleModal={toggleModal}
                />
            </CardContent>
        </Card>
    );
}