import { useEffect, useRef } from "react";

type Dash = { x: number; len: number };
type Lane = { y: number; speed: number; dir: 1 | -1; rgb: string; dashes: Dash[] };

// Horizontal "data lanes": neighbouring lanes run in opposite directions,
// and lanes near the cursor speed up and glow.
export default function Background() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { y: -1 };
    let w = 0;
    let h = 0;
    let raf = 0;
    let lanes: Lane[] = [];

    const build = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = innerWidth;
      h = innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lanes = [];
      for (let y = 14; y < h; y += 28) {
        const dir = lanes.length % 2 === 0 ? 1 : -1;
        lanes.push({
          y,
          dir,
          speed: 0.25 + Math.random() * 1.2,
          rgb: dir === 1 ? "94,242,255" : "169,139,255",
          dashes: Array.from({ length: 2 + Math.floor(Math.random() * 3) }, () => ({
            x: Math.random() * w,
            len: 24 + Math.random() * 140,
          })),
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const l of lanes) {
        ctx.strokeStyle = "rgba(255,255,255,0.03)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, l.y + 0.5);
        ctx.lineTo(w, l.y + 0.5);
        ctx.stroke();

        const near = mouse.y < 0 ? 0 : Math.max(0, 1 - Math.abs(l.y - mouse.y) / 160);
        for (const d of l.dashes) {
          if (!reduce) d.x += l.speed * l.dir * (1 + near * 3);
          if (l.dir === 1 && d.x > w) d.x = -d.len;
          if (l.dir === -1 && d.x + d.len < 0) d.x = w;

          const a = 0.12 + near * 0.6;
          const g = ctx.createLinearGradient(d.x, 0, d.x + d.len, 0);
          const head = `rgba(${l.rgb},${a})`;
          const tail = `rgba(${l.rgb},0)`;
          g.addColorStop(0, l.dir === 1 ? tail : head);
          g.addColorStop(1, l.dir === 1 ? head : tail);
          ctx.strokeStyle = g;
          ctx.lineWidth = 1 + near;
          ctx.beginPath();
          ctx.moveTo(d.x, l.y + 0.5);
          ctx.lineTo(d.x + d.len, l.y + 0.5);
          ctx.stroke();
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.y = -1;
    };
    const onResize = () => {
      build();
      if (reduce) draw();
    };

    build();
    draw();
    addEventListener("resize", onResize);
    addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", onResize);
      removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <canvas
        ref={ref}
        className="pointer-events-none fixed inset-0 -z-10 h-full w-full transition-[filter] duration-700"
      />
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 15%, rgba(94,242,255,0.07), transparent 70%), radial-gradient(50% 50% at 90% 85%, rgba(169,139,255,0.08), transparent 70%), radial-gradient(120% 90% at 50% 50%, transparent 40%, #07070b 100%)",
        }}
      />
    </>
  );
}
