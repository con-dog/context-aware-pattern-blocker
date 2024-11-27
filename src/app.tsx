// App.tsx
import type React from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/rule-data-table";
import { TooltipProvider } from "./components/ui/tooltip";
import type { Rule } from "./types/types";

function getData(): Rule[] {
	// Fetch data from your API here.
	return [
		{
			id: "1",
			name: "Rule 1",
			description: "Description 1",
			category: "Category 1",
			blockPattern: "Block Pattern 1",
			blockMode: "matching",
			blockContexts: ["Context 1", "Context 2"],
			dateModified: new Date(),
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
