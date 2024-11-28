export type BlockMode = "Matching" | "Surrounding";

export interface RuleHiddenFields {
	id: string;
	dateModified: string;
	blockedCount: number;
}

export interface RuleUserOptionalFields {
	description: string;
	contexts: string[];
}

export interface RuleUserRequiredFields {
	name: string;
	blockPattern: string;
	blockMode: BlockMode;
}

export interface Rule
	extends RuleHiddenFields,
		RuleUserOptionalFields,
		RuleUserRequiredFields {}
