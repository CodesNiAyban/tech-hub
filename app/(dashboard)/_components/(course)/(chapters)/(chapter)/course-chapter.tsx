import { cn } from "@/lib/utils";
import { EditChapterDialog } from "./edit-chapter-dialog";
import { Chapter, Course } from "@prisma/client";
import { ChaptersList } from "./chapters-list";

interface CourseChapterProps {
    initialData: Course & { chapters: Chapter[] };
    courseId: string;
    toggleModal: () => void
}

export const CourseChapter = ({
    toggleModal,
    initialData,
    courseId,
}: CourseChapterProps) => {
    return (
        <div className="grid gap-6 pt-6">
            <div className="grid gap-3">
                <div className="font-medium flex items-center justify-between">
                    Course Chapter
                    <EditChapterDialog
                        title={"Create chapter"}
                        formLabel={"Chapter"}
                        decscription={"Edit or add a chapter for you course"}
                        initialData={initialData}
                        courseId={courseId}
                        toggleModal={toggleModal}
                    />
                </div>
                <div className="border bg-muted/40 rounded-md p-2 px-3">
                    <div className="font-medium flex items-center justify-between">
                        {!initialData.chapters.length ? (
                            <p className="text-muted-foreground italic">No chapters yet.</p>
                        ) : (
                            <ChaptersList
                                onEdit={() => { }}
                                onReorder={() => { }}
                                items={initialData.chapters || []}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}