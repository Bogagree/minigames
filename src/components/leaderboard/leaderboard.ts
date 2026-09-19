import leaderboardDocument from '../../data/leaderboard.json';
import './leaderboard.scss';

interface LeaderboardEntry {
  rank: number;
  playerName: string;
  gamesPlayed: number;
  totalScore: number;
  streakDays: number;
  favoriteGameSlug: string;
  favoriteGameName: string;
}

interface LeaderboardDocument {
  data: LeaderboardEntry[];
  meta: {
    totalItems: number;
    description: string;
  };
}

const TITLE_FULL = 'Top Players This Week';
const TITLE_SHORT = 'Top Players';
const COMPACT_ROW_LIMIT = 3;

const documentData: LeaderboardDocument = leaderboardDocument;

function playerInitials(name: string): string {
  const tokens: string[] = name.split('_').filter((part) => part.length > 0);
  const meaningful: string[] = tokens.filter(
    (part) => part.toLowerCase() !== 'x',
  );

  if (meaningful.length >= 2) {
    const first: string | undefined = meaningful[0];
    const second: string | undefined = meaningful[1];
    if (first !== undefined && second !== undefined) {
      return `${first[0]}${second[0]}`.toUpperCase();
    }
  }

  const camelParts: RegExpMatchArray | null = name
    .replaceAll('_', '')
    .match(/[A-Z][a-z]*/g);

  if (camelParts !== null && camelParts.length >= 2) {
    const firstWord: string | undefined = camelParts[0];
    const secondWord: string | undefined = camelParts[1];
    if (firstWord !== undefined && secondWord !== undefined) {
      return `${firstWord[0]}${secondWord[0]}`.toUpperCase();
    }
  }

  return name.slice(0, 2).toUpperCase();
}

function formatScoreFull(score: number): string {
  return score.toLocaleString('en-US');
}

function formatScoreCompact(score: number): string {
  return `${(score / 1000).toFixed(1)}K`;
}

function createTextCell(
  tagName: 'th' | 'td',
  className: string,
  text: string,
): HTMLTableCellElement {
  const cell: HTMLTableCellElement = document.createElement(tagName);
  cell.className = className;
  cell.textContent = text;
  return cell;
}

function createLabeledHeaderCell(
  className: string,
  fullLabel: string,
  shortLabel: string,
): HTMLTableCellElement {
  const cell: HTMLTableCellElement = document.createElement('th');
  cell.className = className;

  const full: HTMLSpanElement = document.createElement('span');
  full.className = 'leaderboard__label leaderboard__label--full';
  full.textContent = fullLabel;

  const short: HTMLSpanElement = document.createElement('span');
  short.className = 'leaderboard__label leaderboard__label--short';
  short.textContent = shortLabel;

  cell.append(full, short);
  return cell;
}

function createHeaderRow(): HTMLTableRowElement {
  const row: HTMLTableRowElement = document.createElement('tr');
  row.className = 'leaderboard__row leaderboard__row--head';

  row.append(
    createTextCell('th', 'leaderboard__cell leaderboard__cell--rank', 'Rank'),
    createTextCell(
      'th',
      'leaderboard__cell leaderboard__cell--player',
      'Player',
    ),
    createLabeledHeaderCell(
      'leaderboard__cell leaderboard__cell--games',
      'Games Played',
      'Games',
    ),
    createLabeledHeaderCell(
      'leaderboard__cell leaderboard__cell--score',
      'Total Score',
      'Score',
    ),
    createTextCell(
      'th',
      'leaderboard__cell leaderboard__cell--streak',
      'Streak',
    ),
    createTextCell(
      'th',
      'leaderboard__cell leaderboard__cell--favorite',
      'Favorite Game',
    ),
  );

  return row;
}

function createPlayerCell(entry: LeaderboardEntry): HTMLTableCellElement {
  const cell: HTMLTableCellElement = document.createElement('td');
  cell.className = 'leaderboard__cell leaderboard__cell--player';

  const avatar: HTMLSpanElement = document.createElement('span');
  avatar.className = `leaderboard__avatar leaderboard__avatar--${String(entry.rank)}`;
  avatar.textContent = playerInitials(entry.playerName);
  avatar.setAttribute('aria-hidden', 'true');

  const name: HTMLSpanElement = document.createElement('span');
  name.className = 'leaderboard__name';
  name.textContent = entry.playerName;

  cell.append(avatar, name);
  return cell;
}

function createScoreCell(entry: LeaderboardEntry): HTMLTableCellElement {
  const cell: HTMLTableCellElement = document.createElement('td');
  cell.className = 'leaderboard__cell leaderboard__cell--score';

  const full: HTMLSpanElement = document.createElement('span');
  full.className = 'leaderboard__score leaderboard__score--full';
  full.textContent = formatScoreFull(entry.totalScore);

  const compact: HTMLSpanElement = document.createElement('span');
  compact.className = 'leaderboard__score leaderboard__score--compact';
  compact.textContent = formatScoreCompact(entry.totalScore);

  cell.append(full, compact);
  return cell;
}

function createStreakCell(entry: LeaderboardEntry): HTMLTableCellElement {
  const cell: HTMLTableCellElement = document.createElement('td');
  cell.className = 'leaderboard__cell leaderboard__cell--streak';

  const full: HTMLSpanElement = document.createElement('span');
  full.className = 'leaderboard__streak leaderboard__streak--full';
  full.textContent = `🔥 ${String(entry.streakDays)} days`;

  const compact: HTMLSpanElement = document.createElement('span');
  compact.className = 'leaderboard__streak leaderboard__streak--compact';
  compact.textContent = `🔥 ${String(entry.streakDays)}d`;

  cell.append(full, compact);
  return cell;
}

function createFavoriteCell(entry: LeaderboardEntry): HTMLTableCellElement {
  const cell: HTMLTableCellElement = document.createElement('td');
  cell.className = 'leaderboard__cell leaderboard__cell--favorite';

  const chip: HTMLSpanElement = document.createElement('span');
  chip.className = 'leaderboard__chip';
  chip.textContent = entry.favoriteGameName;

  cell.append(chip);
  return cell;
}

function createBodyRow(entry: LeaderboardEntry): HTMLTableRowElement {
  const row: HTMLTableRowElement = document.createElement('tr');
  row.className = 'leaderboard__row';
  if (entry.rank % 2 === 0) {
    row.classList.add('leaderboard__row--alt');
  }
  if (entry.rank > COMPACT_ROW_LIMIT) {
    row.classList.add('leaderboard__row--desktop-only');
  }

  const gamesCell: HTMLTableCellElement = createTextCell(
    'td',
    'leaderboard__cell leaderboard__cell--games',
    String(entry.gamesPlayed),
  );

  row.append(
    createTextCell(
      'td',
      'leaderboard__cell leaderboard__cell--rank',
      `#${String(entry.rank)}`,
    ),
    createPlayerCell(entry),
    gamesCell,
    createScoreCell(entry),
    createStreakCell(entry),
    createFavoriteCell(entry),
  );

  return row;
}

export function createLeaderboard(): HTMLElement {
  const section: HTMLElement = document.createElement('section');
  section.className = 'leaderboard';
  section.setAttribute('aria-labelledby', 'leaderboard-title');

  const header: HTMLDivElement = document.createElement('div');
  header.className = 'leaderboard__header';

  const accent: HTMLSpanElement = document.createElement('span');
  accent.className = 'leaderboard__accent';
  accent.setAttribute('aria-hidden', 'true');

  const title: HTMLHeadingElement = document.createElement('h2');
  title.className = 'leaderboard__title';
  title.id = 'leaderboard-title';

  const titleShort: HTMLSpanElement = document.createElement('span');
  titleShort.className =
    'leaderboard__title-text leaderboard__title-text--short';
  titleShort.textContent = TITLE_SHORT;

  const titleFull: HTMLSpanElement = document.createElement('span');
  titleFull.className = 'leaderboard__title-text leaderboard__title-text--full';
  titleFull.textContent = TITLE_FULL;

  title.setAttribute('aria-label', TITLE_FULL);
  titleShort.setAttribute('aria-hidden', 'true');
  titleFull.setAttribute('aria-hidden', 'true');
  title.append(titleShort, titleFull);
  header.append(accent, title);

  const table: HTMLTableElement = document.createElement('table');
  table.className = 'leaderboard__table';

  const caption: HTMLTableCaptionElement = document.createElement('caption');
  caption.className = 'leaderboard__caption';
  caption.textContent = documentData.meta.description;

  const thead: HTMLTableSectionElement = document.createElement('thead');
  thead.className = 'leaderboard__head';
  thead.append(createHeaderRow());

  const tbody: HTMLTableSectionElement = document.createElement('tbody');
  tbody.className = 'leaderboard__body';

  for (const entry of documentData.data) {
    tbody.append(createBodyRow(entry));
  }

  table.append(caption, thead, tbody);
  section.append(header, table);

  return section;
}
