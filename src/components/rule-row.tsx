import type React from "react";
import type { Rule } from "../types/types";
import { Input } from "./ui/input";

interface RuleRowProps extends Rule {}

export const RuleRow: React.FC<RuleRowProps> = ({
	blockContexts,
	blockMode,
	blockPattern,
	category,
	description,
	id,
	name,
}) => {
	return (
		<tr key={id}>
			<td className="px-2 py-1">
				<Input />
				{name}
			</td>
			<td className="px-2 py-1">
				<Input />
				{description}
			</td>
			<td className="px-2 py-1">{blockPattern}</td>
			<td className="px-2 py-1">{blockMode}</td>
			<td className="px-2 py-1">{blockContexts.join(", ")}</td>
			<td className="px-2 py-1">{category}</td>
			<td className="px-2 py-1">{/* Add edit/delete buttons here */}</td>
		</tr>
	);
};
