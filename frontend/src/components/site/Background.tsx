import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#050816]" />
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-cyan/20 blur-[120px] animate-aurora" />
      <div className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-electric/25 blur-[120px] animate-aurora" style={{ animationDelay: "-6s" }} />
      <div className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full bg-magenta/15 blur-[120px] animate-aurora" style={{ animationDelay: "-12s" }} />
      <Particles />
    </div>
  );
}

function Particles() {
  const [pts] = useState(() =>
    Array.from({ length: 40 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      d: 4 + Math.random() * 8,
      s: 0.3 + Math.random() * 0.6,
    }))
  );
  return (
    <svg className="absolute inset-0 w-full h-full opacity-60">
      {pts.map((p, i) => (
        <motion.circle
          key={i}
          cx={`${p.x}%`}
          cy={`${p.y}%`}
          r={p.s * 2}
          fill="#22D3EE"
          animate={{ cy: [`${p.y}%`, `${(p.y + 10) % 100}%`, `${p.y}%`], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 6 + p.d, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}

export function DNAHelix({ className = "" }: { className?: string }) {
  const points = Array.from({ length: 24 }, (_, i) => i);
  return (
    <div className={`relative ${className}`} style={{ perspective: "1000px" }}>
      <div className="absolute inset-0 animate-helix" style={{ transformStyle: "preserve-3d" }}>
        {points.map((i) => {
          const angle = (i / points.length) * Math.PI * 4;
          const y = (i / points.length) * 100 - 50;
          const x1 = Math.cos(angle) * 40;
          const x2 = Math.cos(angle + Math.PI) * 40;
          const z1 = Math.sin(angle) * 40;
          const z2 = Math.sin(angle + Math.PI) * 40;
          return (
            <div key={i} className="absolute left-1/2 top-1/2" style={{ transform: `translate3d(0, ${y * 3}px, 0)`, transformStyle: "preserve-3d" }}>
              <div className="absolute h-2 w-2 rounded-full bg-cyan shadow-[0_0_12px_#22D3EE]" style={{ transform: `translate3d(${x1}px, 0, ${z1}px)` }} />
              <div className="absolute h-2 w-2 rounded-full bg-magenta shadow-[0_0_12px_#EC4899]" style={{ transform: `translate3d(${x2}px, 0, ${z2}px)` }} />
              <div className="absolute h-px bg-gradient-to-r from-cyan/60 to-magenta/60" style={{ width: "80px", transform: `translate3d(${Math.min(x1,x2)}px, 0, ${(z1+z2)/2}px)` }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function NeuralNet({ className = "" }: { className?: string }) {
  const layers = [4, 6, 6, 3];
  const W = 400, H = 280;
  const nodes = layers.flatMap((count, li) =>
    Array.from({ length: count }, (_, ni) => ({
      x: (W / (layers.length + 1)) * (li + 1),
      y: (H / (count + 1)) * (ni + 1),
      li, ni,
    }))
  );
  const edges: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let li = 0; li < layers.length - 1; li++) {
    const a = nodes.filter(n => n.li === li);
    const b = nodes.filter(n => n.li === li + 1);
    a.forEach(n1 => b.forEach(n2 => edges.push({ x1: n1.x, y1: n1.y, x2: n2.x, y2: n2.y })));
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className}>
      <defs>
        <linearGradient id="ed" x1="0" x2="1">
          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#EC4899" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {edges.map((e, i) => (
        <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke="url(#ed)" strokeWidth="0.5" className="animate-dash" />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={i} cx={n.x} cy={n.y} r="4" fill="#22D3EE"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, delay: i * 0.05, repeat: Infinity }}
          style={{ filter: "drop-shadow(0 0 6px #22D3EE)" }}
        />
      ))}
    </svg>
  );
}

export function useMagnetic() {
  useEffect(() => {}, []);
}
