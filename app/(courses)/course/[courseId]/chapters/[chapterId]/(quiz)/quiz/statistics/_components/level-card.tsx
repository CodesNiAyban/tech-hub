import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, CheckCircle, AlertCircle, AlertOctagon, Flame } from "lucide-react";
import { QuestionLevel } from "@prisma/client";

type Props = { level: QuestionLevel };

const LevelCard = ({ level }: Props) => {
    const getLevelInfo = (level: string) => {
        switch (level) {
            case "Easy":
                return { className: "bg-green-500", icon: <CheckCircle />, label: "Easy" };
            case "Medium":
                return { className: "bg-yellow-500", icon: <AlertCircle />, label: "Medium" };
            case "Hard":
                return { className: "bg-red-500", icon: <AlertOctagon />, label: "Hard" };
            case "HARDCORE":
                return { className: "bg-purple-500", icon: <Flame />, label: "Hardcore" };
            default:
                return { className: "bg-slate-800", icon: <Target />, label: "Unknown" };
        }
    };

    const { className, icon, label } = getLevelInfo(level);

    return (
        <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-2xl font-bold">Level</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className={`text-sm font-medium px-2 py-1 text-white rounded-lg ${className}`} style={{ width: "fit-content"}}>
                    {label}
                </div>
            </CardContent>
        </Card>
    );
};

export default LevelCard;
