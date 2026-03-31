import * as React from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Bot,
  ChartNoAxesCombined,
  Clock3,
  Layers3,
  Quote,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeroSection } from "@/components/ui/hero-section-9";
import { Input } from "@/components/ui/input";
import { DELTAHEDGE_PLANS, PricingSection } from "@/components/ui/pricing";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const stats = [
  { value: "2 conti", label: "Una challenge e un broker che lavorano come una coppia" },
  { value: "Zero VPS", label: "Il Trading Matematico gira nel cloud, non sul tuo computer" },
  { value: "1 dashboard", label: "Controlli stato, fase ed equity da un solo posto" },
];

const serviceCards = [
  {
    icon: Workflow,
    title: "Mirroring",
    body:
      "La challenge e il broker vengono messi nella stessa logica operativa. Non lavori più con due conti separati, ma con una sola struttura.",
  },
  {
    icon: Bot,
    title: "Drawdown",
    body:
      "Il ciclo nasce per ridurre la dipendenza dalla sola direzione del mercato e dare più ordine al percorso della challenge.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Cloud",
    body:
      "Colleghi i conti una volta sola e il lavoro continua anche se chiudi il browser. Tu rientri quando vuoi e trovi tutto già allineato.",
  },
];

const steps = [
  {
    number: "01",
    title: "Collega challenge e broker",
    text:
      "Tu inserisci i due conti. DeltaHedge li organizza nella stessa coppia e prepara il setup iniziale.",
  },
  {
    number: "02",
    title: "La coppia parte e si bilancia",
    text:
      "Un lato prova a completare il percorso della challenge. L'altro accompagna il ciclo per non lasciare tutto alla sola direzione del mercato.",
  },
  {
    number: "03",
    title: "Tu controlli tutto da una dashboard semplice",
    text:
      "Stato, equity, progressi e cronologia restano visibili in un solo posto. Non devi inseguire finestre, terminali o file sparsi.",
  },
];

const reasons = [
  {
    icon: ShieldCheck,
    title: "Non lasciare tutto al mercato che sale o scende",
    text:
      "Il punto non è indovinare sempre la direzione. Il punto è usare una struttura che accompagna la challenge con un secondo lato di supporto.",
  },
  {
    icon: Clock3,
    title: "Smetti di inseguire finestre, login e passaggi sparsi",
    text:
      "Con DeltaHedge non devi ricostruire ogni volta il processo da zero. La coppia è dentro una dashboard unica, chiara e continua.",
  },
  {
    icon: Activity,
    title: "Trasforma un processo fragile in un flusso leggibile",
    text:
      "Sai quando la coppia è pronta, quando è attiva e come sta andando. Meno interpretazione, più lettura semplice di quello che conta.",
  },
];

const testimonials = [
  {
    quote:
      "Prima avevo tutto sparso tra challenge, broker e note. Ora vedo subito cosa succede e non devo interpretare ogni passaggio da solo.",
    name: "Marco",
    role: "Trader retail",
  },
  {
    quote:
      "La cosa che conta di più è che non devo stare attaccato al computer. Collego i conti, controllo la dashboard e il resto è molto più ordinato.",
    name: "Davide",
    role: "Utente multi-slot",
  },
  {
    quote:
      "Mi piace perché spiega tutto in modo semplice. Non sembra un software fatto per confondere, ma uno strumento costruito per farti capire subito dove sei.",
    name: "Alessio",
    role: "Prop trader",
  },
];

const analyticsHighlights = [
  {
    icon: Layers3,
    label: "Cicli conclusi",
    value: "18",
    note: "Archiviati tra fail in Fase 1, Fase 2 e Funded",
  },
  {
    icon: ChartNoAxesCombined,
    label: "Performance netta",
    value: "+$8,420",
    note: "Somma dei netti finali registrati nei cicli chiusi",
  },
  {
    icon: Activity,
    label: "Ultimo ciclo chiuso",
    value: "+$1,160",
    note: "Broker realizzato $1,709 meno costo prop $549",
  },
];

const analyticsCycles = [
  {
    slot: "Slot 07",
    outcome: "FAIL FASE 1",
    brokerRealized: "+$1,340",
    propCost: "$289",
    net: "+$1,051",
  },
  {
    slot: "Slot 04",
    outcome: "FAIL FASE 2",
    brokerRealized: "+$1,709",
    propCost: "$549",
    net: "+$1,160",
  },
  {
    slot: "Slot 11",
    outcome: "FAIL FUNDED",
    brokerRealized: "+$980",
    propCost: "$289",
    net: "+$691",
  },
  {
    slot: "Slot 03",
    outcome: "FAIL FASE 1",
    brokerRealized: "+$1,120",
    propCost: "$199",
    net: "+$921",
  },
];

const analyticsCurveValues = [0, 620, 1280, 2140, 1760, 3090, 3880, 5220, 6480, 8420];

function buildAnalyticsCurvePath(values: number[]) {
  if (values.length < 2) return "";

  const width = 560;
  const height = 180;
  const paddingX = 18;
  const paddingY = 14;
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const range = Math.max(maxValue - minValue, 1);

  return values
    .map((value, index) => {
      const x =
        paddingX +
        (index / (values.length - 1)) * (width - paddingX * 2);
      const y =
        height -
        paddingY -
        ((value - minValue) / range) * (height - paddingY * 2);
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

function LandingDeltaHedgeWordmark({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 84 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-11 shrink-0 text-primary drop-shadow-[0_0_24px_rgba(123,137,255,0.2)]"
      >
        <path
          d="M42 8L10 68H29.5L42 45L54.5 68H74L42 8Z"
          fill="currentColor"
        />
        <path d="M28 68L53 18L64 18L39 68H28Z" fill="#080A03" />
        <path d="M44 58L61 29L66 34L49 63L44 58Z" fill="currentColor" />
      </svg>
      <div className="flex items-baseline text-[22px] font-black uppercase tracking-[-0.05em]">
        <span className="brand-gradient-text">Delta</span>
        <span className="text-white">Hedge</span>
      </div>
    </div>
  );
}

function AnalyticsPreviewFrame() {
  const curvePath = buildAnalyticsCurvePath(analyticsCurveValues);

  return (
    <div className="brand-surface relative overflow-hidden rounded-[32px] p-4 shadow-[0_28px_80px_rgba(3,7,18,0.45)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(123,137,255,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(45,212,191,0.10),transparent_28%)]" />
      <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#080b12]">
        <div className="flex items-center justify-between border-b border-white/8 bg-[linear-gradient(180deg,rgba(15,21,34,0.92),rgba(10,14,24,0.92))] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-rose-400/80" />
            <span className="size-2.5 rounded-full bg-amber-300/80" />
            <span className="size-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Dashboard / Performance
          </div>
          <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-primary">
            Mock data
          </div>
        </div>

        <div className="space-y-4 p-4 md:p-5">
          <div className="flex flex-col gap-4 border-b border-white/8 pb-4 md:flex-row md:items-end md:justify-between">
            <div>
              <LandingDeltaHedgeWordmark />
              <div className="mt-3 text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                Performance analytics
              </div>
              <div className="mt-2 max-w-xl text-sm leading-6 text-zinc-300">
                Monitori solo il risultato netto dei cicli conclusi: profitto broker realizzato meno costo prop.
              </div>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-300">
              Ultimo aggiornamento mock · 31 marzo 2026
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {analyticsHighlights.map((item) => (
              <div
                key={item.label}
                className="rounded-[20px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] p-4"
              >
                <div className="flex items-center gap-2 text-zinc-400">
                  <item.icon className="size-4 text-primary" />
                  <span className="text-[11px] uppercase tracking-[0.16em]">
                    {item.label}
                  </span>
                </div>
                <div className="mt-4 text-2xl font-semibold tracking-tight text-white">
                  {item.value}
                </div>
                <div className="mt-2 text-sm leading-6 text-zinc-500">
                  {item.note}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                  Curva del netto cumulato
                </div>
                <div className="mt-2 text-lg font-semibold text-white">
                  Crescita leggibile ciclo dopo ciclo
                </div>
              </div>
              <div className="text-sm text-zinc-400">
                La curva segue solo i cicli archiviati, non il mark-to-market.
              </div>
            </div>

            <div className="mt-5 overflow-hidden rounded-[20px] border border-white/6 bg-[#090d15] p-4">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                <span>Netto cumulato</span>
                <span>+$8,420</span>
              </div>
              <svg
                viewBox="0 0 560 180"
                className="mt-4 h-[180px] w-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <line
                    key={index}
                    x1="0"
                    x2="560"
                    y1={20 + index * 35}
                    y2={20 + index * 35}
                    stroke="rgba(255,255,255,0.07)"
                    strokeDasharray="6 10"
                  />
                ))}
                <path
                  d={`${curvePath} L542 166 L18 166 Z`}
                  fill="url(#analyticsFill)"
                  opacity="0.22"
                />
                <path
                  d={curvePath}
                  stroke="url(#analyticsStroke)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="analyticsStroke" x1="18" y1="22" x2="542" y2="166">
                    <stop stopColor="#9be7ff" />
                    <stop offset="0.45" stopColor="#d9e0ff" />
                    <stop offset="1" stopColor="#7b89ff" />
                  </linearGradient>
                  <linearGradient id="analyticsFill" x1="280" y1="0" x2="280" y2="180">
                    <stop stopColor="rgba(155,231,255,0.55)" />
                    <stop offset="1" stopColor="rgba(123,137,255,0)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div className="overflow-hidden rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.018))]">
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-3 border-b border-white/8 px-4 py-3 text-[11px] uppercase tracking-[0.16em] text-zinc-500">
              <span>Slot</span>
              <span>Broker</span>
              <span>Prop</span>
              <span>Netto</span>
            </div>
            <div className="divide-y divide-white/6">
              {analyticsCycles.map((cycle) => (
                <div
                  key={`${cycle.slot}-${cycle.outcome}`}
                  className="grid grid-cols-[1fr_auto_auto_auto] gap-3 px-4 py-4 text-sm"
                >
                  <div>
                    <div className="font-medium text-white">{cycle.slot}</div>
                    <div className="mt-1 text-zinc-500">{cycle.outcome}</div>
                  </div>
                  <div className="text-zinc-300">{cycle.brokerRealized}</div>
                  <div className="text-zinc-300">{cycle.propCost}</div>
                  <div className="font-semibold text-primary">{cycle.net}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const revealUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const staggerReveal = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function LandingPage() {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    setSubscribed(true);
    setEmail("");
  };

  return (
    <div className="brand-shell relative overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[22rem] h-64 w-64 rounded-full bg-[#7b89ff]/10 blur-3xl" />
        <div className="absolute right-[10%] top-[68rem] h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-24 left-[18%] h-56 w-56 rounded-full bg-violet-400/10 blur-3xl" />
      </div>
      <HeroSection />

      <section className="relative z-10 px-6 pb-10 md:pb-20">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.value}
              className="brand-surface-soft rounded-[28px] p-6"
            >
              <p className="brand-gradient-text text-3xl font-semibold tracking-tight">{stat.value}</p>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="perche-deltahedge" className="relative z-10 px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.92fr_1.08fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={revealUp}
            className="space-y-6"
          >
            <span className="brand-pill inline-flex items-center rounded-full px-4 py-1 text-xs uppercase tracking-[0.35em] text-zinc-300">
              Cosa fa DeltaHedge
            </span>
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
              DeltaHedge organizza challenge e broker dentro una logica più matematica, ordinata e leggibile.
            </h2>
            <p className="max-w-xl text-lg leading-8 text-zinc-400">
              In parole povere: invece di lasciare tutto a un solo lato del mercato, crei una coppia tra challenge e broker. Da lì in poi hai un sistema che accompagna il ciclo e te lo fa leggere in modo semplice.
            </p>
            <div className="space-y-3 pt-2">
              {[
                "Colleghi i conti una sola volta e la coppia resta pronta nel cloud",
                "Vedi subito se il ciclo è pronto, attivo o da completare",
                "Controlli equity, progressi e risultati con una dashboard leggibile",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                  <span className="leading-6">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerReveal}
            className="grid gap-4"
          >
              {serviceCards.map((card) => (
                <motion.div key={card.title} variants={revealUp}>
                  <Card
                  key={card.title}
                  className="brand-surface rounded-[28px] py-0 text-white shadow-none"
                >
                  <CardHeader className="px-6 pt-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(123,137,255,0.18),rgba(45,212,191,0.12))]">
                    <card.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-white">{card.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6 text-sm leading-7 text-zinc-400">
                  {card.body}
                </CardContent>
              </Card>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </section>

      <section id="come-funziona" className="relative z-10 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={revealUp}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="brand-pill inline-flex items-center rounded-full px-4 py-1 text-xs uppercase tracking-[0.35em] text-zinc-300">
              Come funziona
            </span>
            <h2 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Un modo più matematico per lavorare sulla challenge.
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-400">
              Non ti chiediamo di diventare più tecnico. Ti diamo una struttura più chiara:
              una challenge, un broker e una dashboard che ti fa capire dove sei.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerReveal}
            className="mt-14 grid gap-5 lg:grid-cols-3"
          >
            {steps.map((step) => (
              <motion.div
                key={step.number}
                variants={revealUp}
                className="brand-surface-soft rounded-[28px] p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-semibold tracking-tight text-white/90">
                    {step.number}
                  </span>
                  <Sparkles className="h-5 w-5 text-zinc-500" />
                </div>
                <h3 className="mt-8 text-xl font-medium text-white">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-zinc-400">{step.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="performance-analytics" className="relative z-10 px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={revealUp}
            className="space-y-6"
          >
            <span className="brand-pill inline-flex items-center rounded-full px-4 py-1 text-xs uppercase tracking-[0.35em] text-zinc-300">
              Performance analytics
            </span>
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Vedi il netto reale dei cicli conclusi, non solo numeri sparsi dentro la piattaforma.
            </h2>
            <p className="max-w-xl text-lg leading-8 text-zinc-400">
              Nella dashboard c&apos;è una sezione dedicata che archivia i cicli chiusi e calcola la performance netta finale. Così capisci subito cosa ha davvero prodotto il motore, ciclo per ciclo.
            </p>
            <div className="space-y-3 pt-2">
              {[
                "Mostra solo i cicli conclusi, quindi la lettura è pulita e finale.",
                "Il netto viene calcolato come profitto broker realizzato meno costo prop della challenge.",
                "La curva cumulata ti fa leggere l'andamento dei risultati senza aprire fogli esterni.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                  <span className="leading-6">{item}</span>
                </div>
              ))}
            </div>
            <motion.div
              whileHover={{ scale: 1.03, boxShadow: "0 24px 56px rgba(83,102,255,0.24)" }}
              whileTap={{ scale: 0.98 }}
              className="pt-2"
            >
              <Link
                to="/login"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-2xl bg-[linear-gradient(135deg,#f8fbff_0%,#d9e0ff_55%,#9be7ff_100%)] px-6 text-[#06101d] hover:brightness-105",
                )}
              >
                Guarda la dashboard completa
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={revealUp}
          >
            <AnalyticsPreviewFrame />
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-20 md:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={revealUp}
          className="mx-auto max-w-3xl pb-12 text-center md:pb-14"
        >
          <span className="brand-pill inline-flex items-center rounded-full px-4 py-1 text-xs uppercase tracking-[0.35em] text-zinc-300">
            Smetti di essere una vittima
          </span>
          <h2 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Non costruire tutto su una sola direzione del mercato.
          </h2>
          <p className="mt-5 text-lg leading-8 text-zinc-400">
            DeltaHedge nasce per dare una struttura più solida al percorso. Non promette magia:
            toglie attrito, dà ordine e rende il ciclo più leggibile.
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerReveal}
          className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-3"
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.title}
              variants={revealUp}
              className="brand-surface rounded-[28px] p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(123,137,255,0.18),rgba(45,212,191,0.12))]">
                <reason.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-6 text-xl font-medium text-white">{reason.title}</h3>
              <p className="mt-4 text-sm leading-7 text-zinc-400">{reason.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="relative z-10 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={revealUp}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="brand-pill inline-flex items-center rounded-full px-4 py-1 text-xs uppercase tracking-[0.35em] text-zinc-300">
              Testimonianze
            </span>
            <h2 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Chi prova il Trading Matematico non cerca rumore. Cerca una struttura che abbia senso.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerReveal}
            className="mt-14 grid gap-5 lg:grid-cols-3"
          >
            {testimonials.map((testimonial) => (
              <motion.div key={testimonial.name} variants={revealUp}>
                <Card
                key={testimonial.name}
                className="brand-surface-soft rounded-[28px] py-0 text-white shadow-none"
              >
                <CardHeader className="px-6 pt-6">
                  <Quote className="h-6 w-6 text-white/70" />
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <p className="text-sm leading-7 text-zinc-300">“{testimonial.quote}”</p>
                  <div className="mt-6">
                    <p className="text-sm font-medium text-white">{testimonial.name}</p>
                    <p className="text-sm text-zinc-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <PricingSection
        className="relative"
        plans={DELTAHEDGE_PLANS}
        heading="Scegli il livello del tuo Trading Matematico"
        description="Parti gratis con 1 trade di prova. Quando vuoi lavorare in modo serio sulla challenge, scegli quanti slot attivare ogni mese o all'anno."
      />

      <section className="relative z-10 px-6 pb-24 pt-10 md:pb-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={revealUp}
          className="brand-surface mx-auto max-w-5xl rounded-[2rem] p-8 md:p-12"
        >
          <div className="mx-auto max-w-3xl text-center">
            <span className="brand-pill inline-flex items-center rounded-full px-4 py-1 text-xs uppercase tracking-[0.35em] text-zinc-300">
              Newsletter privata
            </span>
            <h2 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Vuoi vedere come evolve DeltaHedge prima degli altri?
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-400">
              Ti scriviamo solo quando c'è qualcosa di davvero utile: nuove funzioni, nuovi slot disponibili e miglioramenti che rendono il ciclo più chiaro.
            </p>
          </div>

          <form
            onSubmit={handleNewsletterSubmit}
            className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row"
          >
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Scrivi la tua email"
              className="h-12 rounded-2xl border-white/10 bg-[#0a1020]/80 px-4 text-white placeholder:text-zinc-500 focus-visible:ring-primary/20"
            />
            <motion.button
              type="submit"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 22px 48px rgba(83,102,255,0.24)",
              }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 rounded-2xl bg-[linear-gradient(135deg,#f8fbff_0%,#d9e0ff_55%,#9be7ff_100%)] px-6 text-[#06101d] hover:brightness-105",
              )}
            >
              Ricevi aggiornamenti
            </motion.button>
          </form>

          <div className="mt-4 text-center text-sm text-zinc-500">
            {subscribed ? (
              <span>
                Perfetto. Intanto puoi già entrare nella piattaforma e creare il tuo primo slot.
              </span>
            ) : (
              <span>Niente spam. Solo aggiornamenti utili sul prodotto e sull&apos;accesso.</span>
            )}
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <motion.div
              whileHover={{
                scale: 1.03,
                boxShadow: "0 22px 48px rgba(83,102,255,0.24)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/login"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-2xl bg-[linear-gradient(135deg,#f8fbff_0%,#d9e0ff_55%,#9be7ff_100%)] px-6 text-[#06101d] hover:brightness-105",
                )}
              >
                Entra nella dashboard
              </Link>
            </motion.div>
            <motion.a
              whileHover={{
                scale: 1.03,
                boxShadow: "0 22px 48px rgba(14,20,32,0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              href="#come-funziona"
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,38,0.78),rgba(10,14,26,0.92))] px-6 text-white hover:bg-white/5",
              )}
            >
              Leggi come funziona
              <ArrowRight className="ml-2 h-4 w-4" />
            </motion.a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
