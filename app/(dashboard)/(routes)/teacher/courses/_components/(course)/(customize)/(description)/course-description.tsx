import { cn } from "@/lib/utils";
import { EditDescriptionDialog } from "./edit-description-dialog";
import { Course } from "@prisma/client";

interface CourseDescriptionProps {
    initialData: Course
    courseId: string;
    toggleModal: () => void
}

export const CourseDescription = ({
    toggleModal,
    initialData,
    courseId,
}: CourseDescriptionProps) => {
    return (
        <div className="grid gap-6 pt-6">
            <div className="grid gap-3">
                <div className="font-medium flex items-center justify-between">
                    Course Description
                    <EditDescriptionDialog
                        title={initialData.description ? "Edit Description" : "Add Description"}
                        formLabel={"New Course Description"}
                        description={"Set the description for this course. Click 'Save' when you're finished."}
                        initialData={initialData}
                        courseId={courseId}
                        toggleModal={toggleModal}
                    />
                </div>
                <div className="border bg-muted/40 rounded-md p-2 px-3">
                    <div className="font-medium flex items-center justify-between">
                        <p className={cn("text-sm ",
                            !initialData.description && "text-sm text-muted-foreground italic"
                        )}>
                            {initialData.description || "No description"}
                        </p>
                    </div>
                </div>
            </div>
        </div >
    );
}