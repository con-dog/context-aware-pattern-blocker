import { BrainCircuit, Shield, Sliders } from "lucide-react";
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
									phrase blocking, powered by{" "}
									<a
										href="https://deepmind.google/technologies/gemini/nano/"
										className="italic text-blue-500 underline"
									>
										Google Gemini Nano
									</a>
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="grid gap-4 md:grid-cols-3">
									<Card className="p-4">
										<h3 className="flex items-center justify-start mb-2 text-base font-medium">
											<BrainCircuit className="inline-block w-6 h-6 mr-2" />
											Context-Aware Filtering
										</h3>
										<p className="text-sm text-muted-foreground">
											Block words or phrases while specifying contexts eg:
											'Politics' or 'War'. AI will{" "}
											<strong>
												<em>unblock</em>
											</strong>{" "}
											content if it doesn't match your specified contexts.
										</p>
									</Card>
									<Card className="p-4">
										<h3 className="flex items-center justify-start mb-2 text-base font-medium">
											<Sliders className="inline-block w-6 h-6 mr-2" />
											Custom Rules
										</h3>
										<p className="text-sm text-muted-foreground">
											Use{" "}
											<strong>
												<em>regex</em>
											</strong>{" "}
											patterns to block specific words, phrases, or complex text
											patterns. Choose blocking{" "}
											<strong>
												<em>modes</em>
											</strong>{" "}
											to block individual matches or the entire surrounding
											sentence.
										</p>
									</Card>
									<Card className="p-4">
										<h3 className="flex items-center justify-start mb-2 text-base font-medium">
											<Shield className="inline-block w-6 h-6 mr-2" />
											Real-time Protection
										</h3>
										<p className="text-sm text-muted-foreground">
											Automatically blocks content as soon as it appears, on any
											webpage. Works{" "}
											<strong>
												<em>efficiently</em>
											</strong>{" "}
											without impacting your normal browsing experience.
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
