"use client";
import { Button } from "@/components/ui/button"
import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError } from "axios"
import { BookOpen, CopyCheck } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"
import { useMutation } from "@tanstack/react-query";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { quizCreationSchema } from "../../../../../../_utils/form-validation";

export const maxDuration = 60;

interface CreateQuizProps {
    topic?: string
}

export const CreateQuiz = ({ topic }: CreateQuizProps) => {
    const router = useRouter();
    const { mutate: setQuizSettings, isPending } = useMutation({
        mutationFn: async ({ topic, type, level }: z.infer<typeof quizCreationSchema>) => {
            const response = await axios.post(`/api/courses/chapters/quiz-settings`, { topic, type, level });
            if (response.status !== 200) {
                throw new Error("An error occurred, please try again later.");
            } else {
                toast.success("Quiz settings updated successfully.");
            }
            return response.data;
        },
    });

    const createForm = useForm<z.infer<typeof quizCreationSchema>>({
        resolver: zodResolver(quizCreationSchema),
        defaultValues: {
            topic: topic || "",
            type: "mcq",
            level: "HARDCORE",
        },
    });

    const onSubmit = async (data: z.infer<typeof quizCreationSchema>) => {
        setQuizSettings(data, {
            onError: (error) => {
                if (error instanceof AxiosError) {
                    if (error.response?.status === 500) {
                        toast.error("An error occurred, please try again later.");
                    }
                }
            },
        });
    };

    createForm.watch();

    return (
        <div className="overflow-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Quiz Settings</CardTitle>
                <CardDescription>
                    Configure the quiz settings for this chapter.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...createForm}>
                    <form onSubmit={createForm.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={createForm.control}
                            name="topic"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Topic</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter a topic" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Please provide any topic you would like to be quizzed on here.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={createForm.control}
                            name="level"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Level</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a level" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Easy">Easy</SelectItem>
                                                <SelectItem value="Medium">Medium</SelectItem>
                                                <SelectItem value="Hard">Hard</SelectItem>
                                                <SelectItem value="HARDCORE">HARDCORE</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormDescription>
                                        You can choose the level you would like to be quizzed on here.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-between">
                            <Button disabled={isPending} type="submit" className="justify-end">
                                Submit
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </div>
    );
}