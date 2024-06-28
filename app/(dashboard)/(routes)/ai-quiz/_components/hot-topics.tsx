"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame } from "lucide-react";
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import WordCloud from "./word-cloud";

export const HotTopicsCard = () => {
  return (
    <Card className="lg:col-span-4 md:col-span-4 sm:col-span-4 xs:col-span-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">
          Hot Topics
        </CardTitle>
        <Flame className="h-8 w-8 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="pl-2">
          <ParentSize>{({ width, height }) => <WordCloud width={width} height={height} showControls={true}/>}</ParentSize>
        </div>
      </CardContent>
    </Card>
  );
};
