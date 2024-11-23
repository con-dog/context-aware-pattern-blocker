document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.getElementById('patternList');
  const saveButton = document.getElementById('saveButton');
  const importFile = document.getElementById('importFile');
  const exportButton = document.getElementById('exportButton');
  const categoryList = document.getElementById('categoryList');
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(tab.dataset.tab).classList.add('active');

      if (tab.dataset.tab === 'categories') {
        updateCategoryView();
      }
    });
  });

  // Handle file export
  exportButton.addEventListener('click', () => {
    const patterns = textarea.value
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join('\n');

    // Create blob and download link
    const blob = new Blob([patterns], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'word-blocker-rules.txt';

    // Trigger download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // Clean up
    URL.revokeObjectURL(url);
  });

  // Handle file import
  importFile.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;

      // Process the imported content
      const importedPatterns = content
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);

      // Merge with existing patterns
      const existingPatterns = textarea.value
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);

      // Combine patterns, remove duplicates, and sort
      const mergedPatterns = [...new Set([...existingPatterns, ...importedPatterns])]
        .sort((a, b) => a.localeCompare(b));

      // Update textarea
      textarea.value = mergedPatterns.join('\n');

      // Clear the file input
      event.target.value = '';

      // Update the category view if we're on that tab
      if (document.querySelector('.tab[data-tab="categories"]').classList.contains('active')) {
        updateCategoryView();
      }
    };

    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      alert('Error reading file. Please try again.');
    };

    reader.readAsText(file);
  });

  // Load existing patterns
  function loadPatterns() {
    chrome.storage.sync.get(['rawPatterns'], (result) => {
      if (result.rawPatterns) {
        textarea.value = result.rawPatterns.join('\n');
        updateCategoryView();
      }
    });
  }

  // Update category view
  function updateCategoryView() {
    const patterns = textarea.value
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(parseBlockPattern);

    // Group patterns by label
    const categorizedPatterns = {};
    patterns.forEach(({label, pattern}) => {
      if (!categorizedPatterns[label]) {
        categorizedPatterns[label] = [];
      }
      categorizedPatterns[label].push(pattern);
    });

    // Create category view
    categoryList.innerHTML = '';
    Object.entries(categorizedPatterns).sort(([a], [b]) => a.localeCompare(b)).forEach(([label, patterns]) => {
      const category = document.createElement('div');
      category.className = 'category';
      category.innerHTML = `
        <div class="category-name">${label} (${patterns.length})</div>
        <div class="pattern-list">
          ${patterns.map(p => `<div class="pattern-item">${p}</div>`).join('')}
        </div>
      `;
      categoryList.appendChild(category);
    });
  }

  // Save patterns
  saveButton.addEventListener('click', () => {
    const rawPatterns = textarea.value
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    // Convert raw patterns to regex patterns with labels
    const blockPatterns = rawPatterns.map(parseBlockPattern);

    // Save both raw patterns and processed patterns
    chrome.storage.sync.set({
      rawPatterns: rawPatterns,
      blockPatterns: blockPatterns
    }, () => {
      updateCategoryView();
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          chrome.tabs.reload(tabs[0].id);
        }
      });
    });
  });

  // Initial load
  loadPatterns();
});