import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Textarea } from "./ui/textarea";

const RegexLivePreview = () => {
	const [testText, setTestText] = useState("");
	const [matches, setMatches] = useState<RegExpMatchArray | null>(null);
	const { watch } = useFormContext();
	const textarea = useRef<HTMLTextAreaElement>(null);
	const textareaMirror = useRef<HTMLDivElement>(null);

	const blockPattern = watch("blockPattern");

	const updateMirror = () => {
		if (!textarea.current || !textareaMirror.current || !blockPattern) return;

		try {
			const regex = new RegExp(blockPattern, "g");
			// Add a zero-width space after <br /> to force the line height
			let htmlContent = testText
				.replace(/ /g, "\u00a0")
				.replace(/\n/g, "<br />\u200B");

			// Replace matches with highlighted spans
			if (regex.source !== "(?:)") {
				htmlContent = htmlContent.replace(
					regex,
					(match) =>
						`<span class="inline-block bg-green-200 border-b-2 border-green-800" style="height: 1.2em; line-height: 1.2">${match}</span>`,
				);
			}

			textareaMirror.current.innerHTML = htmlContent;
			textareaMirror.current.style.width = `${textarea.current.offsetWidth}px`;
		} catch (e) {
			// If regex is invalid, just show the plain text
			const plainContent = testText
				.replace(/ /g, "\u00a0")
				.replace(/\n/g, "<br />\u200B");
			textareaMirror.current.innerHTML = plainContent;
		}
	};

	const syncScroll = () => {
		if (!textarea.current || !textareaMirror.current) return;
		textareaMirror.current.scrollTop = textarea.current.scrollTop;
	};

	// Initialize mirror when component mounts
	useEffect(() => {
		if (!textarea.current || !textareaMirror.current) return;
		updateMirror();
	}, []);

	// Update mirror when text changes or blockPattern changes
	useEffect(() => {
		updateMirror();
	}, [testText, blockPattern]);

	useEffect(() => {
		const textareaElement = textarea.current;
		if (!textareaElement) return;

		textareaElement.addEventListener("scroll", syncScroll);
		return () => {
			textareaElement.removeEventListener("scroll", syncScroll);
		};
	}, []);

	// Update matches whenever pattern or test text changes
	useEffect(() => {
		if (!blockPattern || !testText) {
			setMatches(null);
			return;
		}

		try {
			const regex = new RegExp(blockPattern, "g");
			const newMatches = testText.match(regex);
			setMatches(newMatches);
		} catch (e) {
			setMatches(null);
		}
	}, [blockPattern, testText]);

	return (
		<div className="space-y-2">
			<div className="relative">
				<Textarea
					ref={textarea}
					placeholder="Enter text to test your regex pattern..."
					value={testText}
					onChange={(e) => setTestText(e.target.value)}
					className="z-10 min-h-[100px] bg-transparent"
				/>
				<div
					ref={textareaMirror}
					className="absolute text-transparent -z-10 overflow-auto inset-0 w-full px-3 py-2 min-h-[100px] text-base break-words break-all bg-transparent border rounded-md shadow-sm whitespace-break-spaces border-input placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
				/>
			</div>
		</div>
	);
};

export default RegexLivePreview;
