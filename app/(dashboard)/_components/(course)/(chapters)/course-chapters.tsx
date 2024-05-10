"use client"

import { IconBadge } from "@/components/icon-badge"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Category, Course } from "@prisma/client"
import { ListChecks } from "lucide-react"
import { useState } from "react"

interface TitleFormProps {
    initialData: Course & { categories: Category[] };
    courseId: string;
    categories: {
        id: string;
        name: string;
    }[]
}

export const CourseChapters = ({
    initialData,
    courseId,
    categories
}: TitleFormProps) => {
    const [modalOpen, setModalOpen] = useState(false);
    const toggleModal = () => setModalOpen((current) => !current);

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle>
                    <div className="flex items-center center gap-x-2">
                        <IconBadge icon={ListChecks} size={"default"} variant={"default"} />
                        Course Chapters
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                TODO: Chapters
            </CardContent>
        </Card>
    );
}