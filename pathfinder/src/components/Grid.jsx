import Node from "./Node";

function Grid({
  grid,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) {
  return (
    <div className="inline-block w-full overflow-auto flex justify-center p-2">
      {grid.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex"
        >
          {row.map((node) => (
            <Node
              key={`${node.row}-${node.col}`}
              node={node}
              onMouseDown={onMouseDown}
              onMouseEnter={onMouseEnter}
              onMouseUp={onMouseUp}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Grid;