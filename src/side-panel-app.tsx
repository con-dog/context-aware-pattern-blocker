import type React from "react";
import { TooltipProvider } from "./components/ui/tooltip";

const App: React.FC = () => {
	return (
		<TooltipProvider>
			<div className="min-h-screen bg-gray-50">
				<header className="bg-white shadow">
					<div className="px-4 py-6 mx-auto max-w-7xl">
						<h1 className="text-3xl font-bold text-gray-900">
							Context Aware Word & Phrase Blocker
						</h1>
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
