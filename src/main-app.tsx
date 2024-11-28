import type React from "react";
import { useEffect } from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/rule-data-table";
import { TooltipProvider } from "./components/ui/tooltip";
import { useRulesStore } from "./stores/rules-store";
import { Shield } from "lucide-react";

const App: React.FC = () => {
	const loadRules = useRulesStore((state) => state.load);

	useEffect(() => {
		loadRules();
	}, [loadRules]);

	return (
		<TooltipProvider>
			<div className="min-h-screen bg-secondary/20">
				<header className="bg-white border-b">
					<div className="px-4 py-6 mx-auto max-w-7xl">
						<div className="flex items-center space-x-4">
							<Shield className="w-8 h-8 text-primary" />
							<div>
								<h1 className="text-2xl font-semibold tracking-tight text-primary">
									Context Aware Word & Phrase Blocker
								</h1>
								<p className="text-sm text-muted-foreground">
									Intelligent content filtering for a better browsing experience
								</p>
							</div>
						</div>
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
