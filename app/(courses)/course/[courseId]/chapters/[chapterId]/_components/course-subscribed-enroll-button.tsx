"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseSubscribedEnrollButtonProps {
    price: number;
    courseId: string;
}

export const CourseSubscribedEnrollButton = ({
    price,
    courseId,
}: CourseSubscribedEnrollButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(`/api/courses/${courseId}/checkout`);
            window.location.assign(response.data.url);
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            disabled={isLoading}
            onClick={onClick}
            className="w-full md:w-auto"
            size="sm"
        >
            Enroll permanently for {formatPrice(price)}
        </Button>
    );
};