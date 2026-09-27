import { createRouter, type Router } from './router';
import { createHomePage } from '../pages/home/home-page';
import { createLibraryPage } from '../pages/library/library-page';
import '../styles/globals.scss';

const root: HTMLElement = document.createElement('div');
root.id = 'app';
document.body.append(root);

const router: Router = createRouter(
  [
    {
      path: 'home',
      createPage: createHomePage,
    },
    {
      path: 'library',
      createPage: createLibraryPage,
    },
  ],
  'home',
);

router.render(root);
