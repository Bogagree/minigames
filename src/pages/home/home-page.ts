import './home-page.scss';

export function createHomePage(): HTMLElement {
  const page: HTMLElement = document.createElement('main');
  page.className = 'home-page';
  return page;
}
