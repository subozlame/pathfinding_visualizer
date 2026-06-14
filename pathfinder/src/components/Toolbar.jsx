function Toolbar({
  runDijkstra,
  runAStar,
  pause,
  speed,
  setSpeed,
  generateMaze,
  resetGrid,
  saveGrid,
  loadGrid,
}) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-4 text-white">

      <button
        onClick={runDijkstra}
        className="bg-blue-600 px-3 py-2 rounded"
      >
        Dijkstra
      </button>

      <button
        onClick={runAStar}
        className="bg-purple-600 px-3 py-2 rounded"
      >
        A*
      </button>

      <button
        onClick={generateMaze}
        className="bg-green-600 px-3 py-2 rounded"
      >
        Maze
      </button>

      <button
        onClick={resetGrid}
        className="bg-red-600 px-3 py-2 rounded"
      >
        Reset
      </button>

      <button
        onClick={saveGrid}
        className="bg-yellow-600 px-3 py-2 rounded"
      >
        Save
      </button>

      <button
        onClick={loadGrid}
        className="bg-indigo-600 px-3 py-2 rounded"
      >
        Load
      </button>

      <div className="flex items-center gap-2 ml-4">
        <span>Speed</span>
        <input
          type="range"
          min="1"
          max="100"
          value={speed}
          onChange={(e) =>
            setSpeed(Number(e.target.value))
          }
        />
      </div>

    </div>
  );
}

export default Toolbar;