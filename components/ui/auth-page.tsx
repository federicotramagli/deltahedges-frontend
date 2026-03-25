'use client';

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  AtSignIcon,
  ChevronLeftIcon,
  GithubIcon,
  Grid2x2PlusIcon,
  PhoneIcon,
  UserIcon,
  UserRoundSearchIcon,
} from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { cn } from "@/lib/utils";

type AuthPageProps = {
  isRegistering: boolean;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  country: string;
  phone: string;
  submitting: "login" | "signup" | null;
  errorMessage?: string;
  infoMessage?: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onUsernameChange: (value: string) => void;
  onCountryChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onModeChange: (next: boolean) => void;
  onLogin: () => Promise<void> | void;
  onSignUp: () => Promise<void> | void;
};

const fieldClass =
  "peer h-12 rounded-xl border-white/10 bg-black/30 ps-10 text-white placeholder:text-zinc-500 focus-visible:border-[#D2FF00]/55 focus-visible:ring-[#D2FF00]/15";

export function AuthPage({
  isRegistering,
  email,
  password,
  firstName,
  lastName,
  username,
  country,
  phone,
  submitting,
  errorMessage,
  infoMessage,
  onEmailChange,
  onPasswordChange,
  onFirstNameChange,
  onLastNameChange,
  onUsernameChange,
  onCountryChange,
  onPhoneChange,
  onModeChange,
  onLogin,
  onSignUp,
}: AuthPageProps) {
  return (
    <main className="relative md:min-h-screen md:overflow-hidden lg:grid lg:grid-cols-2">
      <div className="relative hidden h-full flex-col border-r border-white/8 bg-muted/60 p-10 lg:flex">
        <div className="from-background absolute inset-0 z-10 bg-gradient-to-t to-transparent" />
        <div className="z-10 flex items-center gap-3 text-[#D2FF00]">
          <Grid2x2PlusIcon className="size-6" />
          <p className="text-xl font-semibold tracking-wide text-white">
            DeltaHedge
          </p>
        </div>
        <div className="z-10 mt-auto">
          <blockquote className="space-y-3">
            <p className="max-w-lg text-2xl leading-10 text-white">
              &ldquo;Un’unica dashboard per collegare prop e broker, lasciare i
              terminali nel cloud e monitorare tutto in tempo reale.&rdquo;
            </p>
            <footer className="font-mono text-sm font-semibold text-[#D2FF00]">
              ~ DeltaHedge cloud stack
            </footer>
          </blockquote>
        </div>
        <div className="absolute inset-0">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>
      </div>

      <div className="relative flex min-h-screen flex-col justify-center p-4">
        <div
          aria-hidden
          className="absolute inset-0 isolate -z-10 overflow-hidden opacity-65"
        >
          <div className="absolute top-0 right-0 h-80 w-44 rounded-full bg-[radial-gradient(circle,rgba(210,255,0,0.18),transparent_72%)]" />
          <div className="absolute bottom-0 left-0 h-80 w-64 rounded-full bg-[radial-gradient(circle,rgba(210,255,0,0.08),transparent_72%)]" />
        </div>

        <Button variant="ghost" className="absolute top-7 left-5 rounded-xl" asChild={false}>
          <a
            href="/login"
            className="inline-flex items-center text-zinc-400 transition hover:text-white"
          >
            <ChevronLeftIcon className="me-2 size-4" />
            Home
          </a>
        </Button>

        <div className="mx-auto w-full max-w-md space-y-5">
          <div className="flex items-center gap-3 lg:hidden">
            <Grid2x2PlusIcon className="size-6 text-[#D2FF00]" />
            <p className="text-xl font-semibold tracking-wide text-white">
              DeltaHedge
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-wide text-white">
              {isRegistering ? "Create your operator account" : "Sign in to DeltaHedge"}
            </h1>
            <p className="text-base text-zinc-400">
              {isRegistering
                ? "Compila il profilo e conferma l’email per accedere alla dashboard."
                : "Accedi con email e password per continuare in dashboard."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 rounded-2xl border border-white/8 bg-white/[0.03] p-2">
            <button
              type="button"
              className={cn(
                "h-11 rounded-xl text-sm font-medium transition",
                !isRegistering
                  ? "bg-[#D2FF00] text-black shadow-[0_18px_48px_rgba(210,255,0,0.16)]"
                  : "text-zinc-400 hover:bg-white/[0.04] hover:text-white",
              )}
              onClick={() => onModeChange(false)}
              disabled={submitting !== null}
            >
              Accedi
            </button>
            <button
              type="button"
              className={cn(
                "h-11 rounded-xl text-sm font-medium transition",
                isRegistering
                  ? "bg-[#D2FF00] text-black shadow-[0_18px_48px_rgba(210,255,0,0.16)]"
                  : "text-zinc-400 hover:bg-white/[0.04] hover:text-white",
              )}
              onClick={() => onModeChange(true)}
              disabled={submitting !== null}
            >
              Registrati
            </button>
          </div>

          <div className="space-y-2">
            <Button
              type="button"
              size="lg"
              className="h-12 w-full rounded-xl border border-white/8 bg-white/[0.03] text-white hover:bg-white/[0.06]"
              disabled
            >
              <GoogleIcon className="me-2 size-4" />
              Continue with Google
            </Button>
            <Button
              type="button"
              size="lg"
              className="h-12 w-full rounded-xl border border-white/8 bg-white/[0.03] text-white hover:bg-white/[0.06]"
              disabled
            >
              <AppleLogoIcon className="me-2 size-4" />
              Continue with Apple
            </Button>
            <Button
              type="button"
              size="lg"
              className="h-12 w-full rounded-xl border border-white/8 bg-white/[0.03] text-white hover:bg-white/[0.06]"
              disabled
            >
              <GithubIcon className="me-2 size-4" />
              Continue with GitHub
            </Button>
          </div>

          <AuthSeparator />

          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              if (isRegistering) {
                void onSignUp();
                return;
              }
              void onLogin();
            }}
          >
            <p className="text-start text-xs text-zinc-500">
              {isRegistering
                ? "Inserisci i dati profilo e le credenziali per creare l’account."
                : "Inserisci la tua email e password per accedere."}
            </p>

            {isRegistering ? (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  <InlineInput
                    icon={<UserIcon className="size-4" />}
                    placeholder="Nome"
                    value={firstName}
                    onChange={onFirstNameChange}
                    autoComplete="given-name"
                  />
                  <InlineInput
                    icon={<UserIcon className="size-4" />}
                    placeholder="Cognome"
                    value={lastName}
                    onChange={onLastNameChange}
                    autoComplete="family-name"
                  />
                </div>

                <InlineInput
                  icon={<UserRoundSearchIcon className="size-4" />}
                  placeholder="Username"
                  value={username}
                  onChange={onUsernameChange}
                  autoComplete="username"
                />

                <div className="grid gap-3 sm:grid-cols-2">
                  <InlineInput
                    icon={<Grid2x2PlusIcon className="size-4" />}
                    placeholder="Nazione"
                    value={country}
                    onChange={onCountryChange}
                    autoComplete="country-name"
                  />
                  <InlineInput
                    icon={<PhoneIcon className="size-4" />}
                    placeholder="Numero di telefono"
                    value={phone}
                    onChange={onPhoneChange}
                    autoComplete="tel"
                  />
                </div>
              </>
            ) : null}

            <InlineInput
              icon={<AtSignIcon className="size-4" />}
              placeholder="your.email@example.com"
              type="email"
              value={email}
              onChange={onEmailChange}
              autoComplete="email"
            />

            <InlineInput
              icon={<UserIcon className="size-4" />}
              placeholder="Password"
              type="password"
              value={password}
              onChange={onPasswordChange}
              autoComplete={isRegistering ? "new-password" : "current-password"}
            />

            {errorMessage ? (
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
                {errorMessage}
              </div>
            ) : null}

            {infoMessage ? (
              <div className="rounded-xl border border-[#D2FF00]/20 bg-[#D2FF00]/10 px-4 py-3 text-sm text-[#D2FF00]">
                {infoMessage}
              </div>
            ) : null}

            <Button
              type="submit"
              className="h-12 w-full rounded-xl bg-[#D2FF00] text-black hover:brightness-95"
              disabled={submitting !== null}
            >
              {submitting ? (
                <span className="inline-flex items-center gap-2">
                  <span className="size-4 animate-spin rounded-full border-2 border-black/25 border-t-black" />
                  {isRegistering ? "Creazione account..." : "Accesso in corso..."}
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  {isRegistering ? "Continue With Email" : "Continue With Email"}
                  <ArrowRightIcon className="size-4" />
                </span>
              )}
            </Button>
          </form>

          <p className="text-sm text-zinc-500">
            By clicking continue, you agree to our{" "}
            <a href="#" className="underline underline-offset-4 hover:text-[#D2FF00]">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-4 hover:text-[#D2FF00]">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}

function InlineInput({
  icon,
  value,
  onChange,
  ...props
}: {
  icon: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative h-max">
      <Input
        {...props}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(fieldClass, props.className)}
      />
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-zinc-500 peer-disabled:opacity-50">
        {icon}
      </div>
    </div>
  );
}

function FloatingPaths({ position }: { position: number }) {
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
      <svg
        className="h-full w-full text-[#D2FF00]"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.08 + path.id * 0.015}
            initial={{ pathLength: 0.3, opacity: 0.4 }}
            animate={{
              pathLength: 1,
              opacity: [0.18, 0.42, 0.18],
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

const GoogleIcon = (props: React.ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <g>
      <path d="M12.479,14.265v-3.279h11.049c0.108,0.571,0.164,1.247,0.164,1.979c0,2.46-0.672,5.502-2.84,7.669   C18.744,22.829,16.051,24,12.483,24C5.869,24,0.308,18.613,0.308,12S5.869,0,12.483,0c3.659,0,6.265,1.436,8.223,3.307L18.392,5.62   c-1.404-1.317-3.307-2.341-5.913-2.341C7.65,3.279,3.873,7.171,3.873,12s3.777,8.721,8.606,8.721c3.132,0,4.916-1.258,6.059-2.401   c0.927-0.927,1.537-2.251,1.777-4.059L12.479,14.265z" />
    </g>
  </svg>
);

const AppleLogoIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M16.365 1.43c0 1.14-.464 2.21-1.16 2.966-.785.834-2.068 1.48-3.197 1.39-.144-1.092.384-2.255 1.12-3.02.79-.832 2.153-1.436 3.237-1.336ZM19.842 17.23c-.57 1.27-.84 1.835-1.574 2.943-1.024 1.55-2.47 3.48-4.262 3.494-1.592.015-2.003-1.038-4.164-1.025-2.161.012-2.611 1.044-4.202 1.029-1.79-.016-3.16-1.76-4.184-3.31-2.867-4.34-3.17-9.43-1.4-12.15 1.256-1.933 3.235-3.06 5.096-3.06 1.894 0 3.084 1.05 4.646 1.05 1.52 0 2.446-1.05 4.63-1.05 1.657 0 3.412.903 4.667 2.463-4.09 2.247-3.425 8.13.747 9.616Z" />
  </svg>
);

const AuthSeparator = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="h-px w-full bg-border" />
      <span className="px-2 text-xs text-zinc-500">OR</span>
      <div className="h-px w-full bg-border" />
    </div>
  );
};
