import { useState } from "react";
import Grid from "./components/Grid";
import { createGrid } from "./utils/createGrid";
import {dijkstra} from "./algorithms/dijkstra";
import {astar} from "./algorithms/astar";
import { getShortestPath } from "./utils/getShortestPath";

function App() {
  const [grid, setGrid] =
    useState(createGrid());

  const [mousePressed, setMousePressed] =
    useState(false);

  const [draggingStart, setDraggingStart] =
    useState(false);

  const [draggingEnd, setDraggingEnd] =
    useState(false);

  const toggleWall = (node) => {
    const newGrid = [...grid];

    const current =
      newGrid[node.row][node.col];

    if (
      current.isStart ||
      current.isEnd
    )
      return;

    current.isWall =
      !current.isWall;

    setGrid(newGrid);
  };

  const moveStart = (node) => {
    const newGrid = [...grid];

    for (const row of newGrid) {
      for (const cell of row) {
        if (cell.isStart)
          cell.isStart = false;
      }
    }

    newGrid[node.row][node.col]
      .isStart = true;

    setGrid(newGrid);
  };

  const moveEnd = (node) => {
    const newGrid = [...grid];

    for (const row of newGrid) {
      for (const cell of row) {
        if (cell.isEnd)
          cell.isEnd = false;
      }
    }

    newGrid[node.row][node.col]
      .isEnd = true;

    setGrid(newGrid);
  };

  const handleMouseDown = (
    node
  ) => {
    if (node.isStart) {
      setDraggingStart(true);
    } else if (node.isEnd) {
      setDraggingEnd(true);
    } else {
      toggleWall(node);
    }

    setMousePressed(true);
  };

  const handleMouseEnter = (
    node
  ) => {
    if (!mousePressed) return;

    if (draggingStart) {
      moveStart(node);
      return;
    }

    if (draggingEnd) {
      moveEnd(node);
      return;
    }

    toggleWall(node);
  };

  const handleMouseUp = () => {
    setMousePressed(false);
    setDraggingStart(false);
    setDraggingEnd(false);
  };

function getStartNode() {
  return grid.flat().find(node => node.isStart);
}

function getEndNode() {
  return grid.flat().find(node => node.isEnd);
}

function resetNodes() {
  const newGrid = [...grid];

  for (const row of newGrid) {
    for (const node of row) {
      node.visited = false;
      node.isPath = false;
      node.distance = Infinity;
      node.g = Infinity;
      node.h = 0;
      node.f = Infinity;
      node.previous = null;
    }
  }

  setGrid(newGrid);
  return newGrid;
}
function visualizeDijkstra() {
  const freshGrid = resetNodes();

  const start = freshGrid.flat().find(n => n.isStart);
  const end = freshGrid.flat().find(n => n.isEnd);

  const visited = dijkstra(freshGrid, start, end);
  const path = getShortestPath(end);

  for (const node of visited) {
    node.visited = true;
  }

  for (const node of path) {
    node.isPath = true;
  }

  setGrid([...freshGrid]);
}

function visualizeAstar() {
  const freshGrid = resetNodes();

  const start = freshGrid.flat().find(n => n.isStart);
  const end = freshGrid.flat().find(n => n.isEnd);

  const visited = astar(freshGrid, start, end);
  const path = getShortestPath(end);

  for (const node of visited) {
    node.visited = true;
  }

  for (const node of path) {
    node.isPath = true;
  }

  setGrid([...freshGrid]);
}
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <h1 className="text-center text-4xl font-bold py-6">
        Pathfinding Visualizer
      </h1>

      <div className="flex justify-center overflow-auto px-4">

        <Grid
          grid={grid}
          onMouseDown={
            handleMouseDown
          }
          onMouseEnter={
            handleMouseEnter
          }
          onMouseUp={handleMouseUp}
        />

      </div>

      <div className="text-center mt-6">

        <p>
          Green = Start
        </p>

        <p>
          Red = End
        </p>

        <p>
          Black = Wall
        </p>

      </div>

    </div>
  );
}

export default App;