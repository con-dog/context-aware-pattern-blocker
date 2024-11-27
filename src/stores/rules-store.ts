import { create } from "zustand";
import type { Rule } from "../types/types";

type RulesStoreState = {
	rules: Rule[];
};

type RulesStoreActions = {
	add: (rule: Rule) => void;
	update: (rule: Partial<Rule>) => void;
	remove: (id: string) => void;
};

type RulesStore = RulesStoreState & RulesStoreActions;

export const useRulesStore = create<RulesStore>((set) => ({
	rules: [],
	add: (rule) => set((state) => ({ rules: [rule, ...state.rules] })),
	update: (rule) =>
		set((state) => ({
			rules: state.rules.map((r) => (r.id === rule.id ? { ...r, ...rule } : r)),
		})),
	remove: (id) =>
		set((state) => ({ rules: state.rules.filter((r) => r.id !== id) })),
}));
