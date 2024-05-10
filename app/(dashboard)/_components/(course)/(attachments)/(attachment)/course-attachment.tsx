import { cn } from "@/lib/utils";
import { EditAttachmentDialog } from "./edit-attachment-dialog";
import { Attachment, Course } from "@prisma/client";
import { File, ImageIcon, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

interface CourseAttachmentProps {
    initialData: Course & { attachments: Attachment[] };
    courseId: string;
    toggleModal: () => void
}

export const EditCourseAttachment = ({
    toggleModal,
    initialData,
    courseId,
}: CourseAttachmentProps) => {
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const deleteAttachment = async (id: string) => {
        try {
            setDeletingId(id);
            const response = await axios.delete(`/api/courses/${courseId}/attachments/${id}`)
            return response;
        } catch (error) {
            if (typeof error === 'string') {
                toast.error(error);
            } else {
                toast.error("An error occurred. Please try again later.");
            }
        } finally {
            toggleModal()
        }
    };

    const onDelete = async (id: string) => {
        try {
            const response = deleteAttachment(id);
            toast.promise(response, {
                loading: "Processing",
                error: "An error occured, please try again later.",
                success: "Attachment removed"
            });
        } catch (error) {
            if (typeof error === 'string') {
                toast.error(error);
            } else {
                toast.error("An error occurred. Please try again later.");
            }
        } finally {
            setDeletingId(null);
        }
    }

    return (
        <div className="grid gap-6">
            <div className="grid gap-3">
                <div className="font-medium flex items-center justify-between">
                    Course Attachments
                    <EditAttachmentDialog
                        title={"Replace attachment"}
                        formLabel={"Attachment"}
                        decscription={"Edit or add a attachment for you course, this is optional."}
                        initialData={initialData}
                        courseId={courseId}
                        toggleModal={toggleModal}
                    />
                </div>
                {initialData.attachments.length === 0 && (
                    <p className="text-muted-foreground italic">No attachments yet.</p>
                )}

                {initialData.attachments.length >= 0 ? (
                    <div className="space-y-2">
                        {initialData.attachments.map((attachment) => (
                            <div
                                key={attachment.id}
                                className="flex items-center p-3 w-full rounded-md bg-muted/40 border-muted-foreground"
                            >
                                <File className="h-4 w-4 mr-2 flex-shrink-0" />
                                <p className="text-xs line-clamp-1">
                                    {attachment.name}
                                </p>
                                {deletingId === attachment.id ? (
                                    <div>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => onDelete(attachment.id)}
                                        className="ml-auto hover:opacity-75 transition">
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground italic">No attachments yet.</p>
                )}
            </div>
        </div >
    );
}