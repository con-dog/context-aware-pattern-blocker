import { useState } from "react";
import { CreateRuleForm } from "./create-rule-form";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";

export const CreateRuleDialog: React.FC = () => {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">Add new rule</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add a new rule to block content</DialogTitle>
					<DialogDescription>
						Rules will be applied on all sites you visit.
					</DialogDescription>
				</DialogHeader>
				<CreateRuleForm onSuccess={() => setOpen(false)} />
			</DialogContent>
		</Dialog>
	);
};
