"use client"

import * as React from "react";
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
import { useMediaQuery } from "@uidotdev/usehooks";
import { Pencil, PlusCircle } from "lucide-react";
import { EditImageForm } from "./edit-image-form";
import { useState } from "react";
import { Course } from "@prisma/client";
interface DrawerDialogProps {
	toggleModal: () => void
	initialData: Course
	courseId: string;
	title: string
	decscription: string
	formLabel: string
}

export const EditImageDialog = ({
	toggleModal,
	initialData,
	title,
	courseId,
	decscription,
	formLabel
}: DrawerDialogProps) => {
	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)")

	const handleClose = () => {
		setOpen(false);
		toggleModal(); // Close the dialog
	};


	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button variant="ghost" className="font-medium">
						{!initialData.imageUrl ? (
							<>
								<PlusCircle className="h-5 w-5 mr-2" />
								Add an image
							</>
						) : (
							<>
								<Pencil className="h-5 w-5 mr-2" />
								{title}
							</>
						)}
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
						<DialogDescription>
							{decscription}. Click save when you&apos;re done.
						</DialogDescription>
					</DialogHeader>
					<EditImageForm
						initialData={initialData}
						courseId={courseId}
						formLabel={formLabel}
						toggleModal={handleClose}
					/>
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant="ghost" className="font-medium">
					{!initialData.imageUrl ? (
						<>
							<PlusCircle className="h-5 w-5 mr-2" />
							Add an {formLabel}
						</>
					) : (
						<>
							<Pencil className="h-5 w-5 mr-2" />
							Replace {formLabel}
						</>
					)}
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
					<EditImageForm
						initialData={initialData}
						courseId={courseId}
						formLabel={formLabel}
						toggleModal={handleClose}
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
