import { cn } from "@/lib/utils";
import { EditPriceDialog } from "./edit-price-dialog";
import { Course } from "@prisma/client";
import { formatPrice } from "@/lib/format"

interface CoursePriceProps {
    initialData: Course
    courseId: string;
    toggleModal: () => void
}

export const EditCoursePrice = ({
    toggleModal,
    initialData,
    courseId,
}: CoursePriceProps) => {
    return (
        <div className="grid gap-6">
            <div className="grid gap-3">
                <div className="font-medium flex items-center justify-between">
                    Course Price
                    <EditPriceDialog
                        title={"Edit price"}
                        formLabel={"Price"}
                        decscription={"Edit or add a price for you course, this is optional."}
                        initialData={initialData}
                        courseId={courseId}
                        toggleModal={toggleModal}
                    />
                </div>
                <div className="border bg-muted/40 rounded-md p-2 px-3">
                    <div className="font-medium flex items-center justify-between">
                        <p className={cn("text-md",
                            !initialData.price && "text-muted-foreground italic"
                        )}>
                            {initialData.price
                                ? formatPrice(initialData.price)
                                : "No Price"}
                        </p>
                    </div>
                </div>
            </div>
        </div >
    );
}