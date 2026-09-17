import logoMarkUrl from '../../assets/icons/logo-mark.png';
import burgerIconUrl from '../../assets/icons/burger.svg';
import { openAuthDialog } from '../dialogs/auth-dialog/auth-dialog';
import './header.scss';

const NAV_LINKS: ReadonlyArray<{ label: string; isCurrent: boolean }> = [
  { label: 'Home', isCurrent: true },
  { label: 'Library', isCurrent: false },
  { label: 'Tournaments', isCurrent: false },
  { label: 'Community', isCurrent: false },
];

function createBrand(): HTMLElement {
  const brand: HTMLAnchorElement = document.createElement('a');
  brand.className = 'header__brand';
  brand.href = import.meta.env.BASE_URL;
  brand.setAttribute('aria-label', 'MiniGames home');

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

function createNav(): HTMLElement {
  const nav: HTMLElement = document.createElement('nav');
  nav.className = 'header__nav';
  nav.setAttribute('aria-label', 'Primary');

  const list: HTMLUListElement = document.createElement('ul');
  list.className = 'header__nav-list';

  for (const item of NAV_LINKS) {
    const listItem: HTMLLIElement = document.createElement('li');
    listItem.className = 'header__nav-item';

    const link: HTMLAnchorElement = document.createElement('a');
    link.className = item.isCurrent
      ? 'header__nav-link header__nav-link--current'
      : 'header__nav-link';
    link.href = import.meta.env.BASE_URL;
    link.textContent = item.label;

    if (item.isCurrent) {
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

function createBurgerButton(): HTMLButtonElement {
  const button: HTMLButtonElement = document.createElement('button');
  button.type = 'button';
  button.className = 'header__burger';
  button.setAttribute('aria-label', 'Open menu');

  const icon: HTMLImageElement = document.createElement('img');
  icon.className = 'header__burger-icon';
  icon.src = burgerIconUrl;
  icon.alt = '';
  icon.width = 32;
  icon.height = 32;

  button.append(icon);
  return button;
}

export function createHeader(): HTMLElement {
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

  actions.append(createNav(), buttons, createBurgerButton());
  header.append(createBrand(), actions);

  return header;
}
