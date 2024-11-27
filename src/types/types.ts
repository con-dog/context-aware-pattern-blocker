export type BlockMode = "matching" | "surrounding";

export interface RuleUserOptionalFields {
	name: string;
	description: string;
	blockContexts: string[];
	category: string;
}

export interface RuleUserRequiredFields {
	blockPattern: string;
	blockMode: BlockMode;
}

export interface Rule extends RuleUserOptionalFields, RuleUserRequiredFields {
	id: string;
}

export interface TooltipProps {
	text: string;
	children: React.ReactNode;
}

export interface TableHeaderProps {
	title: string;
	tooltip: string;
}
