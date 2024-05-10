"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Course } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { priceSchema } from "../../../_utils/form-validation";

interface EditPriceProps {
    initialData: Course
    courseId: string;
    formLabel: string
    toggleModal: () => void
}

export const EditPriceForm = ({
    initialData,
    courseId,
    formLabel,
    toggleModal
}: EditPriceProps) => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false); // State variable for submission status

    const form = useForm<z.infer<typeof priceSchema>>({
        resolver: zodResolver(priceSchema),
        defaultValues: {
            price: initialData?.price || undefined,
        },
    });

    const { isValid } = form.formState;

    const editPrice = async (values: z.infer<typeof priceSchema>) => {
        setIsSubmitting(true); // Set submission status to true
        try {
            const response = await axios.patch(`/api/courses/${courseId}`, values);
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

    const onSubmit = async (values: z.infer<typeof priceSchema>) => {
        try {
            const response = editPrice(values);
            toast.promise(response, {
                loading: "Processing",
                error: "An error occured, please try again later.",
                success: "Course Price Updated!"
            });
            router.refresh();
        } catch (error) {
            if (typeof error === 'string') {
                toast.error(error);
            } else {
                toast.error("An error occurred. Please try again later.");
            }
        }
    }

    return (
        <Form {...form}>
            <form id="edit-course" onSubmit={form.handleSubmit(onSubmit)} className={cn("grid items-start gap-4")}>
                <div className="grid gap-6">
                    <div className="grid gap-3">
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-medium flex items-center justify-between">
                                        New {formLabel}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isSubmitting} // Disable input field while submitting
                                            placeholder="Set a price to your course"
                                            type="number"
                                            step="0.01"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Button type="submit" disabled={!isValid || isSubmitting}> {/* Disable button while submitting */}
                    Save
                </Button>
            </form>
        </Form>
    );
};



