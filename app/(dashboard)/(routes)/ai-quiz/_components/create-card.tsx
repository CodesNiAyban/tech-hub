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
import { quizCreationSchema } from "../../teacher/courses/_components/_utils/form-validation";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import LoadingQuestions from "./loading-questions";

export const maxDuration = 60;

interface CreateQuizProps {
    topic?: string
}

export const CreateQuiz = ({ topic }: CreateQuizProps) => {
    const router = useRouter();
    const [showLoader, setShowLoader] = useState(false);
    const [finishedLoading, setFinishedLoading] = useState(false);
    const { mutate: getQuestions, isPending } = useMutation({
        mutationFn: async ({ amount, topic, type }: z.infer<typeof quizCreationSchema>) => {
            const response = await axios.post("/api/quiz/game", { amount, topic, type });
            if (response.status !== 200) {
                throw new Error("An error occured, please try again later.");
            } else {
                toast.success("Quiz created successfully.");
            }
            return response.data;
        },
    });
    const createForm = useForm<z.infer<typeof quizCreationSchema>>({
        resolver: zodResolver(quizCreationSchema),
        defaultValues: {
            topic: topic || "",
            type: "mcq",
            amount: 3,
        },
    });

    const onSubmit = async (data: z.infer<typeof quizCreationSchema>) => {
        setShowLoader(true);
        getQuestions(data, {
            onError: (error) => {
                setShowLoader(false);
                if (error instanceof AxiosError) {
                    if (error.response?.status === 500) {
                        toast.error("An error occured, please try again later.");
                    }
                }
            },
            onSuccess: ({ gameId }: { gameId: string }) => {
                setFinishedLoading(true);
                setTimeout(() => {
                    if (createForm.getValues("type") === "mcq") {
                        router.push(`quiz/play/mcq/${gameId}`);
                    } else if (createForm.getValues("type") === "open_ended") {
                        router.push(`quiz/play/open-ended/${gameId}`);
                    }
                }, 2000);
            },
        });
    };

    createForm.watch();

    if (showLoader) {
        return <LoadingQuestions finished={finishedLoading} />;
    }

    return (
        <>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Quiz Creation</CardTitle>
                <CardDescription>
                    Create a new quiz with the options below.
                </CardDescription>
                <div className="flex justify-between">
                    <Button
                        variant={
                            createForm.getValues("type") === "mcq" ? "default" : "secondary"
                        }
                        className="w-1/2 rounded-none rounded-l-lg"
                        onClick={() => {
                            createForm.setValue("type", "mcq");
                        }}
                        type="button"
                    >
                        <CopyCheck className="w-4 h-4 mr-2" /> Multiple Choice
                    </Button>
                    <Separator orientation="vertical" />
                    <Button
                        variant={
                            createForm.getValues("type") === "open_ended"
                                ? "default"
                                : "secondary"
                        }
                        className="w-1/2 rounded-none rounded-r-lg"
                        onClick={() => createForm.setValue("type", "open_ended")}
                        type="button"
                    >
                        <BookOpen className="w-4 h-4 mr-2" /> Open Ended
                    </Button>
                </div>
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
                                        Please provide any topic you would like to be quizzed on
                                        here.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={createForm.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Number of Questions</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="How many questions?"
                                            type="number"
                                            {...field}
                                            onChange={(e) => {
                                                createForm.setValue("amount", parseInt(e.target.value));
                                            }}
                                            min={1}
                                            max={10}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        You can choose how many questions you would like to be
                                        quizzed on here.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-between">
                            <AlertDialogCancel asChild>
                                <Button variant="outline" >
                                    Cancel
                                </Button>
                            </AlertDialogCancel>
                            <Button disabled={isPending} type="submit" className="justify-end">
                                Submit
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </>
    );
}