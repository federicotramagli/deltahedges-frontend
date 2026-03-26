import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  Cloud,
  Eye,
  LaptopMinimal,
  Link2,
  MoveRight,
  ShieldCheck,
  PlayCircle,
  TimerReset,
  TrendingUp,
} from "lucide-react";

import { BackgroundPaths } from "@/components/ui/background-paths";
import { Button } from "@/components/ui/button";
import dashboardPreview from "../../dashboard-cloud-premium.png";

const features = [
  {
    icon: LaptopMinimal,
    title: "Non devi installare nulla",
    description:
      "Non devi tenere acceso il computer e non devi configurare soluzioni complicate. Colleghi i conti e poi controlli tutto dal browser.",
  },
  {
    icon: TrendingUp,
    title: "Non vivi di sola direzione",
    description:
      "L’idea è semplice: usiamo un conto challenge e un broker insieme, così il risultato del ciclo non dipende soltanto dal mercato che sale o scende.",
  },
  {
    icon: Eye,
    title: "Capisci subito cosa sta succedendo",
    description:
      "La dashboard ti fa vedere connessioni, stato della coppia, andamento del ciclo e movimenti dei due conti in modo semplice e leggibile.",
  },
];

const steps = [
  {
    icon: Link2,
    title: "1. Colleghi due conti",
    description:
      "Un conto serve per la challenge prop. L’altro è il broker che accompagna il percorso. Tu li inserisci una sola volta.",
  },
  {
    icon: PlayCircle,
    title: "2. Accendi la coppia",
    description:
      "Quando i due conti sono pronti, DeltaHedge li mette a lavorare insieme. Se uno dei due non è collegato bene, il sistema aspetta.",
  },
  {
    icon: TimerReset,
    title: "3. Controlli tutto da una sola schermata",
    description:
      "Tu non devi inseguire grafici e pannelli diversi. Apri la dashboard e vedi subito se la coppia è in salute, in attesa o in azione.",
  },
];

const outcomes = [
  "Un conto prova a passare la challenge.",
  "L’altro conto aiuta a bilanciare il percorso.",
  "Il risultato del ciclo non dipende solo da un lato del mercato.",
  "Tu leggi tutto in modo semplice da una sola dashboard.",
];

const proofPoints = [
  {
    icon: Cloud,
    title: "Cloud-first",
    description: "DeltaHedge continua a lavorare anche quando chiudi il browser.",
  },
  {
    icon: ShieldCheck,
    title: "Più controllo",
    description: "La coppia viene osservata continuamente, così sai sempre se è pronta, attiva o da fermare.",
  },
  {
    icon: BarChart3,
    title: "Più chiarezza",
    description: "Vedi prop, broker, PnL e progresso del ciclo senza dover interpretare schermate piene di rumore.",
  },
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
            <button
              type="button"
              className="text-sm text-zinc-400 transition hover:text-white"
              onClick={() =>
                document.getElementById("come-funziona")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Come funziona
            </button>
            <button
              type="button"
              className="text-sm text-zinc-400 transition hover:text-white"
              onClick={() =>
                document.getElementById("dashboard-preview")?.scrollIntoView({ behavior: "smooth" })
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

        <BackgroundPaths
          title="Due conti che lavorano insieme"
          description="In parole povere: un conto prova a passare la challenge, l’altro fa da bilanciamento. Così il profitto del ciclo non dipende soltanto dalla direzione del mercato."
          primaryLabel="Apri DeltaHedge"
          secondaryLabel="Guarda come funziona"
          onPrimaryClick={() => navigate("/login")}
          onSecondaryClick={() =>
            document.getElementById("come-funziona")?.scrollIntoView({ behavior: "smooth" })
          }
        />
      </section>

      <section className="relative z-10 mx-auto -mt-28 max-w-7xl px-4 md:px-8">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-3 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
          <div
            id="dashboard-preview"
            className="overflow-hidden rounded-[26px] border border-white/8 bg-[#06080d]"
          >
            <img
              src={dashboardPreview}
              alt="Anteprima della dashboard DeltaHedge"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-zinc-500">
            Cosa facciamo davvero
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Aiutiamo una challenge prop e un broker a muoversi insieme, così il ciclo ha una logica più stabile e più controllata.
          </h2>
          <p className="mt-5 text-lg leading-8 text-zinc-400">
            Non ti stiamo vendendo una pagina piena di numeri. Ti stiamo dando un modo
            semplice per gestire due conti che fanno due lavori diversi ma camminano insieme.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {features.map((feature) => (
            <SectionCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <section
        id="come-funziona"
        className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:px-8 lg:grid-cols-[1.08fr_0.92fr]"
      >
        <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-zinc-500">
            Come funziona
          </p>
          <h2 className="mb-8 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            La spiegazione semplice è questa.
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
            In parole povere
          </p>
          <h2 className="mb-8 text-2xl font-semibold tracking-tight text-white">
            Non puntiamo a “indovinare” soltanto il mercato. Puntiamo a far lavorare bene la coppia.
          </h2>

          <div className="space-y-3">
            {outcomes.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-white/8 bg-black/20 px-4 py-3"
              >
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-white" />
                <p className="text-sm leading-6 text-zinc-300">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[24px] border border-white/10 bg-[#06080d] p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Tu cosa vedi
                </p>
                <p className="mt-3 text-base leading-7 text-white">
                  Se la coppia è pronta, se è accesa e se i due conti stanno facendo il loro lavoro.
                </p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Perché è utile
                </p>
                <p className="mt-3 text-base leading-7 text-white">
                  Perché non devi più interpretare da solo dieci schermate diverse per capire se il ciclo sta andando bene.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-zinc-500">
            Perché piace
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Meno attrito, meno caos, più chiarezza.
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {proofPoints.map((feature) => (
            <SectionCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="rounded-[36px] border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-xl md:p-12">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-zinc-500">
            Inizia da qui
          </p>
          <h2 className="mx-auto max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Se vuoi far lavorare challenge e broker insieme in modo semplice, qui parte tutto.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
            Crei l’account, colleghi la coppia e poi lasci DeltaHedge seguire il lavoro.
            Tu torni solo quando vuoi controllare la dashboard e vedere come sta andando.
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
              Guarda la dashboard
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
