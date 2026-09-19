import './auth-dialog.scss';

export type AuthDialogMode = 'login' | 'register';

const authDialogState: { element?: HTMLDialogElement } = {};

function ensureAuthDialog(): HTMLDialogElement {
  if (authDialogState.element !== undefined) {
    return authDialogState.element;
  }

  const dialog: HTMLDialogElement = document.createElement('dialog');
  dialog.className = 'auth-dialog';
  dialog.setAttribute('aria-labelledby', 'auth-dialog-title');

  const title: HTMLHeadingElement = document.createElement('h2');
  title.id = 'auth-dialog-title';
  title.className = 'auth-dialog__title';
  title.textContent = 'Authentication';

  const closeButton: HTMLButtonElement = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'auth-dialog__close';
  closeButton.textContent = 'Close';
  closeButton.addEventListener('click', () => {
    dialog.close();
  });

  dialog.append(title, closeButton);
  document.body.append(dialog);
  authDialogState.element = dialog;

  return dialog;
}

export function openAuthDialog(mode: AuthDialogMode = 'login'): void {
  const dialog: HTMLDialogElement = ensureAuthDialog();
  const title: HTMLHeadingElement | null =
    dialog.querySelector('#auth-dialog-title');

  if (title instanceof HTMLHeadingElement) {
    title.textContent = mode === 'login' ? 'Log In' : 'Sign Up';
  }

  if (!dialog.open) {
    dialog.showModal();
  }
}
