import { cn } from "@/lib/utils";
import { EditImageDialog } from "./edit-image-dialog";
import { Course } from "@prisma/client";
import { ImageIcon } from "lucide-react";
import Image from "next/image"

interface CourseImageProps {
    initialData: Course;
    courseId: string;
    toggleModal: () => void
}

export const CourseImage = ({
    toggleModal,
    initialData,
    courseId,
}: CourseImageProps) => {
    return (
        <div className="grid gap-6 pt-6">
            <div className="grid gap-3">
                <div className="font-medium flex items-center justify-between">
                    Course Image
                    <EditImageDialog
                        title={"Edit Course Image"}
                        formLabel={"Image"}
                        decscription={"Edit or add a image for you course, this is optional."}
                        initialData={initialData}
                        courseId={courseId}
                        toggleModal={toggleModal}
                    />
                </div>
                {!initialData.imageUrl ? (
                    <div className="flex items-center justify-center border h-60 bg-muted/40 rounded-md p-2 px-3">
                        <ImageIcon className="h-10 w-10 text-muted-foreground" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <Image
                            alt="upload"
                            fill
                            className="object-cover rounded-md"
                            src={initialData.imageUrl}
                        />
                    </div>
                )}
            </div>
        </div >
    );
}