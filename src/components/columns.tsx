import type { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { DataTableColumnHeader } from "./ui/data-table-column-header";

export const columns: ColumnDef<any>[] = [
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
		accessorKey: "category",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Category" />
		),
	},
	{
		accessorKey: "block_pattern",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Block Pattern" />
		),
	},
	{
		accessorKey: "mode",
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
		accessorKey: "date_modified",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Date Modified" />
		),
	},
	{
		id: "actions",
		enableHiding: false,
		header: () => <span className="text-xs">Actions</span>,
		cell: ({ row }) => {
			return (
				<div className="flex justify-start">
					<Button variant="secondary" size="sm" onClick={() => {}}>
						<span className="sr-only">Edit</span>
						<Pencil className="w-4 h-4" />
					</Button>
				</div>
			);
		},
	},
];
