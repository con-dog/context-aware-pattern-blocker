let rules = [];
let blockCount = 0;
let processedNodes = new WeakSet();

function updateBadgeCount() {
	chrome.runtime.sendMessage({
		type: "updateBadge",
		count: blockCount,
	});
}

function replaceWithBlocks(text, pattern, blockMode) {
	try {
		const regex = new RegExp(pattern, "gi");
		const matches = text.match(regex);

		if (!matches) return text;

		blockCount += matches.length;
		updateBadgeCount();

		if (blockMode === "Surrounding") {
			// Find all matches and their positions
			let lastIndex = 0;
			let result = "";

			regex.lastIndex = 0; // Reset regex
			let match;
			while (true) {
				match = regex.exec(text);
				if (match === null) break;
				const matchStart = match.index;
				const matchEnd = regex.lastIndex;

				if (lastIndex === 0) {
					// First match: process from start of text to end of match
					result +=
						text.slice(0, matchStart).replace(/[a-zA-Z0-9]/g, "█") +
						text.slice(matchStart, matchEnd).replace(/[a-zA-Z0-9]/g, "█");
				} else {
					// Process from last position to end of current match
					result += text
						.slice(lastIndex, matchEnd)
						.replace(/[a-zA-Z0-9]/g, "█");
				}

				lastIndex = matchEnd;
			}

			// Process remaining text if there was at least one match
			if (lastIndex > 0) {
				result += text.slice(lastIndex).replace(/[a-zA-Z0-9]/g, "█");
				return result;
			}
		}

		// Default "Matching" mode: just replace alphanumerics in matched text
		return text.replace(regex, (match) => {
			return match.replace(/[a-zA-Z0-9]/g, "█");
		});
	} catch (e) {
		console.error("Invalid regex pattern:", pattern, e);
		return text;
	}
}

function processTextNode(node) {
	if (processedNodes.has(node)) return;

	let text = node.textContent;
	let modified = false;

	for (const { blockPattern, blockMode } of rules) {
		const newText = replaceWithBlocks(text, blockPattern, blockMode);
		if (newText !== text) {
			text = newText;
			modified = true;
		}
	}

	if (modified) {
		node.textContent = text;
		processedNodes.add(node);
	}
}

function processVisibleNode(node) {
	if (node.nodeType === Node.TEXT_NODE) {
		processTextNode(node);
	} else if (node.nodeName !== "SCRIPT" && node.nodeName !== "STYLE") {
		// Process child text nodes
		const walker = document.createTreeWalker(
			node,
			NodeFilter.SHOW_TEXT,
			null,
			false,
		);

		while (walker.nextNode()) {
			processTextNode(walker.currentNode);
		}
	}
}

// Reset counter when page changes
function resetCounter() {
	blockCount = 0;
	processedNodes = new WeakSet();
	updateBadgeCount();
}

// Create intersection observer
const intersectionObserver = new IntersectionObserver(
	(entries) => {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				processVisibleNode(entry.target);

				// Also observe any new nodes that might be added to this element
				const mutationObserver = new MutationObserver((mutations) => {
					for (const mutation of mutations) {
						for (const node of mutation.addedNodes) {
							if (node.nodeType === Node.ELEMENT_NODE) {
								intersectionObserver.observe(node);
								processVisibleNode(node);
							} else if (node.nodeType === Node.TEXT_NODE) {
								processTextNode(node);
							}
						}
					}
				});

				mutationObserver.observe(entry.target, {
					childList: true,
					subtree: true,
				});
			}
		}
	},
	{
		threshold: 0.1, // Start processing when at least 10% of the element is visible
	},
);

// Initialize
chrome.storage.sync.get(["rules"], (result) => {
	if (!result.rules) {
		return;
	}

	rules = result.rules;
	resetCounter();

	// Observe all existing elements
	const elements = document.body.getElementsByTagName("*");
	for (const element of elements) {
		intersectionObserver.observe(element);
	}

	const bodyObserver = new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			for (const node of mutation.addedNodes) {
				if (node.nodeType === Node.ELEMENT_NODE) {
					intersectionObserver.observe(node);
					const childElements = node.getElementsByTagName("*");
					for (const element of childElements) {
						intersectionObserver.observe(element);
					}
				}
			}
		}
	});

	bodyObserver.observe(document.body, {
		childList: true,
		subtree: true,
	});
});

// Handle visibility changes
document.addEventListener("visibilitychange", () => {
	if (document.visibilityState === "visible") {
		// Re-process visible elements
		const elements = document.body.getElementsByTagName("*");
		for (const element of elements) {
			if (isElementInViewport(element)) {
				processVisibleNode(element);
			}
		}
	}
});

// Utility function to check if element is in viewport
function isElementInViewport(el) {
	const rect = el.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <=
			(window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}
