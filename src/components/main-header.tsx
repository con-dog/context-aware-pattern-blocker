export const MainHeader: React.FC = () => {
	return (
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
	);
};
