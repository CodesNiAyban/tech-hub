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
import { EditCourseDialog } from "./edit-dialog"

interface TitleFormProps {
    initialData: {
        title: string;
    };
    courseId: string;
}

export const EditCourse = ({
    initialData,
    courseId
}: TitleFormProps) => {
    const [modalOpen, setModalOpen] = useState(false);
    const toggleModal = () => setModalOpen((current) => !current);

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
                <div className="grid gap-6">
                    <div className="grid gap-3">
                        <div className="font-medium flex items-center justify-between">
                            Course Title
                            <EditCourseDialog
                                isOpen={modalOpen}
                                onClose={toggleModal}
                                title={"Edit Course Title"}
                                formLabel={"Title"}
                                decscription={"This is the title of your Course and stuff"}
                                initialData={initialData}
                                courseId={courseId}
                            />
                        </div>
                        <div className="border bg-muted/40 rounded-md p-4">
                            <div className="font-medium flex items-center justify-between">
                                {initialData.title}
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}