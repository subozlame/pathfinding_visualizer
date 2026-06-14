function Toolbar({
  runDijkstra,
  runAStar,
  pause,
  resume,
  isPaused,
  speed,
  setSpeed,
  generateMaze,
  resetGrid,
  saveGrid,
  loadGrid,
}) {
  return (
    <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 text-white">

      <button
        onClick={runDijkstra}
       className="bg-blue-600 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm rounded"
      >
        Dijkstra
      </button>

      <button
        onClick={runAStar}
        className="bg-blue-600 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm rounded"
      >
        A*
      </button>

      <button
        onClick={generateMaze}
        className="bg-blue-600 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm rounded"
      >
        Maze
      </button>

      <button
        onClick={resetGrid}
        className="bg-blue-600 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm rounded"
      >
        Reset
      </button>

      <button
        onClick={saveGrid}
        className="bg-blue-600 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm rounded"
      >
        Save
      </button>

      <button
        onClick={loadGrid}
       className="bg-blue-600 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm rounded"
      >
        Load
      </button>

      <button
        onClick={isPaused ? resume : pause}
        className="bg-blue-600 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm rounded"
      >
        {isPaused ? "Resume" : "Pause"}
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