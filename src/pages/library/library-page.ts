import type { ChromeContext } from '../../app/navigation';
import { createHeader } from '../../components/header/header';
import { createFooter } from '../../components/footer/footer';
import './library-page.scss';

export function createLibraryPage(context: ChromeContext): HTMLElement {
  const page: HTMLElement = document.createElement('div');
  page.className = 'library-page';

  const main: HTMLElement = document.createElement('main');
  main.className = 'library-page__main';
  main.id = 'main-content';

  const title: HTMLHeadingElement = document.createElement('h1');
  title.className = 'library-page__title';
  title.textContent = 'Library';
  main.append(title);

  page.append(createHeader(context), main, createFooter(context));

  return page;
}
