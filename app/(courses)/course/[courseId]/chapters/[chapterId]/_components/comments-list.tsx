"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Heart, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { commentSchema } from "@/app/(dashboard)/(routes)/teacher/courses/_components/_utils/form-validation";
import { User } from "@clerk/nextjs/server";
import { Comments } from "@prisma/client";

interface Comment {
    id: string;
    userId: string;
    chapterId: string;
    comment: string | null;
    parentId: string | null;
    createdAt: Date;
    updatedAt: Date;
    emojiId: string | null;
    replies?: Comments[];
}

interface CommentListProps {
    comments: Comment[];
    users: User[];
    chapterId: string;
    courseId: string;
}

const CommentList = ({ comments, users, chapterId, courseId }: CommentListProps) => {
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof commentSchema>>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            comment: ""
        },
    });

    const handleReply = (commentId: string, userId: string) => {
        const username = users.find(u => u.id === userId)?.username ?? '';
        setReplyingTo(commentId);
        form.setValue('comment', `@${username} `);
    };

    const cancelReply = () => {
        setReplyingTo(null);
        form.setValue('comment', ''); // Clear the form input
    };

    const submitComment = async (values: z.infer<typeof commentSchema>, parentId?: string) => {
        setIsSubmitting(true);
        try {
            const response = await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/comments`, {
                comment: values.comment,
                parentId: parentId,
            });
            form.reset(); // Clear the comment input after submission
            router.refresh();
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
                submitComment(values, replyingTo?.toString()),
                {
                    loading: "Submitting...",
                    error: "An error occurred, please try again later.",
                    success: "Comment Submitted"
                }
            );
            cancelReply();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="mt-6 space-y-4 p-4">
            {comments.map((comment) => (
                <Card key={comment.id} className="w-full bg-white shadow-md rounded-lg p-4 border border-gray-200">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center">
                                <Avatar className="w-8 h-8 mr-3">
                                    <AvatarImage src={users.find(u => u.id === comment.userId)?.imageUrl} />
                                    <AvatarFallback>test</AvatarFallback>
                                </Avatar>
                                <p className="text-md font-semibold">{users.find(u => u.id === comment.userId)?.username}</p>
                            </div>
                        </CardHeader>
                        <CardContent className="mt-2">
                            <p>{comment.comment}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center mt-4">
                            <div className="flex items-center space-x-4">
                                <Heart className="text-red-500 cursor-pointer" />
                                <MessageCircle className="text-blue-500 cursor-pointer" onClick={() => handleReply(comment.id, comment.userId)} />
                            </div>
                            <p className="text-sm text-gray-500">{comment.createdAt.toLocaleDateString()}</p>
                        </CardFooter>
                    </Card>
                    <div className="p-2">
                        {comment.replies && comment.replies.length > 0 && (
                            <>
                                <p className="mt-4 ml-4">Replies</p>
                                <div className="ml-8 m-2 space-y-2 border-gray-200">
                                    {comment.replies.map(reply => (
                                        <Card key={reply.id} className="flex items-start space-x-2 border-l-primary p-4">
                                            <Avatar className="w-6 h-6">
                                                <AvatarImage src={users.find(u => u.id === reply.userId)?.imageUrl} />
                                                <AvatarFallback>test</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <p>{reply.comment}</p>
                                                <p className="text-xs text-gray-500">{reply.createdAt.toLocaleDateString()}</p>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </>
                        )}
                        {replyingTo === comment.id && (
                            <div className="ml-8 mt-2 space-y-2">
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
                                        <div className="flex justify-end space-x-2">
                                            <Button onClick={cancelReply} variant="outline">Cancel</Button>
                                            <Button type="submit" disabled={isSubmitting}>Reply</Button>
                                        </div>
                                    </form>
                                </Form>
                            </div>
                        )}
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default CommentList;