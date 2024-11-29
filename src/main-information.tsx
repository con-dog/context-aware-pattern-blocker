import { BrainCircuit, Info, Shield, Sliders } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./components/ui/card";

export const MainInformation: React.FC = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-base">
					Welcome to Smart Content Filtering
				</CardTitle>
				<CardDescription>
					Customize your browsing experience with intelligent word and phrase
					blocking, powered by{" "}
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
							Block words or phrases while specifying contexts eg: 'Politics' or
							'War'. AI will{" "}
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
							to block individual matches or the entire surrounding sentence.
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
					<Info className="w-5 h-5 text-card-foreground" />
					<AlertTitle className="text-card-foreground">
						Getting started
					</AlertTitle>
					<AlertDescription className="text-muted-foreground">
						Create and manage your blocking rules below. Each rule can be
						customized with specific contexts and patterns.
					</AlertDescription>
				</Alert>
			</CardContent>
		</Card>
	);
};
