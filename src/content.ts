let rules = [];
let totalMatchesBlocked = 0;
let processedNodes = new WeakSet();
let blockedElements = new Map();
let unblockedElementsByUniqueSelector = new WeakSet();
let blockedElementCountPerRuleId = {};
// Highlighting
let highlightedElement: HTMLElement | null = null;
let oldOutline = null;
let oldPosition = null;
let oldBackgroundColor = null;
let oldBoxShadow = null;
let oldOutlineOffset = null;

const messageUtils = {
	async sendMessage(message) {
		try {
			await chrome.runtime.sendMessage(message);
		} catch (error) {
			console.error("Error sending message to background script:", error);
			throw error;
		}
	},
	async addMessageListener(callback) {
		chrome.runtime.onMessage.addListener((message) => {
			callback(message);
		});
	},
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.type === "GET_BLOCKED_ELEMENTS") {
		sendResponse({ blockedElements: getBlockedElements() });
	}
	if (message.type === "UNBLOCK_ELEMENT") {
		const { id } = message;
		const blockedElement = getBlockedElementById(id);
		console.log("BLOCKED ELEMENT", blockedElement);

		if (blockedElement) {
			const { originalText } = blockedElement;
			const elementRef = document.querySelector(blockedElement.selector);
			console.log("ELEMENT REF", elementRef);

			if (elementRef) {
				// Try multiple update approaches
				elementRef.textContent = originalText;
				elementRef.innerText = originalText;

				// Force a DOM reflow
				void elementRef.offsetHeight;

				// Alternative: Use requestAnimationFrame
				requestAnimationFrame(() => {
					elementRef.textContent = originalText;
				});

				// Or try wrapping in setTimeout
				setTimeout(() => {
					elementRef.textContent = originalText;
				}, 0);
			}

			blockedElements.delete(blockedElement.element);
			unblockedElementsByUniqueSelector.add(blockedElement.selector);
		}
	}
});

function updateBadgeCount() {
	chrome.runtime.sendMessage({
		type: "updateBadge",
		count: totalMatchesBlocked,
	});
}

function highlightElement(selector: string) {
	const elem = document.querySelector<HTMLElement>(selector);
	if (!elem) return;

	// Previous highlight? Remove highlight
	if (highlightedElement) {
		highlightedElement.style.outline = oldOutline;
		highlightedElement.style.position = oldPosition;
		highlightedElement.style.backgroundColor = oldBackgroundColor;
		highlightedElement.style.boxShadow = oldBoxShadow;
		highlightedElement.style.outlineOffset = oldOutlineOffset;
	}

	highlightedElement = elem;

	oldOutline = highlightedElement.style.outline;
	oldPosition = highlightedElement.style.position;
	oldBackgroundColor = highlightedElement.style.backgroundColor;
	oldBoxShadow = highlightedElement.style.boxShadow;
	oldOutlineOffset = highlightedElement.style.outlineOffset;

	// Apply highlight
	highlightedElement.style.outline = "2px solid rgba(0, 132, 255, 0.8)";
	highlightedElement.style.outlineOffset = "-1px";
	highlightedElement.style.position =
		oldPosition === "static" ? "relative" : oldPosition;
	highlightedElement.style.backgroundColor = "rgba(0, 132, 255, 0.1)";
	highlightedElement.style.boxShadow = "0 0 0 3px rgba(0, 132, 255, 0.3)";
	highlightedElement.scrollIntoView({ behavior: "smooth", block: "center" });
	highlightedElement.focus();
}

messageUtils.addMessageListener((message) => {
	if (message.type === "SELECTED_ELEMENT_UPDATED") {
		console.log("SELECTED_ELEMENT_UPDATED", message);
		const { selectedElementId } = message;
		const blockedElement = getBlockedElementById(selectedElementId);
		highlightElement(blockedElement.selector);
	}
});

function generateUniqueSelector(element) {
	if (!element || element.nodeType !== Node.ELEMENT_NODE) return null;

	if (element.id) {
		return `#${CSS.escape(element.id)}`;
	}

	const path = [];
	let current = element;

	while (current && current.nodeType === Node.ELEMENT_NODE) {
		// Get the element's position among siblings of the same type
		let selector = current.tagName.toLowerCase();
		const sameTypeSiblings = Array.from(
			current.parentNode?.children || [],
		).filter((el) => el.tagName === current.tagName);

		if (sameTypeSiblings.length > 1) {
			const index = sameTypeSiblings.indexOf(current) + 1;
			selector += `:nth-of-type(${index})`;
		}

		// Add classes if they exist
		if (current.classList.length) {
			selector += Array.from(current.classList)
				.map((c) => `.${CSS.escape(c)}`)
				.join("");
		}

		path.unshift(selector);

		// Stop at body or if we have a unique enough path
		if (current.tagName === "BODY" || path.length >= 3) break;
		current = current.parentNode;
	}

	return path.join(" > ");
}

function replaceWithBlocks(text, rule, node) {
	const { blockPattern, blockMode, id, name, contexts, blockedCount } = rule;
	try {
		if (!blockPattern) {
			console.error("Missing blockPattern in replaceWithBlocks");
			return text;
		}

		const regex = new RegExp(blockPattern, "gi");
		const matches = text.match(regex);

		if (!matches) return text;

		totalMatchesBlocked += matches.length;
		blockedElementCountPerRuleId[id] =
			(blockedElementCountPerRuleId[id] || blockedCount) + matches.length;
		updateBadgeCount();

		// Guard against undefined node
		if (node) {
			// Get the closest element parent of this text node
			const elementToTrack =
				node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
			if (elementToTrack) {
				const uniqueSelector = generateUniqueSelector(elementToTrack);
				if (unblockedElementsByUniqueSelector.has(uniqueSelector)) return text;
				if (uniqueSelector) {
					blockedElements.set(elementToTrack, {
						id: crypto.randomUUID(),
						selector: uniqueSelector,
						originalText: text,
						blockPattern: blockPattern,
						blockMode: blockMode,
						name: name,
						contexts: contexts,
					});
				}
			}
		}

		if (blockMode === "Surrounding") {
			// Find all matches and their positions
			let lastIndex = 0;
			let result = "";

			regex.lastIndex = 0; // Reset regex
			let match;
			while ((match = regex.exec(text)) !== null) {
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

		return text.replace(regex, (match) => {
			return "█".repeat(match.length);
		});
	} catch (e) {
		console.error("Invalid regex pattern:", blockPattern, e);
		return text;
	}
}

function processTextNode(node) {
	if (!node || processedNodes.has(node)) return;

	let text = node.textContent;
	let modified = false;

	for (const rule of rules) {
		if (!rule || !rule.blockPattern || rule.enabled !== "on") continue;
		const newText = replaceWithBlocks(text, rule, node);
		if (newText !== text) {
			text = newText;
			modified = true;
		}
	}

	if (modified) {
		console.log("MODIFIED");
		node.textContent = text;
		processedNodes.add(node);
		messageUtils.sendMessage({
			type: "BLOCKED_ELEMENTS_UPDATED",
			blockedElements: getBlockedElements(),
		});
		console.log("BLOCKED ELEMENTS UPDATED", getBlockedElements());
	}
}

function getBlockedElements() {
	// Return array of objects with element and its data
	return Array.from(blockedElements.entries()).map(([_, data]) => ({
		...data,
	}));
}

function getBlockedElementBySelector(selector) {
	for (const [element, data] of blockedElements.entries()) {
		if (data.selector === selector) {
			return {
				element,
				...data,
			};
		}
	}
	return null;
}

function getBlockedElementById(id) {
	for (const [element, data] of blockedElements.entries()) {
		if (data.id === id) {
			return {
				element,
				...data,
			};
		}
	}
	return null;
}

function processVisibleNode(node) {
	if (node.nodeType === Node.TEXT_NODE) {
		processTextNode(node);
	} else if (node.nodeName !== "SCRIPT" && node.nodeName !== "STYLE") {
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

function resetCounter() {
	totalMatchesBlocked = 0;
	processedNodes = new WeakSet();
	blockedElements = new Map();
	unblockedElementsByUniqueSelector = new Set();
	blockedElementCountPerRuleId = {};
	updateBadgeCount();
}

const intersectionObserver = new IntersectionObserver(
	(entries) => {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				processVisibleNode(entry.target);

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
		threshold: 0.1,
	},
);

chrome.storage.sync.get(["rules"], (result) => {
	if (!result.rules) {
		return;
	}

	rules = result.rules;
	resetCounter();

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

document.addEventListener("visibilitychange", () => {
	if (document.visibilityState === "visible") {
		const elements = document.body.getElementsByTagName("*");
		for (const element of elements) {
			if (isElementInViewport(element)) {
				processVisibleNode(element);
			}
		}
	}
});

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

window.addEventListener("beforeunload", () => {
	chrome.runtime.sendMessage({
		type: "UPDATED_RULE_STATS",
		rules: rules.map((rule) => ({
			...rule,
			blockedCount:
				rule.blockedCount + (blockedElementCountPerRuleId?.[rule.id] || 0),
		})),
	});
});
