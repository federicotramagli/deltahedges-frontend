import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function BillingSuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      navigate("/dashboard", { replace: true });
    }, 4000);

    return () => window.clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#040814] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-12rem] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(123,137,255,0.26)_0,rgba(123,137,255,0.04)_46%,transparent_72%)] blur-3xl" />
        <div className="absolute bottom-[-10rem] right-[-8rem] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.18)_0,rgba(45,212,191,0.03)_50%,transparent_72%)] blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-8 shadow-[0_32px_120px_rgba(6,10,28,0.45)] backdrop-blur-xl"
        >
          <div className="flex items-center gap-3 text-emerald-300">
            <CheckCircle2 className="size-7" />
            <span className="text-sm font-medium uppercase tracking-[0.18em]">
              Payment Received
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Thank you for your purchase.
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
            Il tuo abbonamento e stato registrato. Tra pochi secondi ti riportiamo
            nella dashboard, dove i nuovi slot verranno sbloccati appena Stripe
            conferma il webhook.
          </p>

          <div className="mt-8 grid gap-3 rounded-[20px] border border-white/8 bg-white/[0.03] p-5 text-sm text-zinc-300 sm:grid-cols-3">
            <div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                Stato
              </div>
              <div className="mt-2 font-medium text-white">Pagamento riuscito</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                Prossimo step
              </div>
              <div className="mt-2 font-medium text-white">Sblocco slot</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                Redirect
              </div>
              <div className="mt-2 font-medium text-white">Dashboard in 4s</div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/dashboard"
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#f7fbff,#8de0ff)] px-5 text-sm font-medium text-slate-950 shadow-[0_12px_32px_rgba(110,214,255,0.25)] transition hover:brightness-105"
            >
              Vai alla dashboard
              <ArrowRight className="ml-2 size-4" />
            </Link>
            <Link
              to="/"
              className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-sm font-medium text-zinc-200 transition hover:bg-white/[0.06]"
            >
              Torna alla landing
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
