import { ruleFormSchema } from "@/schemas/rule-form-schema";
import { useRulesStore } from "@/stores/rules-store";
import type { Rule } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleHelp } from "lucide-react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import type { z } from "zod";
import ArrayInput from "./array-input";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { DialogFooter } from "./ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function isValidRegex(pattern: string) {
	if (!pattern) return false;
	try {
		new RegExp(pattern);
		return true;
	} catch (e) {
		return false;
	}
}

interface CreateRuleFormProps {
	onSuccess?: () => void;
	initialData?: Rule;
}

export const CreateRuleForm: React.FC<CreateRuleFormProps> = ({
	initialData,
	onSuccess,
}) => {
	const addRule = useRulesStore((state) => state.add);
	const updateRule = useRulesStore((state) => state.update);

	const form = useForm<z.infer<typeof ruleFormSchema>>({
		resolver: zodResolver(ruleFormSchema),
		defaultValues: initialData || {
			id: uuidv4(),
			name: "",
			description: "",
			blockPattern: "",
			blockMode: "Matching",
			contexts: [],
			dateModified: new Date().toISOString(),
		},
	});

	function onSubmit(values: z.infer<typeof ruleFormSchema>) {
		if (initialData) {
			updateRule({ ...values, dateModified: new Date().toISOString() });
		} else {
			addRule(values);
		}
		onSuccess?.();
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="id"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input type="hidden" placeholder="Rule name" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<div className="flex items-center gap-2">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel className="flex items-center">
									<span>Name</span>
									<CircleHelp
										className="w-4 h-4 opacity-0"
										aria-hidden="true"
									/>
								</FormLabel>
								<FormControl>
									<Input type="text" placeholder="Rule name" {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="blockMode"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="flex items-center gap-1">
									<span>Mode</span>
									<Tooltip>
										<TooltipTrigger tabIndex={-1} aria-label="Mode help">
											<CircleHelp className="w-4 h-4" />
										</TooltipTrigger>
										<TooltipContent>
											<p>'Matching' only blocks the exact matched text.</p>
											<p>
												'Surrounding' blocks the entire sentence containing the
												match.
											</p>
										</TooltipContent>
									</Tooltip>
								</FormLabel>
								<FormControl>
									<Select
										value={field.value}
										name={field.name}
										onValueChange={field.onChange}
									>
										<SelectTrigger className="w-[180px]">
											<SelectValue
												placeholder="Mode"
												onBlur={field.onBlur}
												ref={field.ref}
											/>
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="Matching">Matching</SelectItem>
											<SelectItem value="Surrounding">Surrounding</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea placeholder="Rule description" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="blockPattern"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="flex items-center">
								<span className="mr-1">Block Pattern</span>
								<Tooltip>
									<TooltipTrigger tabIndex={-1} aria-label="Block pattern help">
										<CircleHelp className="w-4 h-4" />
									</TooltipTrigger>
									<TooltipContent>
										<p>
											Regular expression (regex) pattern to match text you want
											to block
										</p>
									</TooltipContent>
								</Tooltip>
							</FormLabel>
							<FormControl>
								<Input type="text" placeholder="Enter RegEx" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="contexts"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="flex items-center">
								<span>Contexts</span>
								<Badge variant="outline" className="ml-1">
									AI
								</Badge>
								<Tooltip>
									<TooltipTrigger tabIndex={-1} aria-label="Contexts help">
										<CircleHelp className="w-4 h-4 ml-1" />
									</TooltipTrigger>
									<TooltipContent>
										<p>
											In what paragraph contexts should the Rule be applied?
											(e.g.: 'alcohol, politics')
										</p>
										<p>Powered by a context-aware local LLM</p>
									</TooltipContent>
								</Tooltip>
							</FormLabel>
							<FormControl>
								<ArrayInput field={field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="dateModified"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input type="hidden" placeholder="Rule name" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<DialogFooter>
					<Button
						variant="secondary"
						type="button"
						onClick={() => {
							form.reset();
						}}
					>
						Cancel
					</Button>
					<Button variant="default" type="submit">
						Submit
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
};
