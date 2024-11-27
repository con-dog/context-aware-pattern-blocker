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
	return (
		<Dialog>
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
				<CreateRuleForm />
			</DialogContent>
		</Dialog>
	);
};
