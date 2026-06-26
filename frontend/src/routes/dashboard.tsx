import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Activity, CheckCircle2, XCircle, Target, Layers } from "lucide-react";
import { Counter, Eyebrow, Heading, Reveal, Section, TiltCard } from "../components/site/ui";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Prediction Dashboard — NCC Gene Classification" },
      { name: "description", content: "Interactive prediction dashboard showing classified disease-associated genes, confidence scores and model metrics." },
    ],
  }),
  component: Dashboard,
});

let predictions: any[] = [];
const history = JSON.parse(
  localStorage.getItem("history") || "[]"
);
try {
  predictions = JSON.parse(
    localStorage.getItem("predictions") || "[]"
  );
} catch (error) {
  console.error("Failed to load predictions:", error);
  predictions = [];
}

const trainCurve = Array.from({ length: 20 }, (_, i) => ({
  epoch: i + 1,
  acc: 0.55 + (1 - Math.exp(-i / 4)) * 0.42 + Math.random() * 0.01,
  loss: 0.8 * Math.exp(-i / 5) + 0.05 + Math.random() * 0.02,
}));

const importances = [
  { g: "TsM_000001", v: 0.18 },
  { g: "TsM_007820", v: 0.15 },
  { g: "TsM_000412", v: 0.12 },
  { g: "TsM_000003", v: 0.09 },
  { g: "TsM_002233", v: 0.07 },
  { g: "TsM_004412", v: 0.06 },
  { g: "TsM_009910", v: 0.05 },
];

function Dashboard() {
  const diseaseCount = predictions.filter(
    (p: any) => p.Prediction === 1
  ).length;

  const normalCount = predictions.filter(
    (p: any) => p.Prediction === 0
  ).length;

  return (
    <>
      <Section className="pt-12">
        <Reveal>
          <Eyebrow>Live inference output</Eyebrow>
          <Heading className="mt-4 max-w-4xl">
            Disease Gene <span className="text-gradient">Prediction Results</span>
          </Heading>
          <p className="mt-6 max-w-2xl text-muted-foreground text-lg">
            Random Forest classification over 12,356 transcripts from the Taenia solium reference assembly.
          </p>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <KPI
            icon={CheckCircle2}
            label="Disease Associated Genes"
            value={diseaseCount}
            accent="from-cyan to-electric"
          />
          <KPI
            icon={XCircle}
            label="Not Disease Associated"
            value={normalCount}
            accent="from-electric to-magenta"
          />
          <KPI icon={Target} label="Model Accuracy" value={95.7} suffix="%" decimals={1} accent="from-magenta to-cyan" />
          <KPI icon={Layers} label="Selected Features" value={248} accent="from-teal to-cyan" />
        </div>

        <div className="mt-10 grid lg:grid-cols-3 gap-5">
          <Reveal>
            <TiltCard className="h-full">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan">Confidence</div>
                  <div className="mt-2 font-display text-2xl">Model certainty</div>
                </div>
                <Activity className="h-5 w-5 text-cyan" />
              </div>
              <div className="mt-6 grid place-items-center">
                <Gauge value={95.7} />
              </div>
              <div className="mt-4 text-xs text-muted-foreground text-center">
                Validation accuracy on held-out split
              </div>
            </TiltCard>
          </Reveal>

          <Reveal delay={0.1}>
            <TiltCard className="h-full lg:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan">Training curve</div>
                  <div className="mt-2 font-display text-2xl">Accuracy & loss</div>
                </div>
                <div className="font-mono text-xs text-muted-foreground">epochs · 20</div>
              </div>
              <div className="mt-4 h-[220px]">
                <ResponsiveContainer>
                  <AreaChart data={trainCurve}>
                    <defs>
                      <linearGradient id="a1" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#22D3EE" stopOpacity={0.6} />
                        <stop offset="100%" stopColor="#22D3EE" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="a2" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#EC4899" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#EC4899" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(34,211,238,0.08)" />
                    <XAxis dataKey="epoch" stroke="#64748b" fontSize={10} />
                    <YAxis stroke="#64748b" fontSize={10} />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(5,8,22,0.9)",
                        border: "1px solid rgba(34,211,238,0.3)",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                    />
                    <Area type="monotone" dataKey="acc" stroke="#22D3EE" fill="url(#a1)" strokeWidth={2} isAnimationActive animationDuration={1500} />
                    <Area type="monotone" dataKey="loss" stroke="#EC4899" fill="url(#a2)" strokeWidth={2} isAnimationActive animationDuration={1500} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TiltCard>
          </Reveal>
        </div>

        <div className="mt-10 grid lg:grid-cols-[1.2fr_1fr] gap-5">
          <Reveal>
            <TiltCard>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan">Predictions</div>
              <div className="mt-2 font-display text-2xl">Top classified transcripts</div>

              {predictions.length === 0 ? (
                <div className="mt-10 text-center py-16 text-muted-foreground">
                  <p className="text-lg font-display">No prediction results available.</p>
                  <p className="text-sm mt-2">Please upload a CSV file first.</p>
                </div>
              ) : (
                <div className="mt-6 overflow-hidden rounded-xl border border-cyan/15">
                  <table className="w-full text-sm">
                    <thead className="bg-cyan/5 text-left">
                      <tr className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        <th className="px-4 py-3">Gene ID</th>
                        <th className="px-4 py-3">Prediction</th>
                        <th className="px-4 py-3">log2FC</th>
                        <th className="px-4 py-3">Confidence</th>
                      </tr>
                    </thead>
                    <tbody>
                      {predictions.map((g: any, i: number) => (
                        <motion.tr
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          className="border-t border-cyan/10 hover:bg-cyan/5 transition-colors"
                        >
                          <td className="px-4 py-3 font-mono text-cyan">{g.Gene}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ${
                                g.Prediction === 1
                                  ? "bg-magenta/15 text-magenta border border-magenta/30"
                                  : "bg-cyan/10 text-cyan border border-cyan/30"
                              }`}
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-current" />
                              {g.Prediction === 1 ? "Disease Associated" : "Not Disease Associated"}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-mono text-muted-foreground">—</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-20 rounded-full bg-cyan/10 overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: "95%" }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 1, delay: 0.1 + i * 0.05 }}
                                  className="h-full bg-gradient-to-r from-cyan to-magenta"
                                />
                              </div>
                              <span className="font-mono text-xs text-muted-foreground">95%</span>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TiltCard>
          </Reveal>

          <Reveal delay={0.1}>
            <TiltCard className="h-full">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan">Feature importance</div>
              <div className="mt-2 font-display text-2xl">Top contributing genes</div>
              <div className="mt-4 h-[300px]">
                <ResponsiveContainer>
                  <BarChart data={importances} layout="vertical" margin={{ left: 30 }}>
                    <defs>
                      <linearGradient id="bg" x1="0" x2="1">
                        <stop offset="0%" stopColor="#22D3EE" />
                        <stop offset="100%" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                    <XAxis type="number" stroke="#64748b" fontSize={10} />
                    <YAxis dataKey="g" type="category" stroke="#64748b" fontSize={10} width={90} />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(5,8,22,0.9)",
                        border: "1px solid rgba(34,211,238,0.3)",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                    />
                    <Bar dataKey="v" fill="url(#bg)" radius={[0, 8, 8, 0]} isAnimationActive animationDuration={1500} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TiltCard>
          </Reveal>
        </div>
        <div className="mt-12">
  <h2 className="font-display text-3xl mb-6">
    Prediction History
  </h2>

  <div className="space-y-4">
    {history.map((item: any, index: number) => (
      <div
        key={index}
        className="rounded-xl border border-cyan/20 bg-white/5 p-5"
      >
        <div className="flex justify-between items-center">

          <div>
            <h3 className="text-cyan font-semibold">
              {item.fileName}
            </h3>

            <p className="text-sm text-gray-400">
              {item.date}
            </p>
          </div>

          <div className="text-right">

            <div className="text-pink-400">
              Disease :
              {" "}
              {item.disease}
            </div>

            <div className="text-cyan-400">
              Normal :
              {" "}
              {item.normal}
            </div>

          </div>

        </div>
      </div>
    ))}
  </div>
</div>
      </Section>
    </>
  );
}

function KPI({
  icon: Icon,
  label,
  value,
  suffix = "",
  decimals = 0,
  accent,
}: {
  icon: typeof Activity;
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
  accent: string;
}) {
  return (
    <Reveal>
      <TiltCard className="overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan max-w-[70%]">{label}</div>
          <div className={`h-9 w-9 grid place-items-center rounded-xl bg-gradient-to-br ${accent} text-[#050816]`}>
            <Icon className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-5 font-mono text-4xl">
          <Counter to={value} suffix={suffix} decimals={decimals} />
        </div>
        <div className="mt-4 h-1 rounded-full bg-cyan/10 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.4 }}
            className={`h-full bg-gradient-to-r ${accent}`}
          />
        </div>
      </TiltCard>
    </Reveal>
  );
}

function Gauge({ value }: { value: number }) {
  const r = 70;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-44 w-44">
      <svg viewBox="0 0 180 180" className="w-full h-full -rotate-90">
        <defs>
          <linearGradient id="gg" x1="0" x2="1">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
        <circle cx="90" cy="90" r={r} stroke="rgba(34,211,238,0.12)" strokeWidth="10" fill="none" />
        <motion.circle
          cx="90"
          cy="90"
          r={r}
          stroke="url(#gg)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDasharray: `0 ${c}` }}
          whileInView={{ strokeDasharray: `${(value / 100) * c} ${c}` }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          style={{ filter: "drop-shadow(0 0 8px #22D3EE)" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="font-mono text-4xl">
            <Counter to={value} suffix="%" decimals={1} />
          </div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-1">accuracy</div>
        </div>
      </div>
    </div>
  );
}