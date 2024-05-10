"use client"

import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "@hello-pangea/dnd"
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ChapterListProps {
    items: Chapter[];
    onReorder: (updateData: { id: string; position: number }[]) => void;
    onEdit: (id: string) => void;
}

export const ChaptersList = ({
    items,
    onReorder,
    onEdit,
}: ChapterListProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const [chapters, setChapters] = useState(items);

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        setChapters(items);
    }, [items])

    if (!isMounted) {
        return null;
    }

    return (
        <DragDropContext onDragEnd={() => { }}>
            <Droppable droppableId="chapters">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {chapters.map((chapter, index) => (
                            <Draggable
                                key={chapter.id}
                                draggableId={chapter.id}
                                index={index}
                            >
                                {(provided) => (
                                    <div className={cn(
                                        "flex items-center gap-x-2 bg-foreground border-l-primary-foreground border text-primary rounded-md mb-4 text-sm",
                                        chapter.isPublished && "bg-sky-100 border-sky-200 text-sky-700"
                                    )}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                    >
                                        <div
                                            className={cn(
                                                "px-2 py-2 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                                                chapter.isPublished && "border-r-sky-200 hover:bg-sky-200"
                                            )}
                                            {...provided.dragHandleProps}
                                        >
                                            <GripVertical
                                                className="h-5 w-5"
                                            />
                                        </div>
                                        {chapter.title}
                                        <div className="ml-auto pr-2 flex items-center gap-x-2">
                                            {chapter.isFree && (
                                                <Badge>
                                                    Free
                                                </Badge>
                                            )}
                                            <Badge>
                                                {chapter.isPublished ? "Published" :
                                                    "Draft"}
                                            </Badge>
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}