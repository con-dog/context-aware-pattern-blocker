/**
 * Adds DOM querying and event utility methods to an element
 * @param {Element} element - DOM element to enhance
 * @returns {Element} The enhanced element
 */
export function enhanceElement(element) {
  if (!element.$) {
    element.$ = function (selector) {
      // If called as method, use this as parent
      return $(selector, this);
    };
  }

  if (!element.$$) {
    element.$$ = function (selector) {
      // If called as method, use this as parent
      return $$(selector, this);
    };
  }

  if (!element.$id) {
    element.$id = function (id) {
      // If called as method, use this as parent
      return $id(id, this);
    };
  }

  if (!element.$listener) {
    element.$listener = function (event, handler) {
      this.addEventListener(event, handler);
      return this;
    };
  }

  return element;
}

/**
 * Queries the DOM for a single element using CSS selectors, with flexible parent targeting.
 * @param {...args} args - (selector: string) or (parent: Element, selector: string)
 * @returns {Element} Enhanced element with $ and $$ methods
 */
export function $(...args) {
  // If called as a method (this is an Element), use it as parent
  const isMethod = this instanceof Element;

  // If it's a method call, treat single argument as selector
  if (isMethod) {
    const [selector] = args;
    const element = this.querySelector(selector);
    if (!element) {
      throw new ElementNotFoundError(selector);
    }
    return enhanceElement(element);
  }

  // Otherwise, use normal parent/selector logic
  const [first, second] = args;
  const parent = args.length > 1 ? first : document;
  const selector = args.length > 1 ? second : first;

  const element = parent.querySelector(selector);
  if (!element) {
    throw new ElementNotFoundError(selector);
  }
  return enhanceElement(element);
}

/**
 * Queries the DOM for multiple elements using CSS selectors, with flexible parent targeting.
 * @param {...args} args - (selector: string) or (parent: Element, selector: string)
 * @returns {NodeList} Collection of enhanced elements with $ and $$ methods
 */
export function $$(...args) {
  const isMethod = this instanceof Element;

  if (isMethod) {
    const [selector] = args;
    const elements = this.querySelectorAll(selector);
    if (!elements.length) {
      throw new ElementNotFoundError(selector);
    }
    elements.forEach(enhanceElement);
    return elements;
  }

  const [first, second] = args;
  const parent = args.length > 1 ? first : document;
  const selector = args.length > 1 ? second : first;

  const elements = parent.querySelectorAll(selector);
  if (!elements.length) {
    throw new ElementNotFoundError(selector);
  }
  elements.forEach(enhanceElement);
  return elements;
}

/**
 * Queries the DOM for a single element by its id, with flexible parent targeting.
 * @param {...args} args - (id: string) or (parent: Element, id: string)
 * @returns {Element} Enhanced element with enhanced methods
 */
export function $id(...args) {
  const isMethod = this instanceof Element;

  if (isMethod) {
    const [id] = args;
    const element = this.querySelector(`#${id}`);
    if (!element) {
      throw new ElementNotFoundError(id);
    }
    return enhanceElement(element);
  }

  const [first, second] = args;
  const id = args.length > 1 ? second : first;
  const parent = args.length > 1 ? first : document;

  const element =
    parent === document
      ? document.getElementById(id)
      : parent.querySelector(`#${id}`);

  if (!element) {
    throw new ElementNotFoundError(id);
  }
  return enhanceElement(element);
}

/**
 * Adds an event listener to an element or document., with flexible parent targeting.
 * @param {...args} args - (event: string, handler: Function) or (target: Element, event: string, handler: Function)
 * @returns {Element} Returns enhanced target element for chaining.
 */
export function $listener(...args) {
  let target, event, handler;

  if (args.length === 2) {
    [event, handler] = args;
    target = document;
  } else {
    [target, event, handler] = args;
  }

  target.addEventListener(event, handler);

  return target === document ? target : enhanceElement(target);
}
