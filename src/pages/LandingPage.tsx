import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Cloud,
  ShieldCheck,
  Activity,
  Link2,
  PlayCircle,
  TimerReset,
  Eye,
} from "lucide-react";

import { BackgroundPaths } from "@/components/ui/background-paths";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Cloud,
    title: "Runtime cloud, non locale",
    description:
      "Niente EA sul tuo PC, niente VPS da tenere vivo. DeltaHedge gira lato server e continua a lavorare anche quando chiudi il browser.",
  },
  {
    icon: ShieldCheck,
    title: "Risk engine per challenge",
    description:
      "Monitoraggio continuo di fase, hard fail, hidden exit e sync prop-broker. L’obiettivo è tenere l’operatività leggibile e disciplinata.",
  },
  {
    icon: Activity,
    title: "Monitor live per ogni slot",
    description:
      "Ogni slot mostra connessioni, equity, unrealized PnL, proiezioni e stato del ciclo, così il cliente capisce subito cosa sta succedendo.",
  },
];

const steps = [
  {
    icon: Link2,
    title: "1. Collega challenge e broker",
    description:
      "Importi i due conti una sola volta. DeltaHedge li salva per utente e prepara le connessioni cloud lato MetaApi.",
  },
  {
    icon: PlayCircle,
    title: "2. Attiva lo slot",
    description:
      "Imposti i parametri del ciclo e fai partire il motore. La coppia entra in esecuzione solo quando entrambi i lati sono realmente connessi.",
  },
  {
    icon: TimerReset,
    title: "3. Lascia lavorare il motore",
    description:
      "Il worker gestisce entry, monitoraggio equity, hidden stop e chiusure forzate. L’utente torna in dashboard solo per controllare.",
  },
];

const observability = [
  "Connessione MetaApi per challenge e broker",
  "Equity e unrealized PnL in tempo reale",
  "Proiezione del broker se la fase passa o fallisce",
  "Storico trade separato tra PROP e BROKER",
];

function SectionCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Cloud;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
      <div className="mb-5 inline-flex rounded-2xl border border-white/10 bg-white/[0.05] p-3 text-white">
        <Icon className="size-5" />
      </div>
      <h3 className="mb-3 text-xl font-semibold text-white">{title}</h3>
      <p className="leading-7 text-zinc-400">{description}</p>
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#05070b] text-white">
      <section className="relative">
        <div className="absolute inset-x-0 top-0 z-20 mx-auto flex max-w-7xl items-center justify-between px-4 py-6 md:px-8">
          <div className="inline-flex items-center gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-semibold tracking-[0.28em] text-white">
              DH
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.26em] text-zinc-500">
                DeltaHedge
              </p>
              <p className="text-xs text-zinc-400">Premium Pair Execution</p>
            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Button
              type="button"
              variant="ghost"
              className="rounded-2xl border border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              type="button"
              className="rounded-2xl border border-white/10 bg-white text-black hover:bg-white/90"
              onClick={() => navigate("/login")}
            >
              Inizia ora
            </Button>
          </div>
        </div>

        <BackgroundPaths
          title="Run your prop pair in the cloud"
          description="DeltaHedge collega challenge e broker, prepara il motore runtime, monitora la progressione di fase e ti restituisce una dashboard semplice da leggere anche per utenti non tecnici."
          primaryLabel="Accedi alla dashboard"
          secondaryLabel="Scopri il workflow"
          onPrimaryClick={() => navigate("/login")}
          onSecondaryClick={() =>
            document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
          }
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-zinc-500">
              Perche DeltaHedge
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Un SaaS costruito per prop traders che vogliono cloud execution, non workaround locali.
            </h2>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {features.map((feature) => (
            <SectionCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <section
        id="how-it-works"
        className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:px-8 lg:grid-cols-[1.15fr_0.85fr]"
      >
        <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-zinc-500">
            Workflow
          </p>
          <h2 className="mb-8 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Dall’onboarding al monitoraggio, ogni passaggio riduce attrito operativo.
          </h2>
          <div className="space-y-5">
            {steps.map((step) => (
              <div
                key={step.title}
                className="rounded-[24px] border border-white/8 bg-black/30 p-5"
              >
                <div className="mb-3 inline-flex rounded-2xl border border-white/10 bg-white/[0.05] p-3">
                  <step.icon className="size-5 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-white">{step.title}</h3>
                <p className="text-sm leading-7 text-zinc-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8 backdrop-blur-xl">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-zinc-500">
            Observability
          </p>
          <h2 className="mb-8 text-2xl font-semibold tracking-tight text-white">
            La dashboard mostra quello che serve, senza rumore da template crypto.
          </h2>

          <div className="mb-8 rounded-[28px] border border-white/10 bg-[#06080d] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
                  Slot attivo
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">FundingPips 100K</p>
              </div>
              <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                Connected
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Equity Prop
                </p>
                <p className="mt-3 text-2xl font-semibold text-white">$101,284</p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Unrealized PnL Broker
                </p>
                <p className="mt-3 text-2xl font-semibold text-white">$412</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {observability.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-white/8 bg-black/20 px-4 py-3"
              >
                <Eye className="mt-0.5 size-4 shrink-0 text-white" />
                <p className="text-sm leading-6 text-zinc-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="rounded-[36px] border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-xl md:p-12">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-zinc-500">
            Ready
          </p>
          <h2 className="mx-auto max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Se vuoi un runtime cloud per challenge prop + broker, qui parte il flusso.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
            Crea l’account, collega i due lati dello slot e lascia DeltaHedge
            lavorare in background. L’utente finale torna solo per leggere dashboard,
            trade e performance.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              type="button"
              size="lg"
              className="rounded-2xl border border-white/10 bg-white px-7 text-black hover:bg-white/90"
              onClick={() => navigate("/login")}
            >
              Entra in piattaforma
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button
              type="button"
              size="lg"
              variant="ghost"
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-7 text-white hover:bg-white/[0.08]"
              onClick={() => navigate("/login")}
            >
              Crea il tuo account
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
