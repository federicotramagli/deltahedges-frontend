import * as React from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Bot,
  Calculator,
  ChartNoAxesCombined,
  Clock3,
  Layers3,
  Quote,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Wallet,
  Workflow,
} from "lucide-react";
import { Link } from "react-router-dom";
import dashboardLaptopPreview from "../../Screenshot 2026-03-27 alle 11.14.07.png";

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

const scenarioCards = [
  {
    eyebrow: "Scenario fail",
    title: "Challenge fermata in Fase 1",
    summary:
      "La challenge non arriva al target. Il broker chiude il ciclo in positivo e il netto finale viene archiviato subito negli analytics.",
    propLabel: "Costo prop",
    propValue: "-$289",
    brokerLabel: "Broker realizzato",
    brokerValue: "+$1,340",
    netValue: "+$1,051",
    practical: [
      "Il ciclo si chiude in modo leggibile, senza numeri sparsi tra piattaforme diverse.",
      "Il netto che vedi in dashboard è già broker realizzato meno costo challenge.",
      "Da qui puoi decidere se riaprire una nuova challenge o fermarti con il risultato salvato.",
    ],
    accent: "from-rose-500/22 via-orange-400/12 to-transparent",
  },
  {
    eyebrow: "Scenario fail",
    title: "Challenge fermata in Fase 2",
    summary:
      "La seconda fase non si completa. Anche qui il motore ti lascia un esito pratico: broker chiuso, costo prop e netto finale già calcolato.",
    propLabel: "Costo prop",
    propValue: "-$549",
    brokerLabel: "Broker realizzato",
    brokerValue: "+$1,709",
    netValue: "+$1,160",
    practical: [
      "Non devi ricostruire il risultato a mano con fogli o note esterne.",
      "Vedi subito quanto ha prodotto il broker e quanto ha pesato la challenge.",
      "Il ciclo resta confrontabile con gli altri slot chiusi nella sezione Performance.",
    ],
    accent: "from-amber-400/20 via-yellow-300/10 to-transparent",
  },
  {
    eyebrow: "Scenario pass",
    title: "Challenge passata e payout avviato",
    summary:
      "Il broker assorbe la sua gamba di hedge, ma sblocchi un conto funded, una fee rimborsata e una dinamica di payout leggibile già dal primo ciclo.",
    propLabel: "Payout + fee",
    propValue: "+$3,749",
    brokerLabel: "Hedge broker",
    brokerValue: "-$1,480",
    netValue: "+$2,269",
    practical: [
      "La fase challenge non viene letta da sola: conta come apre la fase funded.",
      "Nella dashboard distingui subito capitale broker assorbito, payout prop e netto finale.",
      "Il motore continua a mostrarti il risultato vero del ciclo, non solo il lato prop.",
    ],
    accent: "from-emerald-400/20 via-cyan-300/12 to-transparent",
  },
];

function parseNumericInput(value: string, fallback: number) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function formatUsd(value: number) {
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

function formatSignedUsd(value: number) {
  const sign = value >= 0 ? "+" : "-";
  return `${sign}${formatUsd(Math.abs(value))}`;
}

function AnalyticsPreviewFrame() {
  return (
    <div className="relative">
      <div className="absolute inset-x-10 top-10 h-40 rounded-full bg-primary/12 blur-3xl" />
      <div className="absolute bottom-14 left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="relative mx-auto max-w-5xl px-2 pt-6">
        <div className="relative rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,#171b25,#0a0d14)] p-3 shadow-[0_34px_100px_rgba(3,7,18,0.5)]">
          <div className="overflow-hidden rounded-[26px] border border-white/8 bg-[#090c12]">
            <div className="flex items-center justify-between border-b border-white/8 bg-[linear-gradient(180deg,rgba(18,24,36,0.96),rgba(10,14,24,0.96))] px-4 py-3 md:px-5">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-rose-400/80" />
                <span className="size-2.5 rounded-full bg-amber-300/80" />
                <span className="size-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <div className="hidden rounded-full border border-white/8 bg-white/[0.04] px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] text-zinc-400 md:block">
                app.deltahedges.com / dashboard
              </div>
              <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-primary">
                Laptop preview
              </div>
            </div>
            <div className="relative">
              <img
                src={dashboardLaptopPreview}
                alt="Dashboard DeltaHedge in vista desktop"
                className="aspect-[16/9] w-full object-cover object-top"
                width={2880}
                height={2074}
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,6,10,0.02),rgba(4,6,10,0.1))]" />
              <div className="absolute left-4 top-4 rounded-2xl border border-white/10 bg-[#0b1120]/92 px-4 py-3 shadow-[0_12px_28px_rgba(4,8,20,0.45)] backdrop-blur md:left-6 md:top-6">
                <div className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                  Performance analytics
                </div>
                <div className="mt-1 text-lg font-semibold text-white">Netto cicli conclusi</div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 hidden gap-3 md:grid md:grid-cols-3 md:bottom-6 md:left-6 md:right-6">
                {analyticsHighlights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[20px] border border-white/10 bg-[#0a1020]/90 px-4 py-3 shadow-[0_16px_34px_rgba(4,8,20,0.42)] backdrop-blur"
                  >
                    <div className="flex items-center gap-2 text-zinc-400">
                      <item.icon className="size-4 text-primary" />
                      <span className="text-[11px] uppercase tracking-[0.16em]">{item.label}</span>
                    </div>
                    <div className="mt-2 text-xl font-semibold text-white">{item.value}</div>
                    <div className="mt-1 text-xs leading-5 text-zinc-500">{item.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto h-3 w-[84%] rounded-b-[999px] bg-[linear-gradient(180deg,#d8deea,#9ea8bf)] shadow-[0_16px_30px_rgba(2,6,18,0.2)]" />
        <div className="mx-auto -mt-0.5 h-2 w-[96%] rounded-b-[999px] bg-[linear-gradient(180deg,#aeb7cb,#8792aa)] opacity-90" />
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {analyticsHighlights.map((item) => (
          <div
            key={`summary-${item.label}`}
            className="rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4"
          >
            <div className="flex items-center gap-2 text-zinc-400">
              <item.icon className="size-4 text-primary" />
              <span className="text-[11px] uppercase tracking-[0.16em]">{item.label}</span>
            </div>
            <div className="mt-3 text-2xl font-semibold text-white">{item.value}</div>
            <div className="mt-2 text-sm leading-6 text-zinc-500">{item.note}</div>
          </div>
        ))}
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
  const [calculatorForm, setCalculatorForm] = React.useState({
    accountSize: "100000",
    challengeCost: "549",
    maxDrawdown: "10",
    profitTarget: "8",
  });

  const accountSize = parseNumericInput(calculatorForm.accountSize, 100000);
  const challengeCost = parseNumericInput(calculatorForm.challengeCost, 549);
  const maxDrawdown = parseNumericInput(calculatorForm.maxDrawdown, 10);
  const profitTarget = parseNumericInput(calculatorForm.profitTarget, 8);

  const brokerCapitalRequired = challengeCost * 4;
  const onePercentChallengeValue = challengeCost / Math.max(maxDrawdown, 0.1);
  const brokerImpactAtTarget = onePercentChallengeValue * profitTarget;
  const targetValue = accountSize * (profitTarget / 100);
  const netIfFailed = brokerImpactAtTarget - challengeCost;

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

      <section id="scenari" className="relative z-10 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={revealUp}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="brand-pill inline-flex items-center rounded-full px-4 py-1 text-xs uppercase tracking-[0.35em] text-zinc-300">
              Scenari reali
            </span>
            <h2 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Qui vedi il ciclo in pratica: cosa succede se la challenge fallisce e cosa cambia quando passa.
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-400">
              Ho preso la parte più utile della landing che mi hai indicato, cioè le cards scenario-driven, e l&apos;ho riscritta in italiano per spiegare DeltaHedge con esempi concreti e leggibili.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerReveal}
            className="mt-14 grid gap-5 xl:grid-cols-3"
          >
            {scenarioCards.map((card) => (
              <motion.div key={card.title} variants={revealUp} className="h-full">
                <div className="brand-surface relative h-full overflow-hidden rounded-[30px] p-6">
                  <div className={cn("absolute inset-0 bg-gradient-to-br", card.accent)} />
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-center justify-between">
                      <span className="brand-pill inline-flex rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-zinc-200">
                        {card.eyebrow}
                      </span>
                      <BadgeCheck className="size-5 text-primary" />
                    </div>

                    <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white">
                      {card.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-zinc-300">
                      {card.summary}
                    </p>

                    <div className="mt-6 rounded-[22px] border border-white/10 bg-[#0a0f18]/88 p-4">
                      <div className="flex items-center justify-between text-sm text-zinc-400">
                        <span>{card.propLabel}</span>
                        <span>{card.propValue}</span>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-sm text-zinc-400">
                        <span>{card.brokerLabel}</span>
                        <span>{card.brokerValue}</span>
                      </div>
                      <div className="mt-4 rounded-2xl border border-primary/[0.18] bg-primary/10 px-4 py-3">
                        <div className="text-[11px] uppercase tracking-[0.16em] text-primary">
                          Netto finale del ciclo
                        </div>
                        <div className="mt-2 text-2xl font-semibold text-white">{card.netValue}</div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      {card.practical.map((item) => (
                        <div key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                          <span className="mt-1.5 size-2 rounded-full bg-primary" />
                          <span className="leading-6">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="calcolatore" className="relative z-10 px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.92fr_1.08fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={revealUp}
            className="space-y-6"
          >
            <span className="brand-pill inline-flex items-center rounded-full px-4 py-1 text-xs uppercase tracking-[0.35em] text-zinc-300">
              Calcolatore di scenario
            </span>
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
              La matematica del ciclo diventa leggibile anche prima di aprire la dashboard.
            </h2>
            <p className="max-w-xl text-lg leading-8 text-zinc-400">
              Qui sotto ho adattato l&apos;idea del calcolatore che ti piace: imposti account size, fee, max drawdown e target. La landing ti restituisce subito capitale broker suggerito, impatto hedge e lettura dello scenario fail.
            </p>
            <div className="space-y-3 pt-2">
              {[
                "Il capitale broker suggerito segue una logica conservativa per coprire il ciclo.",
                "Il valore dell'1% challenge rende chiaro quanto pesa ogni punto percentuale sul percorso.",
                "Il blocco finale ti mostra già il netto teorico del caso fail, che poi ritroverai archiviato negli analytics.",
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
            viewport={{ once: true, amount: 0.25 }}
            variants={revealUp}
            className="brand-surface rounded-[32px] p-6 md:p-7"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                  Calcolatore challenge
                </div>
                <div className="mt-2 text-2xl font-semibold text-white">
                  Simula un ciclo prima di partire
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                <Calculator className="size-5 text-primary" />
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                { label: "Account size", field: "accountSize", value: calculatorForm.accountSize },
                { label: "Costo challenge", field: "challengeCost", value: calculatorForm.challengeCost },
                { label: "Max drawdown %", field: "maxDrawdown", value: calculatorForm.maxDrawdown },
                { label: "Profit target %", field: "profitTarget", value: calculatorForm.profitTarget },
              ].map((input) => (
                <label key={input.field} className="space-y-2">
                  <span className="text-sm text-zinc-400">{input.label}</span>
                  <Input
                    type="number"
                    value={input.value}
                    onChange={(event) =>
                      setCalculatorForm((current) => ({
                        ...current,
                        [input.field]: event.target.value,
                      }))
                    }
                    className="h-12 rounded-2xl border-white/10 bg-[#0a1020]/80 px-4 text-white placeholder:text-zinc-500 focus-visible:ring-primary/20"
                  />
                </label>
              ))}
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {[
                {
                  icon: Wallet,
                  label: "Capitale broker suggerito",
                  value: formatUsd(brokerCapitalRequired),
                },
                {
                  icon: Target,
                  label: "Valore dell'1% challenge",
                  value: formatUsd(onePercentChallengeValue),
                },
                {
                  icon: TrendingUp,
                  label: "Impatto hedge al target",
                  value: formatSignedUsd(-brokerImpactAtTarget),
                },
                {
                  icon: ChartNoAxesCombined,
                  label: "Target challenge",
                  value: formatUsd(targetValue),
                },
              ].map((result) => (
                <div
                  key={result.label}
                  className="rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4"
                >
                  <div className="flex items-center gap-2 text-zinc-400">
                    <result.icon className="size-4 text-primary" />
                    <span className="text-[11px] uppercase tracking-[0.16em]">{result.label}</span>
                  </div>
                  <div className="mt-3 text-2xl font-semibold text-white">{result.value}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 xl:grid-cols-2">
              <div className="rounded-[24px] border border-white/10 bg-[#0a0f18]/88 p-5">
                <div className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                  Se la challenge fallisce
                </div>
                <div className="mt-3 space-y-3 text-sm text-zinc-300">
                  <div className="flex items-center justify-between">
                    <span>Broker realizzato</span>
                    <span className="font-medium text-white">{formatSignedUsd(brokerImpactAtTarget)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Costo challenge</span>
                    <span className="font-medium text-white">{formatSignedUsd(-challengeCost)}</span>
                  </div>
                  <div className="rounded-2xl border border-primary/[0.18] bg-primary/10 px-4 py-3">
                    <div className="text-[11px] uppercase tracking-[0.16em] text-primary">
                      Netto teorico del caso fail
                    </div>
                    <div className="mt-2 text-2xl font-semibold text-white">
                      {formatSignedUsd(netIfFailed)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-[#0a0f18]/88 p-5">
                <div className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                  Se la challenge arriva al target
                </div>
                <div className="mt-3 space-y-3 text-sm text-zinc-300">
                  <div className="flex items-center justify-between">
                    <span>Target prop raggiunto</span>
                    <span className="font-medium text-white">{formatUsd(targetValue)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Hedge broker da assorbire</span>
                    <span className="font-medium text-white">{formatSignedUsd(-brokerImpactAtTarget)}</span>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-zinc-300">
                    In pratica: la fase challenge si sblocca con numeri già chiari, e la parte funded viene poi letta nella dashboard con payout, fee rimborsata e netto finale.
                  </div>
                </div>
              </div>
            </div>
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
                "La preview qui sotto è costruita come una schermata desktop completa, non come un mock mobile.",
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
