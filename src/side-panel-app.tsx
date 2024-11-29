import type React from "react";
import { TooltipProvider } from "./components/ui/tooltip";

const App: React.FC = () => {
	return (
		<TooltipProvider>
			<div className="bg-secondary/20">
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

				<div className="px-4 py-6 mx-auto max-w-7xl">
					<div className="container py-10 mx-auto"></div>
				</div>
			</div>
		</TooltipProvider>
	);
};

export default App;
