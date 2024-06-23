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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { commentSchema } from "@/app/(dashboard)/(routes)/teacher/courses/_components/_utils/form-validation";

interface CommentSectionProps {
  comments: Comments[];
  users: User[];
  currentUser: User | undefined;
  chapterId: string;
  courseId: string;
}

const CommentSection = ({ comments, users, currentUser, chapterId, courseId }: CommentSectionProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: ""
    },
  });

  const submitComment = async (values: z.infer<typeof commentSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/comments`, values);
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
        <form id="edit-course" onSubmit={form.handleSubmit(onSubmit)} className={cn("grid items-start gap-4")}>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium flex items-center justify-between">
                      Add Comment
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={isSubmitting}
                        placeholder="Write your comment here..."
                        className="resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </form>
      </Form>
      <h3 className="text-lg font-semibold mt-8">Comments</h3>
      <div className="mt-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 mt-2">No comments yet. Be the first to comment!</p>
        ) : (
          <CommentList comments={comments} users={users} />
        )}
      </div>
    </div>
  );
};

export default CommentSection;
