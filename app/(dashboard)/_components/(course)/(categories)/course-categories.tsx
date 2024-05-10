import { Category, Course } from "@prisma/client";
import { EditCategoriesDialog } from "./edit-categories-dialog";

interface CourseCategoriesProps {
    initialData: Course & { categories: Category[] };
    courseId: string;
    toggleModal: () => void
    categories: {
        id: string;
        name: string;
    }[]
}

export const CourseCategories = ({
    toggleModal,
    initialData,
    courseId,
    categories
}: CourseCategoriesProps) => {
    return (
        <div className="grid gap-6 pt-6">
            <div className="grid gap-3">
                <div className="font-medium flex items-center justify-between">
                    Course Categories
                    <EditCategoriesDialog
                        title={"Edit Course Categories"}
                        formLabel={"Categories"}
                        decscription={"Edit or add a categories for you course, this is optional."}
                        categories={categories}
                        initialData={initialData}
                        courseId={courseId}
                        toggleModal={toggleModal}
                    />
                </div>
                <div className="border bg-muted/40 rounded-md p-2 px-3">
                    <div className="font-medium flex items-center justify-between">
                        {initialData.categories && <p className="text-muted-foreground italic">No categories</p>}
                        {initialData.categories.map((category) => (
                            <span key={category.id}>{category.name}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}