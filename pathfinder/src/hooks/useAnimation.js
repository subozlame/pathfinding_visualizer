import { useRef, useState } from "react";

export default function useAnimation() {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(30);

  const indexRef = useRef(0);
  const pausedRef = useRef(false);
  const rafRef = useRef(null);

  function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  function clear() {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
  }

  function pause() {
    pausedRef.current = true;
    setIsRunning(false);
  }

  function resume() {
    pausedRef.current = false;
  }

  async function play({
    visitedNodes,
    onVisit,
    onFinish,
  }) {
    setIsRunning(true);
    pausedRef.current = false;

    for (
      indexRef.current = 0;
      indexRef.current < visitedNodes.length;
      indexRef.current++
    ) {
      if (pausedRef.current) {
        setIsRunning(false);
        return;
      }

      const node =
        visitedNodes[indexRef.current];

      onVisit(node);

      // Smooth delay controlled by speed
      await sleep(50 + speed * 2);
    }

    setIsRunning(false);
    onFinish?.();
  }

  function reset() {
    pausedRef.current = true;
    indexRef.current = 0;
    setIsRunning(false);
  }

  return {
    play,
    pause,
    resume,
    reset,
    isRunning,
    speed,
    setSpeed,
  };
}