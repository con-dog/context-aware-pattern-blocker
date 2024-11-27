export const tableHeaders = [
	{
		title: "Name",
		tooltip:
			"Rule name doesn't need to be unique. Helps you remember what this rule does.",
	},
	{
		title: "Description",
		tooltip:
			"Details about what this rule blocks and why. This will help you remember the rule's purpose later.",
	},
	{
		title: "Block Pattern",
		tooltip:
			"Enter a regular expression (regex) pattern to match text you want to block. The pattern will be applied to all websites.",
	},
	{
		title: "Block Mode",
		tooltip:
			"'Matching' only blocks the exact matched text. 'Surrounding' blocks the entire sentence containing the match.",
	},
	{
		title: "Block Contexts",
		tooltip:
			"Enter comma-separated contexts for when this rule should be applied (eg, 'alcohol, politics, war'). Required for AI features.",
	},
	{
		title: "Category",
		tooltip:
			"Group similar rules together (eg, 'Social' for people-related blocks, 'Politics' for political content). Helps organize your rules.",
	},
];
