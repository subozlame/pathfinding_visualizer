export function getNeighbors(node, grid) {
  const neighbors = [];

  const { row, col } = node;

  // Up
  if (row > 0)
    neighbors.push(grid[row - 1][col]);

  // Down
  if (row < grid.length - 1)
    neighbors.push(grid[row + 1][col]);

  // Left
  if (col > 0)
    neighbors.push(grid[row][col - 1]);

  // Right
  if (col < grid[0].length - 1)
    neighbors.push(grid[row][col + 1]);

  return neighbors.filter(
    (neighbor) => !neighbor.visited
  );
}