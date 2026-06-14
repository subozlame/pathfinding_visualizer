import { getNeighbors } from "../utils/getNeighbors";

function heuristic(a, b) {
  return (
    Math.abs(a.row - b.row) +
    Math.abs(a.col - b.col)
  );
}

export function astar(
  grid,
  startNode,
  endNode
) {
  const visitedNodes = [];

  startNode.g = 0;

  startNode.h = heuristic(
    startNode,
    endNode
  );

  startNode.f =
    startNode.g + startNode.h;

  const openSet = [startNode];

  while (openSet.length) {
    openSet.sort(
      (a, b) => a.f - b.f
    );

    const current =
      openSet.shift();

    current.visited = true;

    visitedNodes.push(current);

    if (current === endNode)
      return visitedNodes;

    const neighbors =
      getNeighbors(
        current,
        grid
      );

    for (const neighbor of neighbors) {
      if (
        neighbor.isWall
      )
        continue;

      const tentativeG =
        current.g + 1;

      if (
        tentativeG <
          (neighbor.g ??
            Infinity)
      ) {
        neighbor.previous =
          current;

        neighbor.g =
          tentativeG;

        neighbor.h =
          heuristic(
            neighbor,
            endNode
          );

        neighbor.f =
          neighbor.g +
          neighbor.h;

        if (
          !openSet.includes(
            neighbor
          )
        ) {
          openSet.push(
            neighbor
          );
        }
      }
    }
  }

  return visitedNodes;
}