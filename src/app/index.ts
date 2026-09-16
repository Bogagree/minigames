import { createRouter, type Router } from './router';
import { createHomePage } from '../pages/home/home-page';
import { requireElement } from '../utils/dom';
import '../styles/globals.scss';

const root: HTMLElement = requireElement('#app');

const router: Router = createRouter(
  [
    {
      path: '/',
      createPage: createHomePage,
    },
  ],
  '/',
);

router.render(root);
