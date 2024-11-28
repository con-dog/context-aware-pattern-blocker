import { ExternalLink } from "lucide-react";
import type React from "react";
import { Button } from "./components/ui/button";
import { TooltipProvider } from "./components/ui/tooltip";

const App: React.FC = () => {
	return (
		<TooltipProvider>
			<div className="bg-gray-50 w-fit">
				<header className="bg-white shadow">
					<div className="px-4 py-6 mx-auto">
						<h3 className="font-bold text-gray-900 text-l">
							Context Aware Word & Phrase Blocker
						</h3>
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
							const window = await chrome.windows.getCurrent({
								windowTypes: ["normal"],
							});
							if (!window) {
								return;
							}
							chrome.sidePanel.setOptions(
								{
									enabled: true,
									path: "side-panel.html",
								},
								() => {
									chrome.sidePanel.open({ windowId: window.id });
								},
							);
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
