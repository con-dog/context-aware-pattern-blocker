import { ExternalLink } from "lucide-react";
import type React from "react";
import { Button } from "./components/ui/button";
import { TooltipProvider } from "./components/ui/tooltip";

const App: React.FC = () => {
	return (
		<TooltipProvider>
			<div className="min-w-max bg-secondary/20">
				<header className="bg-white border-b">
					<div className="px-4 py-6 mx-auto">
						<div className="flex items-center space-x-4">
							<img src="/icons/icon.png" alt="App icon" className="w-7 h-7" />
							<div className="flex-1 min-w-0">
								<h1 className="w-full text-lg font-semibold tracking-tight whitespace-nowrap text-primary">
									Context Aware Blocker
								</h1>
								<p className="w-full text-sm text-muted-foreground">
									Intelligent content filtering for a better browsing experience
								</p>
							</div>
						</div>
					</div>
				</header>

				<div className="flex flex-col gap-2 px-4 py-6 mx-auto">
					<Button
						variant="default"
						size="sm"
						className="flex items-center justify-center gap-1"
						onClick={() => {
							const url = chrome.runtime.getURL("index.html");
							chrome.tabs.create({
								url: url,
								active: true,
							});
							window.close();
						}}
					>
						Open Rules App
						<ExternalLink className="w-4 h-4" />
					</Button>
					<Button
						variant="outline"
						size="sm"
						className="flex items-center justify-center gap-1"
						onClick={async () => {
							const thisWindow = await chrome.windows.getCurrent({
								windowTypes: ["normal"],
							});
							if (!thisWindow) {
								return;
							}
							chrome.sidePanel.setOptions(
								{
									enabled: true,
									path: "side-panel.html",
								},
								() => {
									chrome.sidePanel.open({ windowId: thisWindow.id });
								},
							);
							window.close();
						}}
					>
						Open Sidepanel App
						<ExternalLink className="w-4 h-4" />
					</Button>
				</div>
			</div>
		</TooltipProvider>
	);
};

export default App;
