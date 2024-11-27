import type React from "react";
import { RulesTableBody } from "./rules-table-body";
import { RulesTableHead } from "./rules-table-head";
import { TableToolbar } from "./rules-table-toolbar";

export const RulesTable: React.FC = () => {
	return (
		<div className="p-6">
			<TableToolbar />
			<div className="overflow-x-auto border rounded-lg">
				<table className="min-w-full divide-y divide-gray-200">
					<RulesTableHead />
					<RulesTableBody />
				</table>
			</div>
		</div>
	);
};
