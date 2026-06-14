import { getNeighbors } from "../utils/getNeighbors";

export function dijkstra(
  grid,
  startNode,
  endNode
) {
  const visitedNodes = [];

  startNode.distance = 0;

  const unvisitedNodes =
    grid.flat();

  while (unvisitedNodes.length) {
    unvisitedNodes.sort(
      (a, b) =>
        a.distance - b.distance
    );

    const closest =
      unvisitedNodes.shift();

    if (closest.isWall) continue;

    if (
      closest.distance === Infinity
    )
      return visitedNodes;

    closest.visited = true;

    visitedNodes.push(closest);

    if (closest === endNode)
      return visitedNodes;

    const neighbors =
      getNeighbors(
        closest,
        grid
      );

    for (const neighbor of neighbors) {
      const newDistance =
        closest.distance + 1;

      if (
        newDistance <
        neighbor.distance
      ) {
        neighbor.distance =
          newDistance;

        neighbor.previous =
          closest;
      }
    }
  }

  return visitedNodes;
}