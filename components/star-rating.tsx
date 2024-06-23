import { useState, useEffect } from "react";
import { StarIcon } from "./star"; // Assuming you renamed the component
import { cn } from "@/lib/utils";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface StarRatingProps {
    courseId: string;
    initialRating: number | null | undefined;
    isEnrolled: boolean;
}

export const StarRating = ({ courseId, initialRating, isEnrolled }: StarRatingProps) => {
    const router = useRouter();
    const [rating, setRating] = useState(initialRating);
    const [hoverRating, setHoverRating] = useState(0);

    useEffect(() => {
        setRating(initialRating);
    }, [initialRating]);

    const handleRating = async (value: number) => {
        if (!isEnrolled) {
            toast.error("You must be enrolled to rate this course.");
            return;
        }

        try {
            await axios.post(`/api/courses/${courseId}/rating`, {
                rating: value,
            });
            setRating(value);
            router.refresh();
            toast.success("Rating submitted!");
        } catch (error) {
            toast.error("Failed to submit rating.");
        }
    };

    return (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((value) => (
                <StarIcon
                    key={value}
                    filled={value <= (hoverRating || rating || 0)}
                    className={cn("w-5 h-5")}
                    onClick={() => handleRating(value)}
                    onMouseEnter={() => setHoverRating(value)}
                    onMouseLeave={() => setHoverRating(0)}
                />
            ))}
            <p className="ml-1">{initialRating}</p>
        </div>
    );
};
