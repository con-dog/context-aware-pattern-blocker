// App.tsx
import type React from "react";
import { useState } from "react";
import { RuleTable } from "./components/rule-table";
import { TooltipProvider } from "./components/ui/tooltip";

const App: React.FC = () => {
	const [activeTab, setActiveTab] = useState<"rules" | "todo">("rules");

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
					<div className="flex mb-6 border-b border-gray-200">
						<button
							type="button"
							className={`px-4 py-2 -mb-px ${
								activeTab === "rules"
									? "border-b-2 border-blue-500 text-blue-600"
									: "text-gray-500 hover:text-gray-700"
							}`}
							onClick={() => setActiveTab("rules")}
						>
							Rules
						</button>
						<button
							type="button"
							className={`px-4 py-2 -mb-px ${
								activeTab === "todo"
									? "border-b-2 border-blue-500 text-blue-600"
									: "text-gray-500 hover:text-gray-700"
							}`}
							onClick={() => setActiveTab("todo")}
						>
							TODO
						</button>
					</div>

					{activeTab === "rules" ? (
						<RuleTable />
					) : (
						<div className="p-6">TODO content here</div>
					)}
				</div>
			</div>
		</TooltipProvider>
	);
};

export default App;
