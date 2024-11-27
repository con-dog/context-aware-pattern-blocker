import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import type { Rule } from "../types/types";

type RulesStoreState = {
	rules: Rule[];
};

type RulesStoreActions = {
	add: () => void;
	update: (rule: Partial<Rule>) => void;
	remove: (id: string) => void;
};

type RulesStore = RulesStoreState & RulesStoreActions;

export const generateDefaultRule = (): Rule => ({
	id: uuidv4(),
	name: "",
	description: "",
	blockPattern: "",
	blockMode: "matching",
	blockContexts: [],
	category: "",
});

export const useRulesStore = create<RulesStore>((set) => ({
	rules: [],
	add: () =>
		set((state) => ({ rules: [...state.rules, generateDefaultRule()] })),
	update: (rule) =>
		set((state) => ({
			rules: state.rules.map((r) => (r.id === rule.id ? { ...r, ...rule } : r)),
		})),
	remove: (id) =>
		set((state) => ({ rules: state.rules.filter((r) => r.id !== id) })),
}));
