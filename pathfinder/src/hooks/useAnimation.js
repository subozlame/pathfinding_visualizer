import { useRef, useState } from "react";

export default function useAnimation() {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(20);

  const timeoutRef = useRef(null);
  const indexRef = useRef(0);

  function clear() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  function play({
    visitedNodes,
    onVisit,
    onFinish,
  }) {
    setIsRunning(true);

    function step() {
      if (indexRef.current >= visitedNodes.length) {
        setIsRunning(false);
        onFinish?.();
        return;
      }

      const node = visitedNodes[indexRef.current];

      onVisit(node);

      indexRef.current++;

      timeoutRef.current = setTimeout(
        step,
        speed
      );
    }

    step();
  }

  function pause() {
    clear();
    setIsRunning(false);
  }

  function reset() {
    clear();
    indexRef.current = 0;
    setIsRunning(false);
  }

  function setAnimationSpeed(value) {
    setSpeed(value);
  }

  return {
    play,
    pause,
    reset,
    isRunning,
    speed,
    setAnimationSpeed,
  };
}