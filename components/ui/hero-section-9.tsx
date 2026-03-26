import * as React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Menu,
  ShieldCheck,
  Sparkles,
  WalletCards,
  X,
} from "lucide-react";

import dashboardPreview from "../../dashboard-minimal-overview.png";
import { cn } from "@/lib/utils";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { Button } from "@/components/ui/button";

const menuItems = [
  { name: "Come funziona", href: "#come-funziona" },
  { name: "Perché DeltaHedge", href: "#vantaggi" },
  { name: "Dashboard", href: "#dashboard-preview" },
];

const proofItems = [
  "Colleghi i conti una sola volta",
  "La coppia continua a lavorare anche se chiudi il browser",
  "Capisci tutto da una dashboard semplice",
];

const featureItems = [
  {
    icon: WalletCards,
    title: "Due conti che lavorano insieme",
    description:
      "Un conto prova a passare la challenge. L'altro accompagna il percorso e aiuta a bilanciare il ciclo.",
  },
  {
    icon: ShieldCheck,
    title: "Meno dipendenza dalla direzione",
    description:
      "L'idea è semplice: il risultato del ciclo non dipende soltanto dal mercato che sale o scende.",
  },
  {
    icon: Sparkles,
    title: "Più ordine, meno attrito",
    description:
      "Niente VPS, niente software locale da tenere acceso. Parti da qui e controlli tutto in un solo posto.",
  },
];

export const HeroSection = () => {
  const [menuState, setMenuState] = React.useState(false);

  return (
    <div className="min-h-screen bg-[#05070b] text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <BackgroundPaths title="" description="" primaryLabel="" secondaryLabel="" />
        </div>

        <header className="relative z-30">
          <nav
            data-state={menuState ? "active" : "inactive"}
            className="group fixed inset-x-0 top-0 z-30 border-b border-white/8 bg-[#05070b]/80 backdrop-blur-xl lg:absolute lg:border-transparent lg:bg-transparent"
          >
            <div className="mx-auto max-w-6xl px-6">
              <div className="flex flex-wrap items-center justify-between gap-6 py-4 lg:gap-0">
                <div className="flex w-full items-center justify-between lg:w-auto">
                  <Link to="/" aria-label="home" className="flex items-center gap-3">
                    <Logo />
                  </Link>

                  <button
                    onClick={() => setMenuState(!menuState)}
                    aria-label={menuState ? "Chiudi menu" : "Apri menu"}
                    className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                  >
                    <Menu className="m-auto size-6 duration-200 group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0" />
                    <X className="absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200 group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100" />
                  </button>
                </div>

                <div className="bg-background/95 group-data-[state=active]:block mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-white/10 p-6 shadow-2xl shadow-black/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
                  <div className="lg:pr-4">
                    <ul className="space-y-6 text-base lg:flex lg:gap-8 lg:space-y-0 lg:text-sm">
                      {menuItems.map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            className="text-zinc-400 transition duration-150 hover:text-white"
                          >
                            <span>{item.name}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit lg:border-l lg:border-white/10 lg:pl-6">
                    <Button asChild variant="outline" size="sm" className="border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]">
                      <Link to="/login">
                        <span>Login</span>
                      </Link>
                    </Button>
                    <Button asChild size="sm" className="bg-white text-black hover:bg-white/90">
                      <Link to="/login">
                        <span>Inizia ora</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>

        <main>
          <section className="overflow-hidden bg-transparent">
            <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-32 lg:pb-24 lg:pt-28">
              <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="relative z-10 max-w-2xl">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.28em] text-zinc-300">
                    <Sparkles className="size-3.5" />
                    DeltaHedge cloud
                  </div>

                  <h1 className="text-balance text-4xl font-semibold tracking-[-0.05em] text-white md:text-5xl lg:text-6xl">
                    Il modo più semplice per far lavorare insieme challenge e broker.
                  </h1>

                  <p className="my-8 max-w-2xl text-lg leading-8 text-zinc-400">
                    In parole povere: un conto prova a passare la challenge, l'altro accompagna il percorso.
                    Così il risultato non dipende soltanto dal mercato che sale o scende.
                  </p>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button asChild size="lg" className="rounded-2xl bg-white text-black hover:bg-white/90">
                      <Link to="/login">
                        <span className="inline-flex items-center">
                          Attiva il tuo primo slot
                          <ArrowRight className="ml-2 size-4" />
                        </span>
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="rounded-2xl border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]"
                    >
                      <a href="#dashboard-preview">
                        <span>Guarda la dashboard</span>
                      </a>
                    </Button>
                  </div>

                  <div className="mt-10 space-y-3">
                    {proofItems.map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <CheckCircle2 className="size-4 shrink-0 text-white" />
                        <p className="text-sm text-zinc-300 md:text-base">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div id="dashboard-preview" className="mx-auto w-full max-w-4xl">
                  <div className="rounded-[32px] border border-white/10 bg-[#0a0d13]/92 p-3 shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
                    <div className="mb-3 flex items-center justify-between rounded-[20px] border border-white/8 bg-white/[0.03] px-4 py-3">
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
                        className="relative z-[2] w-full rounded-[24px]"
                        src={dashboardPreview}
                        alt="Dashboard DeltaHedge"
                        width={2880}
                        height={2074}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="vantaggi" className="relative z-10 py-16">
            <div className="mx-auto max-w-6xl px-6">
              <h2 className="text-center text-lg font-medium text-zinc-300">
                Una piattaforma pensata per togliere attrito, non per aggiungerlo.
              </h2>

              <div className="mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-3">
                {featureItems.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
                  >
                    <div className="mb-5 inline-flex rounded-2xl border border-white/10 bg-white/[0.05] p-3 text-white">
                      <item.icon className="size-5" />
                    </div>
                    <h3 className="mb-3 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="text-sm leading-7 text-zinc-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-semibold tracking-[0.28em] text-white">
        DH
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white">
          DeltaHedge
        </p>
        <p className="text-xs text-zinc-400">Premium Pair Execution</p>
      </div>
    </div>
  );
};
