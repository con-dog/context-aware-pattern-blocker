import type { Rule } from "@/types/types";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { DataTableColumnHeader } from "./ui/data-table-column-header";
import { useState } from "react";
import { RuleDialog } from "./rule-dialog";

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
	},
	{
		accessorKey: "dateModified",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Date Modified" />
		),
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
