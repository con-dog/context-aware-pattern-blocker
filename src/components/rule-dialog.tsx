import type { Rule } from "@/types/types";
import { CreateRuleForm } from "./create-rule-form";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "./ui/dialog";
import { DialogHeader } from "./ui/dialog";

interface RuleDialogProps {
	mode: "create" | "edit";
	initialData?: Rule;
	onOpenChange: (open: boolean) => void;
	open: boolean;
}

export const RuleDialog: React.FC<RuleDialogProps> = ({
	mode,
	initialData,
	onOpenChange,
	open,
}) => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="outline-none" tabIndex={-1}>
				<DialogHeader>
					<DialogTitle>
						{mode === "create" ? "Add a new rule" : "Edit rule"}
					</DialogTitle>
					<DialogDescription>
						Rules will be applied on all sites you visit.
					</DialogDescription>
				</DialogHeader>
				<CreateRuleForm
					onSuccess={() => onOpenChange(false)}
					initialData={initialData}
				/>
			</DialogContent>
		</Dialog>
	);
};
