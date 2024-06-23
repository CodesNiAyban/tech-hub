"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";
import { Comments } from "@prisma/client";
import { User } from "@clerk/nextjs/server";
import * as z from "zod";
import CommentList from "./comments-list";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { commentSchema } from "@/app/(dashboard)/(routes)/teacher/courses/_components/_utils/form-validation";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

interface CommentSectionProps {
    comments: Comments[];
    users: User[];
    currentUser: User | undefined;
    chapterId: string;
    courseId: string;
}

const CommentSection = ({ comments, users, currentUser, chapterId, courseId }: CommentSectionProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm<z.infer<typeof commentSchema>>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            comment: ""
        },
    });
    const router = useRouter();

    const submitComment = async (values: z.infer<typeof commentSchema>, parentId?: string) => {
        setIsSubmitting(true);
        try {
            const response = await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/comments`, {
                ...values,
                parentId: parentId || undefined,
            });
            form.setValue('comment', ''); // Clear the comment input after submission
            router.refresh()
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setIsSubmitting(false);
        }
    };

    const onSubmit = async (values: z.infer<typeof commentSchema>) => {
        try {
            await toast.promise(
                submitComment(values),
                {
                    loading: "Submitting...",
                    error: "An error occurred, please try again later.",
                    success: "Comment Submitted"
                }
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="mt-6 p-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="Write your comment here..."
                                        disabled={isSubmitting}
                                        className="resize-none"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end">
                        <Button type="submit" disabled={isSubmitting}>Submit</Button>
                    </div>
                </form>
            </Form>
            {/* Display existing comments */}
            <CommentList comments={comments} users={users} courseId={courseId} chapterId={chapterId} />
        </div>
    );
};

export default CommentSection;
