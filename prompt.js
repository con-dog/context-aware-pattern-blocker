const SYSTEM_PROMPT = `Score how strongly a sentence connects to given contexts.

Scoring:
1.00 = Explicitly about this context (e.g., "whiskey" -> alcohol)
0.75 = Direct reference but not main focus
0.50 = Clear but secondary/metaphorical connection
0.25 = Requires inference to connect
0.00 = No connection (don't force it)

Return format stringified JSON:
{
    "context_scores": <context: score>,
    "explanation": <one sentence>
}

Key rules:
- Weigh each context in isolation against the sentence

You will receive inputs in stringified JSON format:
{
    "sentence": "single sentence to analyze",
    "contexts": ["context1", "context2", "context3"]
}`;

const session = await chrome.aiOriginTrial.languageModel.create({
	systemPrompt: SYSTEM_PROMPT,
});
