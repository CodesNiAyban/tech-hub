"use client"

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
    DragDropContext,
    Draggable,
    DropResult,
    Droppable,
} from "@hello-pangea/dnd";
import { Chapter } from "@prisma/client";
import { GripVertical, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

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

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(chapters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        const startIndex = Math.min(result.source.index, result.destination.index);
        const endIndex = Math.max(result.source.index, result.destination.index);

        const updatedChapters = items.slice(startIndex, endIndex + 1);

        setChapters(items);

        const bulkUpdateData = updatedChapters.map((chapter) => ({
            id: chapter.id,
            position: items.findIndex((item) => item.id === chapter.id)

        }))

        onReorder(bulkUpdateData)
    }

    if (!isMounted) {
        return null;
    }

    return (
        <div className="mt-3">
            <DragDropContext onDragEnd={onDragEnd}>
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
                                            "flex items-center gap-x-2 border-transparent bg-zinc-100 text-zinc-900 hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80 mb-4 text-sm rounded-md",
                                            chapter.isPublished && "border-transparent bg-zinc-900 text-zinc-50 hover:bg-zinc-900/80 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/80 rounded-md"
                                        )}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                        >
                                            <div
                                                className={cn(
                                                    "px-2 py-2 border-r border-transparent bg-zinc-500 text-zinc-900 hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80 rounded-l-md transition",
                                                    chapter.isPublished && "border-transparent bg-zinc-900 text-zinc-50 hover:bg-zinc-900/80 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/80"
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
                                                <Badge
                                                    className={cn("bg-zinc-500",
                                                        chapter.isPublished && "bg-zinc-900"
                                                    )}>
                                                    {chapter.isPublished ? "Published" :
                                                        "Draft"}
                                                </Badge>
                                                <div className="border rounded-full p-1">
                                                    <Pencil
                                                        className="h-4 w-4 cursor-pointer hover:opacity-75 transition"
                                                        onClick={() => onEdit(chapter.id)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}