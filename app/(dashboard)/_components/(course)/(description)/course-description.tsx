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
        <div className="grid gap-6 pt-9">
            <div className="grid gap-3">
                <div className="font-medium flex items-center justify-between">
                    Course Description
                    <EditDescriptionDialog
                        title={"Edit Course Description"}
                        formLabel={"Description"}
                        decscription={"Edit or add a description for you course, this is optional."}
                        initialData={initialData}
                        courseId={courseId}
                        toggleModal={toggleModal}
                    />
                </div>
                <div className="border bg-muted/40 rounded-md p-2 px-3">
                    <div className="font-medium flex items-center justify-between">
                        <p className={cn("text-md",
                            !initialData.description && "text-muted-foreground italic"
                        )}>
                            {initialData.description || "No description"}
                        </p>
                    </div>
                </div>
            </div>
        </div >
    );
}