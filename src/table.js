import { $ce } from "./framework";
import { isValidRegex, validatePatternInput } from "./regex";

export function NameInput() {
  return `<input type="text" class="rule-input" placeholder="Rule name">`;
}

export function DescriptionInput() {
  return `<input type="text" class="rule-input" placeholder="Description">`;
}

export function BlockPatternInput() {
  return `<input type="text" class="rule-input" placeholder="RegEx or text pattern" required>`;
}

export function BlockModeSelect() {
  return `<select class="rule-select">
    <option value="matching">Matching</option>
    <option value="surrounding">Surrounding</option>
  </select>`;
}

export function BlockContextInput() {
  return `<input type="text" class="rule-input" placeholder="context1, context2">`;
}

export function CategoryInput() {
  return `<input type="text" class="rule-input" placeholder="Category">`;
}

export function DeleteRuleButton() {
  return `<button class="delete-rule">Delete</button>`;
}

export function createRuleRow() {
  const tr = $ce("tr");

  const cells = [
    NameInput(),
    DescriptionInput(),
    BlockPatternInput(),
    BlockModeSelect(),
    BlockContextInput(),
    CategoryInput(),
    DeleteRuleButton(),
  ];

  cells.forEach((cellHtml) => {
    const td = $ce("td");
    td.$html(cellHtml);
    tr.$append(td);
  });

  const patternInput = tr.$("input[required]");
  patternInput.$el("input", () => validatePatternInput(patternInput));
  patternInput.$el("change", () => validatePatternInput(patternInput));

  const deleteButton = tr.$(".delete-rule");
  deleteButton.$el("click", () => {
    tr.remove();
    const addButton = $(".add-rule-button");
    const allPatternsValid = Array.from($$(".rule-input[required]")).every(
      (input) => !input.value.trim() || isValidRegex(input.value.trim())
    );
    addButton.disabled = !allPatternsValid;
  });

  return tr;
}
