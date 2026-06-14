
function Node({
  node,
  cellSize,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) {
  let classes = "border border-slate-700 shrink-0";

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
      style={{
        width: cellSize,
        height: cellSize,
      }}
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
export default Node;