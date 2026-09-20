import { createHeader } from '../../components/header/header';
import { createHero } from '../../components/hero/hero';
import { createSlider } from '../../components/slider/slider';
import { createLeaderboard } from '../../components/leaderboard/leaderboard';
import { createGameDeveloper } from '../../components/game-dev/game-developer';
import { createFooter } from '../../components/footer/footer';
import './home-page.scss';

export function createHomePage(): HTMLElement {
  const page: HTMLElement = document.createElement('div');
  page.className = 'home-page';

  const main: HTMLElement = document.createElement('main');
  main.className = 'home-page__main';
  main.setAttribute('id', 'main-content');

  const title: HTMLHeadingElement = document.createElement('h1');
  title.className = 'home-page__title';
  title.textContent = 'MiniGames';
  main.append(
    title,
    createHero(),
    createSlider(),
    createLeaderboard(),
    createGameDeveloper(),
  );

  page.append(createHeader(), main, createFooter());

  return page;
}
