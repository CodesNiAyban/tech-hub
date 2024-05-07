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
import { Pencil } from "lucide-react";
import { EditCourseForm } from "./edit-course-form";
interface DrawerDialogProps {
	isOpen: boolean;
	onClose: () => void;
	initialData: {
		title: string;
	};
	courseId: string;
	title: string
	decscription: string
	formLabel: string
}

export const EditCourseDialog = ({
	isOpen,
	onClose,
	initialData,
	title,
	courseId,
	decscription,
	formLabel
}: DrawerDialogProps) => {
	const [open, setOpen] = React.useState(isOpen)
	const isDesktop = useMediaQuery("(min-width: 768px)")

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button variant="ghost" className="font-medium">
						<Pencil className="h-5 w-5 mr-2" />
						Edit {formLabel}
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
						<DialogDescription>
							{decscription}. Click save when you&apos;re done.
						</DialogDescription>
					</DialogHeader>
					<EditCourseForm initialData={initialData} courseId={courseId} formLabel={formLabel} onClose={onClose} />
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant="outline">{title}</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>{formLabel}</DrawerTitle>
					<DrawerDescription>
						{decscription}. Click save when you&apos;re done.
					</DrawerDescription>
				</DrawerHeader>
				<div className="px-4" >
					<EditCourseForm initialData={initialData} courseId={courseId} formLabel={formLabel} onClose={onClose} />
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
