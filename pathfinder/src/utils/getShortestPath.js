export function getShortestPath(endNode, startNode) {
  const path = [];

  let current = endNode;

  while (current !== null) {
    path.unshift(current);
    current = current.previous;
  }

  if (path.length === 1 && path[0] !== startNode) {
    return [];
  }

  return path;
}