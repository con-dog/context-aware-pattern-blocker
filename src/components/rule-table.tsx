import type React from "react";
import { v4 as uuidv4 } from "uuid";
import { RuleTableBody } from "./rule-table-body";
import { RuleTableToolbar } from "./rule-table-toolbar";
import { tableHeaders } from "./table-head.static";
import {
	Table,
	TableCaption,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export const RuleTable: React.FC = () => {
	return (
		<div className="p-6">
			<RuleTableToolbar />
			<div className="overflow-x-auto border rounded-lg">
				<Table className="min-w-full divide-y divide-gray-200">
					<TableHeader>
						<TableRow>
							{tableHeaders.map((header) => (
								<TableHead key={uuidv4()}>
									{header.title}
									<Tooltip>
										<TooltipTrigger asChild>
											<span className="ml-1 cursor-help">?</span>
										</TooltipTrigger>
										<TooltipContent>
											{header.tooltip.split(".").map((sentence) => (
												<p key={uuidv4()}>{sentence}</p>
											))}
										</TooltipContent>
									</Tooltip>
								</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<RuleTableBody />
					<TableCaption>
						Current rules setup for blocking on all sites.
					</TableCaption>
				</Table>
			</div>
		</div>
	);
};
