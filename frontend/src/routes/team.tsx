import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { Eyebrow, Heading, Reveal, Section } from "../components/site/ui";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Project Team — NCC Gene Classification" },
      { name: "description", content: "Meet the project team behind the NCC Gene Classification platform." },
    ],
  }),
  component: Team,
});

const team = [
  {
    name: "Sanjyoti Pradeep Gaikwad",
    role: "Machine Learning & Bioinformatics Intern",
    initials: "SG",

    github: "https://github.com/sanjyoti-gaikwad",
    linkedin: "https://www.linkedin.com/in/sanjyotigaikwad/",
    email: "sanjyoti.gaikwad9@gmail.com"
  },

  {
    name: "Atharv Raosaheb Najan",
    role: "Machine Learning & Bioinformatics Intern",
    initials: "AN",

    github: "https://github.com/atharv-najan",
    linkedin: "https://www.linkedin.com/in/atharv-najan/",
    email: "mailto:atharvmail@gmail.com"
  }
];

function Team() {
  return (
    <Section className="pt-12">
      <Reveal>
        <Eyebrow>Project team</Eyebrow>
        <Heading className="mt-4">The people behind <span className="text-gradient">the model.</span></Heading>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Built with care, curiosity and code by interns at the intersection of biology and machine intelligence.
        </p>
      </Reveal>

      <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {team.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.12}>
            <motion.div
              whileHover={{ y: -6 }}
              className="group relative rounded-3xl glass p-8 overflow-hidden transition-shadow hover:shadow-[0_30px_80px_-20px_rgba(34,211,238,0.4)]"
            >
              <div className={`absolute -top-32 -right-32 h-72 w-72 rounded-full bg-gradient-to-br ${m.grad} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity`} />
              <div className="relative">
                <div className="relative h-28 w-28">
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${m.grad} animate-spin-slow opacity-80`} />
                  <div className="absolute inset-1 rounded-full bg-[#050816] grid place-items-center">
                    <span className="font-display text-4xl text-gradient">{m.initials}</span>
                  </div>
                </div>
                <div className="mt-6 font-display text-2xl">{m.name}</div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">{m.role}</div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  Contributing to model development, feature engineering and biological interpretation of results.
                </p>
                <div className="mt-6 flex gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                  <a
  href={m.github}
  target="_blank"
  rel="noopener noreferrer"
  className="h-10 w-10 grid place-items-center rounded-xl"
>
  <Github className="h-4 w-4 text-cyan" />
</a>

<a
  href={m.linkedin}
  target="_blank"
  rel="noopener noreferrer"
  className="h-10 w-10 grid place-items-center rounded-xl"
>
  <Linkedin className="h-4 w-4 text-cyan" />
</a>

<a
  href={m.email}
  className="h-10 w-10 grid place-items-center rounded-xl"
>
  <Mail className="h-4 w-4 text-cyan" />
</a>
                </div>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
