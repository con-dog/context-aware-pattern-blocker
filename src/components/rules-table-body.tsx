import type React from "react";
import { v4 as uuidv4 } from "uuid";
import { useRulesStore } from "../stores/rules-store";
import type { Rule } from "../types/types";
import { RuleRow } from "./rule-row";

export const RulesTableBody: React.FC = () => {
	const rules = useRulesStore((state) => state.rules);

	return (
		<tbody className="bg-white divide-y divide-gray-200">
			{rules.map((rule: Rule) => (
				<RuleRow key={uuidv4()} />
			))}
		</tbody>
	);
};
