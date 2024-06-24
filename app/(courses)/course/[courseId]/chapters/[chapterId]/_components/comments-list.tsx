"use client";

import { commentSchema } from "@/app/(dashboard)/(routes)/teacher/courses/_components/_utils/form-validation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { User } from "@clerk/nextjs/server";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { CornerDownLeft, Edit, EllipsisVertical, Heart, MessageCircle, Trash, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface Comment {
    id: string;
    userId: string;
    chapterId: string;
    comment: string | null;
    parentId: string | null;
    createdAt: Date;
    updatedAt: Date;
    emojiId: string | null;
    replies?: Comment[];
}

interface CommentListProps {
    comments: Comment[];
    users: User[];
    chapterId: string;
    courseId: string;
    currentUser: User | undefined;
}

const CommentList = ({ comments, users, chapterId, courseId, currentUser }: CommentListProps) => {
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [editingComment, setEditingComment] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof commentSchema>>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            comment: ""
        },
    });

    const handleReply = (commentId: string, comment: Comment) => {
        const username = users.find(u => u.id === comment.userId)?.username ?? '';
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

    const handleEdit = (commentId: string, comment: string) => {
        setEditingComment(commentId);
        form.setValue('comment', comment);
    };

    const cancelEdit = () => {
        setEditingComment(null);
        form.setValue('comment', ''); // Clear the form input
    };

    const updateComment = async (values: z.infer<typeof commentSchema>, commentId: string) => {
        setIsSubmitting(true);
        try {
            const response = await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/comments/${commentId}`, {
                comment: values.comment,
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

    const onEditSubmit = async (values: z.infer<typeof commentSchema>) => {
        try {
            await toast.promise(
                updateComment(values, editingComment!.toString()),
                {
                    loading: "Updating...",
                    error: "An error occurred, please try again later.",
                    success: "Comment Updated"
                }
            );
            cancelEdit();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteComment = async (commentId: string) => {
        setIsSubmitting(true);
        try {
            const response = await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}/comments/${commentId}`);
            router.refresh();
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderReplies = (replies: Comment[], comment: Comment) => {
        return replies.map((reply) => (
            <div key={reply.id} className={`mt-2 space-y-2`}>
                <Card className="flex items-start space-x-2 border-l-primary p-4">
                    <Avatar className="w-6 h-6">
                        <AvatarImage src={users.find(u => u.id === reply.userId)?.imageUrl} />
                        <AvatarFallback>test</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col w-full">
                        <div className="flex justify-between items-center">
                            <p className="text-md font-semibold">{users.find(u => u.id === reply.userId)?.username}</p>
                            <DropdownMenu>
                                <Button variant="ghost" className="h-4 w-8 p-0" asChild>
                                    <DropdownMenuTrigger>
                                        <span className="sr-only">Open menu</span>
                                        <EllipsisVertical className="h-4 w-4" />
                                    </DropdownMenuTrigger>
                                </Button>
                                {reply.userId === currentUser?.id ? (
                                    <>
                                        <DropdownMenuContent align="end">
                                            <div className="flex flex-col">
                                                <Button size="sm" disabled={isSubmitting} variant="ghost" className="flex items-left justify-start">
                                                    <Edit className="h-4 w-4 mr-2" />
                                                    Edit
                                                </Button>
                                            </div>
                                            <div className="flex flex-col mr-2">
                                                <Button size="sm" disabled={isSubmitting} variant="ghost" className="flex items-left justify-start">
                                                    <Trash className="h-4 w-4 mr-2" />
                                                    Delete
                                                </Button>
                                            </div>
                                        </DropdownMenuContent>
                                    </>
                                ) : (
                                    <>
                                        <DropdownMenuContent align="end">
                                            <div className="flex flex-col">
                                                <Button size="sm" disabled={isSubmitting} variant="ghost" className="flex items-left justify-start">
                                                    <TriangleAlert className="h-4 w-4 mr-2" />
                                                    Report
                                                </Button>
                                            </div>
                                        </DropdownMenuContent>
                                    </>
                                )}
                            </DropdownMenu>
                        </div>
                        <p>{reply.comment}</p>
                        <div className="flex justify-between items-center mt-2">
                            <p className="text-xs text-gray-500">{formatDistanceToNow(new Date(reply.createdAt))} ago</p>
                            <div className="flex items-center cursor-pointer" onClick={() => handleReply(comment.id, reply)}>
                                <CornerDownLeft className="text-blue-500 h-4 w-4" />
                                <p className="text-blue-500 text-sm ml-1">Reply</p>
                            </div>
                        </div>
                    </div>
                </Card>
                {replyingTo === reply.id && (
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
                                                    placeholder="Write your reply here..."
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
        ));
    };

    return (
        <div className="mt-6 space-y-4 p-4">
            {comments.filter(comment => comment.parentId === null).map((comment) => (
                <Card key={comment.id} className="w-full bg-white shadow-md rounded-lg p-4 border border-gray-200">
                    <CardHeader>
                        <div className="flex items-center">
                            <Avatar className="w-8 h-8 mr-3">
                                <AvatarImage src={users.find(u => u.id === comment.userId)?.imageUrl} />
                                <AvatarFallback>test</AvatarFallback>
                            </Avatar>
                            <div className="flex justify-between items-center">
                                <p className="text-md font-semibold">{users.find(u => u.id === comment.userId)?.username}</p>
                                <DropdownMenu>
                                    <Button variant="ghost" className="h-4 w-8 p-0" asChild>
                                        <DropdownMenuTrigger>
                                            <span className="sr-only">Open menu</span>
                                            <EllipsisVertical className="h-4 w-4" />
                                        </DropdownMenuTrigger>
                                    </Button>
                                    {comment.userId === currentUser?.id ? (
                                        <>
                                            <DropdownMenuContent align="end">
                                                <div className="flex flex-col">
                                                    <Button onClick={() => handleEdit(comment.id, comment.comment!)} size="sm" disabled={isSubmitting} variant="ghost" className="flex items-left justify-start">
                                                        <Edit className="h-4 w-4 mr-2" />
                                                        Edit
                                                    </Button>
                                                </div>
                                                <div className="flex flex-col mr-2">
                                                    <Button onClick={() => deleteComment(comment.id)} size="sm" disabled={isSubmitting} variant="ghost" className="flex items-left justify-start">
                                                        <Trash className="h-4 w-4 mr-2" />
                                                        Delete
                                                    </Button>
                                                </div>
                                            </DropdownMenuContent>
                                        </>
                                    ) : (
                                        <>
                                            <DropdownMenuContent align="end">
                                                <div className="flex flex-col">
                                                    <Button size="sm" disabled={isSubmitting} variant="ghost" className="flex items-left justify-start">
                                                        <TriangleAlert className="h-4 w-4 mr-2" />
                                                        Report
                                                    </Button>
                                                </div>
                                            </DropdownMenuContent>
                                        </>
                                    )}
                                </DropdownMenu>
                            </div>
                        </div>
                    </CardHeader>
                    {editingComment === comment.id ? (
                        <div className="ml-8 mt-2 space-y-2">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onEditSubmit)} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="comment"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Textarea
                                                        {...field}
                                                        placeholder="Edit your comment..."
                                                        disabled={isSubmitting}
                                                        className="resize-none"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex justify-end space-x-2">
                                        <Button onClick={cancelEdit} variant="outline">Cancel</Button>
                                        <Button type="submit" disabled={isSubmitting}>Update</Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    ) : (
                        <>
                            <CardContent className="mt-2">
                                <p>{comment.comment}</p>
                            </CardContent>
                        </>
                    )}
                    <CardFooter className="flex justify-between items-center mt-4">
                        <div className="flex items-center space-x-4">
                            <Heart className="text-red-500 cursor-pointer" />
                            <div className="flex items-center cursor-pointer" onClick={() => handleReply(comment.id, comment)}>
                                <MessageCircle className="text-blue-500" />
                                <p className="text-blue-500 ml-1">Reply</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500">{formatDistanceToNow(new Date(comment.createdAt))} ago</p>
                    </CardFooter>
                    <div className="p-2">
                        {comment.replies && comment.replies.length > 0 && (
                            <>
                                <div className="ml-8 m-2 space-y-2 border-gray-200">
                                    {renderReplies(comment.replies, comment)}
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
                                                            placeholder="Write your reply here..."
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
