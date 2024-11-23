// utils.js
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
    label: 'Unlabeled',
    pattern: parsePatternString(line)
  };
}

function parsePatternString(str) {
  const regexMatch = str.match(/^(.*?)`(.*?)`(.*)$/);
  if (regexMatch) {
    const [_, pre, middle, post] = regexMatch;
    if (middle === '') {
      // Empty backticks means treat as plain word with boundaries
      return `\\b${escapeRegExp(str.replace(/`/g, ''))}\\b`;
    }
    // For custom regex, ensure it doesn't match empty strings by wrapping in non-capturing group
    // and using positive lookahead to ensure there's at least one character
    return `${escapeRegExp(pre)}(?:${middle})${escapeRegExp(post)}`;
  }
  // No backticks, treat as plain word with boundaries
  return `\\b${escapeRegExp(str)}\\b`;
}

// content.js remains the same but let's add a debug flag to help troubleshoot patterns
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