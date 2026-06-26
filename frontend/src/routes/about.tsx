import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle, Bug, Globe2, Brain, Activity, Dna } from "lucide-react";
import { Eyebrow, Heading, Reveal, Section, TiltCard } from "../components/site/ui";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Neurocysticercosis — NCC Gene Classification" },
      { name: "description", content: "Overview of Neurocysticercosis: symptoms, transmission, global impact, and why gene expression analysis matters." },
    ],
  }),
  component: About,
});

function About() {
  const cards = [
    { icon: Brain, title: "Disease Overview", body: "Neurocysticercosis (NCC) is a parasitic infection of the central nervous system caused by the larval stage of Taenia solium. It is the most common parasitic disease of the human brain." },
    { icon: AlertCircle, title: "Symptoms", body: "Seizures, chronic headache, intracranial hypertension, focal neurological deficits and cognitive disturbances depending on cyst location and host response." },
    { icon: Bug, title: "Transmission", body: "Acquired by ingesting Taenia solium eggs through contaminated food or water. Poor sanitation and free-roaming pigs are major risk amplifiers." },
    { icon: Globe2, title: "Global Impact", body: "Endemic across Latin America, sub-Saharan Africa and parts of Asia. Recognised by the WHO as a leading cause of preventable epilepsy worldwide." },
  ];
  return (
    <>
      <Section className="pt-12">
        <Reveal>
          <Eyebrow>About the disease</Eyebrow>
          <Heading className="mt-4 max-w-4xl">What is <span className="text-gradient">Neurocysticercosis?</span></Heading>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            A neglected tropical disease at the intersection of public health, parasitology and neurology — and an open frontier for AI-driven discovery.
          </p>
        </Reveal>
        <div className="mt-14 grid sm:grid-cols-2 gap-5">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <TiltCard className="h-full">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 grid place-items-center rounded-xl glass shrink-0">
                    <c.icon className="h-5 w-5 text-cyan" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-display text-2xl">{c.title}</div>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.body}</p>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
          <Reveal>
            <Eyebrow>Why gene expression</Eyebrow>
            <Heading className="mt-4">Reading the <span className="text-gradient">molecular signal.</span></Heading>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Gene expression profiling enables researchers to study molecular changes associated with disease progression. Significant genes can act as biomarkers and improve understanding of disease mechanisms.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { k: "log2FC", v: "magnitude" },
                { k: "p < 0.05", v: "significance" },
                { k: "RF", v: "classifier" },
              ].map((b) => (
                <div key={b.k} className="glass rounded-xl p-3 text-center">
                  <div className="font-mono text-cyan text-sm">{b.k}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{b.v}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <TiltCard className="relative overflow-hidden h-[420px]">
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="relative h-full grid grid-cols-2 gap-3 content-center">
                {[
                  { i: Dna, t: "Up-regulated", n: 487, c: "text-cyan" },
                  { i: Dna, t: "Down-regulated", n: 312, c: "text-magenta" },
                  { i: Activity, t: "Significant", n: 799, c: "text-electric" },
                  { i: Brain, t: "Biomarkers", n: 42, c: "text-teal" },
                ].map((x, i) => (
                  <div key={i} className="rounded-xl glass p-4">
                    <x.i className={`h-5 w-5 ${x.c}`} />
                    <div className="mt-3 font-mono text-3xl">{x.n}</div>
                    <div className="text-xs text-muted-foreground mt-1">{x.t}</div>
                  </div>
                ))}
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
