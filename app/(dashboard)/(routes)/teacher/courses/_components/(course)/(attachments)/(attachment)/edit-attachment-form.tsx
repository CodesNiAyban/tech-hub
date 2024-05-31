"use client"

import { FileUpload } from "@/components/file-upload";
import { Course } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as z from "zod";
import { attachmentSchema } from "../../../_utils/form-validation";

interface EditAttachmentProps {
    initialData: Course
    courseId: string;
    formLabel: string
    toggleModal: () => void
}

export const EditAttachmentForm = ({
    initialData,
    courseId,
    formLabel,
    toggleModal
}: EditAttachmentProps) => {
    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof attachmentSchema>) => {
        try {
            const response = axios.post(`/api/courses/${courseId}/attachments`, values);
            router.refresh();
            toast.promise(response, {
                loading: "Processing",
                error: "An error occured, please try again later.",
                success: "Attachment Added!"
            });
        } catch (error) {
           console.log(error)
        }
    }

    return (
        <div>
            <FileUpload
                endpoint="courseAttachments"
                onChange={(url) => {
                    if (url) {
                        onSubmit({ url: url })
                    }
                }}
            />
            <div className="text-xs text-muted-foreground mt-4">
                Add anything your students might need to complete the course
            </div>
        </div>
    );
};



