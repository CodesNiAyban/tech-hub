import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/logo";

type Props = { finished: boolean };

const loadingTexts = [
    "Initializing question protocols...",
    "Deploying curiosity algorithms...",
    "Navigating the data matrix...",
    "Harnessing the power of the cloud...",
    "Activating neural networks of knowledge...",
];

const LoadingQuestions = ({ finished }: Props) => {
    const [progress, setProgress] = useState(10);
    const [loadingText, setLoadingText] = useState(loadingTexts[0]);
    useEffect(() => {
        const interval = setInterval(() => {
            let randomIndex = Math.floor(Math.random() * loadingTexts.length);
            setLoadingText(loadingTexts[randomIndex]);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (finished) return 100;
                if (prev === 100) {
                    return 0;
                }
                if (Math.random() < 0.1) {
                    return prev + 2;
                }
                return prev + 0.5;
            });
        }, 100);
        return () => clearInterval(interval);
    }, [finished]);

    return (
        <Card className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[70vw] md:w-[60vw] flex flex-col items-center p-10">
            <Logo />
            <Image src={"/loading.gif"} width={400} height={400} alt="loading" />
            <Progress value={progress} className="w-full mt-4" />
            <h1 className="mt-2 text-xl">{loadingText}</h1>
        </Card>
    );
};

export default LoadingQuestions;