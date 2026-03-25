import { useEffect, useState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

const inputClass =
  "h-12 w-full rounded-md border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-[#D2FF00]/50 focus:ring-2 focus:ring-[#D2FF00]/10";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState<"login" | "signup" | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    setErrorMessage("");
  }, [email, password]);

  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  async function handleLogin() {
    setSubmitting("login");
    setErrorMessage("");
    setInfoMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setErrorMessage(error.message);
    }

    setSubmitting(null);
  }

  async function handleSignUp() {
    setSubmitting("signup");
    setErrorMessage("");
    setInfoMessage("");

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setSubmitting(null);
      return;
    }

    if (!data.session) {
      setInfoMessage(
        "Controlla la tua email per confermare l'account prima di accedere.",
      );
    }

    setSubmitting(null);
  }

  return (
    <div className="min-h-screen bg-[#05070b] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(210,255,0,0.12),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_28%)]" />
      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6 py-10">
        <div className="grid w-full gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(9,10,12,0.92),rgba(6,7,10,0.98))] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:p-10">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D2FF00]/20 bg-[#D2FF00]/8 px-3 py-2 text-xs font-medium uppercase tracking-[0.24em] text-[#D2FF00]">
              DeltaHedge
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Pair execution cloud senza installazioni locali.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-zinc-400">
              Accedi alla dashboard, collega prop e broker una sola volta e lascia
              che DeltaHedge lavori lato server anche a browser chiuso.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ["Auth reale", "Supabase gestisce sessione e refresh token."],
                ["Execution layer", "Tutte le chiamate backend passano con JWT."],
                ["Zero local identity", "Nessun utente o conto vive nel browser."],
              ].map(([title, body]) => (
                <div
                  key={title}
                  className="rounded-xl border border-white/8 bg-white/[0.03] p-4"
                >
                  <div className="text-sm font-medium text-white">{title}</div>
                  <div className="mt-2 text-sm leading-6 text-zinc-500">{body}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(12,13,16,0.94),rgba(7,8,10,0.98))] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.48)] backdrop-blur-2xl lg:p-10">
            <div className="text-sm uppercase tracking-[0.22em] text-zinc-500">
              Accesso piattaforma
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
              Accedi o crea il tuo account
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-500">
              Usa email e password. Se stai creando un account nuovo, dovrai
              confermare l'email prima di entrare nella dashboard.
            </p>

            <div className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Email
                </label>
                <input
                  type="email"
                  className={inputClass}
                  placeholder="tuo@email.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Password
                </label>
                <input
                  type="password"
                  className={inputClass}
                  placeholder="Inserisci la password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                />
              </div>
            </div>

            {errorMessage ? (
              <div className="mt-5 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
                {errorMessage}
              </div>
            ) : null}

            {infoMessage ? (
              <div className="mt-5 rounded-xl border border-[#D2FF00]/20 bg-[#D2FF00]/10 px-4 py-3 text-sm text-[#D2FF00]">
                {infoMessage}
              </div>
            ) : null}

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Button
                type="button"
                className="h-12 rounded-md bg-[#D2FF00] text-black shadow-[0_18px_48px_rgba(210,255,0,0.18)] hover:brightness-95"
                onClick={handleLogin}
                disabled={submitting !== null}
              >
                {submitting === "login" ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  <>
                    Accedi
                    <ArrowRight className="ml-2 size-4" />
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="h-12 rounded-md border-white/12 bg-white/[0.03] text-white hover:bg-white/[0.06]"
                onClick={handleSignUp}
                disabled={submitting !== null}
              >
                {submitting === "signup" ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  "Registrati"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
