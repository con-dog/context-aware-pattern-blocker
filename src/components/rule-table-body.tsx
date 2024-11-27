import type { Rule } from "@/types/types";
import type React from "react";
import { useRulesStore } from "../stores/rules-store";
import { RuleTableRow } from "./rule-table-row";
import { TableBody } from "./ui/table";

export const RuleTableBody: React.FC = () => {
	const rules = useRulesStore((state) => state.rules);

	return (
		<TableBody>
			{rules.map((rule: Rule) => (
				<RuleTableRow key={rule.id} {...rule} />
			))}
		</TableBody>
	);
};
