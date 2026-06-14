export function generateMaze(grid) {
  const newGrid = grid.map(row =>
    row.map(node => ({
      ...node,
      isWall: false,
      visited: false,
      isPath: false,
    }))
  );

  const stack = [];

  const startRow = 1;
  const startCol = 1;

  const start = newGrid[startRow][startCol];

  stack.push(start);
  start.visited = true;

  const directions = [
    [0, 2],
    [0, -2],
    [2, 0],
    [-2, 0],
  ];

  function isValid(r, c) {
    return (
      r > 0 &&
      c > 0 &&
      r < newGrid.length - 1 &&
      c < newGrid[0].length - 1
    );
  }

  while (stack.length) {
    const current =
      stack[stack.length - 1];

    let neighbors = [];

    for (const [dr, dc] of directions) {
      const nr = current.row + dr;
      const nc = current.col + dc;

      if (
        isValid(nr, nc) &&
        !newGrid[nr][nc].visited
      ) {
        neighbors.push(newGrid[nr][nc]);
      }
    }

    if (neighbors.length > 0) {
      const next =
        neighbors[
          Math.floor(
            Math.random() *
              neighbors.length
          )
        ];

      const wallRow =
        (current.row + next.row) / 2;

      const wallCol =
        (current.col + next.col) / 2;

      newGrid[wallRow][wallCol].isWall = true;

      next.visited = true;

      stack.push(next);
    } else {
      stack.pop();
    }
  }

  return newGrid;
}