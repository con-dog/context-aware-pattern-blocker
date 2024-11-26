export function $(selectors) {
  const element = document.querySelector(selectors);
  if (!element) {
    throw new ElementNotFoundError(selectors);
  }
  return element;
}

export function $$(selectors) {
  const elements = document.querySelectorAll(selectors);
  if (!elements.length) {
    throw new ElementNotFoundError(selectors);
  }
  return elements;
}

// export function $<T extends HTMLElement>(
// 	selectors: string,
// 	guard: (element: HTMLElement) => element is T,
// ): T {
// 	const element = document.querySelector(selectors);
// 	if (!element) {
// 		throw new ElementNotFoundError(selectors);
// 	}
// 	if (!(element instanceof HTMLElement)) {
// 		throw new Error(`Selector "${selectors}" matched a non-HTML element`);
// 	}
// 	// Now we have an HTMLElement
// 	if (!guard(element)) {
// 		throw new ElementTypeError(
// 			selectors,
// 			guard.name || "unknown",
// 			element.constructor.name,
// 		);
// 	}
// 	return element;
// }

// export function $id<T extends HTMLElement>(
// 	id: string,
// 	guard: (element: HTMLElement) => element is T,
// ): T {
// 	const element = document.getElementById(id);
// 	if (!element) {
// 		throw new ElementNotFoundError(id);
// 	}
// 	if (!guard(element)) {
// 		throw new ElementTypeError(
// 			id,
// 			guard.name || "unknown",
// 			element.constructor.name,
// 		);
// 	}
// 	return element;
// }
