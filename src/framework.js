/**
 * Adds DOM querying and event utility methods to an element
 * @param {Element} element - DOM element to enhance
 * @returns {EnhancedElement} The enhanced element
 */
export function enhanceElement(element) {
  const methods = {
    // Query methods
    $: function (selector) {
      return $(this, selector);
    },
    $$: function (selector) {
      return $$(this, selector);
    },
    $id: function (id) {
      return $id(this, id);
    },

    // Event method
    $el: function (event, handler) {
      this.addEventListener(event, handler);
      return this;
    },

    // DOM manipulation methods
    $append: function (...items) {
      this.append(...items);
      return this;
    },
    $insert: function (...items) {
      this.insertBefore(...items);
      return this;
    },
    $attr: function (name, value) {
      if (value === undefined) {
        return this.getAttribute(name);
      }
      this.setAttribute(name, value);
      return this;
    },
    $class: function (...classNames) {
      this.classList.add(...classNames);
      return this;
    },
    $removeClass: function (...classNames) {
      this.classList.remove(...classNames);
      return this;
    },
    $toggleClass: function (className, force) {
      this.classList.toggle(className, force);
      return this;
    },
    $html: function (content) {
      this.innerHTML = content;
      return this;
    },
    $text: function (content) {
      this.textContent = content;
      return this;
    },
  };

  // Add all methods to the element if they don't exist
  Object.entries(methods).forEach(([key, method]) => {
    if (!element[key]) {
      element[key] = method;
    }
  });

  return element;
}

/**
 * Queries the DOM for a single element using CSS selectors
 * @param {Element|string} first - Parent element or selector if only one argument
 * @param {string} [second] - Selector if parent is provided
 * @returns {Element|null} Enhanced element with utility methods or null if not found
 */
export function $(...args) {
  let parent, selector;

  if (args.length === 1) {
    parent = document;
    selector = args[0];
  } else {
    [parent, selector] = args;
  }

  if (!(parent instanceof Element) && parent !== document) {
    throw new Error("Invalid parent element provided to query selector");
  }

  const element = parent.querySelector(selector);
  return element ? enhanceElement(element) : null;
}

/**
 * Queries the DOM for multiple elements using CSS selectors
 * @param {Element|string} first - Parent element or selector if only one argument
 * @param {string} [second] - Selector if parent is provided
 * @returns {NodeList} Collection of enhanced elements
 */
export function $$(...args) {
  let parent, selector;

  if (args.length === 1) {
    parent = document;
    selector = args[0];
  } else {
    [parent, selector] = args;
  }

  if (!(parent instanceof Element) && parent !== document) {
    throw new Error("Invalid parent element provided to query selector");
  }

  const elements = parent.querySelectorAll(selector);
  elements.forEach(enhanceElement);
  return elements;
}

/**
 * Queries the DOM for a single element by its id
 * @param {Element|string} first - Parent element or ID if only one argument
 * @param {string} [second] - ID if parent is provided
 * @returns {Element|null} Enhanced element with utility methods or null if not found
 */
export function $id(...args) {
  let parent, id;

  if (args.length === 1) {
    parent = document;
    id = args[0];
  } else {
    [parent, id] = args;
  }

  if (!(parent instanceof Element) && parent !== document) {
    throw new Error("Invalid parent element provided to ID selector");
  }

  const element =
    parent === document
      ? document.getElementById(id)
      : parent.querySelector(`#${id}`);

  return element ? enhanceElement(element) : null;
}

/**
 * Adds an event listener to an element or document
 * @param {Element|string} first - Target element or event name if only document
 * @param {string|Function} second - Event name or handler if target provided
 * @param {Function} [third] - Handler if target and event provided
 * @returns {Element} Returns enhanced target element for chaining
 */
export function $el(...args) {
  let target, event, handler;

  if (args.length === 2) {
    [event, handler] = args;
    target = document;
  } else {
    [target, event, handler] = args;
  }

  if (!(target instanceof Element) && target !== document) {
    throw new Error("Invalid target element provided for event listener");
  }

  target.addEventListener(event, handler);
  return target === document ? target : enhanceElement(target);
}

/**
 * Creates and enhances a new DOM element
 * @param {string} tag - HTML tag name
 * @param {Object} [options] - Optional attributes and properties
 * @param {string|Element|Array} [children] - String content, Element, or Array of children
 * @returns {Element} Enhanced element with utility methods
 */
export function $ce(tag, options = {}, children = null) {
  const element = document.createElement(tag);

  Object.entries(options).forEach(([key, value]) => {
    if (key.startsWith("on") && typeof value === "function") {
      element.addEventListener(key.slice(2), value);
    } else {
      element.setAttribute(key, value);
    }
  });

  if (children) {
    if (Array.isArray(children)) {
      element.append(...children);
    } else if (children instanceof Element) {
      element.appendChild(children);
    } else {
      element.textContent = String(children);
    }
  }

  return enhanceElement(element);
}
