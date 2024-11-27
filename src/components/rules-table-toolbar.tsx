import type React from "react";
import { useRulesStore } from "../stores/rules-store";

export const TableToolbar: React.FC = () => {
	const addNewRule = useRulesStore((state) => state.add);

	return (
		<div className="flex items-center justify-between mb-6">
			<h2 className="text-2xl font-bold">Word & Phrase Blocking Rules</h2>
			<button
				type="button"
				onClick={addNewRule}
				className="flex items-center px-4 py-2 space-x-2 text-white bg-blue-600 rounded hover:bg-blue-700"
			>
				<span>Add new rule</span>
			</button>
		</div>
	);
};
