import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, type ReactNode, type MouseEvent } from "react";

export function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`relative mx-auto max-w-7xl px-6 py-24 ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[10px] font-mono uppercase tracking-[0.25em] text-cyan">
      <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
      {children}
    </div>
  );
}

export function Heading({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h2 className={`font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] ${className}`}>{children}</h2>;
}

export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useTransform(y, [-50, 50], [8, -8]);
  const ry = useTransform(x, [-50, 50], [-8, 8]);
  const sx = useSpring(rx, { stiffness: 150, damping: 15 });
  const sy = useSpring(ry, { stiffness: 150, damping: 15 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current!.getBoundingClientRect();
    x.set(e.clientX - r.left - r.width / 2);
    y.set(e.clientY - r.top - r.height / 2);
  };
  const onLeave = () => { x.set(0); y.set(0); };
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: sx, rotateY: sy, transformStyle: "preserve-3d" }}
      className={`relative glass rounded-2xl p-6 transition-shadow hover:shadow-[0_20px_60px_-15px_rgba(34,211,238,0.4)] hover:-translate-y-1 duration-500 group ${className}`}
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="absolute inset-px rounded-2xl shimmer" />
      </div>
      <div style={{ transform: "translateZ(20px)" }}>{children}</div>
    </motion.div>
  );
}

export function Counter({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const dur = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = to * eased;
      if (ref.current) ref.current.textContent = v.toFixed(decimals) + suffix;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, suffix, decimals]);
  return <span ref={ref} className="font-mono">0{suffix}</span>;
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function GlowButton({ children, variant = "primary", onClick, href }: {
  children: ReactNode; variant?: "primary" | "ghost"; onClick?: () => void; href?: string;
}) {
  const cls = variant === "primary"
    ? "relative overflow-hidden rounded-full px-6 py-3 text-sm font-semibold bg-gradient-to-r from-cyan via-electric to-magenta text-[#050816] hover:scale-[1.03] active:scale-95 transition-transform shadow-[0_10px_40px_-10px_rgba(34,211,238,0.6)] hover:shadow-[0_15px_60px_-10px_rgba(236,72,153,0.6)]"
    : "rounded-full px-6 py-3 text-sm font-semibold glass hover:glow-cyan hover:scale-[1.03] active:scale-95 transition-all";
  const inner = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      {variant === "primary" && (
        <span className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity">
          <span className="absolute inset-0 shimmer" />
        </span>
      )}
    </>
  );
  if (href) return <a href={href} className={cls}>{inner}</a>;
  return <button onClick={onClick} className={cls}>{inner}</button>;
}

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight);
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 inset-x-0 h-0.5 z-[60] bg-cyan/10">
      <div ref={ref} className="h-full bg-gradient-to-r from-cyan via-electric to-magenta origin-left" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}
