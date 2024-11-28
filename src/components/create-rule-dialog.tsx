import { useState } from "react";
import { RuleDialog } from "./rule-dialog";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";

export const CreateRuleDialog: React.FC = () => {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="default">Add new rule</Button>
			</DialogTrigger>
			<RuleDialog mode="create" open={open} onOpenChange={setOpen} />
		</Dialog>
	);
};
