import { useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "./ui/alert-dialog";
import { AlertDialogFooter, AlertDialogHeader } from "./ui/alert-dialog";
import { Button } from "./ui/button";

interface DeleteRuleAlertDialogProps {
	selectedCount: number;
	handleDeleteSelected: () => void;
}

export const DeleteRuleAlertDialog: React.FC<DeleteRuleAlertDialogProps> = ({
	handleDeleteSelected,
	selectedCount,
}) => {
	const [open, setOpen] = useState(false);

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button variant="secondary" disabled={selectedCount === 0}>
					Delete selected
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This will permanently delete {selectedCount} selected{" "}
						{selectedCount === 1 ? "rule" : "rules"}. This action cannot be
						undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDeleteSelected}
						className="bg-red-600 hover:bg-red-700"
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
