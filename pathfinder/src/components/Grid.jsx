import Node from "./Node";

function Grid({
  grid,
  cellSize,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) {
  const boardWidth = grid[0]?.length ? grid[0].length * cellSize : 0;

  return (
    <div className="w-full overflow-x-auto overflow-y-hidden flex justify-center p-2">
      <div
        className="inline-flex flex-col"
        style={{ width: boardWidth }}
      >
      {grid.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex shrink-0"
        >
          {row.map((node) => (
            <Node
              key={`${node.row}-${node.col}`}
              node={node}
              cellSize={cellSize}
              onMouseDown={onMouseDown}
              onMouseEnter={onMouseEnter}
              onMouseUp={onMouseUp}
            />
          ))}
        </div>
      ))}
      </div>
    </div>
  );
}

export default Grid;