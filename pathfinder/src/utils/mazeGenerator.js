function cloneMazeGrid(grid) {
  return grid.map((row) =>
    row.map((node) => ({
      ...node,
      isWall: true,
      visited: false,
      isPath: false,
      distance: Infinity,
      previous: null,
      g: Infinity,
      h: 0,
      f: Infinity,
    }))
  );
}

function getEndpoints(newGrid) {
  const startNode = newGrid.flat().find((node) => node.isStart) ?? newGrid[10][5];
  const endNode = newGrid.flat().find((node) => node.isEnd) ?? newGrid[10][30];

  startNode.isWall = false;
  endNode.isWall = false;

  return { startNode, endNode };
}

function carveCorridor(newGrid, startNode, endNode) {
  const rowStep = startNode.row <= endNode.row ? 1 : -1;

  for (
    let row = startNode.row;
    row !== endNode.row + rowStep;
    row += rowStep
  ) {
    newGrid[row][startNode.col].isWall = false;
  }

  const colStep = startNode.col <= endNode.col ? 1 : -1;

  for (
    let col = startNode.col;
    col !== endNode.col + colStep;
    col += colStep
  ) {
    newGrid[endNode.row][col].isWall = false;
  }

  startNode.isWall = false;
  endNode.isWall = false;
}

function generateBacktrackerMaze(newGrid) {
  const stack = [];
  const start = newGrid[1][1];

  stack.push(start);
  start.isWall = false;
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
    const current = stack[stack.length - 1];
    const neighbors = [];

    for (const [dr, dc] of directions) {
      const nr = current.row + dr;
      const nc = current.col + dc;

      if (isValid(nr, nc) && !newGrid[nr][nc].visited) {
        neighbors.push(newGrid[nr][nc]);
      }
    }

    if (neighbors.length > 0) {
      const next = neighbors[Math.floor(Math.random() * neighbors.length)];
      const wallRow = (current.row + next.row) / 2;
      const wallCol = (current.col + next.col) / 2;

      current.isWall = false;
      next.isWall = false;
      newGrid[wallRow][wallCol].isWall = false;

      next.visited = true;
      stack.push(next);
    } else {
      stack.pop();
    }
  }
}

function generateBinaryTreeMaze(newGrid) {
  for (let row = 1; row < newGrid.length - 1; row += 2) {
    for (let col = 1; col < newGrid[0].length - 1; col += 2) {
      const cell = newGrid[row][col];
      cell.isWall = false;

      const options = [];

      if (row > 1) options.push([row - 1, col]);
      if (col > 1) options.push([row, col - 1]);

      if (options.length) {
        const [wallRow, wallCol] = options[Math.floor(Math.random() * options.length)];
        newGrid[wallRow][wallCol].isWall = false;
      }
    }
  }
}

function generateScatterMaze(newGrid) {
  let current = newGrid[1][1];
  current.isWall = false;
  current.visited = true;

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const steps = newGrid.length * newGrid[0].length;

  for (let i = 0; i < steps; i++) {
    const validMoves = [];

    for (const [dr, dc] of directions) {
      const nr = current.row + dr;
      const nc = current.col + dc;

      if (
        nr > 0 &&
        nc > 0 &&
        nr < newGrid.length - 1 &&
        nc < newGrid[0].length - 1
      ) {
        validMoves.push(newGrid[nr][nc]);
      }
    }

    if (!validMoves.length) continue;

    current = validMoves[Math.floor(Math.random() * validMoves.length)];
    current.isWall = false;
    current.visited = true;

    if (Math.random() > 0.6) {
      current.isWall = false;
    }
  }

  for (let row = 1; row < newGrid.length - 1; row++) {
    for (let col = 1; col < newGrid[0].length - 1; col++) {
      if (Math.random() > 0.78) {
        newGrid[row][col].isWall = false;
      }
    }
  }
}

export function generateMaze(grid) {
  const newGrid = cloneMazeGrid(grid);
  const { startNode, endNode } = getEndpoints(newGrid);

  const mazeGenerators = [
    generateBacktrackerMaze,
    generateBinaryTreeMaze,
    generateScatterMaze,
  ];

  const selectedMaze =
    mazeGenerators[
      Math.floor(Math.random() * mazeGenerators.length)
    ];

  selectedMaze(newGrid);
  carveCorridor(newGrid, startNode, endNode);

  return newGrid.map((row) =>
    row.map((node) => ({
      ...node,
      visited: false,
    }))
  );
}