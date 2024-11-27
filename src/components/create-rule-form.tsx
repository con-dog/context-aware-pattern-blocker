import { ruleFormSchema } from "@/schemas/rule-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
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

export function isValidRegex(pattern: string) {
	if (!pattern) return false;
	try {
		new RegExp(pattern);
		return true;
	} catch (e) {
		return false;
	}
}

export const CreateRuleForm: React.FC = () => {
	const form = useForm<z.infer<typeof ruleFormSchema>>({
		resolver: zodResolver(ruleFormSchema),
		defaultValues: {
			id: "",
			name: "",
			description: "",
			blockPattern: "",
			blockMode: "Matching",
			contexts: [],
			dateModified: new Date(),
		},
	});

	function onSubmit(values: z.infer<typeof ruleFormSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
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
				<div className="flex gap-2">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>Name</FormLabel>
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
								<FormLabel>Mode</FormLabel>
								<FormControl>
									<Select {...field}>
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="Mode" />
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
							<FormLabel>Block Pattern</FormLabel>
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
							<FormLabel>Contexts</FormLabel>
							<FormControl>
								<Input
									type="text"
									multiple
									placeholder="Comma-separated contexts"
									value={field.value.join(", ")}
									onChange={(e) => {
										field.onChange(
											e.target.value.split(",").map((str) => str.trim()),
										);
									}}
								/>
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
					<Button variant="secondary">Cancel</Button>
					<Button variant="default" type="submit">
						Submit
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
};
