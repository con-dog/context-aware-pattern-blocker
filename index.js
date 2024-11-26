import { $, $$ } from "./src/framework";

document.addEventListener("DOMContentLoaded", () => {
  // const tabs = document.querySelectorAll(".tab");
  const tabs = $$(".tab");
  const tabContents = $$(".tab-content");

  // Tab switching logic
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));

      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");
    });
  });

  // TODO: Load existing patterns
  // function loadPatterns() {
  //   chrome.storage.sync.get(['rawPatterns'], (result) => {
  //     if (result.rawPatterns) {
  //       textarea.value = result.rawPatterns.join('\n');
  //       updateCategoryView();
  //     }
  //   });
  // }

  // TODO: Save patterns
  // saveButton.addEventListener("click", () => {
  //   const rawPatterns = textarea.value
  //     .split("\n")
  //     .map((line) => line.trim())
  //     .filter((line) => line.length > 0);

  //   // Convert raw patterns to regex patterns with labels
  //   const blockPatterns = rawPatterns.map(parseBlockPattern);

  //   // Save both raw patterns and processed patterns
  //   chrome.storage.sync.set(
  //     {
  //       rawPatterns: rawPatterns,
  //       blockPatterns: blockPatterns,
  //     },
  //     () => {
  //       updateCategoryView();
  //       chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //         if (tabs[0]) {
  //           chrome.tabs.reload(tabs[0].id);
  //         }
  //       });
  //     }
  //   );
  // });

  // TODO: Initial load
  // loadPatterns();
});
