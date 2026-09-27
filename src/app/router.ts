import type { AppPage, ChromeContext, Navigate } from './navigation';

export type { AppPage, ChromeContext, Navigate } from './navigation';

export interface Route {
  path: AppPage;
  createPage: (context: ChromeContext) => HTMLElement;
}

export interface Router {
  render: (root: HTMLElement) => void;
  navigate: Navigate;
}

export function createRouter(routes: Route[], fallbackPath: AppPage): Router {
  const fallbackRoute: Route | undefined = routes.find((route: Route) => {
    return route.path === fallbackPath;
  });

  if (fallbackRoute === undefined) {
    throw new Error(`Route ${fallbackPath} is not registered`);
  }

  let root: HTMLElement | undefined;
  let currentPage: AppPage = fallbackPath;

  const navigate: Navigate = (page: AppPage): void => {
    if (root === undefined) {
      return;
    }

    const route: Route =
      routes.find((item: Route) => {
        return item.path === page;
      }) ?? fallbackRoute;

    const isSamePage: boolean =
      route.path === currentPage && root.childElementCount > 0;

    currentPage = route.path;

    if (isSamePage) {
      return;
    }

    root.replaceChildren(
      route.createPage({
        page: currentPage,
        navigate,
      }),
    );
    globalThis.scrollTo(0, 0);
  };

  return {
    navigate,
    render(rootElement: HTMLElement): void {
      root = rootElement;
      navigate(currentPage);
    },
  };
}
