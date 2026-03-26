import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Cloud,
  LaptopMinimal,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  TimerReset,
  WalletCards,
} from "lucide-react";

import { BackgroundPaths } from "@/components/ui/background-paths";
import { Button } from "@/components/ui/button";
import dashboardPreview from "../../dashboard-cloud-premium.png";

const trustPoints = [
  "Colleghi i conti una sola volta",
  "Il sistema lavora anche se chiudi il browser",
  "Controlli tutto da una dashboard semplice",
];

const scenarios = [
  {
    title: "Se la challenge passa",
    description:
      "Il percorso continua, il funded resta sotto controllo e il payout diventa il momento in cui raccogli il lavoro fatto.",
  },
  {
    title: "Se la challenge si ferma",
    description:
      "Il broker accompagna il ciclo e aiuta a proteggere il risultato. Non stai puntando tutto su una sola direzione del mercato.",
  },
];

const steps = [
  {
    icon: LaptopMinimal,
    title: "Apri il tuo spazio",
    description:
      "Entri in DeltaHedge, crei il primo slot e trovi tutto già ordinato passo per passo.",
  },
  {
    icon: WalletCards,
    title: "Colleghi challenge e broker",
    description:
      "Inserisci i due conti una sola volta. Da lì in poi li ritrovi sempre pronti nella tua dashboard.",
  },
  {
    icon: PlayCircle,
    title: "Accendi la coppia",
    description:
      "Quando i due lati sono pronti, DeltaHedge li fa lavorare insieme e ti mostra subito cosa sta succedendo.",
  },
];

const highlights = [
  {
    icon: Cloud,
    title: "Zero installazioni",
    description:
      "Niente VPS, niente EA locale, niente terminali da tenere aperti sul computer.",
  },
  {
    icon: TimerReset,
    title: "Tutto in un solo posto",
    description:
      "Connessioni, stato della coppia, monitoraggio e risultati stanno tutti nella stessa schermata.",
  },
  {
    icon: ShieldCheck,
    title: "Più ordine, meno caos",
    description:
      "DeltaHedge serve a togliere attrito: meno passaggi manuali, meno confusione, più controllo.",
  },
];

function SmallCard({
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
      <h3 className="mb-3 text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm leading-7 text-zinc-400">{description}</p>
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#05070b] text-white">
      <section className="relative overflow-hidden">
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
            <button
              type="button"
              className="text-sm text-zinc-400 transition hover:text-white"
              onClick={() =>
                document
                  .getElementById("come-funziona")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Come funziona
            </button>
            <button
              type="button"
              className="text-sm text-zinc-400 transition hover:text-white"
              onClick={() =>
                document
                  .getElementById("visual-prodotto")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Dashboard
            </button>
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

        <div className="absolute inset-0">
          <BackgroundPaths
            title=""
            description=""
            primaryLabel=""
            secondaryLabel=""
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-24 pt-32 md:px-8 md:pb-28 md:pt-40">
          <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.28em] text-zinc-300">
                <Sparkles className="size-3.5" />
                Profitto matematico da prop e broker
              </div>

              <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl md:text-7xl">
                Un sistema cloud che fa lavorare challenge e broker insieme.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400 md:text-xl">
                In parole povere: un conto prova a passare la challenge, l’altro
                accompagna il percorso. Così il risultato non dipende soltanto dal
                mercato che sale o scende.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  type="button"
                  size="lg"
                  className="rounded-2xl border border-white/10 bg-white px-7 text-black hover:bg-white/90"
                  onClick={() => navigate("/login")}
                >
                  Attiva il tuo primo slot
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="ghost"
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-7 text-white hover:bg-white/[0.08]"
                  onClick={() =>
                    document
                      .getElementById("visual-prodotto")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Guarda la dashboard
                </Button>
              </div>

              <div className="mt-8 space-y-3">
                {trustPoints.map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <CheckCircle2 className="size-4 shrink-0 text-white" />
                    <p className="text-sm text-zinc-300 md:text-base">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div id="visual-prodotto" className="relative">
              <div className="absolute inset-0 rounded-[34px] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(35,51,95,0.32),transparent_42%)] blur-3xl" />
              <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#0a0d13]/90 p-3 shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
                <div className="mb-3 flex items-center justify-between rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="size-2.5 rounded-full bg-white/35" />
                    <div className="size-2.5 rounded-full bg-white/20" />
                    <div className="size-2.5 rounded-full bg-white/15" />
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-300">
                    admin
                  </div>
                </div>

                <div className="overflow-hidden rounded-[24px] border border-white/8">
                  <img
                    src={dashboardPreview}
                    alt="Anteprima della dashboard DeltaHedge"
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="rounded-[34px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl md:p-10">
          <div className="grid gap-6 lg:grid-cols-2">
            {scenarios.map((scenario) => (
              <div
                key={scenario.title}
                className="rounded-[28px] border border-white/8 bg-black/25 p-6"
              >
                <p className="mb-3 text-xs uppercase tracking-[0.28em] text-zinc-500">
                  Scenario
                </p>
                <h2 className="mb-3 text-2xl font-semibold text-white">
                  {scenario.title}
                </h2>
                <p className="leading-7 text-zinc-400">{scenario.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="come-funziona"
        className="mx-auto max-w-7xl px-4 py-20 md:px-8"
      >
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-zinc-500">
            Come funziona
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Tutto è pensato per essere semplice da capire e semplice da usare.
          </h2>
          <p className="mt-5 text-lg leading-8 text-zinc-400">
            Tu non devi inseguire dieci strumenti diversi. DeltaHedge ti accompagna
            da quando colleghi i conti fino a quando controlli il risultato del ciclo.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {steps.map((step) => (
            <SmallCard key={step.title} {...step} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-zinc-500">
            Perché piace
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Meno attrito, meno rumore, più chiarezza.
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {highlights.map((highlight) => (
            <SmallCard key={highlight.title} {...highlight} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="rounded-[36px] border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-xl md:p-12">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-zinc-500">
            Inizia da qui
          </p>
          <h2 className="mx-auto max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Se vuoi un modo più ordinato per far lavorare insieme prop e broker,
            qui parte tutto.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
            Apri l’account, collega la coppia e lascia che DeltaHedge faccia il
            lavoro pesante. Tu torni nella dashboard per vedere tutto in chiaro.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              type="button"
              size="lg"
              className="rounded-2xl border border-white/10 bg-white px-7 text-black hover:bg-white/90"
              onClick={() => navigate("/login")}
            >
              Entra in DeltaHedge
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button
              type="button"
              size="lg"
              variant="ghost"
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-7 text-white hover:bg-white/[0.08]"
              onClick={() => navigate("/app")}
            >
              Apri la dashboard
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
