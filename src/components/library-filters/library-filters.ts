import { releaseOnDisconnect } from '../../utils/dom';
import './library-filters.scss';

const FILTER_LABELS: readonly string[] = [
  'All Games',
  'Puzzle',
  'Card',
  'Match',
  'Farm',
  'Strategy',
  'Arcade',
];

const SORT_METHODS: readonly string[] = [
  'Rating ↑',
  'Rating ↓',
  'Name A→Z',
  'Name Z→A',
];

const DEFAULT_SORT = 'Rating ↓';
const SORT_LIST_ID = 'library-sort-list';
const TITLE_ID = 'library-filters-title';
const DRAG_THRESHOLD_PX = 4;

function sortLabel(method: string): string {
  return `Sort by: ${method}`;
}

function bindChipScroll(track: HTMLElement): () => void {
  let startX = 0;
  let startScroll = 0;
  let pointerId: number | undefined;
  let shouldSuppressClick = false;

  const onPointerMove = (event: PointerEvent): void => {
    if (pointerId !== event.pointerId) {
      return;
    }

    const delta: number = event.clientX - startX;

    if (Math.abs(delta) <= DRAG_THRESHOLD_PX) {
      return;
    }

    shouldSuppressClick = true;

    if (!track.hasPointerCapture(event.pointerId)) {
      track.setPointerCapture(event.pointerId);
    }

    track.scrollLeft = startScroll - delta;
  };

  const stopTracking = (event: PointerEvent): void => {
    if (pointerId !== event.pointerId) {
      return;
    }

    pointerId = undefined;

    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }

    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', stopTracking);
    document.removeEventListener('pointercancel', stopTracking);
  };

  const onPointerDown = (event: PointerEvent): void => {
    if (event.pointerType !== 'mouse' || event.button !== 0) {
      return;
    }

    pointerId = event.pointerId;
    startX = event.clientX;
    startScroll = track.scrollLeft;
    shouldSuppressClick = false;
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', stopTracking);
    document.addEventListener('pointercancel', stopTracking);
  };

  const onClick = (event: MouseEvent): void => {
    if (!shouldSuppressClick) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    shouldSuppressClick = false;
  };

  track.addEventListener('pointerdown', onPointerDown);
  track.addEventListener('click', onClick, { capture: true });

  return (): void => {
    track.removeEventListener('pointerdown', onPointerDown);
    track.removeEventListener('click', onClick, { capture: true });
    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', stopTracking);
    document.removeEventListener('pointercancel', stopTracking);
  };
}

function createChips(): HTMLElement {
  const track: HTMLElement = document.createElement('div');
  track.className = 'library-filters__chips';
  track.setAttribute('role', 'group');
  track.setAttribute('aria-label', 'Categories');

  for (const label of FILTER_LABELS) {
    const chip: HTMLButtonElement = document.createElement('button');
    const isCurrent: boolean = label === FILTER_LABELS[0];

    chip.type = 'button';
    chip.className = isCurrent
      ? 'library-filters__chip library-filters__chip--current'
      : 'library-filters__chip';
    chip.textContent = label;
    chip.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');

    chip.addEventListener('click', () => {
      const chips: NodeListOf<HTMLButtonElement> = track.querySelectorAll(
        '.library-filters__chip',
      );

      for (const item of chips) {
        const isSelected: boolean = item === chip;
        item.classList.toggle('library-filters__chip--current', isSelected);
        item.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
      }
    });

    track.append(chip);
  }

  return track;
}

function createSort(): { root: HTMLElement; release: () => void } {
  const root: HTMLElement = document.createElement('div');
  root.className = 'library-filters__sort';

  const trigger: HTMLButtonElement = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'library-filters__sort-trigger';
  trigger.textContent = sortLabel(DEFAULT_SORT);
  trigger.setAttribute('aria-haspopup', 'listbox');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-controls', SORT_LIST_ID);

  const menu: HTMLElement = document.createElement('div');
  menu.className = 'library-filters__sort-menu';
  menu.id = SORT_LIST_ID;
  menu.setAttribute('role', 'listbox');
  menu.setAttribute('aria-label', 'Sort by');
  menu.hidden = true;

  const options: HTMLButtonElement[] = [];

  for (const method of SORT_METHODS) {
    const option: HTMLButtonElement = document.createElement('button');
    const isSelected: boolean = method === DEFAULT_SORT;

    option.type = 'button';
    option.className = isSelected
      ? 'library-filters__sort-option library-filters__sort-option--current'
      : 'library-filters__sort-option';
    option.textContent = method;
    option.setAttribute('role', 'option');
    option.setAttribute('aria-selected', isSelected ? 'true' : 'false');

    option.addEventListener('click', () => {
      for (const item of options) {
        const isSelected: boolean = item === option;
        item.classList.toggle(
          'library-filters__sort-option--current',
          isSelected,
        );
        item.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      }

      trigger.textContent = sortLabel(method);
      closeMenu();
      trigger.focus();
    });

    options.push(option);
    menu.append(option);
  }

  let removeDocumentListeners: (() => void) | undefined;

  const closeMenu = (): void => {
    menu.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    removeDocumentListeners?.();
    removeDocumentListeners = undefined;
  };

  const onPointerDown = (event: PointerEvent): void => {
    if (event.target instanceof Node && root.contains(event.target)) {
      return;
    }

    closeMenu();
  };

  const onKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== 'Escape') {
      return;
    }

    closeMenu();
    trigger.focus();
  };

  const openMenu = (): void => {
    menu.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    removeDocumentListeners = (): void => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };

    const currentOption: HTMLButtonElement | undefined = options.find(
      (item) => {
        return item.getAttribute('aria-selected') === 'true';
      },
    );

    currentOption?.focus();
  };

  trigger.addEventListener('click', () => {
    if (menu.hidden) {
      openMenu();
      return;
    }

    closeMenu();
  });

  menu.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
      return;
    }

    event.preventDefault();

    const active: Element | null = document.activeElement;
    const currentIndex: number =
      active instanceof HTMLButtonElement ? options.indexOf(active) : -1;
    const nextIndex: number =
      event.key === 'ArrowDown'
        ? (currentIndex === -1 ? 0 : currentIndex + 1) % options.length
        : currentIndex === -1
          ? options.length - 1
          : (currentIndex - 1 + options.length) % options.length;

    options[nextIndex]?.focus();
  });

  root.append(trigger, menu);

  return {
    root,
    release: closeMenu,
  };
}

export function createLibraryFilters(): HTMLElement {
  const section: HTMLElement = document.createElement('section');
  section.className = 'library-filters';
  section.setAttribute('aria-labelledby', TITLE_ID);

  const intro: HTMLElement = document.createElement('header');
  intro.className = 'library-filters__intro';

  const title: HTMLHeadingElement = document.createElement('h1');
  title.className = 'library-filters__title';
  title.id = TITLE_ID;
  title.textContent = 'Game Library';

  const lead: HTMLParagraphElement = document.createElement('p');
  lead.className = 'library-filters__lead';
  lead.textContent = 'Browse our collection of casual mini-games';

  intro.append(title, lead);

  const controls: HTMLElement = document.createElement('div');
  controls.className = 'library-filters__controls';

  const chips: HTMLElement = createChips();
  const sort: { root: HTMLElement; release: () => void } = createSort();

  controls.append(chips, sort.root);
  section.append(intro, controls);

  const releaseScroll: () => void = bindChipScroll(chips);

  releaseOnDisconnect(section, () => {
    sort.release();
    releaseScroll();
  });

  return section;
}
