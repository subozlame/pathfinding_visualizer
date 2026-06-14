export function getShortestPath(endNode) {
  const path = [];

  let current = endNode;

  while (current !== null) {
    path.unshift(current);
    current = current.previous;
  }

  return path;
}