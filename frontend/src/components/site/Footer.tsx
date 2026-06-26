import { Dna, Github, Mail, Twitter } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-cyan/10">
      <div className="absolute inset-0 -z-10 opacity-40 grid-bg" />
      <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center h-10 w-10 rounded-xl glass">
              <Dna className="h-5 w-5 text-cyan" />
            </span>
            <div>
              <div className="font-display text-xl">NCC Gene Expression ML</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">bioinformatics research platform</div>
            </div>
          </div>
          <p className="mt-5 text-sm text-muted-foreground max-w-md leading-relaxed">
            Machine Learning-Based Identification of Disease-Associated Genes in Neurocysticercosis Using Gene Expression Analysis and Random Forest Classification.
          </p>
          <div className="mt-6 flex gap-3">
            {[Github, Twitter, Mail].map((I, i) => (
              <a key={i} href="#" className="h-10 w-10 grid place-items-center rounded-lg glass hover:glow-cyan transition-all hover:-translate-y-0.5">
                <I className="h-4 w-4 text-cyan" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan">Platform</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link></li>
            <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About NCC</Link></li>
            <li><Link to="/dashboard" className="text-muted-foreground hover:text-foreground">Prediction Dashboard</Link></li>
            <li><Link to="/research" className="text-muted-foreground hover:text-foreground">Research Impact</Link></li>
            <li><Link to="/team" className="text-muted-foreground hover:text-foreground">Project Team</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan">Stack</div>
          <ul className="mt-4 space-y-2 text-sm font-mono text-muted-foreground">
            <li>Random Forest · v1.4</li>
            <li>Transcriptomics</li>
            <li>Differential Expression</li>
            <li>21 Biological Samples</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cyan/10">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground font-mono">
          <span>© 2026 NCC Gene Expression ML · All rights reserved</span>
          <span>Built for research · Not for clinical use</span>
        </div>
      </div>
    </footer>
  );
}
