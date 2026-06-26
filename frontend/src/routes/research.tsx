import { createFileRoute } from "@tanstack/react-router";
import { HeartPulse, Dna, BrainCircuit, FlaskConical } from "lucide-react";
import { Eyebrow, Heading, Reveal, Section, TiltCard } from "../components/site/ui";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research Impact — NCC Gene Classification" },
      { name: "description", content: "How this work contributes to healthcare, bioinformatics, machine learning and computational biology." },
    ],
  }),
  component: Research,
});

const impacts = [
  { icon: HeartPulse, t: "Healthcare", d: "Supports clinical research by surfacing molecular biomarkers that could inform diagnostic strategies for Neurocysticercosis.", color: "from-magenta to-electric" },
  { icon: Dna, t: "Bioinformatics", d: "Demonstrates a reproducible pipeline for differential expression analysis on parasite transcriptomes.", color: "from-cyan to-teal" },
  { icon: BrainCircuit, t: "Machine Learning", d: "Applies Random Forest ensemble learning to a high-dimensional, low-sample biological problem.", color: "from-electric to-magenta" },
  { icon: FlaskConical, t: "Computational Biology", d: "Bridges statistical genomics with predictive modelling to accelerate biological discovery.", color: "from-teal to-cyan" },
];

function Research() {
  return (
    <>
      <Section className="pt-12">
        <Reveal>
          <Eyebrow>Scientific contribution</Eyebrow>
          <Heading className="mt-4 max-w-4xl">Research <span className="text-gradient">Contribution</span></Heading>
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground leading-relaxed">
            This work integrates differential expression analysis with machine learning to identify disease-associated genes in Neurocysticercosis. The framework supports transcriptomic research and demonstrates the potential of AI in healthcare and bioinformatics.
          </p>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 gap-5">
          {impacts.map((c, i) => (
            <Reveal key={c.t} delay={i * 0.08}>
              <TiltCard className="group relative overflow-hidden h-full">
                <div className={`absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-br ${c.color} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity`} />
                <div className="relative">
                  <div className={`h-12 w-12 grid place-items-center rounded-xl bg-gradient-to-br ${c.color} text-[#050816]`}>
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-5 font-display text-2xl">{c.t}</div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
                  <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                    → impact area
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <TiltCard className="relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="relative grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan">Citation</div>
                <div className="mt-3 font-display text-2xl md:text-3xl leading-snug">
                  "Machine Learning-Based Identification of Disease-Associated Genes in Neurocysticercosis Using Gene Expression Analysis and Random Forest Classification."
                </div>
                <div className="mt-4 font-mono text-xs text-muted-foreground">Gaikwad S.P., Najan A.R. · 2026 · Internship Research</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[["12,356","transcripts"],["95.7%","accuracy"],["248","features"],["21","samples"]].map(([n, l]) => (
                  <div key={l} className="rounded-xl glass p-4 text-center">
                    <div className="font-mono text-2xl text-gradient">{n}</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </TiltCard>
        </Reveal>
      </Section>
    </>
  );
}
