import {
	AlertCircle,
	Badge,
	Brain,
	ExternalLink,
	Eye,
	HelpCircle,
	MousePointerClick,
	Shield,
} from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { ScrollArea } from "./components/ui/scroll-area";
import { Separator } from "./components/ui/separator";
import { Slider } from "./components/ui/slider";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./components/ui/tooltip";
import { NANO_PROMPT_API_SYSTEM_PROMPT } from "./constants";
import { messageUtils } from "./lib/messaging";
import { useRulesStore } from "./stores/rules-store";
import type { BlockMode } from "./types/types";

interface BlockedElement {
	selector: string;
	blockMode: BlockMode;
	blockPattern: string;
	contexts: string[];
	name: string;
	originalText: string;
	id: string;
}

const App: React.FC = () => {
	const loadRules = useRulesStore((state) => state.load);
	const [selectedElement, setSelectedElement] = useState<string>("");
	const [contextScore, setContextScore] = useState([0.5]); // Default to middle value
	const [blockedElements, setBlockedElements] = useState<BlockedElement[]>([]);
	const [hasAnalysis, setHasAnalysis] = useState(false);
	const [promptApPrimarySession, setPromptApiPrimarySession] =
		useState<any>(null);

	// Simplified values for the slider marks
	const sliderMarks = [0, 0.25, 0.5, 0.75, 1];

	// Full descriptions for the tooltip
	const contextDescriptions = {
		"0.00": "No connection to context",
		"0.25": "Requires inference to connect",
		"0.50": "Clear but secondary / metaphorical connection",
		"0.75": "Direct reference but not main focus",
		"1.00": "Explicitly about this context",
	};

	useEffect(() => {
		const initializePromptAPI = async () => {
			const capabilities =
				await chrome.aiOriginTrial.languageModel.capabilities();
			if (capabilities?.available === "readily") {
				const session = await chrome.aiOriginTrial.languageModel.create({
					systemPrompt: NANO_PROMPT_API_SYSTEM_PROMPT,
				});
				setPromptApiPrimarySession(session);
			}
		};
		chrome.tabs.onActivated.addListener(async (activeInfo) => {
			const tabId = activeInfo.tabId;
			setSelectedElement("");
			setHasAnalysis(false);
			let response;
			try {
				response = await chrome.tabs.sendMessage(tabId, {
					type: "GET_BLOCKED_ELEMENTS",
				});
			} catch (error) {
				response = null;
			}

			console.log("response", response);
			if (response?.blockedElements) {
				setBlockedElements(response.blockedElements);
			} else {
				setBlockedElements([]);
			}
		});

		messageUtils.addMessageListener(({ type }: { type: string }) => {
			if (type === "RULES_UPDATED") {
				loadRules();
			}
		});
		messageUtils.addMessageListener(
			({ type, blockedElements }: { type: string; blockedElements: any[] }) => {
				if (type === "BLOCKED_ELEMENTS_UPDATED") {
					console.log("Blocked elements updated:", blockedElements);
					setBlockedElements(blockedElements);
				}
			},
		);
		initializePromptAPI();
	}, []);

	useEffect(() => {
		loadRules();
	}, [loadRules]);

	const rules = useRulesStore((state) => state.rules);

	const stats = {
		activeRules: rules.filter((rule) => rule.enabled === "on").length,
		blockedElements: blockedElements.length,
	};

	const handleSelectElement = async (selectedElementId: string) => {
		setSelectedElement(selectedElementId);
		const [tab] = await chrome.tabs.query({
			active: true,
			lastFocusedWindow: true,
		});
		if (!tab) {
			return;
		}
		await chrome.tabs.sendMessage(tab.id, {
			type: "SELECTED_ELEMENT_UPDATED",
			selectedElementId,
		});
		const selectedBlockedElement = blockedElements.find(
			(element) => element.id === selectedElementId,
		);

		console.log("Selected blocked element:", selectedBlockedElement);
	};

	return (
		<TooltipProvider>
			<div className="flex flex-col h-screen bg-secondary/20">
				{/* Header - Fixed height */}
				<header className="flex-none bg-white border-b">
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

				{/* Main Content - Fills remaining space */}
				<main className="flex-1 overflow-hidden">
					{rules.length === 0 ? (
						<div className="flex flex-col items-center justify-center h-full gap-6 p-6">
							<div className="flex flex-col items-center gap-4">
								<div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted">
									<AlertCircle className="w-6 h-6 text-muted-foreground" />
								</div>
								<div className="space-y-1 text-center">
									<h2 className="text-lg font-medium">No enabled rules!</h2>
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
						<div className="flex flex-col h-full">
							{/* Stats Cards - Fixed height */}
							<div className="grid flex-none grid-cols-2 gap-2 p-3">
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

							{/* Blocked Elements List - Scrollable */}
							<div className="flex flex-col flex-1 w-full min-h-0 gap-2 px-3">
								<div className="flex-none py-2 text-sm font-medium">
									Blocked Elements
								</div>
								<ScrollArea className="flex-1 border rounded-md">
									<RadioGroup
										value={selectedElement}
										onValueChange={handleSelectElement}
										className="p-2 space-y-2"
									>
										{blockedElements.map((element) => (
											<div key={element.id}>
												<label className="flex items-start p-2 space-x-3 rounded cursor-pointer hover:bg-muted">
													<RadioGroupItem
														value={element.id}
														id={element.id}
														className="mt-1"
													/>
													<div className="flex-1">
														<div className="text-sm font-medium">
															{element.name}
														</div>
														<div className="mt-1 font-mono text-xs text-muted-foreground">
															{element.selector}
														</div>
													</div>
												</label>
												<Separator />
											</div>
										))}
									</RadioGroup>
								</ScrollArea>
							</div>

							{/* Context Score Slider - Fixed height */}
							<div className="flex-none w-full px-3 pt-3 pb-2">
								<div className="space-y-3">
									<div className="flex items-center justify-between w-full">
										<div className="text-sm font-medium">Context Relevance</div>
										<Tooltip>
											<TooltipTrigger>
												<HelpCircle className="w-4 h-4 text-muted-foreground" />
											</TooltipTrigger>
											<TooltipContent className="w-72">
												<div className="space-y-2">
													{Object.entries(contextDescriptions).map(
														([score, desc]) => (
															<div
																key={score}
																className="grid grid-cols-[40px,1fr] gap-2 text-sm"
															>
																<span className="font-medium">{score}:</span>
																<span>{desc}</span>
															</div>
														),
													)}
												</div>
											</TooltipContent>
										</Tooltip>
									</div>

									<div className="space-y-1">
										<Slider
											value={contextScore}
											onValueChange={setContextScore}
											step={0.25}
											min={0}
											max={1}
											className="py-2"
										/>
										<div className="flex justify-between w-full px-0.5">
											{sliderMarks.map((mark) => (
												<div
													key={mark}
													className="text-xs text-muted-foreground"
												>
													{mark.toFixed(2)}
												</div>
											))}
										</div>
									</div>
								</div>
							</div>

							{/* AI Analysis Button - Fixed height */}
							<div className="flex-none p-3 border-t">
								<Button
									className="w-full"
									disabled={!selectedElement}
									onClick={() => {
										console.log("Analyzing element:", selectedElement);
										setHasAnalysis(true);
									}}
								>
									<Brain className="w-4 h-4" />
									Analyze with AI
								</Button>
							</div>

							{/* Results card with conditional states */}
							<div className="flex-none px-3">
								{selectedElement ? (
									hasAnalysis ? (
										<Card className="w-full bg-muted/50">
											<CardHeader className="py-3">
												<div className="flex items-center justify-between">
													<CardTitle className="text-sm font-medium">
														Analysis Results
													</CardTitle>
													<Badge type="secondary" className="text-xs">
														0.75 relevance
													</Badge>
												</div>
											</CardHeader>
											<CardContent className="py-3 space-y-2">
												<div className="text-sm text-muted-foreground">
													This content appears to be highly relevant to the
													blocked context based on surrounding text and semantic
													analysis.
												</div>
												<div className="flex items-center gap-2 p-2 text-sm rounded-md bg-primary/10">
													<AlertCircle className="w-4 h-4 text-primary" />
													<span className="text-primary">
														Recommended: Keep content blocked
													</span>
												</div>
											</CardContent>
										</Card>
									) : (
										<Card className="w-full bg-muted/50">
											<CardHeader className="py-3">
												<CardTitle className="text-sm font-medium">
													Analysis Results
												</CardTitle>
											</CardHeader>
											<CardContent className="py-3">
												<div className="flex flex-col items-center justify-center gap-2 py-2">
													<Brain className="w-8 h-8 text-muted-foreground/50" />
													<div className="text-sm text-center text-muted-foreground">
														Click "Analyze with AI" to check the relevance of
														the selected content
													</div>
												</div>
											</CardContent>
										</Card>
									)
								) : (
									<Card className="w-full bg-muted/50">
										<CardHeader className="py-3">
											<CardTitle className="text-sm font-medium">
												Analysis Results
											</CardTitle>
										</CardHeader>
										<CardContent className="py-3">
											<div className="flex flex-col items-center justify-center gap-2 py-2">
												<MousePointerClick className="w-8 h-8 text-muted-foreground/50" />
												<div className="text-sm text-center text-muted-foreground">
													Select a blocked element to analyze its context
													relevance
												</div>
											</div>
										</CardContent>
									</Card>
								)}
							</div>

							{/* UNBLOCK BUTTON */}
							<div className="flex-none p-3">
								<Button className="w-full" variant="outline">
									<Eye className="w-4 h-4" />
									Reveal Text
								</Button>
							</div>
						</div>
					)}
				</main>

				{/* Footer - Fixed height */}
				<footer className="flex-none p-4 border-t bg-muted/50">
					<p className="text-xs text-center text-muted-foreground">
						Tip: Create rules to block specific words or phrases based on
						context
					</p>
				</footer>
			</div>
		</TooltipProvider>
	);
};

export default App;
