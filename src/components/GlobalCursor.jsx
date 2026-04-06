import { useEffect, useRef } from "react";
import { C } from "../constants";

export function GlobalCursor() {
  const canvasRef = useRef();
  const pos = useRef({ x: -100, y: -100 });
  const cur = useRef({ x: -100, y: -100 });
  const raf = useRef();
  const SIZE = 80; 

  useEffect(() => {
    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const draw = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.15;
      cur.current.y += (pos.current.y - cur.current.y) * 0.15;

      const cx = SIZE / 2;
      const cy = SIZE / 2;

      ctx.clearRect(0, 0, SIZE, SIZE);

      // Blob style
      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.fillStyle = C.neon;
      ctx.fill();

      // Outer ring
      ctx.beginPath();
      ctx.arc(cx, cy, 24, 0, Math.PI * 2);
      ctx.strokeStyle = `${C.neon}60`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      canvas.style.left = cur.current.x - SIZE / 2 + "px";
      canvas.style.top  = cur.current.y - SIZE / 2 + "px";

      raf.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={SIZE}
      height={SIZE}
      style={{
        position: "fixed",
        top: 0, left: 0,
        pointerEvents: "none",
        zIndex: 99999,
        mixBlendMode: "difference", // Gives that cool inverted F1 look
      }}
    />
  );
}
