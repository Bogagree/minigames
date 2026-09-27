import type { ChromeContext } from '../../app/navigation';
import { createHeader } from '../../components/header/header';
import { createFooter } from '../../components/footer/footer';
import { createLibraryFilters } from '../../components/library-filters/library-filters';
import './library-page.scss';

export function createLibraryPage(context: ChromeContext): HTMLElement {
  const page: HTMLElement = document.createElement('div');
  page.className = 'library-page';

  const main: HTMLElement = document.createElement('main');
  main.className = 'library-page__main';
  main.id = 'main-content';
  main.append(createLibraryFilters());

  page.append(createHeader(context), main, createFooter(context));

  return page;
}
