import * as React from "react";
import { ArrowRight, ChevronRight, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import dashboardPreview from "../../Screenshot 2026-03-26 alle 18.14.53.png";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { buttonVariants } from "@/components/ui/button";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Come funziona", href: "#come-funziona" },
  { name: "Perche DeltaHedge", href: "#perche-deltahedge" },
  { name: "Dashboard", href: "/app", internal: true },
];

const brandItems = [
  "FundingPips",
  "FTMO",
  "FundedNext",
  "The5ers",
  "FunderPro",
  "MetaApi",
  "Supabase",
  "Railway",
  "Cloudflare",
  "Vercel",
];

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export function HeroSection() {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05070b] text-white">
      <div className="absolute inset-0 -z-20">
        <BackgroundPaths title="" description="" primaryLabel="" secondaryLabel="" />
      </div>

      <header>
        <nav data-state={menuState ? "active" : "inactive"} className="fixed z-20 w-full px-2">
          <div
            className={cn(
              "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
              isScrolled && "max-w-4xl rounded-2xl border border-white/10 bg-[#090b10]/55 backdrop-blur-lg lg:px-5",
            )}
          >
            <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
              <div className="flex w-full justify-between lg:w-auto">
                <Link to="/" aria-label="home" className="flex items-center space-x-2">
                  <Logo />
                </Link>

                <button
                  onClick={() => setMenuState((open) => !open)}
                  aria-label={menuState ? "Close Menu" : "Open Menu"}
                  className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                >
                  <Menu className="m-auto size-6 duration-200 in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0" />
                  <X className="absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200 in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100" />
                </button>
              </div>

              <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                <ul className="flex gap-8 text-sm">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      {item.internal ? (
                        <Link to={item.href} className="block text-zinc-400 duration-150 hover:text-white">
                          <span>{item.name}</span>
                        </Link>
                      ) : (
                        <a href={item.href} className="block text-zinc-400 duration-150 hover:text-white">
                          <span>{item.name}</span>
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-background in-data-[state=active]:block mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-white/10 p-6 shadow-2xl shadow-zinc-950/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                <div className="lg:hidden">
                  <ul className="space-y-6 text-base">
                    {menuItems.map((item) => (
                      <li key={item.name}>
                        {item.internal ? (
                          <Link to={item.href} className="block text-zinc-400 duration-150 hover:text-white">
                            <span>{item.name}</span>
                          </Link>
                        ) : (
                          <a href={item.href} className="block text-zinc-400 duration-150 hover:text-white">
                            <span>{item.name}</span>
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                  <Link
                    to="/login"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "border-white/10 bg-transparent text-white hover:bg-white/5",
                      isScrolled && "lg:hidden",
                    )}
                  >
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/login"
                    className={cn(
                      buttonVariants({ size: "sm" }),
                      "bg-white text-black hover:bg-white/90",
                      isScrolled && "lg:hidden",
                    )}
                  >
                    <span>Inizia ora</span>
                  </Link>
                  <Link
                    to="/login"
                    className={cn(
                      buttonVariants({ size: "sm" }),
                      "hidden bg-white text-black hover:bg-white/90",
                      isScrolled && "lg:inline-flex",
                    )}
                  >
                    <span>Inizia ora</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block"
        >
          <div className="absolute left-0 top-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="absolute left-0 top-0 h-320 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="absolute left-0 top-0 h-320 w-60 -translate-y-87.5 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        </div>

        <section>
          <div className="relative pt-24 md:pt-36">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"
            />

            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                <AnimatedGroup variants={transitionVariants}>
                  <a
                    href="#perche-deltahedge"
                    className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border border-white/10 bg-white/[0.03] p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:shadow-zinc-950"
                  >
                    <span className="text-foreground text-sm">DeltaHedge Cloud</span>
                    <span className="dark:border-background block h-4 w-0.5 border-l border-white/10 bg-white dark:bg-zinc-700" />

                    <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                      <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                      </div>
                    </div>
                  </a>
                </AnimatedGroup>

                <TextEffect
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  as="h1"
                  className="mx-auto mt-8 max-w-4xl text-balance text-5xl max-md:font-semibold md:text-7xl lg:mt-16 xl:text-[5.25rem]"
                >
                  Il modo piu semplice per far lavorare challenge e broker insieme
                </TextEffect>
                <TextEffect
                  per="line"
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  delay={0.5}
                  as="p"
                  className="mx-auto mt-8 max-w-2xl text-balance text-lg text-zinc-400"
                >
                  In parole povere: un conto prova a passare la challenge. L'altro accompagna il percorso e aiuta a bilanciare il ciclo, cosi il risultato non dipende soltanto dalla direzione del mercato.
                </TextEffect>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
                >
                  <div
                    key={1}
                    className="rounded-[calc(var(--radius-xl)+0.125rem)] border border-white/10 bg-foreground/10 p-0.5"
                  >
                    <Link
                      to="/login"
                      className={cn(
                        buttonVariants({ size: "lg" }),
                        "rounded-xl px-5 text-base",
                      )}
                    >
                      <span className="text-nowrap">Inizia ora</span>
                    </Link>
                  </div>
                  <a
                    key={2}
                    href="#dashboard-preview"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "lg" }),
                      "h-10.5 rounded-xl px-5 text-white hover:bg-white/5",
                    )}
                  >
                    <span className="text-nowrap">Guarda la dashboard</span>
                  </a>
                </AnimatedGroup>
              </div>
            </div>

            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.75,
                    },
                  },
                },
                ...transitionVariants,
              }}
            >
              <div className="relative -mr-56 mt-8 overflow-hidden px-2 mask-b-from-55% sm:mr-0 sm:mt-12 md:mt-20">
                <div
                  id="dashboard-preview"
                  className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-white/10 p-4 shadow-lg shadow-zinc-950/15 ring-1"
                >
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#090c12]">
                    <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-white/8 bg-[#0d1016]/92 px-4 py-3 backdrop-blur">
                      <div className="flex items-center gap-2">
                        <div className="size-2.5 rounded-full bg-white/20" />
                        <div className="size-2.5 rounded-full bg-white/10" />
                        <div className="size-2.5 rounded-full bg-white/10" />
                      </div>
                      <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                        admin
                      </div>
                    </div>
                    <img
                      className="relative z-[2] aspect-[15/8] w-full rounded-2xl object-cover object-top pt-14"
                      src={dashboardPreview}
                      alt="Dashboard DeltaHedge"
                      width={2700}
                      height={1440}
                    />
                  </div>
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </section>

        <section className="bg-background pb-16 pt-16 md:pb-32">
          <div className="relative m-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
                Infrastruttura e brand con cui il flusso si appoggia
              </p>
            </div>

            <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_18%,black_82%,transparent)]">
              <motion.div
                className="flex w-max items-center gap-4"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 26,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {[...brandItems, ...brandItems].map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="flex h-14 min-w-[11rem] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-6 backdrop-blur-sm"
                  >
                    <span className="text-sm font-medium tracking-[0.28em] text-zinc-300 uppercase">
                      {item}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="mt-8 text-center">
              <a href="#come-funziona" className="inline-flex items-center text-sm text-zinc-400 duration-150 hover:text-white">
                <span>Vedi come lavora DeltaHedge</span>
                <ChevronRight className="ml-1 inline-block size-3" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-sm font-semibold tracking-[0.35em] text-white">
        DH
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold tracking-[0.35em] text-white">DELTAHEDGE</span>
        <span className="text-xs text-zinc-500">Premium Pair Execution</span>
      </div>
    </div>
  );
}
