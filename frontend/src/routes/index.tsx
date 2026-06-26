import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Activity, Brain, Cpu, Database, Dna, Sparkles, ArrowRight, Microscope } from "lucide-react";
import { DNAHelix, NeuralNet } from "../components/site/Background";
import { Counter, Eyebrow, GlowButton, Heading, Reveal, Section, TiltCard } from "../components/site/ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NCC Gene Classification — AI Platform for Neurocysticercosis Research" },
      { name: "description", content: "Bioinformatics platform leveraging Random Forest and transcriptomic analysis to classify disease-associated genes." },
    ],
  }),
  component: Home,
});

const stats = [
  { value: 12356, label: "Genes Analyzed", suffix: "" },
  { value: 95.7, label: "Model Accuracy", suffix: "%", decimals: 1 },
  { value: 21, label: "Biological Samples", suffix: "" },
  { value: 0, label: "Classifier", text: "Random Forest" },
];

function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <WhyPlatform />
      <Pipeline />
    </>
  );
}

function Hero() {
  const navigate = Route.useNavigate();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  console.log("Selected:", file.name);

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      body: formData,
    });

   
    const data = await response.json();

// Save latest predictions
localStorage.setItem(
  "predictions",
  JSON.stringify(data)
);

// -------------------------
// Save Prediction History
// -------------------------

const history = JSON.parse(
  localStorage.getItem("history") || "[]"
);

history.unshift({
  fileName: file.name,
  date: new Date().toLocaleString(),
  disease: data.filter((x: any) => x.Prediction === 1).length,
  normal: data.filter((x: any) => x.Prediction === 0).length,
  predictions: data
});

localStorage.setItem(
  "history",
  JSON.stringify(history)
);

// Keep only latest 10 uploads
if (history.length > 10) {
  history.length = 10;
  localStorage.setItem(
    "history",
    JSON.stringify(history)
  );
}
    // Show actual backend error if any
    if (!response.ok) {
      alert(`Backend error: ${data.error || "Unknown error"}`);
      return;
    }

    if (!Array.isArray(data)) {
      alert("Backend returned an invalid response.");
      return;
    }

    localStorage.setItem("predictions", JSON.stringify(data));
    navigate({ to: "/dashboard" });

  } catch (error) {
    console.error("Upload failed:", error);
    alert(`Upload failed: ${error instanceof Error ? error.message : String(error)}`);
  }
};

  return (
    <section className="relative min-h-[calc(100vh-6rem)] flex items-center overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center w-full">
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Eyebrow>Bioinformatics · Machine Learning · Healthcare AI</Eyebrow>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight"
          >
            Neurocysticercosis <span className="text-gradient">Classification</span> Using Gene Expression Analysis
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed"
          >
            An intelligent bioinformatics platform that leverages machine learning and transcriptomic analysis to identify
            disease-associated genes and support Neurocysticercosis research.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <input
              type="file"
              id="geneFile"
              accept=".csv"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
            <GlowButton onClick={() => document.getElementById("geneFile")?.click()}>
              Analyze Gene Expression Data
            </GlowButton>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-12 grid grid-cols-3 gap-px rounded-2xl glass overflow-hidden max-w-lg"
          >
            {[
              { k: "v1.4.2", v: "Model" },
              { k: "TsM", v: "Genome" },
              { k: "RNA-Seq", v: "Pipeline" },
            ].map((b) => (
              <div key={b.k} className="px-4 py-3 bg-[#050816]/40">
                <div className="font-mono text-sm text-cyan">{b.k}</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">{b.v}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative h-[520px]"
        >
          <div className="absolute inset-0 rounded-3xl glass overflow-hidden">
            <NeuralNet className="absolute inset-0 w-full h-full opacity-40" />
            <div className="absolute inset-0 grid place-items-center">
              <BrainOrb />
            </div>
            <DNAHelix className="absolute right-6 top-1/2 -translate-y-1/2 h-[400px] w-[120px]" />
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" /> live inference
              </div>
              <div className="font-mono text-[10px] text-muted-foreground">cluster · ncc-rf-01</div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2 text-[10px] font-mono">
              {[
                ["TsM_00481", "↑ 4.2"],
                ["TsM_01193", "↑ 2.7"],
                ["TsM_07820", "↓ 1.9"],
              ].map(([g, v]) => (
                <div key={g} className="rounded-md bg-[#050816]/60 border border-cyan/20 px-2 py-1.5">
                  <div className="text-cyan">{g}</div>
                  <div className="text-muted-foreground">log2FC {v}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BrainOrb() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative h-72 w-72 group"
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan/40 via-electric/30 to-magenta/30 blur-2xl group-hover:blur-3xl transition-all" />
      <div className="absolute inset-6 rounded-full glass grid place-items-center animate-pulse-glow">
        <Brain className="h-28 w-28 text-cyan group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
      </div>
      <div className="absolute inset-0 animate-spin-slow">
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <div
            key={deg}
            className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -ml-0.5 -mt-0.5 rounded-full bg-cyan shadow-[0_0_10px_#22D3EE]"
            style={{ transform: `rotate(${deg}deg) translateY(-140px)` }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function Stats() {
  return (
    <Section>
      <Reveal>
        <Eyebrow>Platform metrics</Eyebrow>
        <Heading className="mt-4 max-w-2xl">
          Trained on real <span className="text-gradient">transcriptomic data.</span>
        </Heading>
      </Reveal>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <TiltCard>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan">{s.label}</div>
              <div className="mt-4 font-mono text-4xl md:text-5xl text-foreground">
                {s.text ? (
                  <span className="text-gradient">{s.text}</span>
                ) : (
                  <Counter to={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                )}
              </div>
              <div className="mt-4 h-1 rounded-full bg-cyan/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-cyan to-magenta"
                />
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function WhyPlatform() {
  const features = [
    { icon: Microscope, title: "Differential Expression", desc: "Identify statistically significant up- and down-regulated transcripts across conditions." },
    { icon: Cpu, title: "Random Forest Classifier", desc: "Ensemble learning trained on selected features delivering 95.7% validation accuracy." },
    { icon: Database, title: "Transcriptomic Pipeline", desc: "End-to-end ingestion of RNA-Seq matrices with normalization and quality control." },
    { icon: Activity, title: "Biomarker Discovery", desc: "Surface gene candidates that act as disease biomarkers for downstream research." },
  ];

  return (
    <Section>
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
        <Reveal>
          <Eyebrow>Why this platform</Eyebrow>
          <Heading className="mt-4">
            Faster biological insight, <span className="text-gradient">less manual effort.</span>
          </Heading>
          <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
            The platform combines differential gene expression analysis and machine learning to automatically identify
            disease-associated genes from transcriptomic datasets. It reduces manual effort and provides researchers
            with faster biological insights.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 glass rounded-2xl px-5 py-4">
            <Sparkles className="h-5 w-5 text-cyan" />
            <div>
              <div className="text-sm font-medium">Reproducible research</div>
              <div className="text-xs text-muted-foreground font-mono">deterministic seeds · versioned models</div>
            </div>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-5">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <TiltCard className="h-full">
                <div className="h-10 w-10 grid place-items-center rounded-xl bg-gradient-to-br from-cyan/20 to-electric/20 border border-cyan/30">
                  <f.icon className="h-5 w-5 text-cyan" />
                </div>
                <div className="mt-4 font-display text-xl">{f.title}</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Pipeline() {
  const steps = [
    { icon: Database, title: "Ingest", desc: "RNA-Seq count matrix · 21 samples", id: "01" },
    { icon: Microscope, title: "DEG Analysis", desc: "Differential expression filtering", id: "02" },
    { icon: Dna, title: "Feature Selection", desc: "Top variable genes retained", id: "03" },
    { icon: Cpu, title: "Random Forest", desc: "500 estimators · stratified CV", id: "04" },
    { icon: Activity, title: "Classification", desc: "Disease vs not-disease label", id: "05" },
  ];

  return (
    <Section>
      <Reveal>
        <Eyebrow>End-to-end pipeline</Eyebrow>
        <Heading className="mt-4 max-w-3xl">
          From raw counts to <span className="text-gradient">classified genes.</span>
        </Heading>
      </Reveal>
      <div className="mt-14 relative">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent hidden lg:block" />
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
          {steps.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.1}>
              <TiltCard className="text-center">
                <div className="font-mono text-[10px] text-cyan/70">{s.id}</div>
                <div className="mt-3 mx-auto h-12 w-12 grid place-items-center rounded-xl glass animate-pulse-glow">
                  <s.icon className="h-5 w-5 text-cyan" />
                </div>
                <div className="mt-4 font-display text-lg">{s.title}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.desc}</div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}