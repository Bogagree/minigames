import closeIconUrl from '../../../assets/icons/close.svg';
import './auth-dialog.scss';

export type AuthDialogMode = 'login' | 'register';

const OPEN_CLASS = 'auth-dialog--open';
const BODY_OPEN_CLASS = 'is-auth-dialog-open';
const PANEL_ACTIVE_CLASS = 'auth-dialog__panel--active';
const TAB_ACTIVE_CLASS = 'auth-dialog__tab--active';
const CLOSE_TRANSITION_MS = 400;

type AuthDialogReferences = {
  dialog: HTMLDialogElement;
  loginTab: HTMLButtonElement;
  registerTab: HTMLButtonElement;
  loginPanel: HTMLFormElement;
  registerPanel: HTMLFormElement;
};

const authDialogState: {
  references?: AuthDialogReferences;
  mode: AuthDialogMode;
  closing: boolean;
  closeTimer?: number;
} = {
  mode: 'login',
  closing: false,
};

function createCloseButton(onClose: () => void): HTMLButtonElement {
  const button: HTMLButtonElement = document.createElement('button');
  button.type = 'button';
  button.className = 'auth-dialog__close';
  button.setAttribute('aria-label', 'Close dialog');

  const icon: HTMLImageElement = document.createElement('img');
  icon.className = 'auth-dialog__close-icon';
  icon.src = closeIconUrl;
  icon.alt = '';
  icon.width = 32;
  icon.height = 32;

  button.append(icon);
  button.addEventListener('click', onClose);
  return button;
}

function createTab(
  label: string,
  tabId: string,
  panelId: string,
  onSelect: () => void,
): HTMLButtonElement {
  const tab: HTMLButtonElement = document.createElement('button');
  tab.type = 'button';
  tab.className = 'auth-dialog__tab';
  tab.id = tabId;
  tab.setAttribute('role', 'tab');
  tab.setAttribute('aria-controls', panelId);
  tab.textContent = label;
  tab.addEventListener('click', onSelect);
  return tab;
}

function createField(options: {
  id: string;
  label: string;
  name: string;
  type: 'email' | 'password' | 'text';
  autocomplete: AutoFill;
}): HTMLElement {
  const field: HTMLDivElement = document.createElement('div');
  field.className = 'auth-dialog__field';

  const label: HTMLLabelElement = document.createElement('label');
  label.className = 'auth-dialog__label';
  label.htmlFor = options.id;
  label.textContent = options.label;

  const input: HTMLInputElement = document.createElement('input');
  input.className = 'auth-dialog__input';
  input.id = options.id;
  input.name = options.name;
  input.type = options.type;
  input.autocomplete = options.autocomplete;
  input.placeholder = options.label;

  field.append(label, input);
  return field;
}

function createSwitchHint(
  prefix: string,
  linkLabel: string,
  onSwitch: () => void,
): HTMLParagraphElement {
  const hint: HTMLParagraphElement = document.createElement('p');
  hint.className = 'auth-dialog__hint';

  const text: Text = document.createTextNode(`${prefix} `);
  const link: HTMLButtonElement = document.createElement('button');
  link.type = 'button';
  link.className = 'auth-dialog__link';
  link.textContent = linkLabel;
  link.addEventListener('click', onSwitch);

  hint.append(text, link);
  return hint;
}

function createSubmitButton(label: string): HTMLButtonElement {
  const button: HTMLButtonElement = document.createElement('button');
  button.type = 'submit';
  button.className = 'auth-dialog__submit';
  button.textContent = label;
  return button;
}

function createLoginForm(): HTMLFormElement {
  const form: HTMLFormElement = document.createElement('form');
  form.className = 'auth-dialog__panel';
  form.id = 'auth-dialog-panel-login';
  form.setAttribute('role', 'tabpanel');
  form.setAttribute('aria-labelledby', 'auth-dialog-tab-login');
  form.noValidate = true;

  form.append(
    createField({
      id: 'auth-dialog-login-email',
      label: 'Email',
      name: 'email',
      type: 'email',
      autocomplete: 'email',
    }),
    createField({
      id: 'auth-dialog-login-password',
      label: 'Password',
      name: 'password',
      type: 'password',
      autocomplete: 'current-password',
    }),
    createSubmitButton('Log In'),
    createSwitchHint("Don't have an account?", 'Register', () => {
      setAuthMode('register');
    }),
  );

  form.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault();
  });

  return form;
}

function createRegisterForm(): HTMLFormElement {
  const form: HTMLFormElement = document.createElement('form');
  form.className = 'auth-dialog__panel';
  form.id = 'auth-dialog-panel-register';
  form.setAttribute('role', 'tabpanel');
  form.setAttribute('aria-labelledby', 'auth-dialog-tab-register');
  form.noValidate = true;

  form.append(
    createField({
      id: 'auth-dialog-register-nickname',
      label: 'Nickname',
      name: 'nickname',
      type: 'text',
      autocomplete: 'username',
    }),
    createField({
      id: 'auth-dialog-register-email',
      label: 'Email',
      name: 'email',
      type: 'email',
      autocomplete: 'email',
    }),
    createField({
      id: 'auth-dialog-register-password',
      label: 'Password',
      name: 'password',
      type: 'password',
      autocomplete: 'new-password',
    }),
    createSubmitButton('Sign Up'),
    createSwitchHint('Already have an account?', 'Login', () => {
      setAuthMode('login');
    }),
  );

  form.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault();
  });

  return form;
}

function lockPageScroll(isLocked: boolean): void {
  document.documentElement.classList.toggle(BODY_OPEN_CLASS, isLocked);
  document.body.classList.toggle(BODY_OPEN_CLASS, isLocked);
}

function finishClose(dialog: HTMLDialogElement): void {
  if (dialog.open) {
    dialog.close();
  }

  lockPageScroll(false);
  authDialogState.closing = false;
  authDialogState.closeTimer = undefined;
}

function requestClose(): void {
  const references = authDialogState.references;

  if (
    references === undefined ||
    !references.dialog.open ||
    authDialogState.closing
  ) {
    return;
  }

  authDialogState.closing = true;
  references.dialog.classList.remove(OPEN_CLASS);
  lockPageScroll(false);

  globalThis.clearTimeout(authDialogState.closeTimer);
  authDialogState.closeTimer = globalThis.setTimeout(() => {
    finishClose(references.dialog);
  }, CLOSE_TRANSITION_MS);
}

function setAuthMode(mode: AuthDialogMode): void {
  const references = authDialogState.references;

  if (references === undefined) {
    return;
  }

  authDialogState.mode = mode;

  const isLogin = mode === 'login';
  references.loginTab.classList.toggle(TAB_ACTIVE_CLASS, isLogin);
  references.registerTab.classList.toggle(TAB_ACTIVE_CLASS, !isLogin);
  references.loginTab.setAttribute('aria-selected', String(isLogin));
  references.registerTab.setAttribute('aria-selected', String(!isLogin));
  references.loginTab.tabIndex = isLogin ? 0 : -1;
  references.registerTab.tabIndex = isLogin ? -1 : 0;

  references.loginPanel.classList.toggle(PANEL_ACTIVE_CLASS, isLogin);
  references.registerPanel.classList.toggle(PANEL_ACTIVE_CLASS, !isLogin);
  references.loginPanel.setAttribute('aria-hidden', String(!isLogin));
  references.registerPanel.setAttribute('aria-hidden', String(isLogin));
  references.loginPanel.inert = !isLogin;
  references.registerPanel.inert = isLogin;

  references.dialog.setAttribute(
    'aria-labelledby',
    isLogin ? references.loginTab.id : references.registerTab.id,
  );
}

function ensureAuthDialog(): AuthDialogReferences {
  if (authDialogState.references !== undefined) {
    return authDialogState.references;
  }

  const dialog: HTMLDialogElement = document.createElement('dialog');
  dialog.className = 'auth-dialog';
  dialog.setAttribute('aria-modal', 'true');

  const loginPanel = createLoginForm();
  const registerPanel = createRegisterForm();

  const loginTab = createTab(
    'Login',
    'auth-dialog-tab-login',
    loginPanel.id,
    () => {
      setAuthMode('login');
    },
  );
  const registerTab = createTab(
    'Registration',
    'auth-dialog-tab-register',
    registerPanel.id,
    () => {
      setAuthMode('register');
    },
  );

  const switcher: HTMLDivElement = document.createElement('div');
  switcher.className = 'auth-dialog__switcher';
  switcher.setAttribute('role', 'tablist');
  switcher.setAttribute('aria-label', 'Authentication mode');
  switcher.append(loginTab, registerTab);

  const panels: HTMLDivElement = document.createElement('div');
  panels.className = 'auth-dialog__panels';
  panels.append(loginPanel, registerPanel);

  dialog.append(createCloseButton(requestClose), switcher, panels);
  document.body.append(dialog);

  dialog.addEventListener('cancel', (event: Event) => {
    event.preventDefault();
    requestClose();
  });

  dialog.addEventListener('click', (event: MouseEvent) => {
    if (event.target === dialog) {
      requestClose();
    }
  });

  dialog.addEventListener('transitionend', (event: TransitionEvent) => {
    if (
      event.target !== dialog ||
      event.propertyName !== 'opacity' ||
      dialog.classList.contains(OPEN_CLASS) ||
      !dialog.open
    ) {
      return;
    }

    globalThis.clearTimeout(authDialogState.closeTimer);
    finishClose(dialog);
  });

  const references: AuthDialogReferences = {
    dialog,
    loginTab,
    registerTab,
    loginPanel,
    registerPanel,
  };
  authDialogState.references = references;
  setAuthMode('login');

  return references;
}

export function openAuthDialog(mode: AuthDialogMode = 'login'): void {
  const references = ensureAuthDialog();
  setAuthMode(mode);

  if (references.dialog.open) {
    authDialogState.closing = false;
    references.dialog.classList.add(OPEN_CLASS);
    lockPageScroll(true);
    return;
  }

  references.dialog.showModal();
  lockPageScroll(true);
  authDialogState.closing = false;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      references.dialog.classList.add(OPEN_CLASS);
    });
  });
}
