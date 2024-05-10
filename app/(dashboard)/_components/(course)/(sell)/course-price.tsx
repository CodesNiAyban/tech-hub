"use client"

import { IconBadge } from "@/components/icon-badge"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Category, Course } from "@prisma/client"
import { CircleDollarSign } from "lucide-react"
import { useState } from "react"
import { EditCoursePrice } from "./(pricing)/course-price"

interface TitleFormProps {
    initialData: Course & { categories: Category[] };
    courseId: string;
    categories: {
        id: string;
        name: string;
    }[]
}

export const CoursePrice = ({
    initialData,
    courseId,
    categories
}: TitleFormProps) => {
    const [modalOpen, setModalOpen] = useState(false);
    const toggleModal = () => setModalOpen((current) => !current);

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className="flex items-center center gap-x-2">
                        <IconBadge icon={CircleDollarSign} size={"default"} variant={"default"} />
                        Course Pricing
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <EditCoursePrice
                    initialData={initialData}
                    courseId={courseId}
                    toggleModal={toggleModal}
                />
            </CardContent>
        </Card>
    );
}