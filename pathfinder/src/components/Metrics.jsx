function Metrics({
  visitedCount,
  pathLength,
  time,
}) {
  return (
    <div className="flex gap-6 justify-center mt-4 text-white">
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