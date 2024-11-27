import type React from "react";
import type { Rule } from "../types/types";
import { Input } from "./ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { TableCell, TableRow } from "./ui/table";
interface RuleRowProps extends Rule {}

export const RuleTableRow: React.FC<RuleRowProps> = ({
	blockContexts,
	blockMode,
	blockPattern,
	category,
	description,
	name,
}) => {
	return (
		<TableRow>
			<TableCell>
				<Input />
			</TableCell>
			<TableCell>
				<Input />
			</TableCell>
			<TableCell>
				<Input />
			</TableCell>
			<TableCell>
				<Select>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Select a mode" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="matching">Matching</SelectItem>
						<SelectItem value="surrounding">Surrounding</SelectItem>
					</SelectContent>
				</Select>
			</TableCell>
			<TableCell>
				<Input />
			</TableCell>
			<TableCell>
				<Input />
			</TableCell>
		</TableRow>
	);
};
