import { isValidRegex } from "@/components/create-rule-form";
import { z } from "zod";

export const ruleFormSchema = z.object({
	id: z.string(),
	name: z.string().min(1),
	description: z.string().max(100),
	blockPattern: z
		.string()
		.min(1)
		.max(250)
		.refine((value) => isValidRegex(value), {
			message: "Invalid regular expression",
		}),
	blockMode: z.string(),
	contexts: z.array(z.string()).max(5),
	dateModified: z.date(),
});
