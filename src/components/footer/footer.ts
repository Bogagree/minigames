import logoMarkUrl from '../../assets/icons/logo-mark.png';
import shareIconUrl from '../../assets/icons/share.svg';
import chatIconUrl from '../../assets/icons/chat.svg';
import rssIconUrl from '../../assets/icons/rss-feed.svg';
import codeIconUrl from '../../assets/icons/code.svg';
import './footer.scss';

const HOME_HREF = import.meta.env.BASE_URL;
const RS_SCHOOL_HREF = 'https://rs.school/';
const GITHUB_HREF = 'https://github.com/Bogagree';
const GITHUB_LABEL = '@Bogagree';

const TAGLINE =
  'Take a short break and have fun. Hundreds of curated casual mini-games right in your web browser. No download required.';

const EXPLORE_LINKS: ReadonlyArray<string> = [
  'Home',
  'Library',
  'Categories',
  'Tournaments',
];

const COMPANY_LINKS: ReadonlyArray<string> = [
  'About Us',
  'Contact',
  'Privacy Policy',
  'Terms of Service',
];

const SOCIAL_LINKS: ReadonlyArray<{
  label: string;
  iconUrl: string;
}> = [
  { label: 'Share', iconUrl: shareIconUrl },
  { label: 'Chat', iconUrl: chatIconUrl },
  { label: 'RSS feed', iconUrl: rssIconUrl },
];

function createHomeLink(
  label: string,
  className: string,
  isCurrent = false,
): HTMLAnchorElement {
  const link: HTMLAnchorElement = document.createElement('a');
  link.className = className;
  link.href = HOME_HREF;
  link.textContent = label;

  if (isCurrent) {
    link.setAttribute('aria-current', 'page');
  }

  return link;
}

function createNavGroup(
  title: string,
  labels: ReadonlyArray<string>,
): HTMLElement {
  const nav: HTMLElement = document.createElement('nav');
  nav.className = 'footer__group';
  nav.setAttribute('aria-label', title);

  const heading: HTMLHeadingElement = document.createElement('h2');
  heading.className = 'footer__group-title';
  heading.textContent = title;

  const list: HTMLUListElement = document.createElement('ul');
  list.className = 'footer__list';

  for (const label of labels) {
    const item: HTMLLIElement = document.createElement('li');
    item.className = 'footer__item';
    item.append(
      createHomeLink(
        label,
        'footer__link',
        title === 'Explore' && label === 'Home',
      ),
    );
    list.append(item);
  }

  nav.append(heading, list);
  return nav;
}

function createBrand(): HTMLElement {
  const brand: HTMLAnchorElement = document.createElement('a');
  brand.className = 'footer__brand';
  brand.href = HOME_HREF;
  brand.setAttribute('aria-label', 'MiniGames home');

  const logo: HTMLImageElement = document.createElement('img');
  logo.className = 'footer__logo';
  logo.src = logoMarkUrl;
  logo.alt = '';
  logo.width = 32;
  logo.height = 32;

  const title: HTMLSpanElement = document.createElement('span');
  title.className = 'footer__title';
  title.textContent = 'MiniGames';

  brand.append(logo, title);
  return brand;
}

function createSocials(): HTMLElement {
  const group: HTMLDivElement = document.createElement('div');
  group.className = 'footer__group footer__group--community';

  const heading: HTMLHeadingElement = document.createElement('h2');
  heading.className = 'footer__group-title';
  heading.id = 'footer-community-title';
  heading.textContent = 'Community';

  const list: HTMLUListElement = document.createElement('ul');
  list.className = 'footer__socials';
  list.setAttribute('aria-labelledby', 'footer-community-title');

  for (const social of SOCIAL_LINKS) {
    const item: HTMLLIElement = document.createElement('li');
    item.className = 'footer__social-item';

    const link: HTMLAnchorElement = document.createElement('a');
    link.className = 'footer__social';
    link.href = HOME_HREF;
    link.setAttribute('aria-label', social.label);

    const icon: HTMLImageElement = document.createElement('img');
    icon.className = 'footer__social-icon';
    icon.src = social.iconUrl;
    icon.alt = '';
    icon.width = 20;
    icon.height = 20;
    icon.setAttribute('aria-hidden', 'true');

    link.append(icon);
    item.append(link);
    list.append(item);
  }

  group.append(heading, list);
  return group;
}

function createRsSchoolLink(): HTMLAnchorElement {
  const link: HTMLAnchorElement = document.createElement('a');
  link.className = 'footer__credit-link';
  link.href = RS_SCHOOL_HREF;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.setAttribute('aria-label', 'RS School');

  const mark: HTMLSpanElement = document.createElement('span');
  mark.className = 'footer__rs-logo';
  mark.setAttribute('aria-hidden', 'true');
  mark.textContent = 'RS';

  const text: HTMLSpanElement = document.createElement('span');
  text.textContent = 'RS School';

  link.append(mark, text);
  return link;
}

function createGithubLink(): HTMLAnchorElement {
  const link: HTMLAnchorElement = document.createElement('a');
  link.className = 'footer__credit-link';
  link.href = GITHUB_HREF;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.setAttribute('aria-label', `GitHub ${GITHUB_LABEL}`);

  const iconWrap: HTMLSpanElement = document.createElement('span');
  iconWrap.className = 'footer__github-icon';
  iconWrap.setAttribute('aria-hidden', 'true');

  const icon: HTMLImageElement = document.createElement('img');
  icon.src = codeIconUrl;
  icon.alt = '';
  icon.width = 16;
  icon.height = 16;

  iconWrap.append(icon);

  const text: HTMLSpanElement = document.createElement('span');
  text.textContent = GITHUB_LABEL;

  link.append(iconWrap, text);
  return link;
}

export function createFooter(): HTMLElement {
  const footer: HTMLElement = document.createElement('footer');
  footer.className = 'footer';

  const top: HTMLDivElement = document.createElement('div');
  top.className = 'footer__top';

  const brandBlock: HTMLDivElement = document.createElement('div');
  brandBlock.className = 'footer__brand-block';

  const tagline: HTMLParagraphElement = document.createElement('p');
  tagline.className = 'footer__tagline';
  tagline.textContent = TAGLINE;

  brandBlock.append(createBrand(), tagline);

  const groups: HTMLDivElement = document.createElement('div');
  groups.className = 'footer__nav-groups';
  groups.append(
    createNavGroup('Explore', EXPLORE_LINKS),
    createNavGroup('Company', COMPANY_LINKS),
    createSocials(),
  );

  top.append(brandBlock, groups);

  const bottom: HTMLDivElement = document.createElement('div');
  bottom.className = 'footer__bottom';

  const copyright: HTMLParagraphElement = document.createElement('p');
  copyright.className = 'footer__copyright';
  copyright.textContent = '© 2026 MiniGames. All rights reserved.';

  const love: HTMLParagraphElement = document.createElement('p');
  love.className = 'footer__love';
  love.textContent = 'Designed with love';

  const credits: HTMLDivElement = document.createElement('div');
  credits.className = 'footer__credits';
  credits.append(createRsSchoolLink(), createGithubLink());

  bottom.append(copyright, credits, love);

  footer.append(top, bottom);
  return footer;
}
