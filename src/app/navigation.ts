export type AppPage = 'home' | 'library';

export type Navigate = (page: AppPage) => void;

export type ChromeContext = {
  page: AppPage;
  navigate: Navigate;
};

const HOME_LABEL = 'Home';
const LIBRARY_LABEL = 'Library';

export function destinationForLabel(label: string): AppPage {
  return label === LIBRARY_LABEL ? 'library' : 'home';
}

export function isCurrentNavLabel(label: string, page: AppPage): boolean {
  const currentLabel: string = page === 'library' ? LIBRARY_LABEL : HOME_LABEL;

  return label === currentLabel;
}

export function bindInAppNavigation(
  link: HTMLAnchorElement,
  destination: AppPage,
  context: ChromeContext,
  beforeNavigate?: () => void,
): void {
  link.href = import.meta.env.BASE_URL;

  link.addEventListener('click', (event: MouseEvent) => {
    event.preventDefault();

    if (beforeNavigate !== undefined) {
      beforeNavigate();
    }

    if (destination !== context.page) {
      context.navigate(destination);
    }
  });
}
