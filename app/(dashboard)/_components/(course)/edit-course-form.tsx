import { formSchema } from "@/app/(dashboard)/_components/_utils/form-validation";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface TitleFormProps {
    initialData: {
        title: string;
    };
    courseId: string;
    formLabel: string
    onClose: () => void
}

export const EditCourseForm = ({
    initialData,
    courseId,
    formLabel,
    onClose
}: TitleFormProps) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const { isSubmitting, isValid } = form.formState;

    const editTitle = async (values: z.infer<typeof formSchema>) => {
        const response = await axios.patch(`/api/courses/${courseId}`, values);
        return response;
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = editTitle(values);
            toast.promise(response, {
                loading: "Processing",
                error: "An error occured, please try again later.",
                success: "Course Title Created!"
            });
            router.refresh();
            onClose();
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
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn("grid items-start gap-4")}>
                <div className="grid gap-6">
                    <div className="grid gap-3">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-medium flex items-center justify-between">
                                        New {formLabel}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g Advanced Web Development"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Button type="submit" disabled={!isValid || isSubmitting}>
                    Save
                </Button>
            </form>
        </Form>
    );
};
