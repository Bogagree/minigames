export interface Route {
  path: string;
  createPage: () => HTMLElement;
}

export interface Router {
  render: (root: HTMLElement) => void;
}

export function createRouter(routes: Route[], fallbackPath: string): Router {
  const fallbackRoute: Route | undefined = routes.find((route: Route) => {
    return route.path === fallbackPath;
  });

  if (fallbackRoute === undefined) {
    throw new Error(`Route ${fallbackPath} is not registered`);
  }

  return {
    render(root: HTMLElement): void {
      root.replaceChildren(fallbackRoute.createPage());
    },
  };
}
