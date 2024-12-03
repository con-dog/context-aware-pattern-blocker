chrome.action.setBadgeBackgroundColor({
	color: [0, 0, 0, 255],
});
chrome.action.setBadgeTextColor({ color: "#FFFFFF" });

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
	if (message.type === "updateBadge") {
		chrome.action.setBadgeTextColor({
			color: "#FFFFFF",
			tabId: sender.tab.id,
		});

		chrome.action.setBadgeText({
			text: message.count.toString(),
			tabId: sender.tab.id,
		});

		chrome.action.setBadgeBackgroundColor({
			color: [0, 0, 0, 255],
			tabId: sender.tab.id,
		});
	}
});

chrome.tabs.onActivated.addListener((activeInfo) => {
	chrome.action.setBadgeText({
		text: "",
		tabId: activeInfo.tabId,
	});
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.status === "loading") {
		chrome.action.setBadgeText({
			text: "",
			tabId: tabId,
		});
	}
});
