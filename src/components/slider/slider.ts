import arrowBackUrl from '../../assets/icons/arrow-back.svg';
import arrowForwardUrl from '../../assets/icons/arrow-forward.svg';
import favoriteIconUrl from '../../assets/icons/favorite.svg';
import starIconUrl from '../../assets/icons/star.svg';
import catMailUrl from '../../assets/images/games/cat-mail-co-card.jpg';
import heartopiaUrl from '../../assets/images/games/heartopia-card.jpg';
import shelvePotionsUrl from '../../assets/images/games/shelve-the-potions-card.jpg';
import vacationCafeUrl from '../../assets/images/games/vacation-cafe-simulator-card.jpg';
import winterBurrowUrl from '../../assets/images/games/winter-burrow-card.jpg';
import './slider.scss';

interface SliderGame {
  title: string;
  imageUrl: string;
  rating: string;
  likes: string;
  size: 'peek' | 'side' | 'featured';
}

const DESKTOP_GAMES: readonly SliderGame[] = [
  {
    title: 'Shelve the Potions!',
    imageUrl: shelvePotionsUrl,
    rating: '4.7',
    likes: '21.3K',
    size: 'peek',
  },
  {
    title: 'Winter Burrow',
    imageUrl: winterBurrowUrl,
    rating: '4.9',
    likes: '32.4K',
    size: 'side',
  },
  {
    title: 'Vacation Cafe Simulator',
    imageUrl: vacationCafeUrl,
    rating: '4.8',
    likes: '28.7K',
    size: 'featured',
  },
  {
    title: 'Heartopia',
    imageUrl: heartopiaUrl,
    rating: '4.6',
    likes: '46.8K',
    size: 'side',
  },
  {
    title: 'Cat Mail Co.',
    imageUrl: catMailUrl,
    rating: '4.9',
    likes: '38.2K',
    size: 'peek',
  },
];

const COMPACT_GAMES: readonly SliderGame[] = [
  {
    title: 'Vacation Cafe Simulator',
    imageUrl: vacationCafeUrl,
    rating: '4.8',
    likes: '28.7K',
    size: 'peek',
  },
  {
    title: 'Shelve the Potions!',
    imageUrl: shelvePotionsUrl,
    rating: '4.7',
    likes: '21.3K',
    size: 'featured',
  },
  {
    title: 'Winter Burrow',
    imageUrl: winterBurrowUrl,
    rating: '4.9',
    likes: '32.4K',
    size: 'peek',
  },
];

function createStat(
  iconUrl: string,
  value: string,
  label: string,
): HTMLSpanElement {
  const stat: HTMLSpanElement = document.createElement('span');
  stat.className = 'slider__stat';

  const icon: HTMLImageElement = document.createElement('img');
  icon.className = 'slider__stat-icon';
  icon.src = iconUrl;
  icon.alt = '';
  icon.width = 24;
  icon.height = 24;
  icon.setAttribute('aria-hidden', 'true');

  const text: HTMLSpanElement = document.createElement('span');
  text.className = 'slider__stat-value';
  text.textContent = value;

  stat.append(icon, text);
  stat.setAttribute('aria-label', `${label}: ${value}`);

  return stat;
}

function createCard(game: SliderGame): HTMLLIElement {
  const item: HTMLLIElement = document.createElement('li');
  item.className = `slider__card slider__card--${game.size}`;

  const article: HTMLElement = document.createElement('article');
  article.className = 'slider__card-inner';

  const image: HTMLImageElement = document.createElement('img');
  image.className = 'slider__image';
  image.src = game.imageUrl;
  image.alt = game.title;
  image.loading = 'lazy';
  image.decoding = 'async';

  const info: HTMLDivElement = document.createElement('div');
  info.className = 'slider__info';

  const title: HTMLHeadingElement = document.createElement('h3');
  title.className = 'slider__game-title';
  title.textContent = game.title;

  const meta: HTMLDivElement = document.createElement('div');
  meta.className = 'slider__meta';
  meta.append(
    createStat(starIconUrl, game.rating, 'Rating'),
    createStat(favoriteIconUrl, game.likes, 'Likes'),
  );

  info.append(title, meta);
  article.append(image, info);
  item.append(article);

  return item;
}

function createTrack(
  games: readonly SliderGame[],
  modifier: 'desktop' | 'compact',
): HTMLUListElement {
  const track: HTMLUListElement = document.createElement('ul');
  track.className = `slider__track slider__track--${modifier}`;

  for (const game of games) {
    track.append(createCard(game));
  }

  return track;
}

function createArrowButton(direction: 'prev' | 'next'): HTMLButtonElement {
  const button: HTMLButtonElement = document.createElement('button');
  button.type = 'button';
  button.className = 'slider__arrow';
  button.setAttribute(
    'aria-label',
    direction === 'prev' ? 'Previous games' : 'Next games',
  );

  const icon: HTMLImageElement = document.createElement('img');
  icon.className = 'slider__arrow-icon';
  icon.src = direction === 'prev' ? arrowBackUrl : arrowForwardUrl;
  icon.alt = '';
  icon.width = 24;
  icon.height = 24;
  icon.setAttribute('aria-hidden', 'true');

  button.append(icon);

  return button;
}

export function createSlider(): HTMLElement {
  const section: HTMLElement = document.createElement('section');
  section.className = 'slider';
  section.setAttribute('aria-labelledby', 'slider-title');

  const header: HTMLDivElement = document.createElement('div');
  header.className = 'slider__header';

  const heading: HTMLDivElement = document.createElement('div');
  heading.className = 'slider__heading';

  const accent: HTMLSpanElement = document.createElement('span');
  accent.className = 'slider__accent';
  accent.setAttribute('aria-hidden', 'true');

  const title: HTMLHeadingElement = document.createElement('h2');
  title.className = 'slider__title';
  title.id = 'slider-title';
  title.textContent = 'New Games';

  heading.append(accent, title);

  const controls: HTMLDivElement = document.createElement('div');
  controls.className = 'slider__controls';
  controls.append(createArrowButton('prev'), createArrowButton('next'));

  header.append(heading, controls);

  const viewport: HTMLDivElement = document.createElement('div');
  viewport.className = 'slider__viewport';
  viewport.append(
    createTrack(DESKTOP_GAMES, 'desktop'),
    createTrack(COMPACT_GAMES, 'compact'),
  );

  section.append(header, viewport);

  return section;
}
