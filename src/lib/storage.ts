import type { Rule } from "@/types/types";

export const storageUtils = {
	async saveRules(rules: Rule[]) {
		try {
			await chrome.storage.sync.set({ rules });
		} catch (error) {
			console.error("Error saving rules to chrome storage:", error);
			throw error;
		}
	},

	async loadRules(): Promise<Rule[]> {
		try {
			const data = await chrome.storage.sync.get("rules");
			return data.rules || [];
		} catch (error) {
			console.error("Error loading rules from chrome storage:", error);
			throw error;
		}
	},
};
