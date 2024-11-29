import { storageUtils } from "@/lib/storage";
import { create } from "zustand";
import type { Enabled, Rule } from "../types/types";

type RulesStoreState = {
	rules: Rule[];
	isLoading: boolean;
};

type RulesStoreActions = {
	add: (rule: Rule) => Promise<void>;
	update: (rule: Partial<Rule>) => Promise<void>;
	remove: (ids: string | string[]) => Promise<void>;
	load: () => Promise<void>;
	toggleEnabled: (ids: string | string[], enabled?: Enabled) => Promise<void>;
};

type RulesStore = RulesStoreState & RulesStoreActions;

export const useRulesStore = create<RulesStore>((set, get) => ({
	rules: [],
	isLoading: true,

	load: async () => {
		set({ isLoading: true });
		try {
			const rules = await storageUtils.loadRules();
			set({ rules, isLoading: false });
		} catch (error) {
			set({ isLoading: false });
			throw error;
		}
	},

	add: async (rule) => {
		const newRules = [rule, ...get().rules];
		await storageUtils.saveRules(newRules);
		set({ rules: newRules });
	},

	update: async (rule) => {
		const newRules = get().rules.map((r) =>
			r.id === rule.id ? { ...r, ...rule } : r,
		);
		await storageUtils.saveRules(newRules);
		set({ rules: newRules });
	},

	remove: async (idsToRemove: string | string[]) => {
		const ids = Array.isArray(idsToRemove) ? idsToRemove : [idsToRemove];
		const newRules = get().rules.filter((r) => !ids.includes(r.id));
		await storageUtils.saveRules(newRules);
		set({ rules: newRules });
	},

	toggleEnabled: async (idsToToggle: string | string[], enabled?: Enabled) => {
		const ids = Array.isArray(idsToToggle) ? idsToToggle : [idsToToggle];
		const newRules = get().rules.map((rule) => {
			if (ids.includes(rule.id)) {
				return {
					...rule,
					enabled: enabled ?? (rule.enabled === "on" ? "off" : "on"),
				};
			}
			return rule;
		});

		await storageUtils.saveRules(newRules);
		set({ rules: newRules });
	},
}));
