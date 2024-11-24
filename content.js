let blockPatterns = [];
let blockCount = 0;
let processedNodes = new WeakSet(); // Keep track of nodes we've processed

function updateBadgeCount() {
  chrome.runtime.sendMessage({
    type: 'updateBadge',
    count: blockCount
  });
}

function replaceWithBlocks(text, pattern) {
  try {
    const regex = new RegExp(pattern, 'gi');
    const matches = text.match(regex);
    if (matches) {
      blockCount += matches.length;
      updateBadgeCount();
    }
    return text.replace(regex, match => '█'.repeat(match.length));
  } catch (e) {
    console.error('Invalid regex pattern:', pattern, e);
    return text;
  }
}

function processTextNode(node) {
  if (processedNodes.has(node)) return;

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
    processedNodes.add(node);
  }
}

function processVisibleNode(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    processTextNode(node);
  } else if (node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
    // Process child text nodes
    const walker = document.createTreeWalker(
      node,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    while (walker.nextNode()) {
      processTextNode(walker.currentNode);
    }
  }
}

// Reset counter when page changes
function resetCounter() {
  blockCount = 0;
  processedNodes = new WeakSet();
  updateBadgeCount();
}

// Create intersection observer
const intersectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      processVisibleNode(entry.target);

      // Also observe any new nodes that might be added to this element
      const mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              intersectionObserver.observe(node);
              processVisibleNode(node);
            } else if (node.nodeType === Node.TEXT_NODE) {
              processTextNode(node);
            }
          });
        });
      });

      mutationObserver.observe(entry.target, {
        childList: true,
        subtree: true
      });
    }
  });
}, {
  threshold: 0.1 // Start processing when at least 10% of the element is visible
});

// Initialize
chrome.storage.sync.get(['blockPatterns'], (result) => {
  if (result.blockPatterns) {
    blockPatterns = result.blockPatterns;
    resetCounter();

    // Observe all existing elements
    const elements = document.body.getElementsByTagName('*');
    for (const element of elements) {
      intersectionObserver.observe(element);
    }

    // Observe new elements being added to the body
    const bodyObserver = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            intersectionObserver.observe(node);
            // Also observe any elements within this new node
            const childElements = node.getElementsByTagName('*');
            for (const element of childElements) {
              intersectionObserver.observe(element);
            }
          }
        });
      });
    });

    bodyObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
});

// Handle visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    resetCounter();
    // Re-process visible elements
    const elements = document.body.getElementsByTagName('*');
    for (const element of elements) {
      if (isElementInViewport(element)) {
        processVisibleNode(element);
      }
    }
  }
});

// Utility function to check if element is in viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}