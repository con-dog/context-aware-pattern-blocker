import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "./ui/button";

export const columns: ColumnDef<any>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Name
					<ArrowUpDown className="w-4 h-4 ml-2" />
				</Button>
			);
		},
	},
	{
		accessorKey: "description",
		header: "Description",
	},
	{
		accessorKey: "category",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Category
					<ArrowUpDown className="w-4 h-4 ml-2" />
				</Button>
			);
		},
	},
	{
		accessorKey: "block_pattern",
		header: "Blocking Pattern",
	},
	{
		accessorKey: "block_mode",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Blocking Mode
					<ArrowUpDown className="w-4 h-4 ml-2" />
				</Button>
			);
		},
	},
	{
		accessorKey: "block_contexts",
		header: "Blocking Contexts",
	},
];
