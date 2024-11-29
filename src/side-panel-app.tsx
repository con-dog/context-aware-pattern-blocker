import { AlertCircle, ExternalLink } from "lucide-react";
import type React from "react";
import { useEffect } from "react";
import { Button } from "./components/ui/button";
import { TooltipProvider } from "./components/ui/tooltip";
import { useRulesStore } from "./stores/rules-store";

const App: React.FC = () => {
	const loadRules = useRulesStore((state) => state.load);

	useEffect(() => {
		loadRules();
	}, [loadRules]);

	const rules = useRulesStore((state) => state.rules);

	return (
		<TooltipProvider>
			<div className="flex flex-col min-h-screen bg-secondary/20">
				<header className="bg-white border-b">
					<div className="px-4 py-6 mx-auto">
						<div className="flex items-center space-x-4">
							<img src="/icons/icon.png" alt="App icon" className="w-7 h-7" />
							<div className="flex-1 min-w-0">
								<h1 className="text-lg font-semibold tracking-tight text-primary">
									Context Aware Blocker
								</h1>
								<p className="text-sm text-muted-foreground">
									Intelligent content filtering for a better browsing experience
								</p>
							</div>
						</div>
					</div>
				</header>

				{rules.length === 0 ? (
					<div className="flex flex-col items-center justify-center flex-1 gap-6 p-6">
						<div className="flex flex-col items-center gap-4">
							<div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted">
								<AlertCircle className="w-6 h-6 text-muted-foreground" />
							</div>
							<div className="space-y-1 text-center">
								<h2 className="text-lg font-medium">No rules yet!</h2>
								<p className="text-sm text-muted-foreground">
									Create your first content blocking rule to get started
								</p>
							</div>
						</div>

						<Button
							variant="default"
							className="w-full max-w-[200px]"
							onClick={() => {
								const url = chrome.runtime.getURL("index.html");
								chrome.tabs.create({
									url: url,
									active: true,
								});
							}}
						>
							Create Rules
							<ExternalLink className="w-4 h-4 ml-2" />
						</Button>
					</div>
				) : (
					<div className="flex flex-col items-center justify-center flex-1 gap-6 p-6"></div>
				)}

				{/* Footer with helpful info */}
				<div className="p-4 border-t bg-muted/50">
					<p className="text-xs text-center text-muted-foreground">
						Tip: Create rules to block specific words or phrases based on
						context
					</p>
				</div>
			</div>
		</TooltipProvider>
	);
};

export default App;
