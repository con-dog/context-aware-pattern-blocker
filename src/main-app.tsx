import type React from "react";
import { useEffect } from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/rule-data-table";
import { TooltipProvider } from "./components/ui/tooltip";
import { useRulesStore } from "./stores/rules-store";

const App: React.FC = () => {
	const loadRules = useRulesStore((state) => state.load);

	useEffect(() => {
		loadRules();
	}, [loadRules]);

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
						<DataTable columns={columns} />
					</div>
				</div>
			</div>
		</TooltipProvider>
	);
};

export default App;
