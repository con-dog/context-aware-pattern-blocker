import { AlertCircle, Brain, ExternalLink, Eye, Shield } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { ScrollArea } from "./components/ui/scroll-area";
import { TooltipProvider } from "./components/ui/tooltip";
import { useRulesStore } from "./stores/rules-store";

interface BlockedElement {
	id: string;
	selector: string;
	content: string;
	rule: string;
}

const App: React.FC = () => {
	const loadRules = useRulesStore((state) => state.load);
	const [selectedElement, setSelectedElement] = useState<string>("");

	useEffect(() => {
		loadRules();
	}, [loadRules]);

	const rules = useRulesStore((state) => state.rules);

	const blockedElements: BlockedElement[] = [
		{
			id: "1",
			selector: ".article p:first-child",
			content: "Some blocked text here...",
			rule: "Political Content",
		},
		{
			id: "2",
			selector: ".sidebar .widget",
			content: "Another blocked element...",
			rule: "Social Media",
		},
		// ... more elements
	];

	const stats = {
		activeRules: 5,
		blockedElements: blockedElements.length,
	};

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
					<div className="flex flex-col items-center justify-center flex-1 gap-6 p-4">
						<div className="grid grid-cols-2 gap-2 p-3">
							<Card className="flex items-center gap-2 p-3">
								<Shield className="w-4 h-4 text-primary" />
								<div>
									<div className="text-lg font-semibold">
										{stats.activeRules}
									</div>
									<div className="text-xs text-muted-foreground">
										Active Rules
									</div>
								</div>
							</Card>
							<Card className="flex items-center gap-2 p-3">
								<Eye className="w-4 h-4 text-primary" />
								<div>
									<div className="text-lg font-semibold">
										{stats.blockedElements}
									</div>
									<div className="text-xs text-muted-foreground">
										Blocked Items
									</div>
								</div>
							</Card>
						</div>

						{/* Blocked Elements List */}
						<div className="flex-1 w-full px-3">
							<div className="py-2 text-sm font-medium">Blocked Elements</div>
							<ScrollArea className="h-[300px] rounded-md border">
								<RadioGroup
									value={selectedElement}
									onValueChange={setSelectedElement}
									className="p-2 space-y-2"
								>
									{blockedElements.map((element) => (
										<label
											key={element.id}
											className="flex items-start p-2 space-x-3 rounded cursor-pointer hover:bg-muted"
										>
											<RadioGroupItem
												value={element.id}
												id={element.id}
												className="mt-1"
											/>
											<div className="flex-1">
												<div className="text-sm font-medium">
													{element.rule}
												</div>
												<div className="text-xs truncate text-muted-foreground">
													{element.content}
												</div>
												<div className="mt-1 font-mono text-xs text-muted-foreground">
													{element.selector}
												</div>
											</div>
										</label>
									))}
								</RadioGroup>
							</ScrollArea>
						</div>

						{/* AI Analysis Button */}
						<div className="p-3 border-t">
							<Button
								className="w-full"
								disabled={!selectedElement}
								onClick={() =>
									console.log("Analyzing element:", selectedElement)
								}
							>
								<Brain className="w-4 h-4 mr-2" />
								Analyze with AI
							</Button>
						</div>
					</div>
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
