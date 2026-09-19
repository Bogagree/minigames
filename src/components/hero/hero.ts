import heroBannerUrl from '../../assets/images/hero-banner.jpg';
import './hero.scss';

const TITLE = 'Take a Short Break & Have Fun';

const TEXT_COMPACT =
  'Discover hundreds of curated casual mini-games right in your browser.';

const TEXT_FULL =
  'Discover hundreds of curated casual mini-games. Play instantly in your browser — puzzle, match 3, farm, and board classics.';

export function createHero(): HTMLElement {
  const section: HTMLElement = document.createElement('section');
  section.className = 'hero';
  section.setAttribute('aria-labelledby', 'hero-title');

  const banner: HTMLImageElement = document.createElement('img');
  banner.className = 'hero__banner';
  banner.src = heroBannerUrl;
  banner.alt = '';
  banner.setAttribute('aria-hidden', 'true');

  const content: HTMLDivElement = document.createElement('div');
  content.className = 'hero__content';

  const title: HTMLHeadingElement = document.createElement('h2');
  title.className = 'hero__title';
  title.id = 'hero-title';
  title.textContent = TITLE;

  const textCompact: HTMLParagraphElement = document.createElement('p');
  textCompact.className = 'hero__text hero__text--compact';
  textCompact.textContent = TEXT_COMPACT;

  const textFull: HTMLParagraphElement = document.createElement('p');
  textFull.className = 'hero__text hero__text--full';
  textFull.textContent = TEXT_FULL;

  const button: HTMLButtonElement = document.createElement('button');
  button.type = 'button';
  button.className = 'hero__button';
  button.textContent = 'Browse Library';

  content.append(title, textCompact, textFull, button);
  section.append(banner, content);

  return section;
}
