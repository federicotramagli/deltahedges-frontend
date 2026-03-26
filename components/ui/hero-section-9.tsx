import * as React from "react";
import { ArrowRight, ChevronRight, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import dashboardPreview from "../../Screenshot 2026-03-26 alle 18.14.53.png";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Come funziona", href: "#come-funziona" },
  { name: "Prezzi", href: "#pricing" },
  { name: "About", href: "#perche-deltahedge" },
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

const partnerLogos = [
  {
    name: "FTMO",
    src: "/brand-logos/ftmo.svg",
    className: "h-4 w-auto",
  },
  {
    name: "MetaApi",
    src: "/brand-logos/metaapi.svg",
    className: "h-5 w-auto",
  },
  {
    name: "Supabase",
    src: "/brand-logos/supabase.svg",
    className: "h-5 w-auto",
  },
  {
    name: "Railway",
    src: "/brand-logos/railway.svg",
    className: "h-5 w-auto",
  },
  {
    name: "Cloudflare",
    src: "/brand-logos/cloudflare.svg",
    className: "h-5 w-auto",
  },
  {
    name: "Vercel",
    src: "/brand-logos/vercel.svg",
    className: "h-5 w-auto invert",
  },
  {
    name: "Stripe",
    src: "/brand-logos/stripe.svg",
    className: "h-5 w-auto invert",
  },
  {
    name: "GitHub",
    src: "/brand-logos/github.svg",
    className: "h-5 w-auto invert",
  },
];

function FloatingPaths({
  position,
  className,
}: {
  position: number;
  className?: string;
}) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg className={cn("h-full w-full", className)} viewBox="0 0 696 316" fill="none">
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.08 + path.id * 0.012}
            initial={{ pathLength: 0.3, opacity: 0.45 }}
            animate={{
              pathLength: 1,
              opacity: [0.2, 0.5, 0.2],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-[#05070b] text-white">
      <div className="absolute inset-0 -z-30">
        <FloatingPaths position={1} className="text-[#22335f]" />
        <FloatingPaths position={-1} className="text-[#22335f]" />
      </div>
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(39,61,115,0.22),transparent_28%)]" />

      <HeroHeader />

      <main className="overflow-hidden">
        <div
          aria-hidden
          className="z-[2] pointer-events-none absolute inset-0 isolate hidden opacity-50 contain-strict lg:block"
        >
          <div className="absolute left-0 top-0 h-[80rem] w-[35rem] -translate-y-[350px] -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="absolute left-0 top-0 h-[80rem] w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="absolute left-0 top-0 h-[80rem] w-56 -translate-y-[350px] -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        </div>

        <section>
          <div className="relative pt-24 md:pt-36">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]"
            />
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                <AnimatedGroup variants={transitionVariants}>
                  <a
                    href="#perche-deltahedge"
                    className="bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border border-white/10 bg-white/[0.03] p-1 pl-4 shadow-md shadow-black/5 transition-all duration-300 hover:bg-[#0c1017] dark:shadow-zinc-950"
                  >
                    <span className="text-foreground text-sm">DeltaHedge Cloud</span>
                    <span className="block h-4 w-0.5 border-l border-white/10 bg-white dark:bg-zinc-700" />

                    <div className="bg-background size-6 overflow-hidden rounded-full duration-500 group-hover:bg-white/10">
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

                  <h1 className="mx-auto mt-8 max-w-4xl text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem]">
                    Il modo piu semplice per far lavorare challenge e broker insieme
                  </h1>
                  <p className="mx-auto mt-8 max-w-2xl text-balance text-lg text-zinc-400">
                    Colleghi i due conti una sola volta, segui tutto da una dashboard chiara e
                    lasci DeltaHedge gestire il lavoro nel cloud anche quando tu chiudi il browser.
                  </p>
                </AnimatedGroup>

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
                  <div key={1} className="rounded-[14px] border border-white/10 bg-white/10 p-0.5">
                    <Link
                      to="/login"
                      className={cn(buttonVariants({ size: "lg" }), "rounded-xl px-5 text-base")}
                    >
                      <span className="text-nowrap">Start Building</span>
                    </Link>
                  </div>
                  <a
                    key={2}
                    href="#dashboard-preview"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "lg" }),
                      "h-10.5 rounded-xl px-5 text-white hover:bg-white/5"
                    )}
                  >
                    <span className="text-nowrap">Request a demo</span>
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
              <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                <div
                  aria-hidden
                  className="absolute inset-0 z-10 bg-gradient-to-b from-transparent from-35% to-[#05070b]"
                />
                <div
                  id="dashboard-preview"
                  className="bg-background ring-background dark:inset-shadow-white/20 relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-white/10 p-4 shadow-lg shadow-zinc-950/15 ring-1"
                >
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#090c12]">
                    <div
                      aria-hidden
                      className="absolute right-0 top-0 z-20 h-16 w-80 bg-gradient-to-l from-[#0a0d12] via-[#0a0d12]/98 to-transparent"
                    />
                    <div className="absolute right-5 top-4 z-30 rounded-full border border-white/10 bg-[#10131a]/96 px-4 py-2 text-sm text-zinc-200 backdrop-blur">
                      admin
                    </div>
                    <img
                      className="relative z-[2] aspect-[15/8] w-full rounded-2xl border border-white/5 object-cover object-top"
                      src={dashboardPreview}
                      alt="Dashboard DeltaHedge"
                      width={2880}
                      height={2074}
                    />
                  </div>
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </section>

        <section className="bg-background pb-16 pt-14 md:pb-28">
          <div className="m-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm uppercase tracking-[0.32em] text-zinc-500">
                Infrastruttura cloud e strumenti su cui si appoggia DeltaHedge
              </p>
            </div>

            <div className="relative mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_16%,black_84%,transparent)]">
              <motion.div
                className="flex w-max items-center gap-14 md:gap-16"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                {[...partnerLogos, ...partnerLogos].map((logo, index) => (
                  <div
                    key={`${logo.name}-${index}`}
                    className="flex h-9 items-center justify-center opacity-75 transition-opacity duration-300 hover:opacity-100"
                  >
                    <img
                      className={cn("w-auto object-contain", logo.className)}
                      src={logo.src}
                      alt={`${logo.name} Logo`}
                      loading="lazy"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function HeroHeader() {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <nav data-state={menuState ? "active" : "inactive"} className="group fixed z-20 w-full px-2">
        <div
          className={cn(
            "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
            isScrolled && "max-w-4xl rounded-2xl border border-white/10 bg-[#090b10]/55 backdrop-blur-lg lg:px-5"
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
                <Menu className="m-auto size-6 duration-200 group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0" />
                <X className="absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200 group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="block text-zinc-400 duration-150 hover:text-white">
                      <span>{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-white/10 p-6 shadow-2xl shadow-zinc-950/20 group-data-[state=active]:block md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="block text-zinc-400 duration-150 hover:text-white">
                        <span>{item.name}</span>
                      </a>
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
                    isScrolled && "lg:hidden"
                  )}
                >
                  <span>Login</span>
                </Link>
                <Link
                  to="/login"
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "bg-white text-black hover:bg-white/90",
                    isScrolled && "lg:hidden"
                  )}
                >
                  <span>Get Started</span>
                </Link>
                <Link
                  to="/login"
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "hidden bg-white text-black hover:bg-white/90",
                    isScrolled && "lg:inline-flex"
                  )}
                >
                  <span>Get Started</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
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
