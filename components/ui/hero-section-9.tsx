import * as React from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

import dashboardPreview from "../../dashboard-minimal-overview.png";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Come funziona", href: "#come-funziona" },
  { name: "Perche DeltaHedge", href: "#perche-deltahedge" },
  { name: "Dashboard", href: "/app", internal: true },
];

export function HeroSection() {
  const [menuState, setMenuState] = React.useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05070b] text-white">
      <div className="absolute inset-0 -z-20">
        <BackgroundPaths title="" description="" primaryLabel="" secondaryLabel="" />
      </div>

      <header>
        <nav
          data-state={menuState ? "active" : "inactive"}
          className="group fixed z-30 w-full border-b border-dashed border-white/10 bg-[#090b10]/80 backdrop-blur md:relative md:bg-transparent"
        >
          <div className="m-auto max-w-5xl px-6">
            <div className="flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
              <div className="flex w-full justify-between lg:w-auto">
                <Link aria-label="home" to="/" className="flex items-center space-x-2">
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

              <div className="bg-[#111318] group-data-[state=active]:block mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-white/10 p-6 shadow-2xl shadow-black/30 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
                <div className="lg:pr-4">
                  <ul className="space-y-6 text-base lg:flex lg:gap-8 lg:space-y-0 lg:text-sm">
                    {menuItems.map((item) => (
                      <li key={item.name}>
                        {item.internal ? (
                          <Link
                            to={item.href}
                            className="block text-zinc-400 duration-150 hover:text-white"
                          >
                            <span>{item.name}</span>
                          </Link>
                        ) : (
                          <a
                            href={item.href}
                            className="block text-zinc-400 duration-150 hover:text-white"
                          >
                            <span>{item.name}</span>
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit lg:border-l lg:border-white/10 lg:pl-6">
                  <Link
                    to="/login"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "border-white/10 bg-transparent text-white hover:bg-white/5",
                    )}
                  >
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/login"
                    className={cn(
                      buttonVariants({ size: "sm" }),
                      "bg-white text-black hover:bg-white/90",
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

      <main>
        <div
          aria-hidden
          className="absolute inset-0 z-[2] hidden isolate opacity-50 contain-strict lg:block"
        >
          <div className="absolute left-0 top-0 h-[80rem] w-[35rem] -translate-y-[21.875rem] -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="absolute left-0 top-0 h-[80rem] w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="absolute left-0 top-0 h-[80rem] w-56 -translate-y-[21.875rem] -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        </div>

        <section className="overflow-hidden bg-transparent">
          <div className="relative mx-auto max-w-5xl px-6 py-28 lg:py-24">
            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                Il modo piu semplice per far lavorare challenge e broker insieme
              </h1>
              <p className="mx-auto my-8 max-w-2xl text-xl text-zinc-400">
                In parole povere: un conto prova a passare la challenge, l'altro
                accompagna il percorso. Cosi il risultato del ciclo non dipende
                soltanto dal mercato che sale o scende.
              </p>

              <Link
                to="/login"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 rounded-xl bg-white px-8 text-base text-black hover:bg-white/90",
                )}
              >
                <span className="btn-label">Inizia ora</span>
              </Link>
            </div>
          </div>

          <div className="mx-auto -mt-16 max-w-7xl [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)]">
            <div className="[perspective:1200px] [mask-image:linear-gradient(to_right,black_65%,transparent_100%)] -mr-16 pl-16 lg:-mr-56 lg:pl-56">
              <div className="[transform:rotateX(20deg)]">
                <div className="relative lg:h-[44rem] skew-x-[.36rad]">
                  <div className="relative overflow-hidden rounded-[--radius] border border-white/10 bg-[#0c0f15] shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
                    <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-white/8 bg-[#0d1016]/90 px-5 py-3 backdrop-blur">
                      <div className="flex items-center gap-2">
                        <span className="size-2.5 rounded-full bg-white/20" />
                        <span className="size-2.5 rounded-full bg-white/12" />
                        <span className="size-2.5 rounded-full bg-white/10" />
                      </div>
                      <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                        admin
                      </div>
                    </div>
                    <img
                      className="relative z-[2] w-full rounded-[--radius] object-cover object-top pt-14"
                      src={dashboardPreview}
                      alt="Dashboard DeltaHedge"
                      width={1280}
                      height={720}
                    />
                  </div>
                </div>
              </div>
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
        <span className="text-sm font-semibold tracking-[0.35em] text-white">
          DELTAHEDGE
        </span>
        <span className="text-xs text-zinc-500">Premium Pair Execution</span>
      </div>
    </div>
  );
}
