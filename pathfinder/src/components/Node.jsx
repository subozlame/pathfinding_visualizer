
function Node({
  node,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) {
  let classes =
  "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border border-slate-700";

if (node.isStart)
  classes += " bg-green-500";

else if (node.isEnd)
  classes += " bg-red-500";

else if (node.isWall)
  classes += " bg-slate-900";

else if (node.isPath)
  classes += " bg-yellow-400";

else if (node.visited)
  classes += " bg-sky-400";

else
  classes += " bg-white";

  return (
    <div
      className={classes}
      onMouseDown={() =>
        onMouseDown(node)
      }
      onMouseEnter={() =>
        onMouseEnter(node)
      }
      onMouseUp={onMouseUp}
    />
  );
}
function resetNodes() {
  const newGrid = [...grid];

  for (const row of newGrid) {
    for (const node of row) {

      node.visited = false;

      node.isPath = false;

      node.distance =
        Infinity;

      node.g = Infinity;

      node.h = 0;

      node.f = Infinity;

      node.previous =
        null;
    }
  }

  setGrid(newGrid);

  return newGrid;
}
export default Node;