import * as React from "react";
import { ArrowRight, ChevronRight, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";

import dashboardPreview from "../../Screenshot 2026-03-27 alle 11.14.07.png";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Come funziona", href: "#come-funziona" },
  { name: "Scenari", href: "#scenari" },
  { name: "Calcolatore", href: "#calcolatore" },
  { name: "Analytics", href: "#performance-analytics" },
  { name: "Prezzi", href: "#pricing" },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const imageReveal = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
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
  const heroControls = useAnimation();

  React.useEffect(() => {
    heroControls.start("visible");
  }, [heroControls]);

  return (
    <div className="brand-shell relative overflow-hidden text-white">
      <div className="absolute inset-0 -z-30">
        <FloatingPaths position={1} className="text-[#30479a]" />
        <FloatingPaths position={-1} className="text-[#243b80]" />
      </div>
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_right,rgba(123,137,255,0.14),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(45,212,191,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_32%)]" />

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
                <motion.a
                  initial="hidden"
                  animate={heroControls}
                  variants={fadeUp}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  href="#perche-deltahedge"
                  className="brand-pill group mx-auto flex w-fit items-center gap-4 rounded-full p-1 pl-4 shadow-md shadow-black/5 transition-all duration-300 hover:bg-[#0c1017] dark:shadow-zinc-950"
                >
                  <span className="text-foreground text-sm">Trading Matematico</span>
                  <span className="block h-4 w-0.5 border-l border-white/10 bg-white dark:bg-zinc-700" />

                  <div className="size-6 overflow-hidden rounded-full bg-[linear-gradient(135deg,#f8fbff,#c9d4ff)] text-[#07101f] duration-500 group-hover:brightness-105">
                    <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                      <span className="flex size-6">
                        <ArrowRight className="m-auto size-3" />
                      </span>
                      <span className="flex size-6">
                        <ArrowRight className="m-auto size-3" />
                      </span>
                    </div>
                  </div>
                </motion.a>

                <motion.h1
                  initial="hidden"
                  animate={heroControls}
                  variants={fadeUp}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0 }}
                  className="mx-auto mt-8 max-w-4xl text-balance text-6xl font-semibold tracking-[-0.06em] md:text-7xl lg:mt-16 xl:text-[5.25rem]"
                >
                  Il modo matematico per far lavorare <span className="brand-gradient-text">challenge e broker</span> insieme.
                </motion.h1>
                <motion.p
                  initial="hidden"
                  animate={heroControls}
                  variants={fadeUp}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  className="mx-auto mt-8 max-w-2xl text-balance text-lg text-zinc-400"
                >
                  DeltaHedge crea una coppia tra prop e broker per ridurre la dipendenza dalla sola direzione del mercato. Tu colleghi i conti, noi diamo struttura, continuità e controllo.
                </motion.p>

                <motion.div
                  initial="hidden"
                  animate={heroControls}
                  variants={fadeUp}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                  className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
                >
                  <motion.div
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 24px 56px rgba(83,102,255,0.24)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-[16px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(123,137,255,0.16))] p-0.5 shadow-[0_18px_44px_rgba(83,102,255,0.16)]"
                  >
                    <Link
                      to="/login"
                      className={cn(
                        buttonVariants({ size: "lg" }),
                        "rounded-[14px] bg-[linear-gradient(135deg,#f8fbff_0%,#d9e0ff_55%,#9be7ff_100%)] px-5 text-base text-[#06101d] hover:brightness-105"
                      )}
                    >
                      <span className="text-nowrap">Attiva il tuo Trading Matematico</span>
                    </Link>
                  </motion.div>
                  <motion.a
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 24px 56px rgba(14,20,32,0.4)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    href="#dashboard-preview"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "lg" }),
                      "h-10.5 rounded-[14px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,38,0.78),rgba(10,14,26,0.92))] px-5 text-white hover:bg-white/5"
                    )}
                  >
                    <span className="text-nowrap">Passa la tua Challenge</span>
                  </motion.a>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial="hidden"
              animate={heroControls}
              variants={imageReveal}
              transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
              className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20"
            >
                <div
                  aria-hidden
                  className="absolute inset-0 z-10 bg-gradient-to-b from-transparent from-35% to-[#05070b]"
                />
                <div
                  id="dashboard-preview"
                  className="brand-surface relative mx-auto max-w-6xl overflow-hidden rounded-[30px] p-4 ring-1 ring-white/5"
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
            </motion.div>
          </div>
        </section>

        <section className="bg-transparent pb-16 pt-14 md:pb-28">
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
                    className="brand-pill flex h-10 items-center justify-center rounded-full px-5 opacity-80 transition-all duration-300 hover:-translate-y-0.5 hover:opacity-100"
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
            isScrolled && "max-w-4xl rounded-2xl border border-white/10 bg-[#0b1020]/70 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl lg:px-5"
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

            <div className="brand-surface-soft mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl p-6 shadow-2xl shadow-zinc-950/20 group-data-[state=active]:block md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
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
                    "border-white/10 bg-[linear-gradient(180deg,rgba(16,22,38,0.78),rgba(10,14,26,0.92))] text-white hover:bg-white/5",
                    isScrolled && "lg:hidden"
                  )}
                >
                  <span>Login</span>
                </Link>
                <Link
                  to="/login"
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "bg-[linear-gradient(135deg,#f8fbff_0%,#d9e0ff_55%,#9be7ff_100%)] text-[#06101d] hover:brightness-105",
                    isScrolled && "lg:hidden"
                  )}
                >
                  <span>Get Started</span>
                </Link>
                <Link
                  to="/login"
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "hidden bg-[linear-gradient(135deg,#f8fbff_0%,#d9e0ff_55%,#9be7ff_100%)] text-[#06101d] hover:brightness-105",
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
      <div className="flex flex-col">
        <div className="flex items-baseline text-[22px] font-black uppercase tracking-[-0.05em]">
          <span className="brand-gradient-text">Delta</span>
          <span className="text-foreground">Hedge</span>
        </div>
        <span className="text-xs text-zinc-500">Motore cicli prop</span>
      </div>
    </div>
  );
}
