import type { Rule } from "@/types/types";
import {
	type ColumnDef,
	type SortingState,
	type VisibilityState,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import type React from "react";
import { useState } from "react";
import { ColumnVisibilityDropdownMenu } from "./column-visibility-dropdown-menu";
import { CreateRuleDialog } from "./create-rule-dialog";
import { Button } from "./ui/button";
import { DataTablePagination } from "./ui/data-table-pagination";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";

interface RuleDataTableProps {
	columns: ColumnDef<Rule, unknown>[];
	data: Rule[];
}

export const DataTable: React.FC<RuleDataTableProps> = ({ columns, data }) => {
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});
	const [sorting, setSorting] = useState<SortingState>([]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<div>
			<div className="flex justify-between py-4 space-x-2">
				<div className="space-x-2">
					<CreateRuleDialog />
					<Button variant="secondary">Delete selected</Button>
				</div>
				<ColumnVisibilityDropdownMenu table={table} />
			</div>
			<div className="border rounded-md">
				<div className="h-[440px] relative overflow-auto">
					<Table>
						<TableHeader className="sticky top-0 z-10 bg-white">
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<TableHead key={header.id}>
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.header,
															header.getContext(),
														)}
											</TableHead>
										);
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && "selected"}
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-24 text-center"
									>
										No results.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
				<div>
					<DataTablePagination table={table} />
				</div>
			</div>
		</div>
	);
};
