"use client"
import {
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query';
import { CreateQuizDialog } from "./create-quiz";

const queryClient = new QueryClient()

export const TakeAQuizCard = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <CreateQuizDialog />
        </QueryClientProvider>
    );
}

export default TakeAQuizCard;