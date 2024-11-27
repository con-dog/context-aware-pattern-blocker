export type BlockMode = "Matching" | "Surrounding";

export interface RuleUserOptionalFields {
	name: string;
	description: string;
	contexts: string[];
	category: string;
}

export interface RuleUserRequiredFields {
	blockPattern: string;
	blockMode: BlockMode;
}

export interface Rule extends RuleUserOptionalFields, RuleUserRequiredFields {
	id: string;
	dateModified: Date;
}

export interface TooltipProps {
	text: string;
	children: React.ReactNode;
}

export interface TableHeaderProps {
	title: string;
	tooltip: string;
}
