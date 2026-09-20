import closeIconUrl from '../../../assets/icons/close.svg';
import eyeOffIconUrl from '../../../assets/icons/eye-off.svg';
import eyeIconUrl from '../../../assets/icons/eye.svg';
import googleIconUrl from '../../../assets/icons/google.svg';
import lockIconUrl from '../../../assets/icons/lock.svg';
import mailIconUrl from '../../../assets/icons/mail.svg';
import userIconUrl from '../../../assets/icons/user.svg';
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
  loginPanel: HTMLDivElement;
  registerPanel: HTMLDivElement;
  loginTitle: HTMLHeadingElement;
  registerTitle: HTMLHeadingElement;
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

function createIcon(source: string, className: string): HTMLImageElement {
  const icon: HTMLImageElement = document.createElement('img');
  icon.className = className;
  icon.src = source;
  icon.alt = '';
  icon.width = 20;
  icon.height = 20;
  return icon;
}

function createCloseButton(onClose: () => void): HTMLButtonElement {
  const button: HTMLButtonElement = document.createElement('button');
  button.type = 'button';
  button.className = 'auth-dialog__close';
  button.setAttribute('aria-label', 'Close dialog');
  button.append(createIcon(closeIconUrl, 'auth-dialog__close-icon'));
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

function createIntro(
  titleId: string,
  title: string,
  subtitle: string,
): { block: HTMLDivElement; title: HTMLHeadingElement } {
  const block: HTMLDivElement = document.createElement('div');
  block.className = 'auth-dialog__intro';

  const heading: HTMLHeadingElement = document.createElement('h2');
  heading.className = 'auth-dialog__title';
  heading.id = titleId;
  heading.textContent = title;

  const text: HTMLParagraphElement = document.createElement('p');
  text.className = 'auth-dialog__subtitle';
  text.textContent = subtitle;

  block.append(heading, text);
  return { block, title: heading };
}

function bindPasswordToggle(
  input: HTMLInputElement,
  button: HTMLButtonElement,
  icon: HTMLImageElement,
): void {
  button.addEventListener('click', () => {
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    icon.src = isPassword ? eyeOffIconUrl : eyeIconUrl;
    button.setAttribute(
      'aria-label',
      isPassword ? 'Hide password' : 'Show password',
    );
    button.setAttribute('aria-pressed', String(isPassword));
  });
}

function createField(options: {
  id: string;
  label: string;
  name: string;
  type: 'email' | 'password' | 'text';
  autocomplete: AutoFill;
  placeholder: string;
  iconSrc: string;
  togglePassword?: boolean;
}): HTMLElement {
  const field: HTMLDivElement = document.createElement('div');
  field.className = 'auth-dialog__field';

  const label: HTMLLabelElement = document.createElement('label');
  label.className = 'auth-dialog__label';
  label.htmlFor = options.id;
  label.textContent = options.label;

  const control: HTMLDivElement = document.createElement('div');
  control.className = 'auth-dialog__control';

  const input: HTMLInputElement = document.createElement('input');
  input.className = 'auth-dialog__input';
  input.id = options.id;
  input.name = options.name;
  input.type = options.type;
  input.autocomplete = options.autocomplete;
  input.placeholder = options.placeholder;

  control.append(createIcon(options.iconSrc, 'auth-dialog__input-icon'), input);

  if (options.togglePassword === true) {
    const toggle: HTMLButtonElement = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'auth-dialog__visibility';
    toggle.setAttribute('aria-label', 'Show password');
    toggle.setAttribute('aria-pressed', 'false');
    const eye: HTMLImageElement = createIcon(
      eyeIconUrl,
      'auth-dialog__visibility-icon',
    );
    toggle.append(eye);
    bindPasswordToggle(input, toggle, eye);
    control.append(toggle);
  }

  field.append(label, control);
  return field;
}

function createForgotButton(): HTMLButtonElement {
  const button: HTMLButtonElement = document.createElement('button');
  button.type = 'button';
  button.className = 'auth-dialog__forgot';
  button.textContent = 'Forgot Password?';
  return button;
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

function createOrDivider(): HTMLDivElement {
  const row: HTMLDivElement = document.createElement('div');
  row.className = 'auth-dialog__or';
  row.setAttribute('role', 'separator');

  const label: HTMLSpanElement = document.createElement('span');
  label.className = 'auth-dialog__or-label';
  label.textContent = 'OR';
  row.append(label);
  return row;
}

function createGoogleButton(label: string): HTMLButtonElement {
  const button: HTMLButtonElement = document.createElement('button');
  button.type = 'button';
  button.className = 'auth-dialog__google';
  button.append(
    createIcon(googleIconUrl, 'auth-dialog__google-icon'),
    document.createTextNode(label),
  );
  return button;
}

function wrapAuthPanel(
  form: HTMLFormElement,
  panelId: string,
  labelledBy: string,
): HTMLDivElement {
  const panel: HTMLDivElement = document.createElement('div');
  panel.className = 'auth-dialog__panel';
  panel.id = panelId;
  panel.setAttribute('role', 'tabpanel');
  panel.setAttribute('aria-labelledby', labelledBy);
  form.className = 'auth-dialog__form';
  panel.append(form);
  return panel;
}

function createLoginForm(): {
  form: HTMLFormElement;
  title: HTMLHeadingElement;
} {
  const form: HTMLFormElement = document.createElement('form');
  form.noValidate = true;

  const intro = createIntro(
    'auth-dialog-login-title',
    'Welcome Back!',
    'Sign in to resume your games and progress.',
  );

  form.append(
    intro.block,
    createField({
      id: 'auth-dialog-login-email',
      label: 'Email Address',
      name: 'email',
      type: 'email',
      autocomplete: 'email',
      placeholder: 'e.g. alex@minigames.com',
      iconSrc: mailIconUrl,
    }),
    createField({
      id: 'auth-dialog-login-password',
      label: 'Password',
      name: 'password',
      type: 'password',
      autocomplete: 'current-password',
      placeholder: '••••••••',
      iconSrc: lockIconUrl,
      togglePassword: true,
    }),
    createForgotButton(),
    createSubmitButton('Login'),
    createOrDivider(),
    createGoogleButton('Continue with Google'),
    createSwitchHint("Don't have an account?", 'Register', () => {
      setAuthMode('register');
    }),
  );

  form.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault();
  });

  return { form, title: intro.title };
}

function createRegisterForm(): {
  form: HTMLFormElement;
  title: HTMLHeadingElement;
} {
  const form: HTMLFormElement = document.createElement('form');
  form.noValidate = true;

  const intro = createIntro(
    'auth-dialog-register-title',
    'Create Account',
    'Join MiniGames to track your score & streak.',
  );

  form.append(
    intro.block,
    createField({
      id: 'auth-dialog-register-username',
      label: 'Username',
      name: 'username',
      type: 'text',
      autocomplete: 'username',
      placeholder: 'e.g. CozyGamer_99',
      iconSrc: userIconUrl,
    }),
    createField({
      id: 'auth-dialog-register-email',
      label: 'Email Address',
      name: 'email',
      type: 'email',
      autocomplete: 'email',
      placeholder: 'your.email@domain.com',
      iconSrc: mailIconUrl,
    }),
    createField({
      id: 'auth-dialog-register-password',
      label: 'Password',
      name: 'password',
      type: 'password',
      autocomplete: 'new-password',
      placeholder: 'Min. 8 characters',
      iconSrc: lockIconUrl,
    }),
    createField({
      id: 'auth-dialog-register-confirm',
      label: 'Confirm Password',
      name: 'confirm-password',
      type: 'password',
      autocomplete: 'new-password',
      placeholder: 'Repeat your password',
      iconSrc: lockIconUrl,
    }),
    createSubmitButton('Create Account'),
    createOrDivider(),
    createGoogleButton('Sign up with Google'),
    createSwitchHint('Already have an account?', 'Login', () => {
      setAuthMode('login');
    }),
  );

  form.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault();
  });

  return { form, title: intro.title };
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
  if (isLogin) {
    references.loginPanel.removeAttribute('aria-hidden');
    references.registerPanel.setAttribute('aria-hidden', 'true');
  } else {
    references.registerPanel.removeAttribute('aria-hidden');
    references.loginPanel.setAttribute('aria-hidden', 'true');
  }
  references.loginPanel.inert = !isLogin;
  references.registerPanel.inert = isLogin;

  references.dialog.setAttribute(
    'aria-labelledby',
    isLogin ? references.loginTitle.id : references.registerTitle.id,
  );
}

function ensureAuthDialog(): AuthDialogReferences {
  if (authDialogState.references !== undefined) {
    return authDialogState.references;
  }

  const dialog: HTMLDialogElement = document.createElement('dialog');
  dialog.className = 'auth-dialog';

  const login = createLoginForm();
  const register = createRegisterForm();

  const loginPanel = wrapAuthPanel(
    login.form,
    'auth-dialog-panel-login',
    'auth-dialog-tab-login',
  );
  const registerPanel = wrapAuthPanel(
    register.form,
    'auth-dialog-panel-register',
    'auth-dialog-tab-register',
  );

  const loginTab = createTab(
    'Login',
    'auth-dialog-tab-login',
    loginPanel.id,
    () => {
      setAuthMode('login');
    },
  );
  const registerTab = createTab(
    'Register',
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

  const body: HTMLDivElement = document.createElement('div');
  body.className = 'auth-dialog__body';
  body.append(switcher, panels);

  dialog.append(createCloseButton(requestClose), body);
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
    loginTitle: login.title,
    registerTitle: register.title,
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
