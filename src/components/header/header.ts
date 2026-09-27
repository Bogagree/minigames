import logoMarkUrl from '../../assets/icons/logo-mark.png';
import burgerIconUrl from '../../assets/icons/burger.svg';
import closeIconUrl from '../../assets/icons/close.svg';
import {
  bindInAppNavigation,
  destinationForLabel,
  isCurrentNavLabel,
  type ChromeContext,
} from '../../app/navigation';
import {
  createBurgerMenu,
  type BurgerMenuController,
} from '../burger-menu/burger-menu';
import { openAuthDialog } from '../dialogs/auth-dialog/auth-dialog';
import { releaseOnDisconnect } from '../../utils/dom';
import './header.scss';

const NAV_LINKS: ReadonlyArray<string> = [
  'Home',
  'Library',
  'Tournaments',
  'Community',
];

const DESKTOP_MEDIA_QUERY = '(min-width: 1920px)';

function createBrand(context: ChromeContext): HTMLElement {
  const brand: HTMLAnchorElement = document.createElement('a');
  brand.className = 'header__brand';
  brand.setAttribute('aria-label', 'MiniGames home');
  bindInAppNavigation(brand, 'home', context);

  const logo: HTMLImageElement = document.createElement('img');
  logo.className = 'header__logo';
  logo.src = logoMarkUrl;
  logo.alt = '';
  logo.width = 32;
  logo.height = 32;

  const title: HTMLSpanElement = document.createElement('span');
  title.className = 'header__title';
  title.textContent = 'MiniGames';

  brand.append(logo, title);
  return brand;
}

function createNav(context: ChromeContext): HTMLElement {
  const nav: HTMLElement = document.createElement('nav');
  nav.className = 'header__nav';
  nav.setAttribute('aria-label', 'Primary');

  const list: HTMLUListElement = document.createElement('ul');
  list.className = 'header__nav-list';

  for (const label of NAV_LINKS) {
    const listItem: HTMLLIElement = document.createElement('li');
    listItem.className = 'header__nav-item';

    const isCurrent: boolean = isCurrentNavLabel(label, context.page);
    const link: HTMLAnchorElement = document.createElement('a');
    link.className = isCurrent
      ? 'header__nav-link header__nav-link--current'
      : 'header__nav-link';
    link.textContent = label;
    bindInAppNavigation(link, destinationForLabel(label), context);

    if (isCurrent) {
      link.setAttribute('aria-current', 'page');
    }

    listItem.append(link);
    list.append(listItem);
  }

  nav.append(list);
  return nav;
}

function createAuthButton(
  label: string,
  modifier: 'outline' | 'primary',
  mode: 'login' | 'register',
): HTMLButtonElement {
  const button: HTMLButtonElement = document.createElement('button');
  button.type = 'button';
  button.className = `header__button header__button--${modifier}`;
  button.textContent = label;
  button.addEventListener('click', () => {
    openAuthDialog(mode);
  });
  return button;
}

function createBurgerButton(menu: BurgerMenuController): HTMLButtonElement {
  const button: HTMLButtonElement = document.createElement('button');
  button.type = 'button';
  button.className = 'header__burger';
  button.setAttribute('aria-label', 'Open menu');
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-controls', 'burger-menu');

  const burgerIcon: HTMLImageElement = document.createElement('img');
  burgerIcon.className = 'header__burger-icon header__burger-icon--burger';
  burgerIcon.src = burgerIconUrl;
  burgerIcon.alt = '';
  burgerIcon.width = 32;
  burgerIcon.height = 32;

  const closeIcon: HTMLImageElement = document.createElement('img');
  closeIcon.className = 'header__burger-icon header__burger-icon--close';
  closeIcon.src = closeIconUrl;
  closeIcon.alt = '';
  closeIcon.width = 32;
  closeIcon.height = 32;
  closeIcon.setAttribute('aria-hidden', 'true');

  button.append(burgerIcon, closeIcon);

  button.addEventListener('click', () => {
    menu.toggle();
  });

  return button;
}

function syncBurgerButton(button: HTMLButtonElement, isOpen: boolean): void {
  button.classList.toggle('header__burger--open', isOpen);
  button.setAttribute('aria-expanded', String(isOpen));
  button.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
}

function bindBurgerButtonState(
  button: HTMLButtonElement,
  menu: BurgerMenuController,
): void {
  const openMenu = menu.open.bind(menu);
  const closeMenu = menu.close.bind(menu);

  menu.open = (): void => {
    openMenu();
    syncBurgerButton(button, true);
  };

  menu.close = (): void => {
    closeMenu();
    syncBurgerButton(button, false);
  };

  menu.toggle = (): void => {
    if (menu.isOpen()) {
      menu.close();
    } else {
      menu.open();
    }
  };
}

export function createHeader(context: ChromeContext): HTMLElement {
  const header: HTMLElement = document.createElement('header');
  header.className = 'header';

  const actions: HTMLDivElement = document.createElement('div');
  actions.className = 'header__actions';

  const buttons: HTMLDivElement = document.createElement('div');
  buttons.className = 'header__buttons';
  buttons.append(
    createAuthButton('Log In', 'outline', 'login'),
    createAuthButton('Sign Up', 'primary', 'register'),
  );

  const menu: BurgerMenuController = createBurgerMenu(context);
  menu.element.id = 'burger-menu';

  const burgerButton: HTMLButtonElement = createBurgerButton(menu);
  bindBurgerButtonState(burgerButton, menu);

  const desktopMedia: MediaQueryList =
    globalThis.matchMedia(DESKTOP_MEDIA_QUERY);

  const onDesktopChange = (event: MediaQueryListEvent): void => {
    if (event.matches && menu.isOpen()) {
      menu.close();
    }
  };

  desktopMedia.addEventListener('change', onDesktopChange);
  releaseOnDisconnect(header, () => {
    desktopMedia.removeEventListener('change', onDesktopChange);
  });

  actions.append(createNav(context), buttons, burgerButton);
  header.append(createBrand(context), actions, menu.element);

  return header;
}
