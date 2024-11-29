import { X } from "lucide-react";
import { useEffect, useState } from "react";
import type { ControllerRenderProps } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ArrayInputProps {
	field: ControllerRenderProps<
		{
			id: string;
			name: string;
			description: string;
			blockPattern: string;
			blockMode: "Matching" | "Surrounding";
			contexts: string[];
			dateModified: string;
			blockedCount: number;
			enabled: "on" | "off";
		},
		"contexts"
	>;
	maxItems?: number;
}

export const ArrayInput: React.FC<ArrayInputProps> = ({
	field,
	maxItems = 5,
}) => {
	const [inputValue, setInputValue] = useState("");

	// handle form reset, clear the input value
	useEffect(() => {
		setInputValue("");
	}, [field.value]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" || e.key === ",") {
			e.preventDefault();
			if (inputValue.trim() && field.value.length < maxItems) {
				field.onChange([...field.value, inputValue.trim()]);
				setInputValue("");
			}
		} else if (e.key === "Backspace" && !inputValue && field.value.length > 0) {
			// Remove last item when backspace is pressed and input is empty
			field.onChange(field.value.slice(0, -1));
		}
	};

	const removeItem = (indexToRemove: number) => {
		field.onChange(field.value.filter((_, index) => index !== indexToRemove));
	};

	return (
		<div className="w-full">
			<div className="p-2 space-y-2 border rounded-md min-h-[42px]">
				<Input
					type="text"
					value={inputValue}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					className="flex-1 border-none outline-none"
					placeholder={
						field.value.length >= maxItems
							? "Max items reached"
							: "Type and press Enter"
					}
					disabled={field.value.length >= maxItems}
				/>
				<div className="flex flex-wrap gap-2">
					{field.value.map((item, index) => (
						<span
							key={uuidv4()}
							className="flex items-center gap-1 py-2 pl-3 pr-1 text-sm rounded-full bg-zinc-700 h-7"
						>
							<span className="text-zinc-50">{item}</span>
							<Button
								onClick={() => removeItem(index)}
								variant="ghost"
								size="sm"
								className="w-5 h-5 bg-zinc-50 rounded-full m-[0px] opacity-70 ring-offset-background hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
							>
								<X className="w-3 h-3 " />
							</Button>
						</span>
					))}
				</div>
			</div>
		</div>
	);
};

export default ArrayInput;
