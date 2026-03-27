import { motion } from "framer-motion";
import { ArrowLeft, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

export default function BillingCancelPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#040814] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-6rem] top-[-8rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(123,137,255,0.22)_0,rgba(123,137,255,0.04)_46%,transparent_72%)] blur-3xl" />
        <div className="absolute bottom-[-8rem] right-[-6rem] h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.12)_0,rgba(45,212,191,0.03)_46%,transparent_72%)] blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-8 shadow-[0_32px_120px_rgba(6,10,28,0.45)] backdrop-blur-xl"
        >
          <div className="flex items-center gap-3 text-zinc-300">
            <CreditCard className="size-7" />
            <span className="text-sm font-medium uppercase tracking-[0.18em]">
              Checkout Interrupted
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Nessun problema, il checkout non e stato completato.
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
            Non e stato addebitato nulla. Puoi tornare subito alla dashboard e
            riprovare quando vuoi scegliendo un altro pacchetto o completando di
            nuovo il pagamento.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/dashboard"
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#f7fbff,#8de0ff)] px-5 text-sm font-medium text-slate-950 shadow-[0_12px_32px_rgba(110,214,255,0.25)] transition hover:brightness-105"
            >
              Torna alla dashboard
            </Link>
            <Link
              to="/"
              className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-sm font-medium text-zinc-200 transition hover:bg-white/[0.06]"
            >
              <ArrowLeft className="mr-2 size-4" />
              Torna alla landing
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
