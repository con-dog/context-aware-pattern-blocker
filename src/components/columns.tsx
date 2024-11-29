import { useRulesStore } from "@/stores/rules-store";
import type { Rule } from "@/types/types";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { RuleDialog } from "./rule-dialog";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { DataTableColumnHeader } from "./ui/data-table-column-header";
import { Switch } from "./ui/switch";

export const columns: ColumnDef<Rule>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Name" />
		),
	},
	{
		accessorKey: "description",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Description" />
		),
	},

	{
		accessorKey: "blockPattern",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Block Pattern" />
		),
	},
	{
		accessorKey: "blockMode",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Mode" />
		),
	},
	{
		accessorKey: "contexts",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Contexts" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex flex-wrap gap-2 shrink-0">
					{row.original.contexts.map((context) => (
						<span
							key={uuidv4()}
							className="flex items-center px-3 py-1 rounded-full bg-zinc-200 h-7 w-fit"
						>
							<span className="text-zinc-700">{context}</span>
						</span>
					))}
				</div>
			);
		},
	},
	{
		accessorKey: "blockedCount",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Blocked Count" />
		),
	},
	{
		accessorKey: "dateModified",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Date Modified" />
		),
	},
	{
		id: "enabled",
		header: ({ table, column }) => {
			const [headerToggle, setHeaderToggle] = useState(true);

			return (
				<div className="flex items-center gap-2">
					<span className="text-xs">Enabled</span>
					<Switch
						checked={headerToggle}
						onCheckedChange={(checked) => {
							setHeaderToggle(checked);
							const ids = table
								.getFilteredRowModel()
								.rows.map((row) => row.original.id);
							useRulesStore
								.getState()
								.toggleEnabled(ids, checked ? "on" : "off");
						}}
					/>
				</div>
			);
		},
		cell: ({ row }) => (
			<div className="flex justify-center">
				<Switch
					checked={row.original.enabled === "on"}
					onCheckedChange={(checked) => {
						useRulesStore
							.getState()
							.toggleEnabled(row.original.id, checked ? "on" : "off");
					}}
				/>
			</div>
		),
		enableSorting: true,
		enableHiding: false,
	},
	{
		id: "actions",
		enableHiding: false,
		header: () => <span className="text-xs">Actions</span>,
		cell: ({ row }) => {
			const [open, setOpen] = useState(false);
			return (
				<div className="flex justify-start">
					<RuleDialog
						mode="edit"
						open={open}
						onOpenChange={setOpen}
						initialData={row.original}
					/>
					<Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
						<span className="sr-only">Edit</span>
						<Pencil className="w-4 h-4" />
					</Button>
				</div>
			);
		},
	},
];
