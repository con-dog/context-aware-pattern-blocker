// Function to create a new rule row
function createRuleRow() {
  const tr = document.createElement("tr");

  // Define the cell contents
  const cells = [
    `<input type="text" class="rule-input" placeholder="Rule name">`,
    `<input type="text" class="rule-input" placeholder="Description">`,
    `<input type="text" class="rule-input" placeholder="RegEx or text pattern" required>`,
    `<select class="rule-select">
            <option value="matching">Matching</option>
            <option value="surrounding">Surrounding</option>
        </select>`,
    `<input type="text" class="rule-input" placeholder="context1, context2">`,
    `<input type="text" class="rule-input" placeholder="Category">`,
    `<button class="delete-rule">Delete</button>`,
  ];

  // Create and append each cell
  cells.forEach((cellHtml) => {
    const td = document.createElement("td");
    td.innerHTML = cellHtml;
    tr.appendChild(td);
  });

  const patternInput = tr.querySelector("input[required]");
  patternInput.addEventListener("input", () =>
    validatePatternInput(patternInput)
  );
  patternInput.addEventListener("change", () =>
    validatePatternInput(patternInput)
  );

  const deleteButton = tr.querySelector(".delete-rule");
  deleteButton.addEventListener("click", () => {
    tr.remove();
    // Recheck all patterns after deletion
    const addButton = document.querySelector(".add-rule-button");
    const allPatternsValid = Array.from(
      document.querySelectorAll(".rule-input[required]")
    ).every((input) => !input.value.trim() || isValidRegex(input.value.trim()));
    addButton.disabled = !allPatternsValid;
  });

  return tr;
}

// Add click handler to the Add Rule button
document.querySelector(".add-rule-button").addEventListener("click", () => {
  const tbody = document.querySelector(".rules-table tbody");
  const newRow = createRuleRow();

  // Insert at the beginning of the table
  if (tbody.firstChild) {
    tbody.insertBefore(newRow, tbody.firstChild);
  } else {
    tbody.appendChild(newRow);
  }

  // Optional: Focus the first input of the new row
  newRow.querySelector("input").focus();
});

// Initialize validation on existing rows
document.querySelectorAll(".rule-input[required]").forEach((input) => {
  validatePatternInput(input);
});

// Initialize delete functionality for existing rows
document.querySelectorAll(".delete-rule").forEach((button) => {
  button.addEventListener("click", () => button.closest("tr").remove());
});
