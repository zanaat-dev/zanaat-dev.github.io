// Every mark is drawn on one module grid; these are the module cells each mark fills, read row by
// row from its SVG. The game plays on whole modules only. The finer parts of the grammar (the
// half-module cascade square and the quarter-module registration pixel at two opposite corners,
// Baron's 45° chamfer) appear when a mark locks, so a finished mark reads as the real one.

export type MarkId = 'zanaat' | 'lonca' | 'baron';

export interface MarkPattern {
  id: MarkId;
  /** Rows of the module grid, top to bottom: `#` a module, `/` a module chamfered at its top-right, `.` empty. */
  rows: string[];
  /** Module cells that carry the cascade (top-left and bottom-right corners). */
  cascade: [col: number, row: number][];
}

export const MARKS: Record<MarkId, MarkPattern> = {
  zanaat: {
    id: 'zanaat',
    rows: ['.####', '#..#.', '..#..', '.#..#', '####.'],
    cascade: [
      [0, 0],
      [4, 4],
    ],
  },
  lonca: {
    id: 'lonca',
    rows: ['.##', '#.#', '##.'],
    cascade: [
      [0, 0],
      [2, 2],
    ],
  },
  baron: {
    id: 'baron',
    rows: ['.###/', '#...#', '####.', '#...#', '####.'],
    cascade: [
      [0, 0],
      [4, 4],
    ],
  },
};

export const MARK_ORDER: MarkId[] = ['zanaat', 'lonca', 'baron'];

export interface Cell {
  col: number;
  row: number;
  chamfer: boolean;
}

export function cellsOf(mark: MarkPattern): Cell[] {
  const cells: Cell[] = [];
  mark.rows.forEach((line, row) => {
    [...line].forEach((ch, col) => {
      if (ch === '#' || ch === '/') cells.push({ col, row, chamfer: ch === '/' });
    });
  });
  return cells;
}

export function sizeOf(mark: MarkPattern): { cols: number; rows: number } {
  return { cols: mark.rows[0].length, rows: mark.rows.length };
}

const key = (c: number, r: number) => `${c},${r}`;

/** The set's shape with its bounding box moved to the origin, so a mark matches wherever it is built. */
export function normalise(cells: Iterable<[number, number]>): Set<string> {
  const list = [...cells];
  if (list.length === 0) return new Set();
  const minC = Math.min(...list.map(([c]) => c));
  const minR = Math.min(...list.map(([, r]) => r));
  return new Set(list.map(([c, r]) => key(c - minC, r - minR)));
}

export function matches(occupied: Iterable<[number, number]>, mark: MarkPattern): boolean {
  const have = normalise(occupied);
  const want = normalise(cellsOf(mark).map((c) => [c.col, c.row] as [number, number]));
  if (have.size !== want.size) return false;
  for (const k of want) if (!have.has(k)) return false;
  return true;
}
