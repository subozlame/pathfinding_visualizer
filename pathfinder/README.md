# 🧭 Pathfinding Visualizer (React + Tailwind + Vite)

A interactive **Pathfinding Algorithm Visualizer** built using **React, Vite, and Tailwind CSS**.  
This project demonstrates how classical graph algorithms like **Dijkstra’s Algorithm** and **A\*** work in real time through step-by-step animation.

---

## 🚀 Features

### 📊 Algorithms

- Dijkstra’s Algorithm (Guaranteed shortest path)
- A\* Search Algorithm (Heuristic-based optimization)

### 🎨 Visualization

- Real-time visited node animation
- Shortest path highlighting
- Smooth step-by-step traversal
- Adjustable animation speed

### 🧱 Grid System

- Interactive grid-based canvas
- Click & drag to create walls
- Drag start and end nodes
- Responsive layout (desktop + mobile)

### 🌿 Maze Generation

- Random maze generation using DFS algorithm
- Ensures solvable paths
- Great for testing algorithms

### 🎮 Controls

- Start / Pause animation
- Speed control slider
- Reset grid
- Generate random maze
- Run Dijkstra / A\*

### 💾 Persistence

- Save grid to localStorage
- Load previous session state

---

## 🧠 How It Works

### 1. Grid Representation

The grid is treated as a graph:

- Each cell = node
- Each node connects to 4 neighbors (up, down, left, right)

---

### 2. Dijkstra’s Algorithm

- Uses priority-based exploration
- Visits closest nodes first
- Guarantees shortest path

---

### 3. A\* Algorithm

- Uses heuristic (Manhattan distance)
- Prioritizes goal-directed search
- Faster than Dijkstra in most cases

---

### 4. Animation System

- Algorithms return ordered `visitedNodes`
- UI animates nodes one-by-one using async loop
- Separate animation for shortest path

---

## 🏗️ Tech Stack

- React (Frontend UI)
- Vite (Build tool)
- Tailwind CSS (Styling)
- JavaScript (Logic)

---

## 📁 Project Structure

src/
│
├── algorithms/
│ ├── astar.js
│ └── dijkstra.js
│
├── components/
│ ├── Grid.jsx
│ ├── Node.jsx
│ ├── Toolbar.jsx
│ └── Metrics.jsx
│
├── hooks/
│ └── useAnimation.js
│
├── utils/
│ ├── createGrid.js
│ ├── getNeighbors.js
│ ├── getShortestPath.js
│ ├── mazeGenerator.js
│ └── localStorage.js
│
├── App.jsx
├── main.jsx
└── index.css

---

## ⚙️ Installation & Setup

### 1. Clone project

```bash
git clone <your-repo-url>
cd pathfinding-visualizer
```

2. Install dependencies

```bash
npm install
```

3. Run development server

```bash
npm run dev
```

App runs at:

http://localhost:5173

4. Build for production

```bash
npm run build
```
