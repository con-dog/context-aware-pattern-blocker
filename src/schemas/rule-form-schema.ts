import { z } from "zod";

export const ruleFormSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	category: z.string(),
	blockPattern: z.string(),
	blockMode: z.string(),
	contexts: z.array(z.string()),
	dateModified: z.date(),
});
