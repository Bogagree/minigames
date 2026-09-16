const root: HTMLElement | null = document.querySelector('#app');

if (root === null) {
  throw new Error('Root element #app is missing');
}
