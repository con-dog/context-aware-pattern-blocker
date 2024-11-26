function isValidRegex(pattern) {
  if (!pattern) return false;
  try {
    new RegExp(pattern);
    return true;
  } catch (e) {
    return false;
  }
}

function validatePatternInput(input) {
  const pattern = input.value.trim();
  const isValid = isValidRegex(pattern);

  // Update input styling
  input.classList.toggle("invalid-pattern", !isValid);

  // Update add button state
  const addButton = document.querySelector(".add-rule-button");
  // Only enable if all pattern inputs are valid
  const allPatternsValid = Array.from(
    document.querySelectorAll(".rule-input[required]")
  ).every((input) => !input.value.trim() || isValidRegex(input.value.trim()));
  addButton.disabled = !allPatternsValid;

  return isValid;
}
