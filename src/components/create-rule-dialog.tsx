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
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</DialogDescription>
				</DialogHeader>
				<CreateRuleForm />
			</DialogContent>
		</Dialog>
	);
};
