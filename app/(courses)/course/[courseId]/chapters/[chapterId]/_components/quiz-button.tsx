// components/ChapterQuiz.tsx

"use client";
import { chapterQuizSchema } from "@/app/(dashboard)/(routes)/teacher/courses/_components/_utils/form-validation";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import LoadingQuestions from "@/components/loading-questions";
import { GameType, QuestionLevel } from "@prisma/client";
import { Form } from "@/components/ui/form";
import { RotateCcw } from "lucide-react";

interface ChapterQuizProps {
  chapterId: string;
  courseId: string;
  courseTitle: string;
  chapterTitle: string;
  courseDescription: string;
  chapterDescription: string;
  amount: number;
  gameType: GameType;
  level: QuestionLevel;
  topic: string;
}

export const ChapterQuiz = ({
  chapterId,
  courseId,
  courseTitle,
  chapterTitle,
  courseDescription,
  chapterDescription,
  amount,
  gameType,
  level,
  topic,
}: ChapterQuizProps) => {
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(false);
  const [finishedLoading, setFinishedLoading] = useState(false);

  const { mutate: createQuiz, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof chapterQuizSchema>) => {
      const response = await axios.post(`/api/courses/${courseId}/chapters/${chapterId}/quiz/game`, data);
      if (response.status !== 200) {
        throw new Error("An error occurred, please try again later.");
      } else {
        toast.success("Quiz created successfully.");
      }
      return response.data;
    },
  });

  const createForm = useForm<z.infer<typeof chapterQuizSchema>>({
    resolver: zodResolver(chapterQuizSchema),
    defaultValues: {
      topic,
      type: gameType,
      amount,
      level,
      courseTitle,
      chapterTitle,
      courseDescription,
      chapterDescription,
    },
  });

  const onSubmit = async (data: z.infer<typeof chapterQuizSchema>) => {
    setShowLoader(true);
    createQuiz(data, {
      onError: (error) => {
        setShowLoader(false);
        if (error instanceof AxiosError) {
          console.error("Error response:", error.response);
          if (error.response?.status === 500) {
            toast.error("An error occurred, please try again later.");
          }
        }
      },
      onSuccess: ({ gameId }: { gameId: string }) => {
        setFinishedLoading(true);
        setTimeout(() => {
          if (data.type === "mcq") {
            router.push(`/course/${courseId}/chapters/${chapterId}/quiz/play/mcq/${gameId}`);
          } else if (data.type === "open_ended") {
            router.push(`/course/${courseId}/chapters/${chapterId}/quiz/play/open-ended/${gameId}`);
          }
        }, 2000);
      },
    });
  };

  const handleButtonClick = async () => {
    const formData = createForm.getValues();
    await onSubmit(formData);
  };

  createForm.watch((value) => {
    console.log("Watched value:", value);
  });

  if (showLoader) {
    return <LoadingQuestions finished={finishedLoading} />;
  }

  return (
    <Form {...createForm}>
      <form id="edit-course">
        <Button disabled={isPending} type="button" onClick={handleButtonClick}>
          Generate new quiz
          <RotateCcw className=" w-4 h-4 ml-2" />
        </Button>
      </form>
    </Form>
  );
};
