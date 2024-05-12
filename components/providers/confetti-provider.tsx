"use client"

import ReactConfetti from "react-confetti";

import { useConffettiStore as useConffettiStore } from "@/hooks/use-confetti-store";

export const ConfettiProvider = () => {
    const confetti = useConffettiStore();

    if (!confetti.isOpen) return null;

    return (
        <ReactConfetti
            className="pointer-events-none z-[100]"
            numberOfPieces={500}
            recycle={false}
            onConfettiComplete={() => {
                confetti.onClose
            }}
        />
    )
}