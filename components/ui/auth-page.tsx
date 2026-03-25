'use client';

import React from "react";
import { motion } from "framer-motion";
import {
  Apple as AppleIcon,
  AtSign as AtSignIcon,
  ChevronLeft as ChevronLeftIcon,
  Github as GithubIcon,
  Grid2x2Plus as Grid2x2PlusIcon,
  LockKeyhole as LockKeyholeIcon,
  MapPinned as MapPinnedIcon,
  Phone as PhoneIcon,
  User as UserIcon,
  UserRoundSearch as UserRoundSearchIcon,
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
  const isBusy = submitting !== null;

  return (
    <main className="relative md:h-screen md:overflow-hidden lg:grid lg:grid-cols-2">
      <div className="bg-muted/60 relative hidden h-full flex-col border-r border-white/6 p-10 lg:flex">
        <div className="from-background absolute inset-0 z-10 bg-gradient-to-t to-transparent" />
        <div className="z-10 flex items-center gap-2">
          <Grid2x2PlusIcon className="size-6 text-white" />
          <p className="text-xl font-semibold text-white">DeltaHedge</p>
        </div>
        <div className="z-10 mt-auto">
          <blockquote className="space-y-2">
            <p className="max-w-xl text-xl text-white">
              &ldquo;DeltaHedge ti permette di collegare prop e broker una sola
              volta, lasciare il motore nel cloud e monitorare l&apos;operativita
              in tempo reale.&rdquo;
            </p>
            <footer className="font-mono text-sm font-semibold text-white/80">
              ~ DeltaHedge Cloud Runtime
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
          className="absolute inset-0 isolate contain-strict -z-10 opacity-60"
        >
          <div className="absolute top-0 right-0 h-[50rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12)_0,rgba(255,255,255,0.025)_45%,transparent_80%)]" />
          <div className="absolute top-0 right-0 h-[50rem] w-[9rem] translate-y-[-14rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.07)_0,rgba(255,255,255,0.02)_45%,transparent_80%)]" />
          <div className="absolute bottom-[-10rem] left-[-8rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0,transparent_70%)]" />
        </div>
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <FloatingPaths position={1} />
        </div>

        <a
          href="#"
          className="absolute top-7 left-5 inline-flex items-center rounded-md px-3 py-2 text-sm text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
        >
          <ChevronLeftIcon className="me-2 size-4" />
          Home
        </a>

        <div className="mx-auto w-full max-w-sm space-y-4">
          <div className="flex items-center gap-2 lg:hidden">
            <Grid2x2PlusIcon className="size-6 text-white" />
            <p className="text-xl font-semibold text-white">DeltaHedge</p>
          </div>

          <div className="flex flex-col space-y-1">
            <h1 className="font-heading text-2xl font-bold tracking-wide text-white">
              {isRegistering ? "Join DeltaHedge now" : "Sign In to DeltaHedge"}
            </h1>
            <p className="text-base text-zinc-400">
              {isRegistering
                ? "Crea il tuo account operatore e conferma l’email per entrare in dashboard."
                : "Accedi per tornare nella dashboard e gestire i tuoi slot."}
            </p>
          </div>

          <div className="space-y-2">
            <Button
              type="button"
              size="lg"
              className="w-full border border-white/8 bg-white/[0.03] text-white hover:bg-white/[0.06]"
              disabled
            >
              <GoogleIcon className="me-2 size-4" />
              Continue with Google
            </Button>
            <Button
              type="button"
              size="lg"
              className="w-full border border-white/8 bg-white/[0.03] text-white hover:bg-white/[0.06]"
              disabled
            >
              <AppleIcon className="me-2 size-4" />
              Continue with Apple
            </Button>
            <Button
              type="button"
              size="lg"
              className="w-full border border-white/8 bg-white/[0.03] text-white hover:bg-white/[0.06]"
              disabled
            >
              <GithubIcon className="me-2 size-4" />
              Continue with GitHub
            </Button>
          </div>

          <AuthSeparator />

          <form
            className="space-y-2"
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
                ? "Completa i dati profilo, poi conferma la tua email per attivare l’account."
                : "Inserisci email e password per continuare."}
            </p>

            {isRegistering ? (
              <>
                <div className="grid gap-2 sm:grid-cols-2">
                  <InlineInput
                    placeholder="Nome"
                    value={firstName}
                    onChange={onFirstNameChange}
                    autoComplete="given-name"
                    icon={<UserIcon className="size-4" aria-hidden="true" />}
                  />
                  <InlineInput
                    placeholder="Cognome"
                    value={lastName}
                    onChange={onLastNameChange}
                    autoComplete="family-name"
                    icon={<UserIcon className="size-4" aria-hidden="true" />}
                  />
                </div>

                <InlineInput
                  placeholder="Username"
                  value={username}
                  onChange={onUsernameChange}
                  autoComplete="username"
                  icon={
                    <UserRoundSearchIcon className="size-4" aria-hidden="true" />
                  }
                />

                <div className="grid gap-2 sm:grid-cols-2">
                  <InlineInput
                    placeholder="Nazione"
                    value={country}
                    onChange={onCountryChange}
                    autoComplete="country-name"
                    icon={<MapPinnedIcon className="size-4" aria-hidden="true" />}
                  />
                  <InlineInput
                    placeholder="Numero di telefono"
                    value={phone}
                    onChange={onPhoneChange}
                    autoComplete="tel"
                    icon={<PhoneIcon className="size-4" aria-hidden="true" />}
                  />
                </div>
              </>
            ) : null}

            <InlineInput
              placeholder="your.email@example.com"
              type="email"
              value={email}
              onChange={onEmailChange}
              autoComplete="email"
              icon={<AtSignIcon className="size-4" aria-hidden="true" />}
            />

            <InlineInput
              placeholder="Password"
              type="password"
              value={password}
              onChange={onPasswordChange}
              autoComplete={isRegistering ? "new-password" : "current-password"}
              icon={<LockKeyholeIcon className="size-4" aria-hidden="true" />}
            />

            {errorMessage ? (
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
                {errorMessage}
              </div>
            ) : null}

            {infoMessage ? (
              <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white">
                {infoMessage}
              </div>
            ) : null}

            <Button
              type="submit"
              className="mt-1 w-full"
              disabled={isBusy}
            >
              <span>
                {submitting === "login" && "Accesso in corso..."}
                {submitting === "signup" && "Registrazione in corso..."}
                {!submitting && "Continue With Email"}
              </span>
            </Button>
          </form>

          <div className="rounded-xl border border-white/8 bg-white/[0.02] p-3 text-sm text-zinc-400">
            {isRegistering ? "Hai gia un account?" : "Non hai ancora un account?"}
            <button
              type="button"
              className="ms-2 font-medium text-white hover:underline"
              onClick={() => onModeChange(!isRegistering)}
              disabled={isBusy}
            >
              {isRegistering ? "Accedi" : "Registrati"}
            </button>
          </div>

          <p className="text-muted-foreground mt-8 text-sm text-zinc-500">
            By clicking continue, you agree to our{" "}
            <a
              href="#"
              className="hover:text-primary underline underline-offset-4"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="hover:text-primary underline underline-offset-4"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </main>
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
        className="h-full w-full text-slate-950 dark:text-white"
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
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
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

type InlineInputProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  type?: string;
  autoComplete?: string;
};

function InlineInput({
  placeholder,
  value,
  onChange,
  icon,
  type = "text",
  autoComplete,
}: InlineInputProps) {
  return (
    <div className="relative h-max">
        <Input
        placeholder={placeholder}
        className={cn(
          "peer h-11 border-white/8 bg-white/[0.03] ps-9 text-white placeholder:text-zinc-500 focus-visible:border-white/30 focus-visible:ring-white/15",
          type === "password" && "tracking-[0.12em]",
        )}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
      />
      <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
        {icon}
      </div>
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
      <path d="M12.479,14.265v-3.279h11.049c0.108,0.571,0.164,1.247,0.164,1.979c0,2.46-0.672,5.502-2.84,7.669C18.744,22.829,16.051,24,12.483,24C5.869,24,0.308,18.613,0.308,12S5.869,0,12.483,0c3.659,0,6.265,1.436,8.223,3.307L18.392,5.62c-1.404-1.317-3.307-2.341-5.913-2.341C7.65,3.279,3.873,7.171,3.873,12s3.777,8.721,8.606,8.721c3.132,0,4.916-1.258,6.059-2.401c0.927-0.927,1.537-2.251,1.777-4.059L12.479,14.265z" />
    </g>
  </svg>
);

const AuthSeparator = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="bg-border h-px w-full bg-white/8" />
      <span className="px-2 text-xs text-zinc-500">OR</span>
      <div className="bg-border h-px w-full bg-white/8" />
    </div>
  );
};
