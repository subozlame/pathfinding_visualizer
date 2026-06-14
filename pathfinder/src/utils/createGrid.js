export const ROWS = 20;
export const COLS = 40;

export function createNode(
  row,
  col
) {
  return {
    row,
    col,

    isStart:
      row === 10 &&
      col === 5,

    isEnd:
      row === 10 &&
      col === 30,

    isWall: false,

    visited: false,
    isPath: false,

    distance: Infinity,

    g: Infinity,
    h: 0,
    f: Infinity,

    previous: null,
  };
}

export function createGrid() {
  const grid = [];

  for (let row = 0; row < ROWS; row++) {
    const currentRow = [];

    for (let col = 0; col < COLS; col++) {
      currentRow.push(
        createNode(row, col)
      );
    }

    grid.push(currentRow);
  }

  return grid;
}