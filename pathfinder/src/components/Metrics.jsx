function Metrics({
  visitedCount,
  pathLength,
  time,
}) {
  return (
    <div className="flex flex-wrap justify-center gap-3 text-xs sm:text-sm mt-3">
      <div>
        Visited:{" "}
        <span className="text-blue-400">
          {visitedCount}
        </span>
      </div>

      <div>
        Path:{" "}
        <span className="text-yellow-400">
          {pathLength}
        </span>
      </div>

      <div>
        Time:{" "}
        <span className="text-green-400">
          {time} ms
        </span>
      </div>
    </div>
  );
}

export default Metrics;