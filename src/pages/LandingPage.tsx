import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Cloud,
  LayoutDashboard,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  TimerReset,
  WalletCards,
} from "lucide-react";

import { BackgroundPaths } from "@/components/ui/background-paths";
import { Button } from "@/components/ui/button";
import dashboardPreview from "../../dashboard-minimal-overview.png";

const statCards = [
  { value: "Cloud", label: "lavora anche a browser chiuso" },
  { value: "2 conti", label: "challenge e broker insieme" },
  { value: "1 dashboard", label: "tutto leggibile da qui" },
];

const howItWorks = [
  {
    icon: WalletCards,
    title: "Colleghi i due conti",
    description:
      "Inserisci challenge e broker una sola volta. Da lì in poi li ritrovi già pronti nella piattaforma.",
  },
  {
    icon: PlayCircle,
    title: "Accendi la coppia",
    description:
      "Quando i due lati sono collegati bene, DeltaHedge li prepara e li fa lavorare insieme.",
  },
  {
    icon: TimerReset,
    title: "Controlli tutto da qui",
    description:
      "Apri la dashboard e capisci subito se la coppia è pronta, in attesa oppure già attiva.",
  },
];

const reasons = [
  {
    icon: Cloud,
    title: "Zero installazioni",
    description:
      "Niente VPS, niente terminali da tenere aperti e niente software da far girare sul tuo computer.",
  },
  {
    icon: ShieldCheck,
    title: "Meno dipendenza dalla direzione",
    description:
      "L’idea è semplice: un conto prova a passare la challenge, l’altro accompagna il percorso e aiuta a bilanciare il ciclo.",
  },
  {
    icon: LayoutDashboard,
    title: "Più chiarezza",
    description:
      "Hai una vista unica su stato delle coppie, connessioni, progressi e risultati, senza schermate caotiche.",
  },
];

function InfoCard({
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
        <div className="absolute inset-0">
          <BackgroundPaths title="" description="" primaryLabel="" secondaryLabel="" />
        </div>

        <div className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-4 py-6 md:px-8">
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
                  .getElementById("dashboard-preview")
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
              className="rounded-2xl border border-white/10 bg-white px-6 text-black hover:bg-white/90"
              onClick={() => navigate("/login")}
            >
              Inizia ora
            </Button>
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-24 pt-10 md:px-8 md:pb-28 md:pt-16">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.28em] text-zinc-300">
                <Sparkles className="size-3.5" />
                Hedging semplice tra prop e broker
              </div>

              <h1 className="text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl md:text-7xl">
                La piattaforma che fa lavorare due conti insieme, in modo più ordinato.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400 md:text-xl">
                In parole povere: un conto prova a passare la challenge, l’altro accompagna
                il percorso. Così il risultato non dipende soltanto dal mercato che sale o scende.
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
                  onClick={() => navigate("/app")}
                >
                  Guarda la dashboard
                </Button>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {statCards.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[24px] border border-white/10 bg-white/[0.03] px-5 py-5 backdrop-blur-xl"
                  >
                    <p className="text-2xl font-semibold text-white">{item.value}</p>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div id="dashboard-preview" className="relative">
              <div className="absolute inset-0 rounded-[36px] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(35,51,95,0.34),transparent_42%)] blur-3xl" />
              <div className="relative rounded-[36px] border border-white/10 bg-[#090c12]/92 p-3 shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
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

      <section className="mx-auto max-w-7xl px-4 py-18 md:px-8">
        <div className="rounded-[36px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl md:p-10">
          <div className="grid gap-5 lg:grid-cols-3">
            {reasons.map((item) => (
              <InfoCard key={item.title} {...item} />
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
            Tutto è pensato per partire senza attrito.
          </h2>
          <p className="mt-5 text-lg leading-8 text-zinc-400">
            Non devi inseguire strumenti diversi o configurazioni complicate.
            Parti, colleghi i conti e da lì capisci tutto da una sola schermata.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {howItWorks.map((item) => (
            <InfoCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 pt-8 md:px-8">
        <div className="rounded-[36px] border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-xl md:p-12">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-zinc-500">
            Inizia da qui
          </p>
          <h2 className="mx-auto max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Se vuoi un modo più semplice per far lavorare insieme prop e broker, qui parte tutto.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
            Apri DeltaHedge, collega la coppia e lascia che la piattaforma faccia il lavoro pesante.
            Tu torni nella dashboard per vedere tutto in chiaro.
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
