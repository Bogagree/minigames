import logoMarkUrl from '../../assets/icons/logo-mark.png';
import shareIconUrl from '../../assets/icons/share.svg';
import chatIconUrl from '../../assets/icons/chat.svg';
import rssIconUrl from '../../assets/icons/rss-feed.svg';
import githubIconUrl from '../../assets/icons/github-icon.svg';
import rsLogoUrl from '../../assets/icons/rs-logo-container.svg';
import {
  bindInAppNavigation,
  destinationForLabel,
  isCurrentNavLabel,
  type ChromeContext,
} from '../../app/navigation';
import './footer.scss';
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

function createInAppLink(
  label: string,
  className: string,
  context: ChromeContext,
  isCurrent: boolean,
): HTMLAnchorElement {
  const link: HTMLAnchorElement = document.createElement('a');
  link.className = className;
  link.textContent = label;
  bindInAppNavigation(link, destinationForLabel(label), context);

  if (isCurrent) {
    link.setAttribute('aria-current', 'page');
  }

  return link;
}

function createNavGroup(
  title: string,
  labels: ReadonlyArray<string>,
  context: ChromeContext,
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
      createInAppLink(
        label,
        'footer__link',
        context,
        title === 'Explore' && isCurrentNavLabel(label, context.page),
      ),
    );
    list.append(item);
  }

  nav.append(heading, list);
  return nav;
}

function createBrand(context: ChromeContext): HTMLElement {
  const brand: HTMLAnchorElement = document.createElement('a');
  brand.className = 'footer__brand';
  brand.setAttribute('aria-label', 'MiniGames home');
  bindInAppNavigation(brand, 'home', context);

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

function createSocials(context: ChromeContext): HTMLElement {
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
    link.setAttribute('aria-label', social.label);
    bindInAppNavigation(link, 'home', context);

    const icon: HTMLImageElement = document.createElement('img');
    icon.className = 'footer__social-icon';
    icon.src = social.iconUrl;
    icon.alt = '';
    icon.width = 40;
    icon.height = 40;
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

  const mark: HTMLImageElement = document.createElement('img');
  mark.className = 'footer__rs-logo';
  mark.src = rsLogoUrl;
  mark.alt = '';
  mark.width = 24;
  mark.height = 24;
  mark.setAttribute('aria-hidden', 'true');

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
  icon.src = githubIconUrl;
  icon.alt = '';
  icon.width = 24;
  icon.height = 24;
  iconWrap.append(icon);

  const text: HTMLSpanElement = document.createElement('span');
  text.textContent = GITHUB_LABEL;

  link.append(iconWrap, text);
  return link;
}

export function createFooter(context: ChromeContext): HTMLElement {
  const footer: HTMLElement = document.createElement('footer');
  footer.className = 'footer';

  const top: HTMLDivElement = document.createElement('div');
  top.className = 'footer__top';

  const brandBlock: HTMLDivElement = document.createElement('div');
  brandBlock.className = 'footer__brand-block';

  const tagline: HTMLParagraphElement = document.createElement('p');
  tagline.className = 'footer__tagline';
  tagline.textContent = TAGLINE;

  brandBlock.append(createBrand(context), tagline);

  const groups: HTMLDivElement = document.createElement('div');
  groups.className = 'footer__nav-groups';
  groups.append(
    createNavGroup('Explore', EXPLORE_LINKS, context),
    createNavGroup('Company', COMPANY_LINKS, context),
    createSocials(context),
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
