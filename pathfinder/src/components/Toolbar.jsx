function Toolbar({
  runDijkstra,
  runAStar,
  pause,
  speed,
  setSpeed,
}) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-4 text-white">

      <button
        onClick={runDijkstra}
        className="bg-blue-600 px-4 py-2 rounded"
      >
        Dijkstra
      </button>

      <button
        onClick={runAStar}
        className="bg-purple-600 px-4 py-2 rounded"
      >
        A*
      </button>

      <button
        onClick={pause}
        className="bg-red-600 px-4 py-2 rounded"
      >
        Pause
      </button>

      <div className="flex items-center gap-2">
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