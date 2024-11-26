import { $, $listener, $id, $$, enhanceElement } from "./src/framework";
import { loadRulesFromStorage } from "./src/storage";

export function initializeTabSwitcher() {
  const tabs = $$(".tab");
  const tabContents = $$(".tab-content");

  tabs.forEach((tab) => {
    tab = enhanceElement(tab);
    $listener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));
      tab.classList.add("active");
      $id(tab.dataset.tab).classList.add("active");
    });
  });
}

function initializeAddRuleButton() {
  $(".add-rule-button").$listener("click", () => {
    const tbody = $(".rules-table tbody");
    const newRow = enhanceElement(createRuleRow());

    if (tbody.firstChild) {
      tbody.insertBefore(newRow, tbody.firstChild);
    } else {
      tbody.appendChild(newRow);
    }

    newRow.$("input").focus();
  });
}

$listener("DOMContentLoaded", () => {
  initializeTabSwitcher();
  initializeAddRuleButton();
  // TODO: Initial load
  loadRulesFromStorage();
});
