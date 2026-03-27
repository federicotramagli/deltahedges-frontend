import * as React from "react";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Bot,
  ChartNoAxesCombined,
  Clock3,
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
  { value: "2 conti", label: "Una challenge e un broker che lavorano insieme" },
  { value: "Zero VPS", label: "Tutto gira nel cloud, non sul tuo computer" },
  { value: "1 dashboard", label: "Vedi stato, progressi e risultati in un solo posto" },
];

const serviceCards = [
  {
    icon: Workflow,
    title: "Colleghi due conti una sola volta",
    body:
      "Inserisci i dati della challenge e del broker. DeltaHedge prepara la coppia e la tiene ordinata dentro la piattaforma.",
  },
  {
    icon: Bot,
    title: "Il lavoro continua anche se esci",
    body:
      "Puoi chiudere il browser. La coppia resta operativa nel cloud e tu torni dentro quando vuoi per controllare cosa sta succedendo.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Capisci tutto senza interpretare grafici strani",
    body:
      "Dentro la dashboard vedi conti, fase, equity e progressi con parole chiare. Sai subito se la coppia è pronta, attiva o da sistemare.",
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
    title: "Meno dipendenza da una sola direzione",
    text:
      "L'idea di base è semplice: non lasciare tutto al solo salire o scendere del mercato, ma usare due lati che si accompagnano.",
  },
  {
    icon: Clock3,
    title: "Meno attrito operativo",
    text:
      "Niente installazioni complicate, niente gestione manuale di più schermate. Hai una piattaforma che ti accompagna passo dopo passo.",
  },
  {
    icon: Activity,
    title: "Più chiarezza durante il ciclo",
    text:
      "Sai cosa preparare, cosa succede dopo e quando la coppia è pronta. Il prodotto ti spiega il lavoro in modo semplice.",
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
          <div className="space-y-6">
            <span className="brand-pill inline-flex items-center rounded-full px-4 py-1 text-xs uppercase tracking-[0.35em] text-zinc-300">
              Cosa fa DeltaHedge
            </span>
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Una piattaforma che dà struttura a un processo che di solito è sparso, manuale e pieno di attrito.
            </h2>
            <p className="max-w-xl text-lg leading-8 text-zinc-400">
              In parole povere: crei una coppia tra challenge e broker. Da lì in poi hai un posto unico dove vedere conti, stato, avanzamento e risultati, con meno frizione e più controllo.
            </p>
            <div className="space-y-3 pt-2">
              {[
                "Colleghi i dati dei conti una sola volta",
                "Vedi subito se la coppia è pronta, attiva o da completare",
                "Controlli equity, progressi e risultati da una dashboard semplice",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                  <span className="leading-6">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
              {serviceCards.map((card) => (
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
            ))}
          </div>
        </div>
      </section>

      <section id="come-funziona" className="relative z-10 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="brand-pill inline-flex items-center rounded-full px-4 py-1 text-xs uppercase tracking-[0.35em] text-zinc-300">
              Come funziona
            </span>
            <h2 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Meno passaggi sparsi. Più continuità.
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-400">
              Non devi capire tutto in un colpo solo. DeltaHedge ti accompagna un passaggio
              alla volta e ti mostra sempre cosa fare dopo.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
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
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="brand-surface rounded-[28px] p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(123,137,255,0.18),rgba(45,212,191,0.12))]">
                <reason.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-6 text-xl font-medium text-white">{reason.title}</h3>
              <p className="mt-4 text-sm leading-7 text-zinc-400">{reason.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="brand-pill inline-flex items-center rounded-full px-4 py-1 text-xs uppercase tracking-[0.35em] text-zinc-300">
              Testimonianze
            </span>
            <h2 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Le persone non cercano un software pieno di pulsanti. Cercano chiarezza.
            </h2>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
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
            ))}
          </div>
        </div>
      </section>

      <PricingSection
        className="relative"
        plans={DELTAHEDGE_PLANS}
        heading="Scegli quanti slot vuoi far lavorare"
        description="Parti gratis con 1 trade di prova. Quando vuoi andare live, scegli quanti slot attivare ogni mese oppure passa al piano annuale."
      />

      <section className="relative z-10 px-6 pb-24 pt-10 md:pb-32">
        <div className="brand-surface mx-auto max-w-5xl rounded-[2rem] p-8 md:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <span className="brand-pill inline-flex items-center rounded-full px-4 py-1 text-xs uppercase tracking-[0.35em] text-zinc-300">
              Newsletter privata
            </span>
            <h2 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Vuoi seguire l’evoluzione del prodotto prima degli altri?
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-400">
              Ti aggiorniamo solo quando c’è qualcosa che cambia davvero l’esperienza: nuove funzioni, nuovi slot disponibili e miglioramenti operativi.
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
            <button
              type="submit"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 rounded-2xl bg-[linear-gradient(135deg,#f8fbff_0%,#d9e0ff_55%,#9be7ff_100%)] px-6 text-[#06101d] hover:brightness-105",
              )}
            >
              Ricevi aggiornamenti
            </button>
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
            <Link
              to="/login"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-2xl bg-[linear-gradient(135deg,#f8fbff_0%,#d9e0ff_55%,#9be7ff_100%)] px-6 text-[#06101d] hover:brightness-105",
              )}
            >
              Entra nella dashboard
            </Link>
            <a
              href="#come-funziona"
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,38,0.78),rgba(10,14,26,0.92))] px-6 text-white hover:bg-white/5",
              )}
            >
              Leggi come funziona
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
