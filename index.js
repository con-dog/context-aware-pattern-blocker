import { $, $el, $id, $$, enhanceElement } from "./src/framework";
import { loadRulesFromStorage } from "./src/storage";
import { createRuleRow } from "./src/table";

export function initializeTabSwitcher() {
  const tabs = $$(".tab");
  const tabContents = $$(".tab-content");

  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.$el("click", () => {
      tabs.forEach((t) => t.$removeClass("active"));
      tabContents.forEach((content) => content.$removeClass("active"));
      tab.$class("active");
      const targetId = tab.$attr("data-tab");
      if (targetId) {
        $id(targetId).$class("active");
      }
    });
  });
}

function initializeAddRuleButton() {
  $(".add-rule-button").$el("click", () => {
    const tbody = $(".rules-table tbody");
    const newRow = createRuleRow();
    if (tbody.firstChild) {
      tbody.$insert(newRow, tbody.firstChild);
    } else {
      tbody.$append(newRow);
    }

    newRow.$("input").focus();
  });
}

// // Initialize validation on existing rows
// $$(".rule-input[required]").forEach((input) => {
//   validatePatternInput(input);
// });

// // Initialize delete functionality for existing rows
// $$(".delete-rule").forEach((button) => {
//   button.$el("click", () => button.closest("tr").remove());
// });

$el("DOMContentLoaded", () => {
  initializeTabSwitcher();
  initializeAddRuleButton();
  // TODO: Initial load
  // loadRulesFromStorage();
});
