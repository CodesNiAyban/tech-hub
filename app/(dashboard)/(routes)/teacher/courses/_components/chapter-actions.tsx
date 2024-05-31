"use client"

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ChapterActionsProps {
    isComplete: boolean;
    courseId: string;
    chapterId: string;
    isPublished: boolean;
}

export const ChapterActions = ({
    isComplete,
    courseId,
    chapterId,
    isPublished,
}: ChapterActionsProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onClick = async () => {
        try {
            setIsLoading(true);
            if (isPublished) {
                const response = axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`);
                toast.promise(response, {
                    loading: "Processing",
                    error: "An error occured, please try again later.",
                    success: "Chapter unpublished"
                });
            } else {
                const response = axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`);
                toast.promise(response, {
                    loading: "Processing",
                    error: "An error occured, please try again later.",
                    success: "Chapter published"
                });
            }
            router.refresh();
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setIsLoading(true);
            const response = axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`)
            router.refresh();
            router.push(`/teacher/courses/${courseId}`)
            toast.promise(response, {
                loading: "Processing",
                error: "An error occured, please try again later.",
                success: "Chapter deleted"
            });
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex items-center gap-x-2">
            <Button
                onClick={onClick}
                disabled={!isComplete || isLoading}
                variant="outline"
                size="sm"
            >
                {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <ConfirmModal onConfirm={onDelete}>
                <Button size="sm" disabled={isLoading}>
                    <Trash className="h-4 w-4" />
                </Button>
            </ConfirmModal>
        </div>
    )
}