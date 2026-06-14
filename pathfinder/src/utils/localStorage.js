const KEY = "pathfinding-grid";

export function saveGrid(grid) {
  localStorage.setItem(
    KEY,
    JSON.stringify(grid)
  );
}

export function loadGrid() {
  const data = localStorage.getItem(KEY);

  if (!data) return null;

  return JSON.parse(data);
}

export function clearGrid() {
  localStorage.removeItem(KEY);
}