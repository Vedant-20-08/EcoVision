import * as React from "react";

/** Animates a number from 0 (or previous value) to `target` over `durationMs`. */
export function useCountUp(target: number, durationMs = 1200): number {
  const [value, setValue] = React.useState(0);
  const frame = React.useRef<number>(0);
  const startVal = React.useRef(0);

  React.useEffect(() => {
    startVal.current = value;
    const startTime = performance.now();

    function tick(now: number) {
      const progress = Math.min(1, (now - startTime) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const next = startVal.current + (target - startVal.current) * eased;
      setValue(next);
      if (progress < 1) {
        frame.current = requestAnimationFrame(tick);
      }
    }

    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, durationMs]);

  return value;
}
