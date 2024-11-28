import type React from "react";
import { useEffect } from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/rule-data-table";
import { Alert, AlertDescription } from "./components/ui/alert";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./components/ui/card";
import { TooltipProvider } from "./components/ui/tooltip";
import { useRulesStore } from "./stores/rules-store";

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
							<img src="/icons/icon.png" alt="App icon" className="w-10 h-10" />
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

				<main className="px-4 mx-auto max-w-7xl">
					<div className="py-8 space-y-6">
						{/* Info Section */}
						<Card>
							<CardHeader>
								<CardTitle className="text-base">
									Welcome to Smart Content Filtering
								</CardTitle>
								<CardDescription>
									Customize your browsing experience with intelligent word and
									phrase blocking, powered by Google Gemini Nano
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="grid gap-4 md:grid-cols-3">
									<Card className="p-4">
										<h3 className="mb-2 text-base font-base">
											Context-Aware Filtering
										</h3>
										<p className="text-sm text-muted-foreground">
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Sed do eiusmod tempor incididunt ut labore.
										</p>
									</Card>
									<Card className="p-4">
										<h3 className="mb-2 text-base font-medium">Custom Rules</h3>
										<p className="text-sm text-muted-foreground">
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Ut enim ad minim veniam.
										</p>
									</Card>
									<Card className="p-4">
										<h3 className="mb-2 text-base font-medium">
											Real-time Protection
										</h3>
										<p className="text-sm text-muted-foreground">
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Duis aute irure dolor.
										</p>
									</Card>
								</div>

								<Alert>
									<AlertDescription>
										Create and manage your blocking rules below. Each rule can
										be customized with specific contexts and patterns.
									</AlertDescription>
								</Alert>
							</CardContent>
						</Card>

						{/* Data Table Section */}
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
