import { useState } from "react";
import useAnimation from "./hooks/useAnimation";
import { useRef } from "react";

import Toolbar from "./components/Toolbar";
import Metrics from "./components/Metrics";

import { generateMaze } from "./utils/mazeGenerator";
import { saveGrid, loadGrid } from "./utils/localStorage";

import Grid from "./components/Grid";
import { createGrid } from "./utils/createGrid";
import {dijkstra} from "./algorithms/dijkstra";
import {astar} from "./algorithms/astar";
import { getShortestPath } from "./utils/getShortestPath";

function App() {

  const {
  play,
  pause,
  resume,
  speed,
  setSpeed,
} = useAnimation();

const renderRef = useRef(false);

function triggerRender(gridCopy) {
  if (renderRef.current) return;

  renderRef.current = true;

  requestAnimationFrame(() => {
    setGrid([...gridCopy]);
    renderRef.current = false;
  });
}

const [metrics, setMetrics] = useState({
  visited: 0,
  path: 0,
  time: 0,
});

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

function handleGenerateMaze() {
  const newGrid = generateMaze(grid);
  setGrid([...newGrid]);
}

function resetGrid() {
  const fresh = createGrid();
  setGrid(fresh);
}

function handleSave() {
  saveGrid(grid);
}

function handleLoad() {
  const data = loadGrid();

  if (data) {
    setGrid(data);
  }
}

function getStartNode() {
  return grid.flat().find(node => node.isStart);
}

function getEndNode() {
  return grid.flat().find(node => node.isEnd);
}

function resetNodes() {
  const newGrid = grid.map(row =>
    row.map(node => ({
      ...node,

      visited: false,
      isPath: false,

      distance: Infinity,
      previous: null,

      g: Infinity,
      h: 0,
      f: Infinity,
    }))
  );

  setGrid(newGrid);
  return newGrid;
}
async function runDijkstra() {
  const freshGrid = resetNodes();

  const start = freshGrid.flat().find(n => n.isStart);
  const end = freshGrid.flat().find(n => n.isEnd);

  const visitedNodes = dijkstra(freshGrid, start, end);
  const pathNodes = getShortestPath(end);

  // 1. Animate VISITED nodes first
  for (let i = 0; i < visitedNodes.length; i++) {
    const node = visitedNodes[i];

    node.visited = true;

    setGrid(prev => [...prev]);

    await new Promise(r => setTimeout(r, speed));
  }

  // 2. Animate SHORTEST PATH second
  for (let i = 0; i < pathNodes.length; i++) {
    const node = pathNodes[i];

    node.isPath = true;

    setGrid(prev => [...prev]);

    await new Promise(r => setTimeout(r, 60));
  }
}

function runAStar() {
  const startTime = performance.now();

  const freshGrid = resetNodes();

  const start = freshGrid.flat().find(n => n.isStart);
  const end = freshGrid.flat().find(n => n.isEnd);

  const visitedNodes = astar(freshGrid, start, end);

  const path = getShortestPath(end);

  play({
    visitedNodes,
    onVisit: (node) => {
      node.visited = true;
      setGrid([...freshGrid]);
    },
    onVisit: (node) => {
  node.visited = true;
  triggerRender([...freshGrid]);
},
    onFinish:async () => {
  for (const node of path) {
    node.isPath = true;
    setGrid([...freshGrid]);
    await new Promise(r => setTimeout(r, 80));
      }

      setGrid([...freshGrid]);

      const endTime = performance.now();

      setMetrics({
        visited: visitedNodes.length,
        path: path.length,
        time: Math.round(endTime - startTime),
      });
    },
  });
}
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">

      <h1 className="text-center text-2xl md:text-4xl font-bold py-4 md:py-6">
        Pathfinding Visualizer
      </h1>

      <div className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md p-2 md:p-3 border-b border-slate-700 overflow-x-auto">
      <Toolbar
  runDijkstra={runDijkstra}
  runAStar={runAStar}
  pause={pause}
  speed={speed}
  setSpeed={setSpeed}
  generateMaze={handleGenerateMaze}
  resetGrid={resetGrid}
  saveGrid={handleSave}
  loadGrid={handleLoad}
/>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-2 md:px-4 py-4">
        <Grid
  grid={grid}
  onMouseDown={handleMouseDown}
  onMouseEnter={handleMouseEnter}
  onMouseUp={handleMouseUp}
/>
      </div>

      <div className="sticky bottom-0 z-50 bg-slate-900/90 backdrop-blur-md p-2 md:p-3 border-t border-slate-700">
        <Metrics
  visitedCount={metrics.visited}
  pathLength={metrics.path}
  time={metrics.time}
/>
      </div>

      <div className="text-center py-4 md:py-6 px-2 text-sm md:text-base">

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