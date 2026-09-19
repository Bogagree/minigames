import illustrationUrl from '../../assets/images/game-developer-illustration.svg';
import uploadIconUrl from '../../assets/icons/upload.svg';
import './game-developer.scss';

const TITLE = 'Are You a Game Developer?';
const DESCRIPTION =
  "Want to see your game on MiniGames? We're always looking for fun, engaging mini games to add to our platform. Submit your game and reach thousands of players!";
const CONTACT_PREFIX = 'or contact us at ';
const CONTACT_EMAIL = 'developers@minigames.com';

export function createGameDeveloper(): HTMLElement {
  const section: HTMLElement = document.createElement('section');
  section.className = 'game-developer';
  section.setAttribute('aria-labelledby', 'game-developer-title');

  const illustration: HTMLImageElement = document.createElement('img');
  illustration.className = 'game-developer__illustration';
  illustration.src = illustrationUrl;
  illustration.alt = '';
  illustration.setAttribute('aria-hidden', 'true');
  illustration.width = 682;
  illustration.height = 483;

  const card: HTMLDivElement = document.createElement('div');
  card.className = 'game-developer__card';

  const title: HTMLHeadingElement = document.createElement('h2');
  title.className = 'game-developer__title';
  title.id = 'game-developer-title';
  title.textContent = TITLE;

  const text: HTMLParagraphElement = document.createElement('p');
  text.className = 'game-developer__text';
  text.textContent = DESCRIPTION;

  const button: HTMLButtonElement = document.createElement('button');
  button.type = 'button';
  button.className = 'game-developer__button';

  const icon: HTMLImageElement = document.createElement('img');
  icon.className = 'game-developer__button-icon';
  icon.src = uploadIconUrl;
  icon.alt = '';
  icon.width = 24;
  icon.height = 24;
  icon.setAttribute('aria-hidden', 'true');

  const buttonLabel: HTMLSpanElement = document.createElement('span');
  buttonLabel.textContent = 'Submit Form';

  button.append(icon, buttonLabel);

  const contact: HTMLParagraphElement = document.createElement('p');
  contact.className = 'game-developer__contact';

  const prefix: HTMLSpanElement = document.createElement('span');
  prefix.textContent = CONTACT_PREFIX;

  const email: HTMLAnchorElement = document.createElement('a');
  email.className = 'game-developer__email';
  email.href = `mailto:${CONTACT_EMAIL}`;
  email.textContent = CONTACT_EMAIL;

  contact.append(prefix, email);
  card.append(title, text, button, contact);
  section.append(illustration, card);

  return section;
}
