import type React from "react";
import { useEffect } from "react";
import { columns } from "./components/columns";
import { MainHeader } from "./components/main-header";
import { DataTable } from "./components/rule-data-table";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./components/ui/card";
import { TooltipProvider } from "./components/ui/tooltip";
import { MainInformation } from "./main-information";
import { useRulesStore } from "./stores/rules-store";

const App: React.FC = () => {
	const loadRules = useRulesStore((state) => state.load);

	useEffect(() => {
		loadRules();
	}, [loadRules]);

	return (
		<TooltipProvider>
			<div className="min-h-screen bg-secondary/20">
				<MainHeader />
				<main className="px-4 mx-auto max-w-7xl">
					<div className="py-8 space-y-6">
						<MainInformation />
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Blocking Rules</CardTitle>
								<CardDescription>
									Manage your content filtering rules and patterns
								</CardDescription>
							</CardHeader>
							<CardContent>
								<DataTable columns={columns} />
							</CardContent>
						</Card>
					</div>
				</main>
			</div>
		</TooltipProvider>
	);
};

export default App;
