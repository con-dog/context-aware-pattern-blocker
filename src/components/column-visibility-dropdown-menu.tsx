import type { Rule } from "@/types/types";
import type { Table } from "@tanstack/react-table";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface ColumnVisibilityDropdownMenuProps {
	table: Table<Rule>;
}

export const ColumnVisibilityDropdownMenu: React.FC<
	ColumnVisibilityDropdownMenuProps
> = ({ table }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="ml-auto">
					Columns
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{table
					.getAllColumns()
					.filter((column) => column.getCanHide())
					.map((column) => {
						return (
							<DropdownMenuCheckboxItem
								key={column.id}
								className="capitalize"
								checked={column.getIsVisible()}
								onCheckedChange={(value) => column.toggleVisibility(!!value)}
							>
								{column.id}
							</DropdownMenuCheckboxItem>
						);
					})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
