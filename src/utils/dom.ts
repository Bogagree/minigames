export function requireElement(selector: string): HTMLElement {
  const element: HTMLElement | null = document.querySelector(selector);

  if (element === null) {
    throw new Error(`Element ${selector} is missing`);
  }

  return element;
}
