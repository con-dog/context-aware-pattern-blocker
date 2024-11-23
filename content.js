let blockPatterns = [];

function replaceWithBlocks(text, pattern) {
  try {
    const regex = new RegExp(pattern, 'gi');
    return text.replace(regex, match => '█'.repeat(match.length));
  } catch (e) {
    console.error('Invalid regex pattern:', pattern, e);
    return text;
  }
}

function processNode(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    let text = node.textContent;
    let modified = false;

    blockPatterns.forEach(({pattern}) => {
      const newText = replaceWithBlocks(text, pattern);
      if (newText !== text) {
        text = newText;
        modified = true;
      }
    });

    if (modified) {
      node.textContent = text;
    }
  } else {
    if (node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
      Array.from(node.childNodes).forEach(processNode);
    }
  }
}

chrome.storage.sync.get(['blockPatterns'], (result) => {
  if (result.blockPatterns) {
    blockPatterns = result.blockPatterns;
    processNode(document.body);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach(processNode);
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
});