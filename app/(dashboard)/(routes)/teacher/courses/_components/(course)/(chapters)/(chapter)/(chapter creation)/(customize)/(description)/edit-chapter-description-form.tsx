"use client"

import { Editor } from "@/components/editor";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chapter } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { descriptionSchema } from "../../../../../../_utils/form-validation";

interface EditChapterDescriptionProps {
    initialData: Chapter;
    courseId: string;
    chapterId: string;
    toggleModal: () => void
    formLabel: string
}

export const EditChapterDescriptionForm = ({
    initialData,
    courseId,
    formLabel,
    toggleModal,
    chapterId
}: EditChapterDescriptionProps) => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false); // State variable for submission status

    const form = useForm<z.infer<typeof descriptionSchema>>({
        resolver: zodResolver(descriptionSchema),
        defaultValues: {
            description: initialData?.description || ""
        },
    });

    const editDescription = async (values: z.infer<typeof descriptionSchema>) => {
        setIsSubmitting(true); // Set submission status to true
        try {
            const response = await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            router.refresh();
            return response;
        } catch (error) {
            if (typeof error === 'string') {
                toast.error(error);
            } else {
                toast.error("An error occurred. Please try again later.");
            }
        } finally {
            setIsSubmitting(false); // Reset submission status to false
            toggleModal()
        }
    };

    const onSubmit = async (values: z.infer<typeof descriptionSchema>) => {
        try {
            const response = editDescription(values);
            toast.promise(response, {
                loading: "Processing",
                error: "An error occured, please try again later.",
                success: "Chapter Description Updated!"
            });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Form {...form}>
            <form id="edit-course" onSubmit={form.handleSubmit(onSubmit)} className={cn("grid items-start gap-4")}>
                <div className="grid gap-6">
                    <div className="grid gap-3">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-medium flex items-center justify-between">
                                        {formLabel}
                                    </FormLabel>
                                    <FormControl>
                                        <Editor
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Button type="submit" disabled={isSubmitting}> {/* Disable button while submitting */}
                    Save
                </Button>
            </form>
        </Form>
    );
};



