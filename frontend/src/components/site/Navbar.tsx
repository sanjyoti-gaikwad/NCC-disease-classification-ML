import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Dna } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About NCC" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/research", label: "Research" },
  { to: "/team", label: "Team" },
] as const;

export function Navbar() {
  const { location } = useRouterState();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 backdrop-blur-2xl bg-[#050816]/70 border-b border-cyan/10" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="relative grid place-items-center h-9 w-9 rounded-xl glass">
            <Dna className="h-4 w-4 text-cyan transition-transform group-hover:rotate-180 duration-700" />
            <span className="absolute inset-0 rounded-xl animate-pulse-glow opacity-50" />
          </span>
          <div className="leading-tight">
            <div className="font-display text-lg tracking-tight">NCC<span className="text-cyan"> · </span>Gene</div>
            <div className="font-mono text-[9px] text-muted-foreground uppercase tracking-[0.2em]">classification ai</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-1.5">
          {links.map((l) => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className="relative px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan/20 to-electric/20 border border-cyan/30"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className={`relative ${active ? "text-cyan" : ""}`}>{l.label}</span>
              </Link>
            );
          })}
        </nav>
        
      </div>
    </motion.header>
  );
}
