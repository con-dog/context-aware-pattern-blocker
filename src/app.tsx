// App.tsx
import type React from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/rule-data-table";
import { TooltipProvider } from "./components/ui/tooltip";

function getData() {
	// Fetch data from your API here.
	return [
		{
			name: "Rule 1",
			description: "Description 1",
			category: "Category 1",
			block_pattern: "Block Pattern 1",
			block_mode: "matching",
			block_contexts: "Block Contexts 1",
			date_modified: "Date Modified 1",
		},
		{
			name: "Rule 2",
			description: "Description 2",
			category: "Category 2",
			block_pattern: "Block Pattern 2",
			block_mode: "surrounding",
			block_contexts: "Block Contexts 2",
			date_modified: "Date Modified 2",
		},
		{
			name: "Rule 1",
			description: "Description 1",
			category: "Category 1",
			block_pattern: "Block Pattern 1",
			block_mode: "matching",
			block_contexts: "Block Contexts 1",
			date_modified: "Date Modified 1",
		},
		{
			name: "Rule 2",
			description: "Description 2",
			category: "Category 2",
			block_pattern: "Block Pattern 2",
			block_mode: "surrounding",
			block_contexts: "Block Contexts 2",
			date_modified: "Date Modified 2",
		},
		{
			name: "Rule 1",
			description: "Description 1",
			category: "Category 1",
			block_pattern: "Block Pattern 1",
			block_mode: "matching",
			block_contexts: "Block Contexts 1",
			date_modified: "Date Modified 1",
		},
		{
			name: "Rule 2",
			description: "Description 2",
			category: "Category 2",
			block_pattern: "Block Pattern 2",
			block_mode: "surrounding",
			block_contexts: "Block Contexts 2",
			date_modified: "Date Modified 2",
		},
		{
			name: "Rule 1",
			description: "Description 1",
			category: "Category 1",
			block_pattern: "Block Pattern 1",
			block_mode: "matching",
			block_contexts: "Block Contexts 1",
			date_modified: "Date Modified 1",
		},
		{
			name: "Rule 2",
			description: "Description 2",
			category: "Category 2",
			block_pattern: "Block Pattern 2",
			block_mode: "surrounding",
			block_contexts: "Block Contexts 2",
			date_modified: "Date Modified 2",
		},
		{
			name: "Rule 1",
			description: "Description 1",
			category: "Category 1",
			block_pattern: "Block Pattern 1",
			block_mode: "matching",
			block_contexts: "Block Contexts 1",
			date_modified: "Date Modified 1",
		},
		{
			name: "Rule 2",
			description: "Description 2",
			category: "Category 2",
			block_pattern: "Block Pattern 2",
			block_mode: "surrounding",
			block_contexts: "Block Contexts 2",
			date_modified: "Date Modified 2",
		},
		{
			name: "Rule 1",
			description: "Description 1",
			category: "Category 1",
			block_pattern: "Block Pattern 1",
			block_mode: "matching",
			block_contexts: "Block Contexts 1",
			date_modified: "Date Modified 1",
		},
		{
			name: "Rule 2",
			description: "Description 2",
			category: "Category 2",
			block_pattern: "Block Pattern 2",
			block_mode: "surrounding",
			block_contexts: "Block Contexts 2",
			date_modified: "Date Modified 2",
		},
		{
			name: "Rule 1",
			description: "Description 1",
			category: "Category 1",
			block_pattern: "Block Pattern 1",
			block_mode: "matching",
			block_contexts: "Block Contexts 1",
			date_modified: "Date Modified 1",
		},
		{
			name: "Rule 2",
			description: "Description 2",
			category: "Category 2",
			block_pattern: "Block Pattern 2",
			block_mode: "surrounding",
			block_contexts: "Block Contexts 2",
			date_modified: "Date Modified 2",
		},
		{
			name: "Rule 1",
			description: "Description 1",
			category: "Category 1",
			block_pattern: "Block Pattern 1",
			block_mode: "matching",
			block_contexts: "Block Contexts 1",
			date_modified: "Date Modified 1",
		},
		{
			name: "Rule 2",
			description: "Description 2",
			category: "Category 2",
			block_pattern: "Block Pattern 2",
			block_mode: "surrounding",
			block_contexts: "Block Contexts 2",
			date_modified: "Date Modified 2",
		},
		{
			name: "Rule 1",
			description: "Description 1",
			category: "Category 1",
			block_pattern: "Block Pattern 1",
			block_mode: "matching",
			block_contexts: "Block Contexts 1",
			date_modified: "Date Modified 1",
		},
		{
			name: "Rule 2",
			description: "Description 2",
			category: "Category 2",
			block_pattern: "Block Pattern 2",
			block_mode: "surrounding",
			block_contexts: "Block Contexts 2",
			date_modified: "Date Modified 2",
		},
		{
			name: "Rule 1",
			description: "Description 1",
			category: "Category 1",
			block_pattern: "Block Pattern 1",
			block_mode: "matching",
			block_contexts: "Block Contexts 1",
			date_modified: "Date Modified 1",
		},
		{
			name: "Rule 2",
			description: "Description 2",
			category: "Category 2",
			block_pattern: "Block Pattern 2",
			block_mode: "surrounding",
			block_contexts: "Block Contexts 2",
			date_modified: "Date Modified 2",
		},
		{
			name: "Rule 1",
			description: "Description 1",
			category: "Category 1",
			block_pattern: "Block Pattern 1",
			block_mode: "matching",
			block_contexts: "Block Contexts 1",
			date_modified: "Date Modified 1",
		},
		{
			name: "Rule 2",
			description: "Description 2",
			category: "Category 2",
			block_pattern: "Block Pattern 2",
			block_mode: "surrounding",
			block_contexts: "Block Contexts 2",
			date_modified: "Date Modified 2",
		},

		// ...
	];
}

const App: React.FC = () => {
	return (
		<TooltipProvider>
			<div className="min-h-screen bg-gray-50">
				<header className="bg-white shadow">
					<div className="px-4 py-6 mx-auto max-w-7xl">
						<h1 className="text-3xl font-bold text-gray-900">
							Context Aware Word & Phrase Blocker
						</h1>
					</div>
				</header>

				<div className="px-4 py-6 mx-auto max-w-7xl">
					<div className="container py-10 mx-auto">
						<DataTable columns={columns} data={getData()} />
					</div>
				</div>
			</div>
		</TooltipProvider>
	);
};

export default App;
