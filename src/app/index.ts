import { createRouter, type Router } from './router';
import { createHomePage } from '../pages/home/home-page';
import '../styles/globals.scss';

const root: HTMLElement = document.createElement('div');
root.id = 'app';
document.body.prepend(root);

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
