"use client"

import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from "./_utils/form-validation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface TitleFormProps {
    initialData: {
        title: string;
    };
    courseId: string;
}
export const TitleForm = ({
    initialData,
    courseId
}: TitleFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => setIsEditing((current) => !current)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
    }

    return (
        <div className="mt-6 border bg-muted/40 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course title
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>
                            Cancel
                        </>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2"></Pencil>
                            Edit Title
                        </>
                    )}
                </Button>
            </div>
            {isEditing ? (
                <p className="text-sm mt-2">
                    {initialData.title}
                </p>
            ) : (
                <></>
            )}
        </div>
    );
}