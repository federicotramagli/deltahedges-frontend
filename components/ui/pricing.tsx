import * as React from "react";
import { Link } from "react-router-dom";
import { motion, type Transition } from "framer-motion";
import { CheckCircleIcon, StarIcon } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type Frequency = "monthly" | "yearly";

const frequencies: Frequency[] = ["monthly", "yearly"];

export interface Plan {
  name: string;
  info: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: {
    text: string;
    tooltip?: string;
  }[];
  btn: {
    text: string;
    href: string;
    internal?: boolean;
  };
  highlighted?: boolean;
}

interface PricingSectionProps extends React.ComponentProps<"section"> {
  plans: Plan[];
  heading: string;
  description?: string;
}

export function PricingSection({
  plans,
  heading,
  description,
  className,
  ...props
}: PricingSectionProps) {
  const [frequency, setFrequency] = React.useState<Frequency>("monthly");

  return (
    <section className={cn("relative z-10 px-6 py-24 md:py-32", className)} {...props}>
      <div className="pointer-events-none absolute inset-x-0 top-10 mx-auto h-72 max-w-4xl rounded-full bg-[#7b89ff]/8 blur-3xl" />
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center space-y-6">
        <div className="mx-auto max-w-2xl space-y-3 text-center">
          <span className="brand-pill inline-flex items-center rounded-full px-4 py-1 text-xs uppercase tracking-[0.35em] text-zinc-300">
            Prezzi
          </span>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
            {heading}
          </h2>
          {description && (
            <p className="text-balance text-sm text-zinc-400 md:text-base">
              {description}
            </p>
          )}
        </div>

        <PricingFrequencyToggle
          frequency={frequency}
          setFrequency={setFrequency}
        />

        <div className="grid w-full gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} frequency={frequency} />
          ))}
        </div>
      </div>
    </section>
  );
}

type PricingFrequencyToggleProps = React.ComponentProps<"div"> & {
  frequency: Frequency;
  setFrequency: React.Dispatch<React.SetStateAction<Frequency>>;
};

function PricingFrequencyToggle({
  frequency,
  setFrequency,
  className,
  ...props
}: PricingFrequencyToggleProps) {
  return (
    <div
      className={cn(
        "brand-pill mx-auto flex w-fit rounded-full p-1",
        className,
      )}
      {...props}
    >
      {frequencies.map((freq) => (
        <button
          key={freq}
          type="button"
          onClick={() => setFrequency(freq)}
          className="relative px-5 py-2 text-sm font-medium capitalize text-zinc-400"
        >
          <span className="relative z-10 mix-blend-difference">{freq === "monthly" ? "Monthly" : "Yearly"}</span>
          {frequency === freq && (
            <motion.span
              layoutId="pricing-frequency"
              transition={{ type: "spring", duration: 0.35 }}
              className="absolute inset-0 z-0 rounded-full bg-[linear-gradient(135deg,#f8fbff_0%,#d9e0ff_55%,#9be7ff_100%)]"
            />
          )}
        </button>
      ))}
    </div>
  );
}

type PricingCardProps = React.ComponentProps<"div"> & {
  plan: Plan;
  frequency: Frequency;
};

function PricingCard({
  plan,
  frequency,
  className,
  ...props
}: PricingCardProps) {
  const savings =
    frequency === "yearly" && plan.price.monthly > 0
      ? Math.round(
          ((plan.price.monthly * 12 - plan.price.yearly) /
            (plan.price.monthly * 12)) *
            100,
        )
      : 0;

  const buttonClassName = cn(
    buttonVariants({
      variant: plan.highlighted ? "default" : "outline",
      size: "lg",
    }),
    "w-full rounded-xl",
    plan.highlighted
      ? "bg-white text-black hover:bg-white/90"
      : "border-white/10 bg-transparent text-white hover:bg-white/5",
  );

  const priceLabel =
    plan.price[frequency] === 0 ? "Gratis" : `$${plan.price[frequency]}`;

  return (
    <div
      className={cn(
        "brand-surface relative flex min-h-[31rem] flex-col overflow-hidden rounded-3xl",
        plan.highlighted && "shadow-[0_32px_90px_rgba(83,102,255,0.18),inset_0_1px_0_rgba(255,255,255,0.04)]",
        className,
      )}
      {...props}
    >
      {plan.highlighted && (
        <BorderTrail
          size={110}
        className="bg-[linear-gradient(135deg,#b8c2ff,#67e8f9)]"
        style={{
          boxShadow:
            "0px 0px 48px 18px rgb(184 194 255 / 22%), 0 0 90px 50px rgb(0 0 0 / 40%)",
        }}
      />
      )}

      <div className={cn("relative border-b border-white/10 p-6", plan.highlighted && "bg-white/[0.03]")}>
        <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
          {plan.highlighted && (
            <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-[#0a1020]/80 px-2 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white">
              <StarIcon className="h-3 w-3 fill-current" />
              Popolare
            </span>
          )}
          {frequency === "yearly" && savings > 0 && (
            <span className="inline-flex items-center rounded-md border border-white/10 bg-[linear-gradient(135deg,#f8fbff_0%,#d9e0ff_55%,#9be7ff_100%)] px-2 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#06101d]">
              -{savings}%
            </span>
          )}
        </div>

        <div className="text-lg font-medium text-white">{plan.name}</div>
        <p className="mt-1 text-sm text-zinc-400">{plan.info}</p>
        <h3 className="mt-5 flex items-end gap-1">
          <span className="text-4xl font-semibold tracking-tight text-white">{priceLabel}</span>
          {plan.price[frequency] > 0 && (
            <span className="pb-1 text-sm text-zinc-400">
              /{frequency === "monthly" ? "mo" : "year"}
            </span>
          )}
        </h3>
        {frequency === "yearly" && plan.price[frequency] > 0 && (
          <p className="mt-2 text-xs text-zinc-500">Paghi 10 mesi, ne hai 12.</p>
        )}
      </div>

      <div className="space-y-4 px-6 py-6 text-sm text-zinc-300">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-white" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <p
                    className={cn(
                      "text-left leading-6",
                      feature.tooltip && "cursor-help border-b border-dashed border-white/20",
                    )}
                  >
                    {feature.text}
                  </p>
                </TooltipTrigger>
                {feature.tooltip && (
                  <TooltipContent className="max-w-xs border border-white/10 bg-zinc-950 text-white">
                    {feature.tooltip}
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
        ))}
      </div>

      <div className={cn("mt-auto border-t border-white/10 p-4", plan.highlighted && "bg-white/[0.03]")}>
        {plan.btn.internal ? (
          <Link to={plan.btn.href} className={buttonClassName}>
            {plan.btn.text}
          </Link>
        ) : (
          <a href={plan.btn.href} className={buttonClassName}>
            {plan.btn.text}
          </a>
        )}
      </div>
    </div>
  );
}

type BorderTrailProps = {
  className?: string;
  size?: number;
  transition?: Transition;
  delay?: number;
  onAnimationComplete?: () => void;
  style?: React.CSSProperties;
};

function BorderTrail({
  className,
  size = 60,
  transition,
  delay,
  onAnimationComplete,
  style,
}: BorderTrailProps) {
  const baseTransition = {
    repeat: Infinity,
    duration: 5,
    ease: "linear",
  };

  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
      <motion.div
        className={cn("absolute aspect-square", className)}
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          ...style,
        }}
        animate={{
          offsetDistance: ["0%", "100%"],
        }}
        transition={{
          ...(transition ?? baseTransition),
          delay,
        }}
        onAnimationComplete={onAnimationComplete}
      />
    </div>
  );
}

export const DELTAHEDGE_PLANS: Plan[] = [
  {
    name: "Free",
    info: "Per vedere come funziona con un solo trade di prova.",
    price: {
      monthly: 0,
      yearly: 0,
    },
    features: [
      { text: "1 trade test" },
      { text: "Accesso alla dashboard" },
      { text: "Colleghi una coppia per fare una prova" },
      {
        text: "Nessun abbonamento",
        tooltip: "Serve solo per provare il flusso iniziale e vedere la piattaforma in azione.",
      },
    ],
    btn: {
      text: "Prova gratis",
      href: "/login",
      internal: true,
    },
  },
  {
    name: "1 Slot",
    info: "Per iniziare con una coppia live senza complicazioni.",
    price: {
      monthly: 149,
      yearly: 1490,
    },
    highlighted: true,
    features: [
      { text: "1 slot attivo" },
      { text: "Collegamento challenge + broker" },
      { text: "Dashboard live con equity e PnL" },
      { text: "Libreria conti salvati" },
      {
        text: "Supporto prioritario",
        tooltip: "Accesso più rapido all'assistenza per setup e primi controlli.",
      },
    ],
    btn: {
      text: "Inizia con 1 slot",
      href: "/login",
      internal: true,
    },
  },
  {
    name: "3 Slot",
    info: "Per chi vuole far girare più coppie nello stesso account.",
    price: {
      monthly: 429,
      yearly: 4290,
    },
    features: [
      { text: "3 slot attivi" },
      { text: "Monitoraggio centrale di tutte le coppie" },
      { text: "Cronologia e performance per ciclo" },
      { text: "Connessioni cloud sempre disponibili" },
      {
        text: "Più spazio operativo",
        tooltip: "Pensato per chi vuole lavorare su più setup senza uscire dalla stessa dashboard.",
      },
    ],
    btn: {
      text: "Passa a 3 slot",
      href: "/login",
      internal: true,
    },
  },
];
