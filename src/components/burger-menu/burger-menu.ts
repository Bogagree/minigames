import logoMarkUrl from '../../assets/icons/logo-mark.png';
import closeIconUrl from '../../assets/icons/close.svg';
import {
  bindInAppNavigation,
  destinationForLabel,
  isCurrentNavLabel,
  type ChromeContext,
} from '../../app/navigation';
import { openAuthDialog } from '../dialogs/auth-dialog/auth-dialog';
import { releaseOnDisconnect } from '../../utils/dom';
import './burger-menu.scss';

const NAV_LINKS: ReadonlyArray<string> = [
  'Home',
  'Library',
  'Tournaments',
  'Community',
];

const OPEN_CLASS = 'burger-menu--open';
const BODY_OPEN_CLASS = 'is-burger-menu-open';

export type BurgerMenuController = {
  element: HTMLElement;
  open: () => void;
  close: () => void;
  toggle: () => void;
  isOpen: () => boolean;
};

function createBrand(
  context: ChromeContext,
  beforeNavigate: () => void,
): HTMLElement {
  const brand: HTMLAnchorElement = document.createElement('a');
  brand.className = 'burger-menu__brand';
  brand.setAttribute('aria-label', 'MiniGames home');
  bindInAppNavigation(brand, 'home', context, beforeNavigate);

  const logo: HTMLImageElement = document.createElement('img');
  logo.className = 'burger-menu__logo';
  logo.src = logoMarkUrl;
  logo.alt = '';
  logo.width = 32;
  logo.height = 32;

  const title: HTMLSpanElement = document.createElement('span');
  title.className = 'burger-menu__title';
  title.textContent = 'MiniGames';

  brand.append(logo, title);
  return brand;
}

function createCloseButton(onClose: () => void): HTMLButtonElement {
  const button: HTMLButtonElement = document.createElement('button');
  button.type = 'button';
  button.className = 'burger-menu__close';
  button.setAttribute('aria-label', 'Close menu');

  const icon: HTMLImageElement = document.createElement('img');
  icon.className = 'burger-menu__close-icon';
  icon.src = closeIconUrl;
  icon.alt = '';
  icon.width = 32;
  icon.height = 32;

  button.append(icon);
  button.addEventListener('click', onClose);
  return button;
}

function createNav(
  context: ChromeContext,
  beforeNavigate: () => void,
): HTMLElement {
  const nav: HTMLElement = document.createElement('nav');
  nav.className = 'burger-menu__nav';
  nav.setAttribute('aria-label', 'Mobile');

  const list: HTMLUListElement = document.createElement('ul');
  list.className = 'burger-menu__nav-list';

  for (const label of NAV_LINKS) {
    const listItem: HTMLLIElement = document.createElement('li');
    listItem.className = 'burger-menu__nav-item';

    const isCurrent: boolean = isCurrentNavLabel(label, context.page);
    const link: HTMLAnchorElement = document.createElement('a');
    link.className = isCurrent
      ? 'burger-menu__nav-link burger-menu__nav-link--current'
      : 'burger-menu__nav-link';
    link.textContent = label;
    bindInAppNavigation(
      link,
      destinationForLabel(label),
      context,
      beforeNavigate,
    );

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
  onOpenAuth: () => void,
): HTMLButtonElement {
  const button: HTMLButtonElement = document.createElement('button');
  button.type = 'button';
  button.className = `burger-menu__button burger-menu__button--${modifier}`;
  button.textContent = label;
  button.addEventListener('click', () => {
    onOpenAuth();
    openAuthDialog(mode);
  });
  return button;
}

export function createBurgerMenu(context: ChromeContext): BurgerMenuController {
  const menu: HTMLElement = document.createElement('div');
  menu.className = 'burger-menu';
  menu.setAttribute('role', 'dialog');
  menu.setAttribute('aria-modal', 'true');
  menu.setAttribute('aria-label', 'Mobile navigation');
  menu.hidden = true;

  const panel: HTMLElement = document.createElement('div');
  panel.className = 'burger-menu__panel';

  const header: HTMLDivElement = document.createElement('div');
  header.className = 'burger-menu__header';

  const actions: HTMLDivElement = document.createElement('div');
  actions.className = 'burger-menu__actions';

  const controller: BurgerMenuController = {
    element: menu,
    isOpen: () => menu.classList.contains(OPEN_CLASS),
    open: () => {
      if (controller.isOpen()) {
        return;
      }

      menu.hidden = false;
      document.documentElement.classList.add(BODY_OPEN_CLASS);
      document.body.classList.add(BODY_OPEN_CLASS);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          menu.classList.add(OPEN_CLASS);
        });
      });
    },
    close: () => {
      if (!controller.isOpen()) {
        return;
      }

      menu.classList.remove(OPEN_CLASS);
      document.documentElement.classList.remove(BODY_OPEN_CLASS);
      document.body.classList.remove(BODY_OPEN_CLASS);
    },
    toggle: () => {
      if (controller.isOpen()) {
        controller.close();
      } else {
        controller.open();
      }
    },
  };

  const closeMenu = (): void => {
    controller.close();
    document.documentElement.classList.remove(BODY_OPEN_CLASS);
    document.body.classList.remove(BODY_OPEN_CLASS);
  };

  header.append(createBrand(context, closeMenu), createCloseButton(closeMenu));
  actions.append(
    createAuthButton('Log In', 'outline', 'login', () => {
      controller.close();
    }),
    createAuthButton('Sign Up', 'primary', 'register', () => {
      controller.close();
    }),
  );
  panel.append(header, createNav(context, closeMenu), actions);
  menu.append(panel);

  menu.addEventListener('transitionend', (event: TransitionEvent) => {
    if (event.target !== menu || event.propertyName !== 'transform') {
      return;
    }

    if (!controller.isOpen()) {
      menu.hidden = true;
    }
  });

  const onKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && controller.isOpen()) {
      controller.close();
    }
  };

  document.addEventListener('keydown', onKeyDown);
  releaseOnDisconnect(menu, () => {
    document.removeEventListener('keydown', onKeyDown);
  });

  return controller;
}
