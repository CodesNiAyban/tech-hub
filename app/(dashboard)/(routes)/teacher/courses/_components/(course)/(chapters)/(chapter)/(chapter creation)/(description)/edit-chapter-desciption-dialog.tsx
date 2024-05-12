"use client"

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Chapter, Course } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { EditChapterDescriptionForm } from "./edit-chapter-description-form";

interface DrawerDialogProps {
	initialData: Chapter;
	courseId: string;
	chapterId: string;
	toggleModal: () => void
	title: string
	decscription: string
	formLabel: string
}

export const EditChapterDescriptionDialog = ({
	toggleModal,
	initialData,
	title,
	courseId,
	decscription,
	formLabel,
	chapterId,
}: DrawerDialogProps) => {
	const [open, setOpen] = useState(false);
	const [isDesktop, setIsDesktop] = useState(false);

	useEffect(() => {
		setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
	}, []);

	const handleClose = () => {
		setOpen(false);
		toggleModal(); // Close the dialog
	};

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button variant="ghost" className="font-medium">
						<Pencil className="h-5 w-5 mr-2" />
						{title}
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
						<DialogDescription>
							{decscription}. Click save when you&apos;re done.
						</DialogDescription>
					</DialogHeader>
					<EditChapterDescriptionForm
						initialData={initialData}
						courseId={courseId}
						formLabel={formLabel}
						toggleModal={handleClose}
						chapterId={chapterId}
					/>
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant="ghost" className="font-medium">
					<Pencil className="h-5 w-5 mr-2" />
					{title}
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>{formLabel}</DrawerTitle>
					<DrawerDescription>
						{decscription}. Click save when you&apos;re done.
					</DrawerDescription>
				</DrawerHeader>
				<div className="px-4" >
					<EditChapterDescriptionForm
						initialData={initialData}
						courseId={courseId}
						formLabel={formLabel}
						toggleModal={handleClose}
						chapterId={chapterId}
					/>
				</div>
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
