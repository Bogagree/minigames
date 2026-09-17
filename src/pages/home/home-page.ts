import './home-page.scss';

export function createHomePage(): HTMLElement {
  const page: HTMLElement = document.createElement('main');
  page.className = 'home-page';

  const title: HTMLHeadingElement = document.createElement('h1');
  title.className = 'home-page__title';
  title.textContent = 'MiniGames';
  page.append(title);

  return page;
}
