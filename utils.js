function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parseBlockPattern(line) {
  // First check for label
  const labelMatch = line.match(/^label:(.*?);(.*)$/);
  if (labelMatch) {
    const [_, label, pattern] = labelMatch;
    return {
      label: label.trim(),
      pattern: parsePatternString(pattern.trim())
    };
  }
  return {
    label: 'unlabeled',
    pattern: parsePatternString(line)
  };
}

function parsePatternString(str) {
  const regexMatch = str.match(/^(.*?)`(.*?)`(.*)$/);
  if (regexMatch) {
    const [_, pre, middle, post] = regexMatch;
    // For custom regex, ensure it doesn't match empty strings by wrapping in non-capturing group
    // and using positive lookahead to ensure there's at least one character
    return `${escapeRegExp(pre)}(?:${middle})${escapeRegExp(post)}`;
  }
  return `\\b${escapeRegExp(str)}\\b`;
}

function replaceWithBlocks(text, pattern) {
  try {
    const regex = new RegExp(pattern, 'gi');
    // Only replace if the match is not empty
    return text.replace(regex, match => match.length > 0 ? '█'.repeat(match.length) : match);
  } catch (e) {
    console.error('Invalid regex pattern:', pattern, e);
    return text;
  }
}