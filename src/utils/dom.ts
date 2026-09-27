export function releaseOnDisconnect(
  element: HTMLElement,
  release: () => void,
): void {
  const observer: MutationObserver = new MutationObserver(() => {
    if (element.isConnected) {
      return;
    }

    release();
    observer.disconnect();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

export function requireElement(selector: string): HTMLElement {
  const element: HTMLElement | null = document.querySelector(selector);

  if (element === null) {
    throw new Error(`Element ${selector} is missing`);
  }

  return element;
}
