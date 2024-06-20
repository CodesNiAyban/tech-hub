"use client";
import { CourseEnrollButton } from "@/app/(courses)/course/[courseId]/chapters/[chapterId]/_components/course-purchase-button";
import { User } from "@clerk/nextjs/server";
import { SubscriptionType } from "@prisma/client";
import axios from "axios";
import { BadgeX, BookX, Play, UserPlus, XCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { CourseProgress } from "../course-progress";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTrigger
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { UnenrollConfirmModal } from "./unenroll-confirm-modal";
import { cn } from "@/lib/utils";

interface CourseModalProps {
    children: React.ReactNode;
    code: string;
    courseId: string;
    title: string;
    imageUrl: string;
    chaptersLength: number;
    chapters: { id: string; subscription: SubscriptionType | null }[];
    description: string | null;
    price: number;
    progress: number | null;
    categories: {
        id: string;
        name: string;
    }[];
    createdAt: Date;
    userId: string;
    user: User;
    isPurchased: boolean;
    userSubscription: string;
}

export const CourseModal = ({
    children,
    code,
    courseId,
    title,
    imageUrl,
    chaptersLength,
    chapters,
    description,
    price,
    progress,
    categories,
    createdAt,
    userId,
    user,
    isPurchased,
    userSubscription,
}: CourseModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleClose = () => {
        setIsOpen(false);
    };

    const Unenroll = async () => {
        setIsSubmitting(true); // Set submission status to true
        try {
            const response = await axios.delete(`/api/courses/${courseId}/enroll`);
            router.refresh();
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setIsSubmitting(false); // Reset submission status to false
        }
    };


    const handleUnenroll = async () => {
        try {
            setIsSubmitting(true);
            const response = toast.promise(Unenroll(), {
                loading: "Processing",
                error: "An error occurred, please try again later.",
                success: "User Unenrolled!"
            });
            return response;
        } catch (error) {
            console.log(error)
        } finally {
            setIsSubmitting(false);
        }
    };



    const enroll = async () => {
        setIsSubmitting(true); // Set submission status to true
        try {
            const response = await axios.put(`/api/courses/${courseId}/enroll`);
            router.refresh();
            router.push(`/course/${courseId}`);
            return response;
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            setIsSubmitting(false); // Reset submission status to false
        }
    };


    const handlePlay = async () => {
        try {
            // If user is Pro, Lifetime or has purchased the course, allow access to all chapters
            if (userSubscription === "PRO" || userSubscription === "LIFETIME" || isPurchased || price === 0) {
                // Enroll the user if they haven't started the course yet
                if (progress === null) {
                    const response = toast.promise(
                        enroll(),
                        {
                            loading: "Enrolling...",
                            error: "An error occurred, please try again later.",
                            success: "User Enrolled to Course!"
                        });
                }
                router.push(`/course/${courseId}`);
                return;
            }

            // Check if there are chapters available for Basic or null subscription
            const accessibleChapters = chapters.filter(chapter =>
                chapter.subscription && (chapter.subscription === userSubscription) || (chapter.subscription === "null"));

            if (accessibleChapters.length === 0) {
                if (userSubscription === "BASIC") {
                    toast.error("You must have PRO or LIFETIME subscription or purchased the course to access");
                } else {
                    toast.error("You must have BASIC, PRO or LIFETIME subscription or purchased the course to access");
                }

                return;
            } else {
                // Enroll the user if they haven't started the course yet
                if (progress === null) {
                    const response = toast.promise(
                        enroll(),
                        {
                            loading: "Enrolling...",
                            error: "An error occurred, please try again later.",
                            success: "User Enrolled to Course!"
                        });
                }
            }
            setIsOpen(false);
        } catch (error) {
            toast.error(error as string)
        }
    };

    const handleBuy = () => {
        console.log("Buy button clicked");
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-lg bg-gray-900 text-white rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
                <div className="relative w-full aspect-video overflow-hidden">
                    <Image src={imageUrl} alt={title} width={700} height={400} className="relative rounded-t-lg object-cover" />
                    <XCircle className=" absolute top-4 right-4 h-6 w-6 text-slate-600" onClick={handleClose} />
                    <div className="flex absolute bottom-4 left-4">
                        <Button
                            onClick={handlePlay}
                            className={cn(progress !== null ? "bg-red-600 text-white px-4 py-2 mr-2" :
                                "bg-blue-600 text-white px-4 py-2 mr-2"
                            )}
                            disabled={isSubmitting}
                            size="sm"
                        >
                            {progress !== null ? <Play className="mr-2 h-4 w-4" /> : <UserPlus className="mr-2 h-4 w-4" />}
                            {progress !== null ? "Resume" : "Enroll"}
                        </Button>
                        {progress !== null && (
                            <UnenrollConfirmModal onConfirm={handleUnenroll}>
                                <Button size="sm" disabled={isSubmitting} className=" bg-blue-600 text-white px-4 py-2 mr-2">
                                    <BadgeX className="h-4 w-4 mr-2" />
                                    Unenroll
                                </Button>
                            </UnenrollConfirmModal>
                        )}
                        {price > 0 && !isPurchased && (
                            <CourseEnrollButton
                                courseId={courseId}
                                price={price}
                            />
                        )}
                    </div>
                </div>
                <div className="p-2 flex flex-col">
                    <h3 className="text-2xl font-bold">{title}</h3>
                    <p className="text-sm text-gray-400">Created by: {user.username}</p>
                    <p className="mt-2 text-gray-300">{description}</p>
                    <div className="flex items-center mt-2 text-gray-400">
                        <p className="text-sm">{chaptersLength} {chaptersLength === 1 ? 'Chapter' : 'Chapters'}</p>
                    </div>
                    <div className="mb-4">
                        {progress !== null && (
                            <CourseProgress
                                size="sm"
                                value={progress}
                                variant={progress === 100 ? "success" : "default"}
                            />
                        )}
                    </div>
                    <Separator />
                    <div className="flex flex-wrap gap-2 mb-4 mt-4">
                        <p className="text-md text-gray-400">Info on </p>
                        <p className="text-md font-bold">{title}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-1">
                        <p className="text-xs text-gray-400">Categories:</p>
                        {categories.map(category => (
                            <p key={category.id} className="text-xs text">{category.name}</p>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-1">
                        <p className="text-xs text-gray-400">Created: </p>
                        <p className="text-xs ">{new Date(createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-1">
                        <p className="text-xs text-gray-400">Code:</p>
                        <p className="text-xs">{code}</p>
                    </div>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
};
