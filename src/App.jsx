import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BellDot,
  CircleAlert,
  Check,
  ChevronDown,
  Home,
  KeyRound,
  Layers3,
  LogOut,
  Logs,
  Plus,
  Search,
  Settings,
  SlidersHorizontal,
  Trash2,
  Wallet,
  Webhook,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "./contexts/AuthContext";
import { supabase } from "./lib/supabase";

const sidebarSections = [
  {
    title: "Cruscotto",
    items: ["Panoramica", "Performance", "Cicli", "Conti"],
  },
  {
    title: "Motore",
    items: ["Trade", "Chiavi API", "Webhooks"],
  },
  {
    title: "Profilo",
    items: ["Impostazioni"],
  },
  {
    title: "Guide",
    items: ["Guida strategia", "Guida piattaforma"],
  },
];

const sidebarIcons = {
  Panoramica: Home,
  Performance: Activity,
  Cicli: Layers3,
  Conti: Wallet,
  Trade: Logs,
  "Chiavi API": KeyRound,
  Webhooks: Webhook,
  Impostazioni: Settings,
  "Guida strategia": CircleAlert,
  "Guida piattaforma": SlidersHorizontal,
};

const initialSlots = [];
const initialSavedAccounts = [];

const initialProfiles = [
  {
    id: "profile-base",
    name: "Profilo Base 1.5%",
    riskPerTrade: 1.5,
    maxDailyTrades: 2,
    orphanTimeoutMs: 1000,
  },
  {
    id: "profile-recovery",
    name: "Recupero Fase 2",
    riskPerTrade: 1.5,
    maxDailyTrades: 2,
    orphanTimeoutMs: 900,
  },
  {
    id: "profile-funded",
    name: "Funded 0.40x",
    riskPerTrade: 2,
    maxDailyTrades: 2,
    orphanTimeoutMs: 800,
  },
];

const initialSubscription = {
  planName: "Growth",
  slotsIncluded: 8,
  usedSlots: 0,
  availableSlots: 8,
  renewalDate: "12 Apr 2026",
  billingCadence: "Mensile",
  canCreateSlot: true,
  canManageAccounts: true,
};

const initialNotifications = [];
const initialCycleLogs = [];

const challengeOptions = [
  {
    value: "FundingPips 25K",
    title: "FundingPips 25K",
    description: "2-Step · fee $199",
  },
  {
    value: "FundingPips 50K",
    title: "FundingPips 50K",
    description: "2-Step · fee $289",
  },
  {
    value: "FundingPips 100K",
    title: "FundingPips 100K",
    description: "2-Step · fee $549",
  },
];

const platformOptions = [
  {
    value: "mt5",
    title: "MT5",
    description: "MetaTrader 5",
  },
  {
    value: "mt4",
    title: "MT4",
    description: "MetaTrader 4",
  },
];

const tradeTestLotOptions = [
  {
    value: 0.8,
    title: "0.80",
    description: "Ingresso minimo reale",
  },
  {
    value: 1,
    title: "1.00",
    description: "Lotto standard",
  },
  {
    value: 1.5,
    title: "1.50",
    description: "Test medio",
  },
  {
    value: 2,
    title: "2.00",
    description: "Ingresso massimo reale",
  },
];

const phaseOptions = [
  {
    value: "Fase 1",
    title: "Fase 1",
    description: "Target 8% · drawdown 10%",
  },
  {
    value: "Fase 2",
    title: "Fase 2",
    description: "Target 5% · conferma finale",
  },
  {
    value: "Funded",
    title: "Funded",
    description: "Monitoraggio funded e payout",
  },
];

const challengeFeeMap = {
  "FundingPips 25K": 199,
  "FundingPips 50K": 289,
  "FundingPips 100K": 549,
};

const billingCadenceOptions = [
  {
    value: "Mensile",
    title: "Mensile",
    description: "Pagamento ricorrente ogni mese.",
  },
  {
    value: "Trimestrale",
    title: "Trimestrale",
    description: "3 mesi in un'unica soluzione.",
  },
  {
    value: "Annuale",
    title: "Annuale",
    description: "12 mesi con ciclo lungo.",
  },
];

const exportScopeOptions = [
  {
    value: "oggi",
    title: "Oggi",
    description: "Solo la giornata corrente.",
  },
  {
    value: "ultimi_7_giorni",
    title: "7 giorni",
    description: "Ultima settimana.",
  },
  {
    value: "ultimi_30_giorni",
    title: "30 giorni",
    description: "Ultimo mese operativo.",
  },
  {
    value: "tutto",
    title: "Tutto",
    description: "Storico completo disponibile.",
  },
];

const panelClass = "brand-surface rounded-[24px]";

const inputClass =
  "h-11 w-full rounded-xl border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,38,0.86),rgba(10,14,25,0.96))] px-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary/45 focus:ring-2 focus:ring-primary/20";

const primaryButtonClass =
  "rounded-xl border border-white/10 bg-[linear-gradient(135deg,#f8fbff_0%,#d9e0ff_45%,#9be7ff_100%)] text-[#07101f] shadow-[0_18px_42px_rgba(96,105,255,0.28)] hover:brightness-105";

const secondaryButtonClass =
  "rounded-xl border border-white/10 bg-[linear-gradient(180deg,rgba(18,24,42,0.88),rgba(10,14,26,0.96))] text-foreground hover:border-white/15 hover:bg-white/[0.05]";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "");
const localStateStorageKey = "deltahedge.local-dashboard-state.v1";
const adminDashboardEmails = new Set(["trafede123@gmail.com"]);

if (!apiBaseUrl) {
  throw new Error("Manca VITE_API_BASE_URL");
}

async function buildAuthorizedHeaders(headersInit, includeJsonBody = false) {
  const headers = new Headers(headersInit || {});

  if (includeJsonBody && !headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error("Sessione Supabase non disponibile");
  }

  headers.set("authorization", `Bearer ${session.access_token}`);
  return headers;
}

async function apiRequest(path, options = {}) {
  const headers = await buildAuthorizedHeaders(
    options.headers,
    Boolean(options.body),
  );

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    throw new Error(payload?.error || `Request failed (${response.status})`);
  }

  return payload;
}

async function fetchSavedAccountsPayload() {
  const payload = await apiRequest("/accounts-library");
  return payload.accounts || [];
}

async function fetchStripePlansPayload() {
  return apiRequest("/stripe/plans");
}

function readLocalDashboardState() {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(localStateStorageKey);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPreciseUsd(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: Number.isInteger(Number(value || 0)) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(Number(value || 0));
}

function formatSignedCurrency(value) {
  const amount = Number(value || 0);
  const formatted = formatCurrency(Math.abs(amount));
  if (amount > 0) return `+${formatted}`;
  if (amount < 0) return `-${formatted}`;
  return formatted;
}

function formatMultiplier(value) {
  return `${Number(value).toFixed(4)}x`;
}

function formatProjectionNumber(value) {
  return Math.round(Math.abs(Number(value || 0))).toLocaleString("it-IT");
}

function formatLotSize(value) {
  return Number(value || 0).toFixed(2);
}

function getOppositeDirection(direction) {
  return direction === "BUY" ? "SELL" : "BUY";
}

function roundBrokerLotUp(propLot, multiplier, lotStep = 0.01) {
  const safeStep = Math.max(Number(lotStep) || 0.01, 0.01);
  const raw = Number(propLot) * Number(multiplier || 0);
  return Math.ceil(raw / safeStep) * safeStep;
}

function normaliseTradeTestPropLot(value) {
  const numeric = Number(value || 1);
  const clamped = Math.max(0.8, Math.min(2, numeric));
  return Number(clamped.toFixed(2));
}

function getChallengeFee(challenge) {
  return challengeFeeMap[challenge] ?? 0;
}

function getChallengeAccountSize(challenge) {
  const match = challenge?.match(/(\d+)\s*K/i);
  if (!match) return 0;
  return Number(match[1]) * 1000;
}

function getPropMaxLoss(challenge) {
  return getChallengeAccountSize(challenge) * 0.1;
}

function formatDateTime(value) {
  if (!value) return "In attesa";
  return new Date(value).toLocaleString("it-IT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function maskLoginForLibrary(value) {
  if (!value) return "Non inserito";
  if (value.length <= 4) return value;
  return `${value.slice(0, 2)}•••${value.slice(-2)}`;
}

function nowHourMinute() {
  return new Date().toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function nextSlotName(existingSlots = [], startIndex = 1) {
  const taken = new Set(
    existingSlots
      .map((slot) => slot?.slot?.trim().toLowerCase())
      .filter(Boolean),
  );

  let index = Math.max(1, startIndex);
  while (taken.has(`slot ${String(index).padStart(2, "0")}`.toLowerCase())) {
    index += 1;
  }

  return `Slot ${String(index).padStart(2, "0")}`;
}

function getChallengeCost(challenge) {
  if (challenge?.includes("25K")) return 199;
  if (challenge?.includes("50K")) return 289;
  if (challenge?.includes("100K")) return 549;
  return 0;
}

function getCycleOutcomeLabel(value) {
  if (value === "PASS_FASE_1") return "Fase 1 Passed";
  if (value === "PASS_FASE_2") return "Fase 2 Passed";
  if (value === "FAIL_FASE_1") return "Fail Fase 1";
  if (value === "FAIL_FASE_2") return "Fail Fase 2";
  if (value === "FAIL_FUNDED") return "Fail Funded";
  return value || "Ciclo chiuso";
}

function getCycleOutcomeBadgeClass(value) {
  if (value === "PASS_FASE_1" || value === "PASS_FASE_2") {
    return "border-emerald-500/20 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/10";
  }

  if (value === "FAIL_FUNDED") {
    return "border-rose-500/20 bg-rose-500/10 text-rose-300 hover:bg-rose-500/10";
  }

  if (value === "FAIL_FASE_2") {
    return "border-amber-500/20 bg-amber-500/10 text-amber-300 hover:bg-amber-500/10";
  }

  return "border-primary/20 bg-primary/10 text-primary hover:bg-primary/10";
}

function getSavedAccountStatusMeta(account) {
  if (account?.connectionState === "connected") {
    return {
      dotClass: "bg-emerald-400",
      badgeClass:
        "border-emerald-500/20 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/10",
      label: "Connesso",
      note:
        account?.balance || account?.equity
          ? `Balance ${formatLiveCurrencyValue(account.balance)} · Equity ${formatLiveCurrencyValue(account.equity)}`
          : account?.connectionStatus || "MetaApi confermato",
    };
  }

  if (account?.connectionState === "error") {
    return {
      dotClass: "bg-rose-400",
      badgeClass:
        "border-rose-500/20 bg-rose-500/10 text-rose-300 hover:bg-rose-500/10",
      label: "Errore",
      note: account?.validationMessage || "Credenziali o server da ricontrollare",
    };
  }

  return {
    dotClass: "bg-amber-400",
    badgeClass:
      "border-amber-500/20 bg-amber-500/10 text-amber-300 hover:bg-amber-500/10",
    label: "In verifica",
    note: account?.validationMessage || "Connessione MetaApi in corso",
  };
}

function isSavedAccountReady(account) {
  return account?.connectionState === "connected";
}

function getCycleStateMeta(cycleState, challengeState) {
  if (cycleState === "FASE_1_PASSED") {
    return {
      label: "Fase 1 Passed",
      icon: "check",
      className:
        "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
    };
  }

  if (cycleState === "FASE_2_PASSED") {
    return {
      label: "Fase 2 Passed",
      icon: "check",
      className:
        "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
    };
  }

  if (
    cycleState === "FASE_1_FAILED" ||
    cycleState === "FASE_2_FAILED" ||
    cycleState === "FUNDED_FAILED"
  ) {
    return {
      label: challengeState === "AVAILABLE" ? "Slot liberato" : "Failed",
      icon: "x",
      className: "border-rose-500/20 bg-rose-500/10 text-rose-300",
    };
  }

  return null;
}

function getDefaultProfileNameForPhase(phase) {
  if (phase === "Fase 1") return "Preset Fase 1";
  if (phase === "Fase 2") return "Preset Fase 2";
  return "Preset Funded";
}

function getWizardBrokerStartEquity(slotDraft, brokerAccount) {
  if (Number(slotDraft?.brokerStartEquity || 0) > 0) {
    return Number(slotDraft.brokerStartEquity);
  }

  if (!brokerAccount) return 0;

  return Number(brokerAccount.equity ?? brokerAccount.balance ?? 0);
}

function buildEquityCurve(cycleLogs) {
  let cumulativeNet = 0;

  return cycleLogs.map((cycle, index) => {
    cumulativeNet += Number(cycle.netProfit || 0);

    return {
      id: cycle.id,
      index: index + 1,
      label: `Ciclo ${index + 1}`,
      cumulativeNet,
      netProfit: Number(cycle.netProfit || 0),
      closedAt: cycle.closedAt,
    };
  });
}

function EquityCurveChart({ points }) {
  if (!points.length) return null;

  const width = 880;
  const height = 260;
  const padding = 24;
  const values = points.map((point) => point.cumulativeNet);
  const max = Math.max(...values, 0);
  const min = Math.min(...values, 0);
  const range = Math.max(max - min, 1);
  const stepX = points.length === 1 ? 0 : (width - padding * 2) / (points.length - 1);
  const zeroY = height - padding - ((0 - min) / range) * (height - padding * 2);

  const line = points
    .map((point, index) => {
      const x = padding + index * stepX;
      const y =
        height -
        padding -
        ((point.cumulativeNet - min) / range) * (height - padding * 2);

      return `${x},${y}`;
    })
    .join(" ");

  const area = `M ${padding} ${height - padding} ${line
    .split(" ")
    .map((pair, index) => (index === 0 ? `L ${pair}` : pair))
    .join(" ")} L ${padding + stepX * (points.length - 1)} ${height - padding} Z`;

  return (
    <div className="overflow-hidden rounded-lg border border-border/80 bg-card/90 p-4">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-[260px] w-full">
        <defs>
          <linearGradient id="equity-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(194,255,43,0.28)" />
            <stop offset="100%" stopColor="rgba(194,255,43,0)" />
          </linearGradient>
        </defs>
        <line
          x1={padding}
          y1={zeroY}
          x2={width - padding}
          y2={zeroY}
          stroke="rgba(255,255,255,0.12)"
          strokeDasharray="4 6"
        />
        <path d={area} fill="url(#equity-area)" />
        <polyline
          points={line}
          fill="none"
          stroke="rgb(194 255 43)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((point, index) => {
          const x = padding + index * stepX;
          const y =
            height -
            padding -
            ((point.cumulativeNet - min) / range) * (height - padding * 2);

          return (
            <circle
              key={point.id}
              cx={x}
              cy={y}
              r="4"
              fill="rgb(194 255 43)"
              stroke="rgba(7,11,20,1)"
              strokeWidth="2"
            />
          );
        })}
      </svg>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-md border border-border/80 bg-muted/25 px-4 py-3">
          <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Baseline
          </div>
          <div className="mt-2 text-sm font-medium text-foreground">
            Netto cumulato da cicli chiusi
          </div>
        </div>
        <div className="rounded-md border border-border/80 bg-muted/25 px-4 py-3">
          <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Formula
          </div>
          <div className="mt-2 text-sm font-medium text-foreground">
            Profitto broker realizzato - costo prop
          </div>
        </div>
        <div className="rounded-md border border-border/80 bg-muted/25 px-4 py-3">
          <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Ultimo punto
          </div>
          <div className="mt-2 text-sm font-medium text-foreground">
            {formatSignedCurrency(points.at(-1)?.cumulativeNet || 0)}
          </div>
        </div>
      </div>
    </div>
  );
}

function createEmptySlot(index, profileName, existingSlots = []) {
  return {
    id: `cyc_slot_${Date.now()}`,
    slot: nextSlotName(existingSlots, index),
    phase: "Fase 1",
    challenge: "FundingPips 100K",
    brokerAccount: "",
    propLogin: "",
    propPassword: "",
    propServer: "",
    propPlatform: "mt5",
    propLoginMasked: "",
    propServerHint: "",
    propSavedAccountId: null,
    brokerLogin: "",
    brokerPassword: "",
    brokerServer: "",
    brokerPlatform: "mt5",
    brokerLoginMasked: "",
    brokerServerHint: "",
    brokerSavedAccountId: null,
    challengeState: "BOZZA",
    status: "OPEN",
    cycleState: "FASE_1_ACTIVE",
    parametersProfile: profileName,
    propEquity: 100000,
    brokerEquity: 0,
    propUnrealizedPnl: null,
    brokerUnrealizedPnl: null,
    target: 1000,
    hedgeBaseTarget: 1000,
    multiplier: 0.1,
    brokerStartEquity: 0,
    cycleBalance: 0,
    riskPerTrade: 1.5,
    maxDailyTrades: 2,
    orphanTimeoutMs: 1000,
    propConnected: false,
    brokerConnected: false,
    propConnectionState: "empty",
    brokerConnectionState: "empty",
    metaApiStatus: "empty",
    brokerLotStep: 0.01,
    propMetaApiAccountId: null,
    brokerMetaApiAccountId: null,
    testLog: "",
    updatedAt: nowHourMinute(),
  };
}

function createEmptySavedAccountDraft(accountType = "PROP") {
  return {
    id: null,
    label: "",
    accountType,
    platform: "mt5",
    accountName: accountType === "BROKER" ? "" : "FundingPips Prop",
    login: "",
    password: "",
    server: "",
    lotStep: 0.01,
    connectionState: "pending",
    validationMessage: null,
    connectionStatus: null,
    balance: null,
    equity: null,
  };
}

function buildLocalSavedAccountId(accountType, platform, login, server) {
  return `saved_local_${accountType}_${platform}_${login}_${server}`;
}

function upsertLocalSavedAccount(accounts, account) {
  const normalizedLogin = (account.login || "").trim();
  const normalizedServer = (account.server || "").trim();
  const normalizedMaskedLogin = account.loginMasked || maskLoginForLibrary(normalizedLogin);
  const existingIndex = accounts.findIndex((item) => {
    const sameType = item.accountType === account.accountType;
    const samePlatform = (item.platform || "mt5") === (account.platform || "mt5");
    const itemLogin = (item.login || "").trim();
    const itemServer = (item.server || "").trim();
    const sameLogin =
      (itemLogin && itemLogin === normalizedLogin) ||
      ((!itemLogin || !normalizedLogin) &&
        (item.loginMasked || "") === normalizedMaskedLogin);
    return sameType && samePlatform && sameLogin && itemServer === normalizedServer;
  });

  if (existingIndex === -1) {
    return [account, ...accounts];
  }

  const next = [...accounts];
  next[existingIndex] = {
    ...next[existingIndex],
    ...account,
    id: next[existingIndex].id || account.id,
  };
  return next;
}

function ensureSavedAccountsFromSlots(slots = [], accounts = []) {
  let nextAccounts = [...accounts];

  for (const slot of slots) {
    const propLogin = slot?.propLogin?.trim();
    const propServer = slot?.propServer?.trim() || slot?.propServerHint?.trim();
    if (propLogin && propServer) {
      nextAccounts = upsertLocalSavedAccount(nextAccounts, {
        id: buildLocalSavedAccountId("PROP", slot.propPlatform || "mt5", propLogin, propServer),
        label: slot.challenge || "FundingPips Prop",
        accountType: "PROP",
        platform: slot.propPlatform || "mt5",
        accountName: "FundingPips Prop",
        loginMasked: maskLoginForLibrary(propLogin),
        server: propServer,
        lotStep: 0.01,
        connectionState: "connected",
        validationMessage: null,
        connectionStatus: "CONNECTED",
        balance: null,
        equity: null,
        metaApiAccountId: slot.propMetaApiAccountId || null,
        lastValidatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        login: propLogin,
        password: slot.propPassword || "",
        isLocalOnly: true,
      });
    }

    const brokerLogin = slot?.brokerLogin?.trim();
    const brokerServer = slot?.brokerServer?.trim() || slot?.brokerServerHint?.trim();
    if (brokerLogin && brokerServer) {
      nextAccounts = upsertLocalSavedAccount(nextAccounts, {
        id: buildLocalSavedAccountId("BROKER", slot.brokerPlatform || "mt5", brokerLogin, brokerServer),
        label: slot.brokerAccount || "Broker",
        accountType: "BROKER",
        platform: slot.brokerPlatform || "mt5",
        accountName: slot.brokerAccount || "Broker",
        loginMasked: maskLoginForLibrary(brokerLogin),
        server: brokerServer,
        lotStep: Number(slot.brokerLotStep || 0.01),
        connectionState: "connected",
        validationMessage: null,
        connectionStatus: "CONNECTED",
        balance: null,
        equity: null,
        metaApiAccountId: slot.brokerMetaApiAccountId || null,
        lastValidatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        login: brokerLogin,
        password: slot.brokerPassword || "",
        isLocalOnly: true,
      });
    }
  }

  return nextAccounts;
}

function mapApiSlotToUiSlot(slot) {
  return {
    id: slot.id,
    slot: slot.slot,
    phase: slot.phase,
    challenge: slot.challenge,
    brokerAccount: slot.brokerAccount || "",
    propLogin: "",
    propPassword: "",
    propServer: "",
    propPlatform: slot.propPlatform || "mt5",
    propLoginMasked: slot.propLoginMasked || "",
    propServerHint: slot.propServerHint || "",
    propSavedAccountId: null,
    brokerLogin: "",
    brokerPassword: "",
    brokerServer: "",
    brokerPlatform: slot.brokerPlatform || "mt5",
    brokerLoginMasked: slot.brokerLoginMasked || "",
    brokerServerHint: slot.brokerServerHint || "",
    brokerSavedAccountId: null,
    challengeState: slot.challengeState,
    status: slot.status,
    cycleState: slot.cycleState || "FASE_1_ACTIVE",
    parametersProfile: slot.parametersProfile || "",
    propEquity: Number(slot.propEquity || 0),
    brokerEquity: Number(slot.brokerEquity || 0),
    propUnrealizedPnl:
      slot.propUnrealizedPnl === null || slot.propUnrealizedPnl === undefined
        ? null
        : Number(slot.propUnrealizedPnl),
    brokerUnrealizedPnl:
      slot.brokerUnrealizedPnl === null || slot.brokerUnrealizedPnl === undefined
        ? null
        : Number(slot.brokerUnrealizedPnl),
    target: Number(slot.target || 0),
    hedgeBaseTarget: Number(slot.hedgeBaseTarget || slot.target || 0),
    multiplier: Number(slot.multiplier || 0),
    brokerStartEquity: Number(slot.brokerStartEquity || 0),
    cycleBalance: Number(slot.cycleBalance || 0),
    riskPerTrade: Number(slot.riskPerTrade || 1.5),
    maxDailyTrades: Number(slot.maxDailyTrades || 2),
    orphanTimeoutMs: Number(slot.orphanTimeoutMs || 1000),
    propConnected: Boolean(slot.propConnected),
    brokerConnected: Boolean(slot.brokerConnected),
    propConnectionState: slot.propConnectionState || "empty",
    brokerConnectionState: slot.brokerConnectionState || "empty",
    metaApiStatus: slot.metaApiStatus || "empty",
    brokerLotStep: 0.01,
    propMetaApiAccountId: slot.propMetaApiAccountId || null,
    brokerMetaApiAccountId: slot.brokerMetaApiAccountId || null,
    testLog: "",
    updatedAt: slot.updatedAt || nowHourMinute(),
  };
}

function mergeApiSlotsWithLocalState(apiSlots, localSlots = []) {
  const localById = new Map((localSlots || []).map((slot) => [slot.id, slot]));
  const mergedApiSlots = apiSlots.map((apiSlot) => {
    const localSlot = localById.get(apiSlot.id);
    if (!localSlot) return apiSlot;

    return {
      ...localSlot,
      ...apiSlot,
      propLogin:
        apiSlot.propLogin ||
        (apiSlot.propConnected ? localSlot.propLogin || "" : localSlot.propLogin || ""),
      propPassword: localSlot.propPassword || "",
      propServer: apiSlot.propServer || localSlot.propServer || "",
      propPlatform: apiSlot.propPlatform || localSlot.propPlatform || "mt5",
      propLoginMasked: apiSlot.propLoginMasked || localSlot.propLoginMasked || "",
      propServerHint: apiSlot.propServerHint || localSlot.propServerHint || "",
      propSavedAccountId: apiSlot.propSavedAccountId || localSlot.propSavedAccountId || null,
      brokerLogin:
        apiSlot.brokerLogin ||
        (apiSlot.brokerConnected
          ? localSlot.brokerLogin || ""
          : localSlot.brokerLogin || ""),
      brokerPassword: localSlot.brokerPassword || "",
      brokerServer: apiSlot.brokerServer || localSlot.brokerServer || "",
      brokerPlatform: apiSlot.brokerPlatform || localSlot.brokerPlatform || "mt5",
      brokerLoginMasked: apiSlot.brokerLoginMasked || localSlot.brokerLoginMasked || "",
      brokerServerHint:
        apiSlot.brokerServerHint || localSlot.brokerServerHint || "",
      brokerSavedAccountId:
        apiSlot.brokerSavedAccountId || localSlot.brokerSavedAccountId || null,
      brokerAccount: apiSlot.brokerAccount || localSlot.brokerAccount || "",
      brokerLotStep: apiSlot.brokerLotStep || localSlot.brokerLotStep || 0.01,
      propMetaApiAccountId:
        apiSlot.propMetaApiAccountId || localSlot.propMetaApiAccountId || null,
      brokerMetaApiAccountId:
        apiSlot.brokerMetaApiAccountId || localSlot.brokerMetaApiAccountId || null,
      testLog: apiSlot.testLog || localSlot.testLog || "",
    };
  });

  const apiIds = new Set(apiSlots.map((slot) => slot.id));
  const localOnlySlots = (localSlots || []).filter((slot) => !apiIds.has(slot.id));

  return [...mergedApiSlots, ...localOnlySlots];
}

function mergeSavedAccountsWithLocalState(apiAccounts, localAccounts = []) {
  const merged = [];

  const upsert = (account) => {
    const nextMasked = account.loginMasked || maskLoginForLibrary(account.login || "");
    const nextServer = account.server || "";
    const nextType = account.accountType;
    const nextPlatform = account.platform || "mt5";

    const existingIndex = merged.findIndex((item) => {
      const itemMasked = item.loginMasked || maskLoginForLibrary(item.login || "");
      return (
        item.accountType === nextType &&
        (item.platform || "mt5") === nextPlatform &&
        (item.server || "") === nextServer &&
        itemMasked === nextMasked
      );
    });

    if (existingIndex === -1) {
      merged.push(account);
      return;
    }

    merged[existingIndex] = {
      ...merged[existingIndex],
      ...account,
      isLocalOnly:
        String(account.id || "").startsWith("saved_local_") ||
        account.isLocalOnly === true,
      id:
        String(account.id || "").startsWith("saved_local_") &&
        merged[existingIndex].id
          ? merged[existingIndex].id
          : account.id || merged[existingIndex].id,
    };

    if (!String(account.id || "").startsWith("saved_local_")) {
      merged[existingIndex].isLocalOnly = false;
    }
  };

  for (const account of localAccounts || []) {
    upsert(account);
  }

  for (const account of apiAccounts || []) {
    upsert(account);
  }

  return merged;
}

function inferSavedAccountIdForSlot(slot, accounts, side) {
  const targetType = side === "prop" ? "PROP" : "BROKER";
  const targetPlatform = side === "prop" ? slot?.propPlatform || "mt5" : slot?.brokerPlatform || "mt5";
  const targetServer = side === "prop" ? getDisplayedServerHint(slot, "prop") : getDisplayedServerHint(slot, "broker");
  const targetMaskedLogin =
    side === "prop" ? getDisplayedMaskedLogin(slot, "prop") : getDisplayedMaskedLogin(slot, "broker");

  if (!targetServer || !targetMaskedLogin) return null;

  const match = (accounts || []).find((account) => {
    return (
      account.accountType === targetType &&
      (account.platform || "mt5") === targetPlatform &&
      (account.server || "") === targetServer &&
      (account.loginMasked || "") === targetMaskedLogin
    );
  });

  return match?.id || null;
}

function attachSavedAccountSelectionsToSlots(slots = [], accounts = []) {
  return (slots || []).map((slot) => ({
    ...slot,
    propSavedAccountId:
      slot.propSavedAccountId || inferSavedAccountIdForSlot(slot, accounts, "prop"),
    brokerSavedAccountId:
      slot.brokerSavedAccountId || inferSavedAccountIdForSlot(slot, accounts, "broker"),
  }));
}

function normaliseStatus(phase) {
  if (phase === "Funded") return "FUNDED";
  if (phase === "Fase 2") return "PRACTITIONER";
  return "OPEN";
}

function hasPropConnection(slot) {
  return Boolean(
    slot?.propConnected ||
      (slot?.propLogin?.trim() &&
        slot?.propPassword?.trim() &&
        slot?.propServer?.trim()),
  );
}

function hasBrokerConnection(slot) {
  return Boolean(
    slot?.brokerConnected ||
      (slot?.brokerAccount?.trim() &&
        slot?.brokerLogin?.trim() &&
        slot?.brokerPassword?.trim() &&
        slot?.brokerServer?.trim()),
  );
}

function hasStrategyParameters(slot) {
  return Boolean(slot?.parametersProfile?.trim());
}

function getPreparationState(slot) {
  if (!slot) return "BOZZA";
  if (slot.challengeState === "ATTIVA") return "ATTIVA";
  if (
    hasPropConnection(slot) &&
    hasBrokerConnection(slot) &&
    hasStrategyParameters(slot)
  ) {
    return "PRONTA";
  }

  return "BOZZA";
}

function getMetaApiReadiness(slot) {
  const propState = getSlotSideConnectionState(slot, "prop");
  const brokerState = getSlotSideConnectionState(slot, "broker");

  if (propState === "connected" && brokerState === "connected") {
    return {
      label: "MetaApi pronta",
      tone: "ready",
    };
  }

  if (propState === "connecting" || brokerState === "connecting") {
    return {
      label: "Connessione in corso",
      tone: "partial",
    };
  }

  if (
    propState === "disconnected" ||
    brokerState === "disconnected" ||
    hasPropConnection(slot) ||
    hasBrokerConnection(slot)
  ) {
    return {
      label: "In attesa conferma",
      tone: "partial",
    };
  }

  return {
    label: "Da collegare",
    tone: "empty",
  };
}

function maskLogin(value) {
  if (!value) return "Non inserito";
  if (value.length <= 4) return value;
  return `${value.slice(0, 2)}•••${value.slice(-2)}`;
}

function getDisplayedMaskedLogin(slot, side) {
  if (side === "prop") {
    return slot?.propLogin?.trim()
      ? maskLogin(slot.propLogin)
      : slot?.propLoginMasked || "";
  }

  return slot?.brokerLogin?.trim()
    ? maskLogin(slot.brokerLogin)
    : slot?.brokerLoginMasked || "";
}

function getDisplayedServerHint(slot, side) {
  if (side === "prop") {
    return slot?.propServer?.trim() || slot?.propServerHint || "";
  }

  return slot?.brokerServer?.trim() || slot?.brokerServerHint || "";
}

function normaliseSavedAccountId(value) {
  if (!value) return null;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  )
    ? value
    : null;
}

function isUuid(value) {
  return Boolean(normaliseSavedAccountId(value));
}

function sleep(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function getSlotSideConnectionState(slot, side) {
  const explicit =
    side === "prop" ? slot?.propConnectionState : slot?.brokerConnectionState;
  if (explicit) return explicit;

  const connected = side === "prop" ? hasPropConnection(slot) : hasBrokerConnection(slot);
  return connected ? "connecting" : "empty";
}

function getConnectionDotClass(state) {
  if (state === "connected") return "bg-emerald-400";
  if (state === "connecting") return "bg-orange-400";
  return "bg-rose-400";
}

function formatLiveCurrencyValue(value, fallback = "In attesa") {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return fallback;
  }
  return formatCurrency(Number(value));
}

function formatLiveSignedCurrencyValue(value, fallback = "In attesa") {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return fallback;
  }
  return formatSignedCurrency(Number(value));
}

function getLivePnlToneClass(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "text-zinc-500";
  }
  if (Number(value) > 0) return "text-primary";
  if (Number(value) < 0) return "text-rose-300";
  return "text-white";
}

function calculatePhase1PassLoss(baseTarget) {
  return Number(baseTarget || 0) * 0.8;
}

function calculatePhase2RecoveryTarget(baseTarget, challengeFee) {
  const phase1Loss = calculatePhase1PassLoss(baseTarget);
  return (phase1Loss + Number(challengeFee || 0)) * 1.2;
}

function calculatePhase2PassLoss(baseTarget, challengeFee) {
  return calculatePhase2RecoveryTarget(baseTarget, challengeFee) * 0.5;
}

function calculateBrokerLossGuardrail(brokerStartEquity) {
  return Number(brokerStartEquity || 0) * 0.3;
}

function getFundedRecoveryTarget(challenge) {
  return getPropMaxLoss(challenge) * 0.4;
}

function getFundedGrossPayoutTarget(brokerFundedBalance) {
  return Number(brokerFundedBalance || 0) / 0.4;
}

function getEffectiveCycleTarget(slot) {
  const phase1BaseTarget = Number(slot?.hedgeBaseTarget || slot?.target || 0);
  const challengeFee = getChallengeFee(slot?.challenge);

  if (slot?.phase === "Fase 1" && phase1BaseTarget > 0) {
    return phase1BaseTarget;
  }

  if (slot?.phase === "Fase 2") {
    return calculatePhase2RecoveryTarget(phase1BaseTarget, challengeFee);
  }

  if (slot?.phase === "Funded") {
    return getFundedRecoveryTarget(slot?.challenge);
  }

  return phase1BaseTarget;
}

function getEffectiveMultiplier(slot) {
  const propMaxLoss = getPropMaxLoss(slot?.challenge);
  if (slot?.phase === "Funded") return 0.4;
  if (!propMaxLoss) return Number(slot?.multiplier || 0);
  return getEffectiveCycleTarget(slot) / propMaxLoss;
}

function getBrokerProjections(slot) {
  const failGain = getEffectiveCycleTarget(slot);
  const phase1BaseTarget = Number(slot?.hedgeBaseTarget || slot?.target || 0);
  const challengeFee = getChallengeFee(slot?.challenge);
  let passLoss = 0;

  if (slot?.phase === "Fase 1") {
    passLoss = calculatePhase1PassLoss(phase1BaseTarget);
  } else if (slot?.phase === "Fase 2") {
    passLoss = calculatePhase2PassLoss(phase1BaseTarget, challengeFee);
  } else if (slot?.phase === "Funded") {
    passLoss = failGain * 0.5;
  }

  return {
    failGain,
    passLoss,
  };
}

function getDynamicCycleBalance(slot) {
  const fallback = Number(slot?.cycleBalance || 0);
  const unrealizedPnl = slot?.propUnrealizedPnl;

  if (unrealizedPnl === null || unrealizedPnl === undefined || Number.isNaN(Number(unrealizedPnl))) {
    return fallback;
  }

  const passTarget = Math.max(getEffectiveCycleTarget(slot), 1);
  const failThreshold = Math.max(getPropMaxLoss(slot?.challenge), 1);
  const currentPnl = Number(unrealizedPnl);

  if (currentPnl >= 0) {
    return Math.round(Math.max(0, Math.min(100, (currentPnl / passTarget) * 100)));
  }

  return Math.round(Math.min(0, Math.max(-100, (currentPnl / failThreshold) * 100)));
}

function getCycleBalanceLabel(slot) {
  const cycleBalance = getDynamicCycleBalance(slot);

  if (cycleBalance === 0) return "Centro";
  if (cycleBalance > 0) return `+${cycleBalance}% verso pass`;
  return `${cycleBalance}% verso fail`;
}

function buildCycleProjection(slot) {
  const brokerInitialEquity = Number(slot?.brokerStartEquity || 0);
  const phase1BaseTarget = Number(slot?.hedgeBaseTarget || slot?.target || 0);
  const challengeFee = getChallengeFee(slot?.challenge);
  const phase1PassLoss = calculatePhase1PassLoss(phase1BaseTarget);
  const phase2RecoveryTarget = calculatePhase2RecoveryTarget(
    phase1BaseTarget,
    challengeFee,
  );
  const phase2PassLoss = calculatePhase2PassLoss(
    phase1BaseTarget,
    challengeFee,
  );
  const fundedFailGain = getFundedRecoveryTarget(slot?.challenge);

  const brokerAfterPhase1Pass = brokerInitialEquity - phase1PassLoss;
  const brokerAfterPhase2Pass = brokerAfterPhase1Pass - phase2PassLoss;
  const brokerAfterFundedFail = brokerAfterPhase2Pass + fundedFailGain;
  const fundedGrossPayout = getFundedGrossPayoutTarget(brokerAfterPhase2Pass);

  return {
    brokerInitialEquity,
    phase1PassLoss,
    brokerAfterPhase1Pass,
    phase2RecoveryTarget,
    phase2PassLoss,
    brokerAfterPhase2Pass,
    fundedFailGain,
    brokerAfterFundedFail,
    fundedGrossPayout,
    brokerAfterPayout: 0,
  };
}

function StatusBadge({ value }) {
  if (value === "OPEN") {
    return (
      <Badge className="border-primary/20 bg-primary/10 text-primary hover:bg-primary/10">
        APERTO
      </Badge>
    );
  }

  if (value === "ORPHAN_ABORTED") {
    return (
      <Badge className="border-amber-500/20 bg-amber-500/10 text-amber-300 hover:bg-amber-500/10">
        ORPHAN ABORT
      </Badge>
    );
  }

  if (value === "FUNDED") {
    return (
      <Badge className="border-primary/20 bg-primary/10 text-primary hover:bg-primary/10">
        FUNDED
      </Badge>
    );
  }

  if (value === "PRACTITIONER") {
    return (
      <Badge className="border-violet-500/20 bg-violet-500/10 text-violet-300 hover:bg-violet-500/10">
        FASE 2
      </Badge>
    );
  }

  return (
    <Badge className="border-border/80 bg-muted/35 text-muted-foreground hover:bg-muted/35">
      CHIUSO
    </Badge>
  );
}

function ChallengeStateBadge({ value }) {
  if (value === "ATTIVA") {
    return (
      <Badge className="border-primary/20 bg-primary/10 text-primary hover:bg-primary/10">
        ATTIVA
      </Badge>
    );
  }

  if (value === "PRONTA") {
    return (
      <Badge className="border-amber-500/20 bg-amber-500/10 text-amber-300 hover:bg-amber-500/10">
        PRONTA
      </Badge>
    );
  }

  if (value === "AVAILABLE") {
    return (
      <Badge className="border-emerald-500/20 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/10">
        AVAILABLE
      </Badge>
    );
  }

  return (
    <Badge className="border-border/80 bg-muted/35 text-muted-foreground hover:bg-muted/35">
      BOZZA
    </Badge>
  );
}

function CycleBalanceBar({ value, leftValue, rightValue, compact = false }) {
  const clamped = Math.max(-100, Math.min(100, value));
  const width = `${Math.abs(clamped)}%`;
  const directionClass =
    clamped < 0 ? "right-1/2 bg-rose-400" : "left-1/2 bg-primary";
  const markerLeft = `calc(50% + ${clamped * 0.5}%)`;

  if (compact) {
    return (
      <div className="rounded-md border border-border/80 bg-background/70 px-3 py-2.5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[11px] font-medium text-primary">
              + {formatProjectionNumber(leftValue)}
            </div>
            <div className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              Challenge fallita
            </div>
          </div>
          <div className="min-w-0 text-right">
            <div className="text-[11px] font-medium text-rose-300">
              - {formatProjectionNumber(rightValue)}
            </div>
            <div className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              Challenge passata
            </div>
          </div>
        </div>
        <div className="relative mt-2 h-1.5 rounded-full bg-muted/55">
          <div className="absolute left-1/2 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-border" />
          {clamped !== 0 ? (
            <div
              className={`absolute top-0 h-full ${directionClass}`}
              style={{ width }}
            />
          ) : null}
          <div
            className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-card shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_0_14px_rgba(0,0,0,0.28)]"
            style={{ left: markerLeft }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Challenge fallita</span>
        <span>Start</span>
        <span>Challenge passata</span>
      </div>
      <div className="relative h-2 rounded-full bg-muted/55">
        <div className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-border" />
        {clamped !== 0 ? (
          <div
            className={`absolute top-0 h-full ${directionClass}`}
            style={{ width }}
          />
        ) : null}
        <div
          className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-card shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_0_14px_rgba(0,0,0,0.28)]"
          style={{ left: markerLeft }}
        />
      </div>
    </div>
  );
}

function FundingPipsLogo({ className = "" }) {
  return (
    <svg
      viewBox="0 0 22 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 2C4 3.10457 3.10457 4 2 4C0.89543 4 0 3.10457 0 2C0 0.89543 0.89543 0 2 0C3.10457 0 4 0.89543 4 2Z"
        fill="currentColor"
      />
      <path
        d="M9 19C9 17.8954 9.89543 17 11 17C12.1046 17 13 17.8954 13 19V22C13 23.1046 12.1046 24 11 24C9.89543 24 9 23.1045 9 22V19Z"
        fill="currentColor"
      />
      <path
        d="M8.6279 0C7.52333 0 6.6279 0.89543 6.6279 2C6.6279 3.10457 7.52333 4 8.6279 4H14.6064C16.4806 4 18 5.51937 18 7.39361C18 9.26785 16.4806 10.7872 14.6064 10.7872H0V22C0 23.1046 0.89543 24 2 24C3.10457 24 4 23.1046 4 22V14.7872H14.6064C18.6898 14.7872 22 11.477 22 7.39361C22 3.31023 18.6898 0 14.6064 0H8.6279Z"
        fill="currentColor"
      />
    </svg>
  );
}

function DeltaHedgeLogo({ className = "" }) {
  return (
    <svg
      viewBox="0 0 84 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M42 8L10 68H29.5L42 45L54.5 68H74L42 8Z"
        fill="currentColor"
      />
      <path
        d="M28 68L53 18L64 18L39 68H28Z"
        fill="#080A03"
      />
      <path
        d="M44 58L61 29L66 34L49 63L44 58Z"
        fill="currentColor"
      />
    </svg>
  );
}

function FundingPipsWordmark({ className = "", large = false }) {
  return (
    <div
      className={`${large ? "flex w-full" : "inline-flex"} items-center text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] ${
        large
          ? "min-h-[78px] gap-4 bg-[linear-gradient(180deg,rgba(24,30,54,0.78),rgba(9,13,24,0.92))] px-4 py-4"
          : "gap-2 rounded-xl bg-[linear-gradient(180deg,rgba(24,30,54,0.72),rgba(10,14,24,0.92))] px-3 py-2"
      } ${className}`}
    >
      <FundingPipsLogo
        className={`${large ? "h-9 w-9" : "h-4 w-4"} shrink-0 text-white`}
      />
      <span
        className={`font-semibold tracking-[-0.035em] ${large ? "text-[28px] leading-none" : "text-sm"}`}
      >
        FundingPips
      </span>
    </div>
  );
}

function DeltaHedgeWordmark({ className = "" }) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <DeltaHedgeLogo className="size-11 shrink-0 text-primary drop-shadow-[0_0_24px_rgba(123,137,255,0.2)]" />
      <div className="flex items-baseline text-[22px] font-black uppercase tracking-[-0.05em]">
        <span className="brand-gradient-text">Delta</span>
        <span className="text-foreground">Hedge</span>
      </div>
    </div>
  );
}

function SlotPowerSwitch({ checked, onToggle, title }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      title={title}
      onPointerDown={(event) => {
        event.stopPropagation();
      }}
      onClick={(event) => {
        event.stopPropagation();
        onToggle();
      }}
      className={`relative z-10 inline-flex h-8 w-[58px] cursor-pointer items-center rounded-full border transition ${
        checked
          ? "border-primary/35 bg-primary/85"
          : "border-border/80 bg-muted/50"
      }`}
    >
      <span
        className={`pointer-events-none absolute text-[10px] font-semibold tracking-[0.14em] ${
          checked ? "left-3 text-[#080a03]" : "right-3 text-muted-foreground"
        }`}
      >
        {checked ? "ON" : "OFF"}
      </span>
      <span
        className={`pointer-events-none absolute top-1/2 size-6 -translate-y-1/2 rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,0.22)] transition ${
          checked ? "left-[30px]" : "left-[2px]"
        }`}
      />
    </button>
  );
}

function CompactSummaryCard({ label, value, note, change }) {
  return (
    <div className="brand-surface-soft rounded-[22px] px-4 py-4">
      <div className="flex items-start justify-between gap-3">
        <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</div>
        {change ? (
          <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {change}
          </div>
        ) : null}
      </div>
      <div className="mt-3 text-2xl font-semibold text-foreground">{value}</div>
      <div className="mt-2 text-sm leading-6 text-muted-foreground">{note}</div>
    </div>
  );
}

function GuideStrip({ steps }) {
  const currentStepIndex = (() => {
    const nextIndex = steps.findIndex((step) => !step.done);
    return nextIndex === -1 ? steps.length - 1 : nextIndex;
  })();
  const completedSteps = steps.filter((step) => step.done).length;
  const trackerPercent =
    steps.length <= 1
      ? completedSteps > 0
        ? 100
        : 0
      : Math.max(0, ((completedSteps - 1) / (steps.length - 1)) * 100);

  return (
    <div className="sticky top-4 z-10 border-b border-border/80 bg-background/92 pb-4 pt-1 backdrop-blur-md">
      <div className="brand-surface rounded-[24px] px-4 py-5">
        <div className="flex items-center justify-between gap-3">
          <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            Progress tracker
          </div>
          <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
            {completedSteps}/{steps.length} completati
          </div>
        </div>

        <div className="mt-6 overflow-x-auto pb-1">
          <div className="relative min-w-[760px] px-2">
            <div className="absolute left-8 right-8 top-4 h-px bg-border/80" />
            <div
              className="absolute left-8 top-4 h-px bg-primary transition-all duration-300"
              style={{ width: `calc((100% - 4rem) * ${trackerPercent / 100})` }}
            />

            <div className="relative flex items-start justify-between gap-4 whitespace-nowrap">
              {steps.map((step, index) => {
                const isActive = index === currentStepIndex;
                const isDone = step.done;

                return (
                  <div
                    key={step.title}
                    className="flex min-w-0 flex-1 flex-col items-center text-center"
                  >
                    <div
                      className={`relative z-10 flex size-8 items-center justify-center rounded-full border text-xs font-semibold transition ${
                        isDone
                          ? "border-primary bg-primary text-[#080a03]"
                        : isActive
                            ? "border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] text-primary shadow-[0_10px_24px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.03)]"
                            : "border-border/80 bg-background text-muted-foreground"
                      }`}
                    >
                      {isDone ? <Check className="size-4" strokeWidth={3} /> : index + 1}
                    </div>
                    <div className="mt-3 text-xs font-medium text-foreground">{step.title}</div>
                    <div className="mt-2 flex h-7 items-center justify-center">
                      {isDone ? (
                        <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-primary">
                          Completato
                        </span>
                      ) : isActive ? (
                        <button
                          type="button"
                          onClick={step.onAction}
                          className="inline-flex h-7 items-center rounded-md bg-primary px-3 text-[10px] font-medium uppercase tracking-[0.08em] text-[#080a03] transition hover:bg-primary/90"
                        >
                          Vai
                        </button>
                      ) : (
                        <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground/70">
                          In attesa
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <label className="block space-y-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-foreground">{label}</span>
        {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
      </div>
      {children}
    </label>
  );
}

function OptionCardGroup({
  options,
  value,
  onChange,
  columns = "sm:grid-cols-3",
}) {
  return (
    <div className={`grid gap-3 ${columns}`}>
      {options.map((option) => {
        const active = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-lg border px-4 py-3 text-left transition ${
              active
                ? "border-primary/25 bg-primary text-primary-foreground shadow-[0_18px_38px_rgba(0,0,0,0.22)] hover:brightness-95"
                : "border-border/80 bg-muted/20 hover:bg-white/[0.035]"
            }`}
          >
            <div
              className={`text-sm font-medium ${
                active ? "text-primary-foreground" : "text-foreground"
              }`}
            >
              {option.title}
            </div>
            {option.description ? (
              <div
                className={`mt-1 text-xs leading-5 ${
                  active ? "text-primary-foreground/80" : "text-muted-foreground"
                }`}
              >
                {option.description}
              </div>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

function Drawer({
  title,
  description,
  onClose,
  children,
  onSave,
  saveLabel,
  saveDisabled = false,
  saveLoading = false,
  savePendingLabel = null,
  footerHint = null,
  auxActionLabel = null,
  onAuxAction = null,
  auxActionDisabled = false,
  maxWidthClass = "max-w-[760px]",
}) {
  return (
    <motion.div
      key={title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/68 p-4 backdrop-blur-md sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      onClick={onClose}
    >
      <motion.div
        className={`flex max-h-[88vh] w-full ${maxWidthClass} flex-col overflow-hidden rounded-xl border border-white/8 bg-[linear-gradient(180deg,rgba(18,18,18,0.88),rgba(10,10,10,0.96))] shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl`}
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.985 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-border/80 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-foreground">{title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-md text-muted-foreground hover:bg-muted/60 hover:text-foreground"
            onClick={onClose}
          >
            <X className="size-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>

        <div className="flex items-center justify-between gap-4 border-t border-border/80 px-6 py-5">
          <Button
            type="button"
            variant="outline"
            className={secondaryButtonClass}
            onClick={onClose}
          >
            Annulla
          </Button>
          {footerHint ? (
            <div className="flex-1 text-right text-xs text-muted-foreground">{footerHint}</div>
          ) : (
            <div className="flex-1" />
          )}
          {auxActionLabel && onAuxAction ? (
            <Button
              type="button"
              variant="outline"
              className={secondaryButtonClass}
              onClick={onAuxAction}
              disabled={auxActionDisabled}
            >
              {auxActionLabel}
            </Button>
          ) : null}
          {onSave ? (
            <Button
              type="button"
              className={primaryButtonClass}
              onClick={onSave}
              disabled={saveDisabled || saveLoading}
            >
              {saveLoading && savePendingLabel ? savePendingLabel : saveLabel}
            </Button>
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  );
}

function App() {
  const { user, session, loading: authLoading, signOut } = useAuth();
  const [activeSection, setActiveSection] = useState("Panoramica");
  const [search, setSearch] = useState("");
  const [slots, setSlots] = useState(initialSlots);
  const [savedAccounts, setSavedAccounts] = useState(initialSavedAccounts);
  const [profiles, setProfiles] = useState(initialProfiles);
  const [subscription, setSubscription] = useState(initialSubscription);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [cycleLogs, setCycleLogs] = useState(initialCycleLogs);
  const [tradeLedger, setTradeLedger] = useState([]);
  const [testingSlotId, setTestingSlotId] = useState(null);
  const [savingConnectionsSlotId, setSavingConnectionsSlotId] = useState(null);
  const [savingSavedAccountType, setSavingSavedAccountType] = useState(null);
  const [deletingSavedAccountId, setDeletingSavedAccountId] = useState(null);
  const [deletingSlotId, setDeletingSlotId] = useState(null);
  const slotsRef = useRef(initialSlots);
  const connectionMonitorRef = useRef(new Map());
  const [selectedSlotId, setSelectedSlotId] = useState(initialSlots[0]?.id ?? null);
  const [panel, setPanel] = useState({ type: null, source: null });
  const [openStrategyQuestion, setOpenStrategyQuestion] = useState(0);
  const [slotDraft, setSlotDraft] = useState(null);
  const [slotWizardStep, setSlotWizardStep] = useState(1);
  const [creatingSlotWizard, setCreatingSlotWizard] = useState(false);
  const [slotWizardError, setSlotWizardError] = useState(null);
  const [tradeTestDraft, setTradeTestDraft] = useState(null);
  const [savedAccountDraft, setSavedAccountDraft] = useState(null);
  const [profileDraft, setProfileDraft] = useState(null);
  const [planDraft, setPlanDraft] = useState(initialSubscription);
  const [stripePlans, setStripePlans] = useState([]);
  const [stripePlansConfigured, setStripePlansConfigured] = useState(false);
  const [stripePlansLoading, setStripePlansLoading] = useState(false);
  const [stripePlansError, setStripePlansError] = useState(null);
  const [billingCheckoutPlanId, setBillingCheckoutPlanId] = useState(null);
  const [exportDraft, setExportDraft] = useState({
    scope: "ultimi_30_giorni",
    includeEvents: true,
    includeEquity: true,
    includeBilling: false,
  });

  useEffect(() => {
    slotsRef.current = slots;
  }, [slots]);

  const isDashboardAdmin = adminDashboardEmails.has(
    user?.email?.trim().toLowerCase() || "",
  );

  function pushNotification(title, body) {
    setNotifications((current) => [
      {
        id: `notice_${Date.now()}`,
        title,
        body,
      },
      ...current,
    ]);
  }

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      pushNotification(
        "Errore logout",
        error instanceof Error ? error.message : "Impossibile chiudere la sessione.",
      );
    }
  }

  async function deleteSavedAccount(account) {
    if (!isDashboardAdmin) return;

    const confirmed = window.confirm(
      `Vuoi davvero eliminare il conto "${account.label}" dalla libreria?`,
    );
    if (!confirmed) return;

    try {
      setDeletingSavedAccountId(account.id);
      await apiRequest(`/accounts-library/${account.id}`, {
        method: "DELETE",
      });
      setSavedAccounts((current) =>
        current.filter((item) => item.id !== account.id),
      );
      await loadDashboardData();
      setSlotDraft((current) => {
        if (!current) return current;
        return {
          ...current,
          propSavedAccountId:
            current.propSavedAccountId === account.id
              ? null
              : current.propSavedAccountId,
          brokerSavedAccountId:
            current.brokerSavedAccountId === account.id
              ? null
              : current.brokerSavedAccountId,
        };
      });
      pushNotification(
        "Conto eliminato",
        `${account.label} e stato rimosso dalla libreria conti.`,
      );
    } catch (error) {
      console.error("[DeltaHedge] delete saved account failed", error);
      pushNotification(
        "Errore elimina conto",
        error instanceof Error ? error.message : "Eliminazione conto non riuscita.",
      );
    } finally {
      setDeletingSavedAccountId(null);
    }
  }

  async function deleteSlotCard(slot) {
    if (!isDashboardAdmin) return;

    const confirmed = window.confirm(
      `Vuoi davvero eliminare la card "${slot.slot}"? Se il ciclo e ancora aperto, prima va chiuso.`,
    );
    if (!confirmed) return;

    try {
      setDeletingSlotId(slot.id);
      await apiRequest(`/slots/${slot.id}`, {
        method: "DELETE",
      });
      setSlots((current) => current.filter((item) => item.id !== slot.id));
      await loadDashboardData();
      setSelectedSlotId((current) => (current === slot.id ? null : current));
      if (panel.source === slot.id) {
        closePanel();
      }
      pushNotification(
        "Slot eliminato",
        `${slot.slot} e stata rimossa dalla dashboard.`,
      );
    } catch (error) {
      console.error("[DeltaHedge] delete slot failed", error);
      pushNotification(
        "Errore elimina slot",
        error instanceof Error ? error.message : "Eliminazione slot non riuscita.",
      );
    } finally {
      setDeletingSlotId(null);
    }
  }

  function openSavedAccountPanel(accountType = "PROP") {
    if (
      !isDashboardAdmin &&
      !subscription.canManageAccounts &&
      Number(subscription.availableSlots || 0) <= 0
    ) {
      void openBillingOffersPanel();
      return;
    }
    setSavedAccountDraft(createEmptySavedAccountDraft(accountType));
    openPanel("saved-account");
  }

  function getSavedAccountMissingFields(draft) {
    if (!draft) return [];
    const missing = [];
    if (!draft.label.trim()) missing.push("etichetta");
    if (!draft.login.trim()) missing.push("login");
    if (!draft.password.trim()) missing.push("password");
    if (!draft.server.trim()) missing.push("server");
    return missing;
  }

  function saveSavedAccountLocally() {
    if (!savedAccountDraft) return;

    const createdAt = new Date().toISOString();
    const account = {
      id: savedAccountDraft.id || `saved_local_${Date.now()}`,
      label: savedAccountDraft.label.trim(),
      accountType: savedAccountDraft.accountType,
      platform: savedAccountDraft.platform,
      accountName:
        savedAccountDraft.accountType === "BROKER"
          ? savedAccountDraft.accountName.trim() || "Broker"
          : "FundingPips Prop",
      loginMasked: maskLoginForLibrary(savedAccountDraft.login.trim()),
      server: savedAccountDraft.server.trim(),
      lotStep:
        savedAccountDraft.accountType === "BROKER"
          ? Number(savedAccountDraft.lotStep || 0.01)
          : 0.01,
      connectionState: "connected",
      validationMessage: null,
      connectionStatus: "CONNECTED",
      balance: null,
      equity: null,
      metaApiAccountId: null,
      lastValidatedAt: createdAt,
      createdAt,
      login: savedAccountDraft.login.trim(),
      password: savedAccountDraft.password.trim(),
      isLocalOnly: true,
    };

    setSavedAccounts((current) => [account, ...current.filter((item) => item.id !== account.id)]);
    pushNotification(
      `${account.label} salvato`,
      "Backend non disponibile: il conto e stato salvato localmente in questo browser.",
    );
    closePanel();
  }

  async function saveSavedAccount() {
    if (!savedAccountDraft) return;

    const missing = [];
    if (!savedAccountDraft.label.trim()) missing.push("etichetta");
    if (!savedAccountDraft.login.trim()) missing.push("login");
    if (!savedAccountDraft.password.trim()) missing.push("password");
    if (!savedAccountDraft.server.trim()) missing.push("server");

    if (missing.length > 0) {
      pushNotification(
        "Conto incompleto",
        `Compila prima: ${missing.join(", ")}.`,
      );
      return;
    }

    try {
      setSavingSavedAccountType(savedAccountDraft.accountType);
      const payload = await apiRequest("/accounts-library", {
        method: "POST",
        body: JSON.stringify({
          label: savedAccountDraft.label,
          accountType: savedAccountDraft.accountType,
          platform: savedAccountDraft.platform,
          accountName: savedAccountDraft.accountName,
          login: savedAccountDraft.login,
          password: savedAccountDraft.password,
          server: savedAccountDraft.server,
          lotStep: Number(savedAccountDraft.lotStep || 0.01),
        }),
      });

      setSavedAccounts((current) => [
        payload.account,
        ...current.filter((item) => item.id !== payload.account.id),
      ]);
      const statusMeta = getSavedAccountStatusMeta(payload.account);
      pushNotification(`${payload.account.label} salvato`, statusMeta.note);
      closePanel();
    } catch (error) {
      console.error("[DeltaHedge] save saved account failed", error);
      pushNotification(
        "Errore salva conto",
        error instanceof Error
          ? error.message
          : "Salvataggio backend non riuscito.",
      );
    } finally {
      setSavingSavedAccountType(null);
    }
  }

  function applySavedAccountToSlot(side, savedAccountId) {
    const selectedAccount = savedAccounts.find((item) => item.id === savedAccountId);

    setSlotDraft((current) => {
      if (!current) return current;

      if (side === "prop") {
        return {
          ...current,
          propSavedAccountId: savedAccountId || null,
          propPlatform: selectedAccount?.platform ?? current.propPlatform,
          propLoginMasked: selectedAccount?.loginMasked ?? current.propLoginMasked,
          propServerHint: selectedAccount?.server ?? current.propServerHint,
          propLogin:
            selectedAccount?.accountType === "PROP" && selectedAccount?.isLocalOnly
              ? selectedAccount.login || ""
              : "",
          propPassword:
            selectedAccount?.accountType === "PROP" && selectedAccount?.isLocalOnly
              ? selectedAccount.password || ""
              : "",
          propServer:
            selectedAccount?.accountType === "PROP" && selectedAccount?.isLocalOnly
              ? selectedAccount.server || ""
              : "",
        };
      }

      return {
        ...current,
        brokerSavedAccountId: savedAccountId || null,
        brokerAccount: selectedAccount?.accountName ?? current.brokerAccount,
        brokerPlatform: selectedAccount?.platform ?? current.brokerPlatform,
        brokerLotStep: selectedAccount?.lotStep ?? current.brokerLotStep,
        brokerLoginMasked: selectedAccount?.loginMasked ?? current.brokerLoginMasked,
        brokerServerHint: selectedAccount?.server ?? current.brokerServerHint,
        brokerLogin:
          selectedAccount?.accountType === "BROKER" && selectedAccount?.isLocalOnly
            ? selectedAccount.login || ""
            : "",
        brokerPassword:
          selectedAccount?.accountType === "BROKER" && selectedAccount?.isLocalOnly
            ? selectedAccount.password || ""
            : "",
        brokerServer:
          selectedAccount?.accountType === "BROKER" && selectedAccount?.isLocalOnly
            ? selectedAccount.server || ""
            : "",
      };
    });
  }

  function saveAddedSlotLocally() {
    if (!slotDraft) return;

    const newSlot = {
      ...slotDraft,
      challengeState: getPreparationState(slotDraft),
      updatedAt: nowHourMinute(),
      status: normaliseStatus(slotDraft.phase),
    };

    setSlots((current) => [newSlot, ...current]);
    setSelectedSlotId(newSlot.id);
    pushNotification(
      `${newSlot.slot} creato`,
      "Backend non disponibile: slot salvato localmente e mantenuto anche dopo refresh su questo browser.",
    );
    closePanel();
  }

  function saveSlotConnectionsLocally() {
    if (!slotDraft) return;

    const preparedSlot = {
      ...slotDraft,
      propConnected: false,
      brokerConnected: false,
      propConnectionState: hasPropConnection(slotDraft) ? "connecting" : "empty",
      brokerConnectionState: hasBrokerConnection(slotDraft) ? "connecting" : "empty",
      metaApiStatus: hasPropConnection(slotDraft) && hasBrokerConnection(slotDraft)
        ? "partial"
        : hasPropConnection(slotDraft) || hasBrokerConnection(slotDraft)
          ? "partial"
          : "empty",
      propMetaApiAccountId: null,
      brokerMetaApiAccountId: null,
    };
    const nextState = getPreparationState(preparedSlot);

    setSlots((current) =>
      current.map((item) =>
        item.id === slotDraft.id
          ? {
              ...item,
              ...preparedSlot,
              challengeState: nextState,
              status: normaliseStatus(preparedSlot.phase),
              updatedAt: nowHourMinute(),
            }
          : item,
      ),
    );
    setSavedAccounts((current) =>
      ensureSavedAccountsFromSlots([preparedSlot], current),
    );

    pushNotification(
      `Connessioni aggiornate su ${slotDraft.slot}`,
      "Backend non disponibile: credenziali salvate localmente sul browser.",
    );
    window.setTimeout(() => {
      void waitForConnectedAccounts(slotDraft.id).catch((error) => {
        const message = error instanceof Error ? error.message : "Connessione non riuscita";
        updateSlotConnectionSnapshot(slotDraft.id, null, `Errore connessione: ${message}`);
      });
    }, 0);
    closePanel();
  }

  function saveSlotParametersLocally(updatedProfile, profileName) {
    if (!slotDraft) return;

    setProfiles((current) => {
      const exists = current.some((item) => item.name === profileName);
      if (exists) {
        return current.map((item) =>
          item.name === profileName ? updatedProfile : item,
        );
      }

      return [...current, { ...updatedProfile, id: `profile_${Date.now()}` }];
    });

    setSlots((current) =>
      current.map((item) =>
        item.id === slotDraft.id
          ? (() => {
              const updatedSlot = {
                ...item,
                parametersProfile: profileName,
                target:
                  item.phase === "Fase 1"
                    ? Number(slotDraft.hedgeBaseTarget)
                    : item.target,
                hedgeBaseTarget: Number(slotDraft.hedgeBaseTarget),
                brokerStartEquity: Number(slotDraft.brokerStartEquity),
                riskPerTrade: updatedProfile.riskPerTrade,
                maxDailyTrades: updatedProfile.maxDailyTrades,
                orphanTimeoutMs: updatedProfile.orphanTimeoutMs,
                updatedAt: nowHourMinute(),
              };

              return {
                ...updatedSlot,
                challengeState: getPreparationState(updatedSlot),
              };
            })()
          : item,
      ),
    );

    pushNotification(
      `Parametri salvati su ${slotDraft.slot}`,
      "Backend non disponibile: preset salvato localmente sul browser.",
    );
    closePanel();
  }

  function saveActivationLocally() {
    if (!slotDraft) return;

    setSlots((current) =>
      current.map((item) =>
        item.id === slotDraft.id
          ? {
              ...item,
              ...slotDraft,
              challengeState: "ATTIVA",
              status: normaliseStatus(slotDraft.phase),
              cycleBalance:
                Number(slotDraft.cycleBalance) === 0 ? 0 : Number(slotDraft.cycleBalance),
              updatedAt: nowHourMinute(),
            }
          : item,
      ),
    );

    pushNotification(
      `${slotDraft.slot} attivato`,
      "Backend non disponibile: stato attivo salvato localmente sul browser.",
    );
    closePanel();
  }

  function pauseSlotLocally(slot) {
    const nextState =
      hasPropConnection(slot) &&
      hasBrokerConnection(slot) &&
      hasStrategyParameters(slot)
        ? "PRONTA"
        : "BOZZA";

    setSlots((current) =>
      current.map((item) =>
        item.id === slot.id
          ? {
              ...item,
              challengeState: nextState,
              updatedAt: nowHourMinute(),
            }
          : item,
      ),
    );

    pushNotification(
      `${slot.slot} spento`,
      "Backend non disponibile: pausa salvata localmente sul browser.",
    );
  }

  function activateSlotLocally(slot) {
    setSlots((current) =>
      current.map((item) =>
        item.id === slot.id
          ? {
              ...item,
              challengeState: "ATTIVA",
              status: normaliseStatus(slot.phase),
              updatedAt: nowHourMinute(),
            }
          : item,
      ),
    );

    pushNotification(
      `${slot.slot} acceso`,
      "Backend non disponibile: attivazione salvata localmente sul browser.",
    );
  }

  async function loadDashboardData(preferredSlotId = null) {
    const [slotsPayload, performancePayload, accountsPayload] = await Promise.all([
      apiRequest("/slots"),
      apiRequest("/performance").catch(() => ({ cycleLogs: [] })),
      fetchSavedAccountsPayload()
        .then((accounts) => ({ accounts }))
        .catch(() => ({ accounts: [] })),
    ]);

    const nextAccounts = accountsPayload.accounts || [];
    const nextSlots = attachSavedAccountSelectionsToSlots(
      (slotsPayload.slots || []).map(mapApiSlotToUiSlot),
      nextAccounts,
    );
    setSlots(nextSlots);
    setSavedAccounts(nextAccounts);

    if (slotsPayload.subscription) {
      setSubscription({
        planName: slotsPayload.subscription.planName || "Nessun piano",
        slotsIncluded: Number(slotsPayload.subscription.slotsIncluded || 0),
        usedSlots: Number(slotsPayload.subscription.usedSlots || 0),
        availableSlots: Number(slotsPayload.subscription.availableSlots || 0),
        renewalDate: slotsPayload.subscription.renewalDate || "In attesa",
        billingCadence: slotsPayload.subscription.billingCadence || "Mensile",
        canCreateSlot: Boolean(slotsPayload.subscription.canCreateSlot),
        canManageAccounts: Boolean(slotsPayload.subscription.canManageAccounts),
      });
    }

    setCycleLogs(performancePayload.cycleLogs || []);
    setSelectedSlotId((current) => {
      if (preferredSlotId && nextSlots.some((slot) => slot.id === preferredSlotId)) {
        return preferredSlotId;
      }
      if (current && nextSlots.some((slot) => slot.id === current)) {
        return current;
      }
      return nextSlots[0]?.id ?? null;
    });
  }

  useEffect(() => {
    if (authLoading || !session || !user) return;

    void loadDashboardData().catch((error) => {
      console.error("[DeltaHedge] Unable to load dashboard data", error);
      pushNotification(
        "Errore caricamento dashboard",
        error instanceof Error
          ? error.message
          : "Impossibile caricare i dati dal backend.",
      );
    });
  }, [authLoading, session, user?.id]);

  const pendingSavedAccountsCount = savedAccounts.filter(
    (account) => account.connectionState === "pending",
  ).length;

  useEffect(() => {
    if (authLoading || !session || !user) return;

    const shouldRefreshPendingAccounts =
      (activeSection === "Conti" || panel.type === "add-slot") &&
      pendingSavedAccountsCount > 0;

    if (!shouldRefreshPendingAccounts) {
      return;
    }

    let cancelled = false;

    const refreshPendingAccounts = async () => {
      try {
        const nextAccounts = await fetchSavedAccountsPayload();
        setSavedAccounts(nextAccounts);
      } catch (error) {
        if (!cancelled) {
          console.error("[DeltaHedge] Unable to refresh pending saved accounts", error);
        }
      }
    };

    void refreshPendingAccounts();
    const intervalId = window.setInterval(() => {
      void refreshPendingAccounts();
    }, 5000);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, [
    activeSection,
    authLoading,
    panel.type,
    pendingSavedAccountsCount,
    selectedSlotId,
    session,
    user,
  ]);

  const selectedSlot =
    slots.find((slot) => slot.id === selectedSlotId) ?? slots[0] ?? null;
  const filteredSlots = slots.filter((slot) => {
    const haystack = [
      slot.slot,
      slot.challenge,
      slot.brokerAccount,
      slot.propServer || slot.propServerHint,
      slot.brokerServer || slot.brokerServerHint,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(search.toLowerCase());
  });
  const filteredSavedAccounts = savedAccounts.filter((account) => {
    const haystack = [
      account.label,
      account.accountName,
      account.server,
      account.loginMasked,
      account.accountType,
      account.platform,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(search.toLowerCase());
  });
  const selectedSlotReadiness = selectedSlot
    ? getMetaApiReadiness(selectedSlot)
    : null;

  const activeSlotsCount = slots.filter(
    (slot) => slot.challengeState === "ATTIVA",
  ).length;
  const readySlotsCount = slots.filter(
    (slot) => slot.challengeState === "PRONTA",
  ).length;
  const draftSlotsCount = slots.filter(
    (slot) => slot.challengeState === "BOZZA",
  ).length;
  const connectedSlotsCount = slots.filter(
    (slot) => hasPropConnection(slot) && hasBrokerConnection(slot),
  ).length;
  const parameterizedSlotsCount = slots.filter((slot) =>
    hasStrategyParameters(slot),
  ).length;
  const phase1Count = slots.filter(
    (slot) => slot.challengeState === "ATTIVA" && slot.phase === "Fase 1",
  ).length;
  const phase2Count = slots.filter(
    (slot) => slot.challengeState === "ATTIVA" && slot.phase === "Fase 2",
  ).length;
  const fundedCount = slots.filter(
    (slot) => slot.challengeState === "ATTIVA" && slot.phase === "Funded",
  ).length;
  const availableSlots = Number(subscription.availableSlots || 0);
  const savedPropAccountsCount = savedAccounts.filter(
    (account) => account.accountType === "PROP",
  ).length;
  const savedBrokerAccountsCount = savedAccounts.filter(
    (account) => account.accountType === "BROKER",
  ).length;

  const summaryCards = [
    {
      key: "slots",
      label: "Slot nel piano",
      change: `${availableSlots} liberi`,
      value: String(subscription.slotsIncluded),
      note: `${slots.length} usati, ${availableSlots} ancora disponibili`,
    },
    {
      key: "active",
      label: "Slot operativi",
      change: `${readySlotsCount} pronti`,
      value: String(activeSlotsCount),
      note: `${phase1Count} Fase 1, ${phase2Count} Fase 2, ${fundedCount} Funded`,
    },
    {
      key: "cloud",
      label: "Connessioni cloud",
      change: `${connectedSlotsCount} complete`,
      value: String(connectedSlotsCount),
      note: `${parameterizedSlotsCount} slot con preset, ${draftSlotsCount} ancora in bozza`,
    },
  ];

  const closedCycleLogs = [...cycleLogs].sort(
    (left, right) => new Date(left.closedAt) - new Date(right.closedAt),
  );
  const totalNetProfit = closedCycleLogs.reduce(
    (sum, cycle) => sum + Number(cycle.netProfit || 0),
    0,
  );
  const totalBrokerRealized = closedCycleLogs.reduce(
    (sum, cycle) => sum + Number(cycle.brokerRealizedProfit || 0),
    0,
  );
  const totalPropCost = closedCycleLogs.reduce(
    (sum, cycle) => sum + Number(cycle.propCost || 0),
    0,
  );
  const positiveCyclesCount = closedCycleLogs.filter(
    (cycle) => Number(cycle.netProfit || 0) > 0,
  ).length;
  const averageNetProfit = closedCycleLogs.length
    ? totalNetProfit / closedCycleLogs.length
    : 0;
  const lastClosedCycle = closedCycleLogs.at(-1) ?? null;
  const equityCurvePoints = buildEquityCurve(closedCycleLogs);
  const performanceCards = [
    {
      label: "Cicli chiusi",
      value: String(closedCycleLogs.length),
      note: `${positiveCyclesCount} con netto positivo`,
    },
    {
      label: "Netto cumulato",
      value: formatSignedCurrency(totalNetProfit),
      note: `Broker ${formatSignedCurrency(totalBrokerRealized)} · Prop ${formatSignedCurrency(-totalPropCost)}`,
    },
    {
      label: "Netto medio",
      value: formatSignedCurrency(averageNetProfit),
      note: lastClosedCycle
        ? `Ultimo ciclo ${getCycleOutcomeLabel(lastClosedCycle.outcome)}`
        : "In attesa del primo ciclo chiuso",
    },
  ];
  const accountLibraryCards = [
    {
      key: "saved-total",
      label: "Conti salvati",
      value: String(savedAccounts.length),
      note: `${filteredSavedAccounts.length} visibili con il filtro corrente`,
    },
    {
      key: "saved-ready",
      label: "Conti connessi",
      value: String(savedAccounts.filter((account) => account.connectionState === "connected").length),
      note: "Con pallino verde, pronti per essere usati negli slot",
    },
    {
      key: "saved-errors",
      label: "Da rivedere",
      value: String(savedAccounts.filter((account) => account.connectionState === "error").length),
      note: "Conti con errore di connessione o credenziali da ricontrollare",
    },
  ];

  function openPanel(type, source = null) {
    setPanel({ type, source });
  }

  function closePanel() {
    setPanel({ type: null, source: null });
    setTradeTestDraft(null);
    setSlotWizardStep(1);
    setCreatingSlotWizard(false);
    setSlotWizardError(null);
  }

  async function openBillingOffersPanel() {
    try {
      setStripePlansLoading(true);
      setStripePlansError(null);
      const payload = await fetchStripePlansPayload();
      setStripePlans(payload.plans || []);
      setStripePlansConfigured(Boolean(payload.configured));
      openPanel("billing-offers");
    } catch (error) {
      console.error("[DeltaHedge] Unable to load Stripe plans", error);
      setStripePlansError(
        error instanceof Error
          ? error.message
          : "Impossibile caricare i pacchetti Stripe.",
      );
      openPanel("billing-offers");
    } finally {
      setStripePlansLoading(false);
    }
  }

  async function startStripeCheckout(planId) {
    try {
      setBillingCheckoutPlanId(planId);
      const payload = await apiRequest("/stripe/create-checkout-session", {
        method: "POST",
        body: JSON.stringify({ planId }),
      });

      if (!payload?.url) {
        throw new Error("Stripe non ha restituito un URL di checkout.");
      }

      window.location.assign(payload.url);
    } catch (error) {
      console.error("[DeltaHedge] Unable to start Stripe checkout", error);
      setStripePlansError(
        error instanceof Error
          ? error.message
          : "Impossibile aprire il checkout Stripe.",
      );
    } finally {
      setBillingCheckoutPlanId(null);
    }
  }

  function openAddSlot() {
    if (!isDashboardAdmin && !(Number(subscription.availableSlots || 0) > 0)) {
      void openBillingOffersPanel();
      return;
    }
    setSlotDraft(createEmptySlot(slots.length + 1, "", slots));
    setSlotWizardStep(1);
    setSlotWizardError(null);
    openPanel("add-slot");
  }

  function updateSlotWizardPhase(nextPhase) {
    setSlotDraft((current) => {
      if (!current) return current;

      return {
        ...current,
        phase: nextPhase,
        hedgeBaseTarget:
          nextPhase === "Fase 1"
            ? 1000
            : Number(current.hedgeBaseTarget || current.target || 1000),
        target:
          nextPhase === "Fase 1"
            ? 1000
            : Number(current.target || current.hedgeBaseTarget || 1000),
      };
    });
  }

  function syncWizardSelectedAccount(side, savedAccountId) {
    const selectedAccount = savedAccounts.find((item) => item.id === savedAccountId);

    setSlotDraft((current) => {
      if (!current) return current;

      if (side === "prop") {
        return {
          ...current,
          propSavedAccountId: savedAccountId || null,
          propPlatform: selectedAccount?.platform ?? current.propPlatform,
          propLoginMasked: selectedAccount?.loginMasked ?? current.propLoginMasked,
          propServerHint: selectedAccount?.server ?? current.propServerHint,
        };
      }

      return {
        ...current,
        brokerSavedAccountId: savedAccountId || null,
        brokerAccount: selectedAccount?.accountName ?? current.brokerAccount,
        brokerPlatform: selectedAccount?.platform ?? current.brokerPlatform,
        brokerLotStep: selectedAccount?.lotStep ?? current.brokerLotStep,
        brokerLoginMasked: selectedAccount?.loginMasked ?? current.brokerLoginMasked,
        brokerServerHint: selectedAccount?.server ?? current.brokerServerHint,
        brokerStartEquity:
          Number(selectedAccount?.equity ?? selectedAccount?.balance ?? 0) ||
          current.brokerStartEquity,
      };
    });
  }

  async function completeSlotWizard() {
    if (!slotDraft || creatingSlotWizard) return;

    const propAccount = savedAccounts.find(
      (item) => item.id === slotDraft.propSavedAccountId,
    );
    const brokerAccount = savedAccounts.find(
      (item) => item.id === slotDraft.brokerSavedAccountId,
    );
    const brokerStartEquity = getWizardBrokerStartEquity(slotDraft, brokerAccount);

    if (!propAccount || !brokerAccount) {
      pushNotification(
        "Conti mancanti",
        "Seleziona un conto prop e un conto broker gia validati.",
      );
      return;
    }

    if (!isSavedAccountReady(propAccount) || !isSavedAccountReady(brokerAccount)) {
      pushNotification(
        "Conti non pronti",
        "Puoi usare nello slot solo conti gia verificati e connessi in Conti.",
      );
      return;
    }

    setCreatingSlotWizard(true);
    setSlotWizardError(null);

    try {
      const createPayload = await apiRequest("/slots", {
        method: "POST",
        body: JSON.stringify({
          slot: slotDraft.slot,
          challenge: slotDraft.challenge,
          phase: slotDraft.phase,
        }),
      });

      const backendSlot = mapApiSlotToUiSlot(createPayload.slot);

      await apiRequest(`/slots/${backendSlot.id}/accounts`, {
        method: "POST",
        body: JSON.stringify({
          challenge: slotDraft.challenge,
          prop: {
            savedAccountId: normaliseSavedAccountId(slotDraft.propSavedAccountId),
            platform: slotDraft.propPlatform || "mt5",
            login: "",
            password: "",
            server: "",
          },
          broker: {
            accountName: brokerAccount.accountName || slotDraft.brokerAccount || "Broker",
            savedAccountId: normaliseSavedAccountId(slotDraft.brokerSavedAccountId),
            platform: slotDraft.brokerPlatform || "mt5",
            login: "",
            password: "",
            server: "",
            lotStep: Number(brokerAccount.lotStep || slotDraft.brokerLotStep || 0.01),
          },
        }),
      });

      const profileName =
        profileDraft?.name?.trim() || getDefaultProfileNameForPhase(slotDraft.phase);
      const riskPerTrade = Number(
        profileDraft?.riskPerTrade ?? slotDraft.riskPerTrade ?? 1.5,
      );
      const maxDailyTrades = Number(
        profileDraft?.maxDailyTrades ?? slotDraft.maxDailyTrades ?? 2,
      );
      const orphanTimeoutMs = Number(
        profileDraft?.orphanTimeoutMs ?? slotDraft.orphanTimeoutMs ?? 1000,
      );

      await apiRequest(`/slots/${backendSlot.id}/parameters`, {
        method: "POST",
        body: JSON.stringify({
          parametersProfile: profileName,
          hedgeBaseTarget:
            slotDraft.phase === "Fase 1"
              ? Number(slotDraft.hedgeBaseTarget || 1000)
              : Number(slotDraft.hedgeBaseTarget || slotDraft.target || 1000),
          brokerStartEquity: Number(brokerStartEquity || 0),
          riskPerTrade,
          maxDailyTrades,
          orphanTimeoutMs,
        }),
      });

      let refreshError = null;
      try {
        await loadDashboardData(backendSlot.id);
      } catch (error) {
        refreshError = error;
        console.error("[DeltaHedge] slot wizard refresh failed", error);
      }

      closePanel();

      if (refreshError) {
        pushNotification(
          `${slotDraft.slot} creata`,
          refreshError instanceof Error
            ? `La coppia e stata creata, ma il refresh della dashboard non e riuscito: ${refreshError.message}`
            : "La coppia e stata creata, ma il refresh della dashboard non e riuscito.",
        );
        return;
      }

      pushNotification(
        `${slotDraft.slot} creato`,
        "La coppia e pronta: conti agganciati e parametri iniziali salvati.",
      );
    } catch (error) {
      console.error("[DeltaHedge] slot wizard failed", error);
      const message =
        error instanceof Error
          ? error.message
          : "Impossibile completare il wizard dello slot.";
      setSlotWizardError(message);
      pushNotification(
        "Errore creazione coppia",
        message,
      );
    } finally {
      setCreatingSlotWizard(false);
    }
  }

  function advanceSlotWizard() {
    if (!slotDraft) return;

    if (slotWizardStep === 1) {
      setSlotWizardError(null);
      if (!slotDraft.slot.trim()) {
        pushNotification("Nome slot mancante", "Dai un nome allo slot prima di continuare.");
        return;
      }
      setSlotWizardStep(2);
      return;
    }

    if (slotWizardStep === 2) {
      setSlotWizardError(null);
      const propAccount = savedAccounts.find(
        (item) => item.id === slotDraft.propSavedAccountId,
      );
      const brokerAccount = savedAccounts.find(
        (item) => item.id === slotDraft.brokerSavedAccountId,
      );

      if (!propAccount || !brokerAccount) {
        pushNotification(
          "Conti mancanti",
          "Seleziona un conto prop e un conto broker gia verificati.",
        );
        return;
      }

      if (!isSavedAccountReady(propAccount) || !isSavedAccountReady(brokerAccount)) {
        pushNotification(
          "Conti non pronti",
          "Nel wizard puoi scegliere solo conti con pallino verde.",
        );
        return;
      }

      setProfileDraft((current) => ({
        id: current?.id || `profile_${Date.now()}`,
        name: current?.name || getDefaultProfileNameForPhase(slotDraft.phase),
        riskPerTrade: Number(current?.riskPerTrade ?? slotDraft.riskPerTrade ?? 1.5),
        maxDailyTrades: Number(current?.maxDailyTrades ?? slotDraft.maxDailyTrades ?? 2),
        orphanTimeoutMs: Number(
          current?.orphanTimeoutMs ?? slotDraft.orphanTimeoutMs ?? 1000,
        ),
      }));
      setSlotDraft((current) =>
        current
          ? {
              ...current,
              brokerStartEquity: getWizardBrokerStartEquity(current, brokerAccount),
              hedgeBaseTarget:
                current.phase === "Fase 1"
                  ? Number(current.hedgeBaseTarget || 1000)
                  : Number(current.hedgeBaseTarget || current.target || 1000),
            }
          : current,
      );
      setSlotWizardStep(3);
      return;
    }

    setSlotWizardError(null);
    void completeSlotWizard();
  }

  function openSlotParameters(slotId = selectedSlotId) {
    const slot = slots.find((item) => item.id === slotId);
    if (!slot) return;
    const recommendedProfile = profiles[0];
    const profile =
      profiles.find((item) => item.name === slot.parametersProfile) ?? {
        id: `profile_${slot.id}`,
        name: slot.parametersProfile || recommendedProfile?.name || "Profilo consigliato",
        riskPerTrade: slot.riskPerTrade || recommendedProfile?.riskPerTrade || 1.5,
        maxDailyTrades:
          slot.maxDailyTrades || recommendedProfile?.maxDailyTrades || 2,
        orphanTimeoutMs:
          slot.orphanTimeoutMs || recommendedProfile?.orphanTimeoutMs || 1000,
      };

    setSelectedSlotId(slot.id);
    setSlotDraft({ ...slot });
    setProfileDraft({ ...profile });
    openPanel("slot-parameters");
  }

  function openSlotConnections(slotId = selectedSlotId) {
    const slot = slots.find((item) => item.id === slotId);
    if (!slot) return;
    setSelectedSlotId(slot.id);
    setSlotDraft({ ...slot });
    openPanel("slot-connections");
  }

  function openActivateSlot(slotId = selectedSlotId) {
    const slot = slots.find((item) => item.id === slotId);
    if (!slot) return;
    setSelectedSlotId(slot.id);
    setSlotDraft({ ...slot });
    openPanel("activate-slot");
  }

  function openSlotDetail(slotId = selectedSlotId) {
    const slot = slots.find((item) => item.id === slotId);
    if (!slot) return;
    setSelectedSlotId(slot.id);
    setSlotDraft({ ...slot });
    openPanel("slot-detail");
  }

  function openTradeTest(slotId = selectedSlotId) {
    const slot = slots.find((item) => item.id === slotId);
    if (!slot) return;
    setSelectedSlotId(slot.id);
    setSlotDraft({ ...slot });
    setTradeTestDraft({
      symbol: "XAUUSD",
      direction: "BUY",
      propLot: 1,
    });
    openPanel("trade-test");
  }

  function openSubscriptionPanel() {
    setPlanDraft({ ...subscription });
    openPanel("subscription");
  }

  function openNotificationsPanel() {
    openPanel("notifications");
  }

  function openExportPanel(source) {
    setExportDraft({
      scope: "ultimi_30_giorni",
      includeEvents: true,
      includeEquity: true,
      includeBilling: false,
    });
    openPanel("export", source);
  }

  function updateSlotConnectionSnapshot(slotId, payload, testLog) {
    setSlots((current) =>
      current.map((item) => {
        if (item.id !== slotId) return item;

        const propState = payload?.prop?.state || item.propConnectionState || "empty";
        const brokerState =
          payload?.broker?.state || item.brokerConnectionState || "empty";
        const metaApiStatus =
          propState === "connected" && brokerState === "connected"
            ? "ready"
            : propState !== "empty" || brokerState !== "empty"
              ? "partial"
              : "empty";

        return {
          ...item,
          propMetaApiAccountId:
            payload?.propMetaApiAccountId ?? item.propMetaApiAccountId ?? null,
          brokerMetaApiAccountId:
            payload?.brokerMetaApiAccountId ?? item.brokerMetaApiAccountId ?? null,
          propConnectionState: propState,
          brokerConnectionState: brokerState,
          propEquity:
            payload?.prop?.equity === null || payload?.prop?.equity === undefined
              ? item.propEquity
              : Number(payload.prop.equity),
          brokerEquity:
            payload?.broker?.equity === null || payload?.broker?.equity === undefined
              ? item.brokerEquity
              : Number(payload.broker.equity),
          propUnrealizedPnl:
            payload?.prop?.unrealizedPnl === undefined
              ? item.propUnrealizedPnl
              : payload?.prop?.unrealizedPnl,
          brokerUnrealizedPnl:
            payload?.broker?.unrealizedPnl === undefined
              ? item.brokerUnrealizedPnl
              : payload?.broker?.unrealizedPnl,
          metaApiStatus,
          updatedAt: nowHourMinute(),
          ...(typeof testLog === "string" ? { testLog } : {}),
        };
      }),
    );
  }

  function buildConnectionStatusPayload(slot) {
    return {
      slotId: slot.id,
      existingPropMetaApiAccountId: slot.propMetaApiAccountId || null,
      existingBrokerMetaApiAccountId: slot.brokerMetaApiAccountId || null,
      ...(slot.propLogin || slot.propPassword || slot.propServer
        ? {
            prop: {
              platform: slot.propPlatform || "mt5",
              login: slot.propLogin,
              password: slot.propPassword,
              server: slot.propServer,
            },
          }
        : {}),
      ...(slot.brokerLogin || slot.brokerPassword || slot.brokerServer
        ? {
            broker: {
              accountName: slot.brokerAccount,
              platform: slot.brokerPlatform || "mt5",
              login: slot.brokerLogin,
              password: slot.brokerPassword,
              server: slot.brokerServer,
            },
          }
        : {}),
    };
  }

  async function fetchSlotConnectionStatus(slot) {
    return apiRequest("/debug/connection-status", {
      method: "POST",
      body: JSON.stringify(buildConnectionStatusPayload(slot)),
    });
  }

  async function fetchSlotLiveMetrics(slot) {
    return apiRequest("/debug/live-metrics", {
      method: "POST",
      body: JSON.stringify(buildConnectionStatusPayload(slot)),
    });
  }

  async function waitForConnectedAccounts(slotId) {
    if (connectionMonitorRef.current.has(slotId)) {
      return connectionMonitorRef.current.get(slotId);
    }

    const task = (async () => {
      while (true) {
        const latestSlot = slotsRef.current.find((item) => item.id === slotId);
        if (!latestSlot) {
          throw new Error("Slot non trovato durante il monitoraggio");
        }

        const payload = await fetchSlotConnectionStatus(latestSlot);
        const propState = payload?.prop?.state || "empty";
        const brokerState = payload?.broker?.state || "empty";

        updateSlotConnectionSnapshot(
          slotId,
          payload,
          propState === "connected" && brokerState === "connected"
            ? `Connection successfully · conferma ricevuta alle ${nowHourMinute()}`
            : `Connection waiting... prop ${payload?.prop?.connectionStatus || "-"} · broker ${payload?.broker?.connectionStatus || "-"} · ${nowHourMinute()}`,
        );

        if (propState === "connected" && brokerState === "connected") {
          return payload;
        }

        if (propState === "disconnected" || brokerState === "disconnected") {
          throw new Error(
            `Connessione fallita: prop ${payload?.prop?.connectionStatus || "UNKNOWN"}, broker ${payload?.broker?.connectionStatus || "UNKNOWN"}`,
          );
        }

        await sleep(3000);
      }
    })().finally(() => {
      connectionMonitorRef.current.delete(slotId);
    });

    connectionMonitorRef.current.set(slotId, task);
    return task;
  }

  useEffect(() => {
    if (slots.length === 0) return undefined;

    let cancelled = false;

    const pollLiveMetrics = async () => {
      const candidates = slotsRef.current.filter(
        (slot) =>
          (slot.propMetaApiAccountId && slot.brokerMetaApiAccountId) ||
          (hasPropConnection(slot) && hasBrokerConnection(slot)),
      );

      await Promise.all(
        candidates.map(async (slot) => {
          try {
            const payload = await fetchSlotLiveMetrics(slot);
            if (!cancelled) {
              updateSlotConnectionSnapshot(slot.id, payload);
            }
          } catch (error) {
            console.error("[DeltaHedge] live metrics failed", slot.id, error);
          }
        }),
      );
    };

    void pollLiveMetrics();
    const intervalId = window.setInterval(() => {
      void pollLiveMetrics();
    }, 4000);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, [slots.length]);

  useEffect(() => {
    if (panel.type !== "slot-detail" || !slotDraft?.id) return;
    const latestSlot = slots.find((item) => item.id === slotDraft.id);
    if (!latestSlot) return;
    setSlotDraft((current) => (current ? { ...current, ...latestSlot } : current));
  }, [panel.type, slotDraft?.id, slots]);

  async function saveAddedSlot() {
    if (!slotDraft) return;
    try {
      const payload = await apiRequest("/slots", {
        method: "POST",
        body: JSON.stringify({
          slot: slotDraft.slot,
          challenge: slotDraft.challenge,
          phase: slotDraft.phase,
        }),
      });
      const newSlot = mapApiSlotToUiSlot(payload.slot);
      await loadDashboardData(newSlot.id);
      setNotifications((current) => [
        {
          id: `notice_${Date.now()}`,
          title: `${newSlot.slot} creato`,
          body: "Lo slot e stato salvato sul backend. Ora resta disponibile anche dopo refresh.",
        },
        ...current,
      ]);
      closePanel();
    } catch (error) {
      console.error("[DeltaHedge] create slot failed", error);
      pushNotification(
        "Errore creazione slot",
        error instanceof Error ? error.message : "Creazione backend non riuscita.",
      );
    }
  }

  async function ensureBackendSlot(slotLike) {
    if (!slotLike) {
      throw new Error("Slot mancante");
    }

    if (isUuid(slotLike.id)) {
      return slotLike;
    }

    const payload = await apiRequest("/slots", {
      method: "POST",
      body: JSON.stringify({
        slot: slotLike.slot,
        challenge: slotLike.challenge,
        phase: slotLike.phase,
      }),
    });

    const backendSlot = mapApiSlotToUiSlot(payload.slot);
    const migratedSlot = {
      ...slotLike,
      ...backendSlot,
      id: backendSlot.id,
      updatedAt: backendSlot.updatedAt || nowHourMinute(),
    };

    setSlots((current) =>
      current.map((item) => (item.id === slotLike.id ? migratedSlot : item)),
    );
    setSelectedSlotId(backendSlot.id);
    setSlotDraft((current) =>
      current && current.id === slotLike.id ? migratedSlot : current,
    );

    return migratedSlot;
  }

  async function saveSlotConnections() {
    if (!slotDraft) return;
    if (savingConnectionsSlotId === slotDraft.id) return;

    try {
      setSavingConnectionsSlotId(slotDraft.id);
      const workingSlot = await ensureBackendSlot(slotDraft);
      if (workingSlot.id !== slotDraft.id) {
        setSlotDraft(workingSlot);
      }

      if (!normaliseSavedAccountId(workingSlot.propSavedAccountId)) {
        throw new Error("Seleziona prima un conto prop connesso dalla sezione Conti.");
      }

      if (!normaliseSavedAccountId(workingSlot.brokerSavedAccountId)) {
        throw new Error("Seleziona prima un conto broker connesso dalla sezione Conti.");
      }

      const selectedBrokerSavedAccount = savedAccounts.find(
        (item) => item.id === workingSlot.brokerSavedAccountId,
      );
      const selectedPropSavedAccount = savedAccounts.find(
        (item) => item.id === workingSlot.propSavedAccountId,
      );

      if (!isSavedAccountReady(selectedPropSavedAccount)) {
        throw new Error("Il conto prop selezionato non e ancora validato.");
      }

      if (!isSavedAccountReady(selectedBrokerSavedAccount)) {
        throw new Error("Il conto broker selezionato non e ancora validato.");
      }

      setSlots((current) =>
        current.map((item) =>
          item.id === workingSlot.id
            ? {
                ...item,
                ...workingSlot,
                propConnectionState: hasPropConnection(workingSlot) ? "connecting" : "empty",
                brokerConnectionState: hasBrokerConnection(workingSlot) ? "connecting" : "empty",
                metaApiStatus:
                  hasPropConnection(workingSlot) || hasBrokerConnection(workingSlot)
                    ? "partial"
                    : "empty",
                testLog: `Connection waiting... richiesta inviata a MetaApi alle ${nowHourMinute()}`,
              }
            : item,
        ),
      );

      const payload = await apiRequest(`/slots/${workingSlot.id}/accounts`, {
        method: "POST",
        body: JSON.stringify({
          challenge: workingSlot.challenge,
          prop: {
            savedAccountId: normaliseSavedAccountId(workingSlot.propSavedAccountId),
            platform: workingSlot.propPlatform || "mt5",
            login: "",
            password: "",
            server: "",
          },
          broker: {
            accountName:
              selectedBrokerSavedAccount?.accountName ||
              workingSlot.brokerAccount ||
              "Broker",
            savedAccountId: normaliseSavedAccountId(workingSlot.brokerSavedAccountId),
            platform: workingSlot.brokerPlatform || "mt5",
            login: "",
            password: "",
            server: "",
            lotStep: Number(
              selectedBrokerSavedAccount?.lotStep || workingSlot.brokerLotStep || 0.01,
            ),
          },
        }),
      });
      await loadDashboardData(payload.slot.id);
      void waitForConnectedAccounts(payload.slot.id).catch((error) => {
        const message = error instanceof Error ? error.message : "Connessione non riuscita";
        updateSlotConnectionSnapshot(payload.slot.id, null, `Errore connessione: ${message}`);
      });
      setNotifications((current) => [
        {
          id: `notice_${Date.now()}`,
          title: `Connessioni aggiornate su ${workingSlot.slot}`,
          body:
            "Le credenziali sono state salvate sul server e non dovrai reinserirle dopo refresh.",
        },
        ...current,
      ]);
      closePanel();
    } catch (error) {
      console.error("[DeltaHedge] save connections failed", error);
      pushNotification(
        "Errore salva connessioni",
        error instanceof Error ? error.message : "Salvataggio backend non riuscito.",
      );
    } finally {
      setSavingConnectionsSlotId((current) => (current === slotDraft.id ? null : current));
    }
  }

  async function saveSlotParameters() {
    if (!slotDraft || !profileDraft) return;

    try {
      const workingSlot = await ensureBackendSlot(slotDraft);
      if (workingSlot.id !== slotDraft.id) {
        setSlotDraft(workingSlot);
      }

      const profileName =
        profileDraft.name.trim() ||
        workingSlot.parametersProfile ||
        profiles[0]?.name ||
        "Profilo consigliato";
      const updatedProfile = {
        ...profileDraft,
        name: profileName,
        riskPerTrade: Number(profileDraft.riskPerTrade),
        maxDailyTrades: Number(profileDraft.maxDailyTrades),
        orphanTimeoutMs: Number(profileDraft.orphanTimeoutMs),
      };

      setProfiles((current) => {
        const exists = current.some((item) => item.name === profileName);
        if (exists) {
          return current.map((item) =>
            item.name === profileName ? updatedProfile : item,
          );
        }

        return [...current, { ...updatedProfile, id: `profile_${Date.now()}` }];
      });

      const payload = await apiRequest(`/slots/${workingSlot.id}/parameters`, {
        method: "POST",
        body: JSON.stringify({
          parametersProfile: profileName,
          hedgeBaseTarget:
            workingSlot.phase === "Fase 1"
              ? Number(workingSlot.hedgeBaseTarget || 1000)
              : Number(workingSlot.hedgeBaseTarget || workingSlot.target || 1000),
          brokerStartEquity: Number(workingSlot.brokerStartEquity || 0),
          riskPerTrade: updatedProfile.riskPerTrade,
          maxDailyTrades: updatedProfile.maxDailyTrades,
          orphanTimeoutMs: updatedProfile.orphanTimeoutMs,
        }),
      });
      await loadDashboardData(payload.slot.id);
      setNotifications((current) => [
        {
          id: `notice_${Date.now()}`,
          title: `Parametri salvati su ${workingSlot.slot}`,
          body: `Il profilo ${profileName} e stato applicato e resta salvato dopo refresh.`,
        },
        ...current,
      ]);
      closePanel();
    } catch (error) {
      console.error("[DeltaHedge] save parameters failed", error);
      pushNotification(
        "Errore salva parametri",
        error instanceof Error ? error.message : "Salvataggio backend non riuscito.",
      );
    }
  }

  async function saveActivation() {
    if (!slotDraft) return;

    try {
      const workingSlot = await ensureBackendSlot(slotDraft);
      if (workingSlot.id !== slotDraft.id) {
        setSlotDraft(workingSlot);
      }
      const missing = [];

      if (!hasPropConnection(workingSlot)) {
        missing.push("challenge prop");
      }

      if (!hasBrokerConnection(workingSlot)) {
        missing.push("broker");
      }

      if (!hasStrategyParameters(workingSlot)) {
        missing.push("parametri trading");
      }

      if (missing.length > 0) {
        setNotifications((current) => [
          {
            id: `notice_${Date.now()}`,
            title: `Impossibile attivare ${workingSlot.slot}`,
            body: `Completa prima: ${missing.join(", ")}.`,
          },
          ...current,
        ]);
        return;
      }

      const payload = await apiRequest(`/slots/${workingSlot.id}/activate`, {
        method: "POST",
        body: JSON.stringify({ phase: workingSlot.phase }),
      });
      await loadDashboardData(payload.slot.id);
      setNotifications((current) => [
        {
          id: `notice_${Date.now()}`,
          title: `${workingSlot.slot} attivato`,
          body: `La challenge ${workingSlot.challenge} e ora attiva e restera tale anche a browser chiuso.`,
        },
        ...current,
      ]);
      closePanel();
    } catch (error) {
      console.error("[DeltaHedge] activation failed", error);
      pushNotification(
        "Errore attivazione",
        error instanceof Error ? error.message : "Attivazione backend non riuscita.",
      );
    }
  }

  function saveSlotDetail() {
    if (!slotDraft) return;

    setSlots((current) =>
      current.map((item) =>
        item.id === slotDraft.id
          ? (() => {
              const updatedSlot = {
                ...item,
                ...slotDraft,
                propEquity: Number(slotDraft.propEquity),
                brokerEquity: Number(slotDraft.brokerEquity),
                target: Number(slotDraft.target),
                multiplier: Number(slotDraft.multiplier),
                cycleBalance: Number(slotDraft.cycleBalance),
                status: slotDraft.status,
                updatedAt: nowHourMinute(),
              };

              return {
                ...updatedSlot,
                challengeState: getPreparationState(updatedSlot),
              };
            })()
          : item,
      ),
    );
    closePanel();
  }

  function saveSubscription() {
    setSubscription({
      ...planDraft,
      slotsIncluded: Number(planDraft.slotsIncluded),
    });
    setNotifications((current) => [
      {
        id: `notice_${Date.now()}`,
        title: "Abbonamento aggiornato",
        body: `Il piano ${planDraft.planName} e stato salvato con ${planDraft.slotsIncluded} slot inclusi.`,
      },
      ...current,
    ]);
    closePanel();
  }

  function saveExport() {
    setNotifications((current) => [
      {
        id: `notice_${Date.now()}`,
        title: `Export ${panel.source ?? "dashboard"} richiesto`,
        body: `Scope ${exportDraft.scope.replaceAll("_", " ")} con opzioni personalizzate.`,
      },
      ...current,
    ]);
    closePanel();
  }

  async function toggleSlotPower(slotId) {
    const slot = slots.find((item) => item.id === slotId);
    if (!slot) return;

    setSelectedSlotId(slot.id);

    if (slot.challengeState === "ATTIVA") {
      try {
        await apiRequest(`/slots/${slot.id}/pause`, { method: "POST" });
        await loadDashboardData(slot.id);
        pushNotification(`${slot.slot} spento`, "Lo slot e stato fermato sul backend.");
      } catch (error) {
        console.error("[DeltaHedge] pause failed", error);
        pushNotification(
          "Errore pausa slot",
          error instanceof Error ? error.message : "Pausa backend non riuscita.",
        );
      }
      return;
    }

    if (!hasPropConnection(slot) || !hasBrokerConnection(slot)) {
      openSlotConnections(slot.id);
      return;
    }

    if (!hasStrategyParameters(slot)) {
      openSlotParameters(slot.id);
      return;
    }

    try {
      await apiRequest(`/slots/${slot.id}/activate`, {
        method: "POST",
        body: JSON.stringify({ phase: slot.phase }),
      });
      await loadDashboardData(slot.id);
      pushNotification(
        `${slot.slot} acceso`,
        `Lo slot ${slot.challenge} e stato portato online dal toggle rapido.`,
      );
    } catch (error) {
      console.error("[DeltaHedge] quick activation failed", error);
      pushNotification(
        "Errore attivazione rapida",
        error instanceof Error ? error.message : "Attivazione backend non riuscita.",
      );
    }
  }

  async function runSlotExecutionTest(slotId, manualTrade = null) {
    const slot = slots.find((item) => item.id === slotId);
    if (!slot) return;
    let resolvedSlotId = slot.id;
    let resolvedSlotName = slot.slot;

    try {
      const workingSlot = await ensureBackendSlot(slot);
      resolvedSlotId = workingSlot.id;
      resolvedSlotName = workingSlot.slot;

      console.log("[DeltaHedge] Test button clicked", {
        slotId: workingSlot.id,
        slot: workingSlot.slot,
        challenge: workingSlot.challenge,
        phase: workingSlot.phase,
      });

      setSlots((current) =>
        current.map((item) =>
          item.id === workingSlot.id
            ? {
                ...item,
                testLog: `Click ricevuto alle ${nowHourMinute()}`,
              }
            : item,
        ),
      );

      const missing = [];
      if (!hasPropConnection(workingSlot)) missing.push("challenge");
      if (!hasBrokerConnection(workingSlot)) missing.push("broker");
      if (!hasStrategyParameters(workingSlot)) missing.push("preset");

      if (missing.length > 0) {
        setNotifications((current) => [
          {
            id: `notice_${Date.now()}`,
            title: `Test non disponibile su ${workingSlot.slot}`,
            body: `Completa prima: ${missing.join(", ")}.`,
          },
          ...current,
        ]);
        return;
      }

      setTestingSlotId(slotId);
      setSlots((current) =>
        current.map((item) =>
          item.id === workingSlot.id
            ? {
                ...item,
                propConnectionState: hasPropConnection(item)
                  ? "connecting"
                  : item.propConnectionState,
                brokerConnectionState: hasBrokerConnection(item)
                  ? "connecting"
                  : item.brokerConnectionState,
                testLog: `Connection waiting... attendo conferma MetaApi dalle ${nowHourMinute()}`,
              }
            : item,
        ),
      );

      const connectionPayload = await waitForConnectedAccounts(workingSlot.id);
      updateSlotConnectionSnapshot(
        workingSlot.id,
        connectionPayload,
        `Connection successfully · stabilizzazione 15 secondi dalle ${nowHourMinute()}`,
      );
      await sleep(15000);
      const stabilizedConnectionPayload = await waitForConnectedAccounts(workingSlot.id);
      updateSlotConnectionSnapshot(
        workingSlot.id,
        stabilizedConnectionPayload,
        `Connection successfully · invio trade test alle ${nowHourMinute()}`,
      );
      const latestSlot =
        slotsRef.current.find((item) => item.id === workingSlot.id) ?? workingSlot;
      const tradeSymbol = (manualTrade?.symbol || "XAUUSD").trim().toUpperCase();
      const tradeDirection = manualTrade?.direction || "BUY";
      const tradePropLot = normaliseTradeTestPropLot(manualTrade?.propLot ?? 1);
      const payload = await apiRequest("/debug/test-execution", {
        method: "POST",
        body: JSON.stringify({
          slotId: workingSlot.id,
          challenge: latestSlot.challenge,
          phase: latestSlot.phase,
          hedgeBaseTarget: Number(
            latestSlot.hedgeBaseTarget || latestSlot.target || 0,
          ),
          symbol: tradeSymbol,
          direction: tradeDirection,
          propLot: tradePropLot,
          brokerLotStep: Number(latestSlot.brokerLotStep || 0.01),
          existingPropMetaApiAccountId:
            stabilizedConnectionPayload?.propMetaApiAccountId ||
            latestSlot.propMetaApiAccountId ||
            null,
          existingBrokerMetaApiAccountId:
            stabilizedConnectionPayload?.brokerMetaApiAccountId ||
            latestSlot.brokerMetaApiAccountId ||
            null,
          ...(latestSlot.propLogin || latestSlot.propPassword || latestSlot.propServer
            ? {
                prop: {
                  platform: latestSlot.propPlatform || "mt5",
                  login: latestSlot.propLogin,
                  password: latestSlot.propPassword,
                  server: latestSlot.propServer,
                },
              }
            : {}),
          ...(latestSlot.brokerLogin || latestSlot.brokerPassword || latestSlot.brokerServer
            ? {
                broker: {
                  accountName: latestSlot.brokerAccount,
                  platform: latestSlot.brokerPlatform || "mt5",
                  login: latestSlot.brokerLogin,
                  password: latestSlot.brokerPassword,
                  server: latestSlot.brokerServer,
                },
              }
            : {}),
        }),
      });

      const createdAt = nowHourMinute();
      const baseId = `live_${slot.id}_${Date.now()}`;

      setTradeLedger((current) => [
        {
          id: `${baseId}_prop`,
          slotId: workingSlot.id,
          accountType: "PROP",
          symbol: payload.symbol,
          lotSize: formatLotSize(payload.propLot),
          direction: payload.propDirection,
          realizedPnl: "Aperto",
          createdAt,
        },
        {
          id: `${baseId}_broker`,
          slotId: workingSlot.id,
          accountType: "BROKER",
          symbol: payload.symbol,
          lotSize: formatLotSize(payload.brokerLot),
          direction: payload.brokerDirection,
          realizedPnl: "Aperto",
          createdAt,
        },
        ...current,
      ]);

      setSlots((current) =>
        current.map((item) =>
          item.id === workingSlot.id
            ? {
                ...item,
                propMetaApiAccountId: payload.propMetaApiAccountId,
                brokerMetaApiAccountId: payload.brokerMetaApiAccountId,
                propConnectionState: "connected",
                brokerConnectionState: "connected",
                updatedAt: createdAt,
                testLog: `Connection successfully · trade inviato alle ${createdAt}`,
              }
            : item,
        ),
      );

      setNotifications((current) => [
        {
          id: `notice_${Date.now()}`,
          title: `Test reale eseguito · ${workingSlot.slot}`,
          body: `Aperti 2 market order su ${payload.symbol}: prop ${formatLotSize(payload.propLot)} ${payload.propDirection}, broker ${formatLotSize(payload.brokerLot)} ${payload.brokerDirection}.`,
        },
        ...current,
      ]);

      openSlotDetail(workingSlot.id);
    } catch (error) {
      setSlots((current) =>
        current.map((item) =>
          item.id === resolvedSlotId
            ? {
                ...item,
                testLog: `Errore test: ${
                  error instanceof Error
                    ? error.message
                    : "Impossibile eseguire il test"
                }`,
              }
            : item,
        ),
      );
      setNotifications((current) => [
        {
          id: `notice_${Date.now()}`,
          title: `Test fallito · ${resolvedSlotName}`,
          body:
            error instanceof Error
              ? error.message
              : "Impossibile eseguire il test con l'API locale.",
        },
        ...current,
      ]);
    } finally {
      setTestingSlotId((current) => (current === resolvedSlotId ? null : current));
    }
  }

  function renderDrawer() {
    if (panel.type === "add-slot" && slotDraft) {
      const propReadyAccounts = savedAccounts.filter(
        (account) => account.accountType === "PROP" && isSavedAccountReady(account),
      );
      const brokerReadyAccounts = savedAccounts.filter(
        (account) => account.accountType === "BROKER" && isSavedAccountReady(account),
      );
      const selectedPropAccount = propReadyAccounts.find(
        (account) => account.id === slotDraft.propSavedAccountId,
      );
      const selectedBrokerAccount = brokerReadyAccounts.find(
        (account) => account.id === slotDraft.brokerSavedAccountId,
      );
      const brokerStartEquity = getWizardBrokerStartEquity(
        slotDraft,
        selectedBrokerAccount,
      );
      const wizardSaveLabel =
        slotWizardStep === 1 ? "Continua" : slotWizardStep === 2 ? "Conferma conti" : "Crea coppia";
      const wizardFooterHint =
        slotWizardStep === 1
          ? "Step 1 di 3 · scegli fase e challenge."
          : slotWizardStep === 2
            ? "Step 2 di 3 · usa solo conti con pallino verde."
            : "Step 3 di 3 · conferma i parametri di trading.";
      return (
        <Drawer
          title="Nuova coppia"
          description="Wizard guidato: scegli la fase, aggancia due conti gia validati e conferma il setup iniziale."
          onClose={closePanel}
          onSave={advanceSlotWizard}
          onAuxAction={slotWizardStep > 1 ? () => setSlotWizardStep((current) => current - 1) : null}
          auxActionLabel={slotWizardStep > 1 ? "Indietro" : null}
          saveLabel={wizardSaveLabel}
          saveLoading={creatingSlotWizard}
          savePendingLabel="Creazione in corso..."
          footerHint={wizardFooterHint}
          saveDisabled={
            (slotWizardStep === 2 &&
              (!selectedPropAccount || !selectedBrokerAccount)) ||
            (slotWizardStep === 3 && !profileDraft)
          }
        >
          <div className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { step: 1, title: "Tipo conto" },
                { step: 2, title: "Selezione conti" },
                { step: 3, title: "Parametri trading" },
              ].map((item) => (
                <div
                  key={item.step}
                  className={`rounded-xl border px-4 py-3 text-sm transition ${
                    slotWizardStep === item.step
                      ? "border-primary/25 bg-primary/10 text-primary"
                      : "border-white/8 bg-white/[0.03] text-zinc-400"
                  }`}
                >
                  <div className="text-[11px] uppercase tracking-[0.14em]">
                    Step {item.step}
                  </div>
                  <div className="mt-2 font-medium">{item.title}</div>
                </div>
              ))}
            </div>

            {slotWizardError ? (
              <div className="flex items-start gap-3 rounded-[14px] border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                <CircleAlert className="mt-0.5 size-4 shrink-0 text-rose-300" />
                <div>
                  <div className="font-medium text-white">Creazione coppia non riuscita</div>
                  <div className="mt-1 leading-6 text-rose-100/90">{slotWizardError}</div>
                </div>
              </div>
            ) : null}

            <AnimatePresence mode="wait">
              {slotWizardStep === 1 ? (
                <motion.div
                  key="wizard-step-1"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="space-y-5"
                >
                  <Field label="Nome slot">
                    <input
                      className={inputClass}
                      value={slotDraft.slot}
                      onChange={(event) =>
                        setSlotDraft((current) => ({
                          ...current,
                          slot: event.target.value,
                        }))
                      }
                    />
                  </Field>

                  <Field label="Tipo di conto">
                    <OptionCardGroup
                      options={phaseOptions}
                      value={slotDraft.phase}
                      onChange={updateSlotWizardPhase}
                    />
                  </Field>

                  <Field label="Challenge prop">
                    <OptionCardGroup
                      options={challengeOptions}
                      value={slotDraft.challenge}
                      onChange={(nextValue) =>
                        setSlotDraft((current) => ({
                          ...current,
                          challenge: nextValue,
                        }))
                      }
                    />
                  </Field>
                </motion.div>
              ) : null}

              {slotWizardStep === 2 ? (
                <motion.div
                  key="wizard-step-2"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="space-y-5"
                >
                  <div className="rounded-[14px] border border-primary/10 bg-primary/5 px-4 py-3 text-sm text-zinc-300">
                    Scegli due conti gia verificati nella sezione <span className="font-medium text-white">Conti</span>.
                    Se non li vedi qui, prima salvali e attendi il pallino verde.
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    <div className="rounded-[16px] border border-white/8 bg-white/[0.03] p-4">
                      <div className="text-sm font-medium text-white">Conto Prop</div>
                      <div className="mt-4 space-y-3">
                        {propReadyAccounts.length === 0 ? (
                          <div className="rounded-xl border border-dashed border-white/10 px-4 py-5 text-sm text-zinc-500">
                            Nessun conto prop connesso. Salva e valida prima un conto dalla sezione Conti.
                          </div>
                        ) : (
                          propReadyAccounts.map((account) => {
                            const active = slotDraft.propSavedAccountId === account.id;
                            const statusMeta = getSavedAccountStatusMeta(account);

                            return (
                              <button
                                key={account.id}
                                type="button"
                                onClick={() => syncWizardSelectedAccount("prop", account.id)}
                                className={`w-full rounded-xl border px-4 py-4 text-left transition ${
                                  active
                                    ? "border-primary/25 bg-primary/10"
                                    : "border-white/8 bg-white/[0.03] hover:bg-white/[0.05]"
                                }`}
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    <div className="text-sm font-medium text-white">{account.label}</div>
                                    <div className="mt-1 text-xs text-zinc-500">
                                      {account.loginMasked} · {account.server}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                                    <span className={`size-2 rounded-full ${statusMeta.dotClass}`} />
                                    {statusMeta.label}
                                  </div>
                                </div>
                              </button>
                            );
                          })
                        )}
                      </div>
                    </div>

                    <div className="rounded-[16px] border border-white/8 bg-white/[0.03] p-4">
                      <div className="text-sm font-medium text-white">Conto Broker</div>
                      <div className="mt-4 space-y-3">
                        {brokerReadyAccounts.length === 0 ? (
                          <div className="rounded-xl border border-dashed border-white/10 px-4 py-5 text-sm text-zinc-500">
                            Nessun conto broker connesso. Salva e valida prima un conto dalla sezione Conti.
                          </div>
                        ) : (
                          brokerReadyAccounts.map((account) => {
                            const active = slotDraft.brokerSavedAccountId === account.id;
                            const statusMeta = getSavedAccountStatusMeta(account);

                            return (
                              <button
                                key={account.id}
                                type="button"
                                onClick={() => syncWizardSelectedAccount("broker", account.id)}
                                className={`w-full rounded-xl border px-4 py-4 text-left transition ${
                                  active
                                    ? "border-primary/25 bg-primary/10"
                                    : "border-white/8 bg-white/[0.03] hover:bg-white/[0.05]"
                                }`}
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    <div className="text-sm font-medium text-white">{account.label}</div>
                                    <div className="mt-1 text-xs text-zinc-500">
                                      {account.loginMasked} · {account.server}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                                    <span className={`size-2 rounded-full ${statusMeta.dotClass}`} />
                                    {statusMeta.label}
                                  </div>
                                </div>
                              </button>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : null}

              {slotWizardStep === 3 ? (
                <motion.div
                  key="wizard-step-3"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="space-y-5"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Target Hedge ($)">
                      <input
                        className={inputClass}
                        type="number"
                        value={slotDraft.hedgeBaseTarget}
                        onChange={(event) =>
                          setSlotDraft((current) => ({
                            ...current,
                            hedgeBaseTarget: Number(event.target.value || 0),
                            target: Number(event.target.value || 0),
                          }))
                        }
                      />
                    </Field>
                    <Field
                      label="Balance Broker inizio Challenge"
                      hint="Letto da MetaApi al primo aggancio"
                    >
                      <input
                        className={`${inputClass} cursor-not-allowed opacity-80`}
                        value={
                          brokerStartEquity > 0
                            ? formatCurrency(brokerStartEquity)
                            : "In attesa del primo aggancio"
                        }
                        readOnly
                      />
                    </Field>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <Field label="Risk per trade (%)">
                      <input
                        className={inputClass}
                        type="number"
                        step="0.1"
                        value={profileDraft?.riskPerTrade ?? slotDraft.riskPerTrade}
                        onChange={(event) =>
                          setProfileDraft((current) => ({
                            ...(current || {}),
                            name:
                              current?.name || getDefaultProfileNameForPhase(slotDraft.phase),
                            riskPerTrade: Number(event.target.value || 1.5),
                            maxDailyTrades: Number(
                              current?.maxDailyTrades ?? slotDraft.maxDailyTrades ?? 2,
                            ),
                            orphanTimeoutMs: Number(
                              current?.orphanTimeoutMs ?? slotDraft.orphanTimeoutMs ?? 1000,
                            ),
                          }))
                        }
                      />
                    </Field>
                    <Field label="Max daily trades">
                      <input
                        className={inputClass}
                        type="number"
                        min="1"
                        max="2"
                        value={profileDraft?.maxDailyTrades ?? slotDraft.maxDailyTrades}
                        onChange={(event) =>
                          setProfileDraft((current) => ({
                            ...(current || {}),
                            name:
                              current?.name || getDefaultProfileNameForPhase(slotDraft.phase),
                            riskPerTrade: Number(
                              current?.riskPerTrade ?? slotDraft.riskPerTrade ?? 1.5,
                            ),
                            maxDailyTrades: Number(event.target.value || 2),
                            orphanTimeoutMs: Number(
                              current?.orphanTimeoutMs ?? slotDraft.orphanTimeoutMs ?? 1000,
                            ),
                          }))
                        }
                      />
                    </Field>
                    <Field label="Orphan timeout (ms)">
                      <input
                        className={inputClass}
                        type="number"
                        step="100"
                        value={profileDraft?.orphanTimeoutMs ?? slotDraft.orphanTimeoutMs}
                        onChange={(event) =>
                          setProfileDraft((current) => ({
                            ...(current || {}),
                            name:
                              current?.name || getDefaultProfileNameForPhase(slotDraft.phase),
                            riskPerTrade: Number(
                              current?.riskPerTrade ?? slotDraft.riskPerTrade ?? 1.5,
                            ),
                            maxDailyTrades: Number(
                              current?.maxDailyTrades ?? slotDraft.maxDailyTrades ?? 2,
                            ),
                            orphanTimeoutMs: Number(event.target.value || 1000),
                          }))
                        }
                      />
                    </Field>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    <div className="rounded-[16px] border border-white/8 bg-white/[0.03] p-4 text-sm text-zinc-300">
                      <div className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                        Prop selezionato
                      </div>
                      <div className="mt-2 font-medium text-white">{selectedPropAccount?.label}</div>
                      <div className="mt-1">{selectedPropAccount?.loginMasked} · {selectedPropAccount?.server}</div>
                    </div>
                    <div className="rounded-[16px] border border-white/8 bg-white/[0.03] p-4 text-sm text-zinc-300">
                      <div className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                        Broker selezionato
                      </div>
                      <div className="mt-2 font-medium text-white">{selectedBrokerAccount?.label}</div>
                      <div className="mt-1">{selectedBrokerAccount?.loginMasked} · {selectedBrokerAccount?.server}</div>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </Drawer>
      );
    }

    if (panel.type === "slot-connections" && slotDraft) {
      const readiness = getMetaApiReadiness(slotDraft);
      const propSavedOptions = savedAccounts.filter(
        (account) => account.accountType === "PROP" && isSavedAccountReady(account),
      );
      const brokerSavedOptions = savedAccounts.filter(
        (account) => account.accountType === "BROKER" && isSavedAccountReady(account),
      );
      const selectedPropSavedAccount = propSavedOptions.find(
        (account) => account.id === slotDraft.propSavedAccountId,
      );
      const selectedBrokerSavedAccount = brokerSavedOptions.find(
        (account) => account.id === slotDraft.brokerSavedAccountId,
      );
      const propImportedReadOnly =
        Boolean(selectedPropSavedAccount) && !selectedPropSavedAccount?.isLocalOnly;
      const brokerImportedReadOnly =
        Boolean(selectedBrokerSavedAccount) && !selectedBrokerSavedAccount?.isLocalOnly;
      const displayedPropLogin =
        slotDraft.propLogin ||
        (propImportedReadOnly ? selectedPropSavedAccount?.loginMasked || "" : "");
      const displayedPropServer =
        slotDraft.propServer ||
        (propImportedReadOnly ? selectedPropSavedAccount?.server || "" : "");
      const displayedBrokerLogin =
        slotDraft.brokerLogin ||
        (brokerImportedReadOnly ? selectedBrokerSavedAccount?.loginMasked || "" : "");
      const displayedBrokerServer =
        slotDraft.brokerServer ||
        (brokerImportedReadOnly ? selectedBrokerSavedAccount?.server || "" : "");
      const readinessClass =
        readiness.tone === "ready"
          ? "border-primary/20 bg-primary/10 text-primary"
          : readiness.tone === "partial"
            ? "border-amber-500/20 bg-amber-500/10 text-amber-300"
            : "border-primary/20 bg-primary/10 text-primary";

      return (
        <Drawer
          title={`Collega conti · ${slotDraft.slot}`}
          description="Qui scegli solo conti gia validati nella sezione Conti. La connessione MetaApi non si fa piu dentro lo slot."
          onClose={closePanel}
          onSave={saveSlotConnections}
          saveLabel="Salva connessioni"
          saveDisabled={savingConnectionsSlotId === slotDraft.id}
          savePendingLabel="Connessione in corso..."
          maxWidthClass="max-w-[840px]"
        >
          <div className="space-y-5">
            <div className={`rounded-xl border px-4 py-3 text-sm ${readinessClass}`}>
              {readiness.label}
            </div>

            <div className="rounded-[14px] border border-primary/10 bg-primary/5 px-4 py-3 text-sm text-zinc-300">
              Prima validi i conti in <span className="font-medium text-white">Conti</span>, poi li assegni allo slot da qui.
              Dentro questo pannello puoi usare solo conti con <span className="font-medium text-white">pallino verde</span>.
            </div>

            <div className="rounded-[16px] border border-white/8 bg-white/[0.03] p-4">
              <div className="mx-auto max-w-[620px]">
                <div className="text-center text-sm font-medium text-white">Challenge size</div>
                <div className="mt-4">
                  <OptionCardGroup
                    options={challengeOptions}
                    value={slotDraft.challenge}
                    onChange={(nextValue) =>
                      setSlotDraft((current) => ({
                        ...current,
                        challenge: nextValue,
                      }))
                    }
                    columns="md:grid-cols-3"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              <div className="rounded-[16px] border border-white/8 bg-white/[0.03] p-4">
              <div className="text-sm font-medium text-white">Challenge prop</div>
                <div className="mt-4 grid gap-4">
                  <Field label="Importa conto salvato">
                    <select
                      className={inputClass}
                      value={slotDraft.propSavedAccountId || ""}
                      onChange={(event) =>
                        applySavedAccountToSlot("prop", event.target.value)
                      }
                    >
                      <option value="">Inserisci manualmente</option>
                      {propSavedOptions.map((account) => (
                        <option key={account.id} value={account.id}>
                          {account.label} · {account.loginMasked} · {account.server}
                        </option>
                      ))}
                    </select>
                  </Field>
                  {selectedPropSavedAccount ? (
                    <div className="rounded-lg border border-primary/16 bg-primary/8 px-3 py-3 text-sm text-zinc-300">
                      Importato:{" "}
                      <span className="font-medium text-white">
                        {selectedPropSavedAccount.label}
                      </span>
                      {" · "}
                      {selectedPropSavedAccount.loginMasked}
                      {" · "}
                      {selectedPropSavedAccount.server}
                    </div>
                  ) : null}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-white/8 bg-white/[0.03] px-3 py-3 text-sm">
                      <div className="text-xs uppercase tracking-[0.12em] text-zinc-500">Piattaforma</div>
                      <div className="mt-2 text-white">{String(slotDraft.propPlatform || "mt5").toUpperCase()}</div>
                    </div>
                    <div className="rounded-lg border border-white/8 bg-white/[0.03] px-3 py-3 text-sm">
                      <div className="text-xs uppercase tracking-[0.12em] text-zinc-500">Stato connessione</div>
                      <div className="mt-2 flex items-center gap-2 text-white">
                        <span className={`size-2 rounded-full ${selectedPropSavedAccount ? getSavedAccountStatusMeta(selectedPropSavedAccount).dotClass : "bg-zinc-500"}`} />
                        {selectedPropSavedAccount ? getSavedAccountStatusMeta(selectedPropSavedAccount).label : "Non selezionato"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[16px] border border-white/8 bg-white/[0.03] p-4">
              <div className="text-sm font-medium text-white">Broker</div>
                <div className="mt-4 grid gap-4">
                  <Field label="Importa conto salvato">
                    <select
                      className={inputClass}
                      value={slotDraft.brokerSavedAccountId || ""}
                      onChange={(event) =>
                        applySavedAccountToSlot("broker", event.target.value)
                      }
                    >
                      <option value="">Inserisci manualmente</option>
                      {brokerSavedOptions.map((account) => (
                        <option key={account.id} value={account.id}>
                          {account.label} · {account.loginMasked} · {account.server}
                        </option>
                      ))}
                    </select>
                  </Field>
                  {selectedBrokerSavedAccount ? (
                    <div className="rounded-lg border border-primary/16 bg-primary/8 px-3 py-3 text-sm text-zinc-300">
                      Importato:{" "}
                      <span className="font-medium text-white">
                        {selectedBrokerSavedAccount.label}
                      </span>
                      {" · "}
                      {selectedBrokerSavedAccount.loginMasked}
                      {" · "}
                      {selectedBrokerSavedAccount.server}
                    </div>
                  ) : null}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-white/8 bg-white/[0.03] px-3 py-3 text-sm">
                      <div className="text-xs uppercase tracking-[0.12em] text-zinc-500">Piattaforma</div>
                      <div className="mt-2 text-white">{String(slotDraft.brokerPlatform || "mt5").toUpperCase()}</div>
                    </div>
                    <div className="rounded-lg border border-white/8 bg-white/[0.03] px-3 py-3 text-sm">
                      <div className="text-xs uppercase tracking-[0.12em] text-zinc-500">Stato connessione</div>
                      <div className="mt-2 flex items-center gap-2 text-white">
                        <span className={`size-2 rounded-full ${selectedBrokerSavedAccount ? getSavedAccountStatusMeta(selectedBrokerSavedAccount).dotClass : "bg-zinc-500"}`} />
                        {selectedBrokerSavedAccount ? getSavedAccountStatusMeta(selectedBrokerSavedAccount).label : "Non selezionato"}
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-white/8 bg-white/[0.03] px-3 py-3 text-sm text-zinc-300">
                    <div className="text-xs uppercase tracking-[0.12em] text-zinc-500">Balance iniziale broker</div>
                    <div className="mt-2 text-white">
                      {selectedBrokerSavedAccount
                        ? formatLiveCurrencyValue(
                            selectedBrokerSavedAccount.equity ??
                              selectedBrokerSavedAccount.balance,
                            "In attesa",
                          )
                        : "Seleziona un conto broker"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Drawer>
      );
    }

    if (panel.type === "saved-account" && savedAccountDraft) {
      const missingFields = getSavedAccountMissingFields(savedAccountDraft);
      return (
        <Drawer
          title="Salva conto"
          description="Qui il conto viene validato subito con MetaApi. Se la connessione riesce, comparirà con pallino verde nella sezione Conti."
          onClose={closePanel}
          onSave={saveSavedAccount}
          saveLabel="Salva conto"
          saveLoading={savingSavedAccountType === savedAccountDraft.accountType}
          saveDisabled={missingFields.length > 0}
          savePendingLabel="Validazione in corso..."
          footerHint={
            missingFields.length > 0
              ? `Completa prima: ${missingFields.join(", ")}.`
              : "Il conto verra salvato, validato e reso disponibile per gli slot."
          }
          maxWidthClass="max-w-[720px]"
        >
          <div className="space-y-5">
            <Field label="Tipo conto">
              <OptionCardGroup
                options={[
                  {
                    value: "PROP",
                    title: "Prop",
                    description: "Challenge o funded account",
                  },
                  {
                    value: "BROKER",
                    title: "Broker",
                    description: "Conto hedge broker",
                  },
                ]}
                value={savedAccountDraft.accountType}
                onChange={(nextValue) =>
                  setSavedAccountDraft((current) => ({
                    ...current,
                    accountType: nextValue,
                    accountName:
                      nextValue === "BROKER"
                        ? current?.accountName || ""
                        : "FundingPips Prop",
                    lotStep:
                      nextValue === "BROKER"
                        ? Number(current?.lotStep || 0.01)
                        : 0.01,
                  }))
                }
                columns="grid-cols-2"
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Etichetta interna">
                <input
                  className={inputClass}
                  value={savedAccountDraft.label}
                  placeholder="Es. FP 100K Demo 01"
                  onChange={(event) =>
                    setSavedAccountDraft((current) => ({
                      ...current,
                      label: event.target.value,
                    }))
                  }
                />
              </Field>
              <Field label="Piattaforma">
                <OptionCardGroup
                  options={platformOptions}
                  value={savedAccountDraft.platform}
                  onChange={(nextValue) =>
                    setSavedAccountDraft((current) => ({
                      ...current,
                      platform: nextValue,
                    }))
                  }
                  columns="grid-cols-2"
                />
              </Field>
            </div>

            {savedAccountDraft.accountType === "BROKER" ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nome broker">
                  <input
                    className={inputClass}
                    value={savedAccountDraft.accountName}
                    placeholder="Es. IC Markets Demo"
                    onChange={(event) =>
                      setSavedAccountDraft((current) => ({
                        ...current,
                        accountName: event.target.value,
                      }))
                    }
                  />
                </Field>
                <Field label="Lot step broker">
                  <input
                    className={inputClass}
                    type="number"
                    step="0.01"
                    value={savedAccountDraft.lotStep}
                    onChange={(event) =>
                      setSavedAccountDraft((current) => ({
                        ...current,
                        lotStep: Number(event.target.value || 0.01),
                      }))
                    }
                  />
                </Field>
              </div>
            ) : null}

            <Field label="Login">
              <input
                className={inputClass}
                value={savedAccountDraft.login}
                onChange={(event) =>
                  setSavedAccountDraft((current) => ({
                    ...current,
                    login: event.target.value,
                  }))
                }
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Password">
                <input
                  className={inputClass}
                  type="password"
                  value={savedAccountDraft.password}
                  onChange={(event) =>
                    setSavedAccountDraft((current) => ({
                      ...current,
                      password: event.target.value,
                    }))
                  }
                />
              </Field>
              <Field label="Server">
                <input
                  className={inputClass}
                  value={savedAccountDraft.server}
                  onChange={(event) =>
                    setSavedAccountDraft((current) => ({
                      ...current,
                      server: event.target.value,
                    }))
                  }
                />
              </Field>
            </div>
          </div>
        </Drawer>
      );
    }

    if (panel.type === "slot-parameters" && slotDraft && profileDraft) {
      const brokerGuardrail = calculateBrokerLossGuardrail(
        slotDraft.brokerStartEquity,
      );
      const challengeFee = getChallengeFee(slotDraft.challenge);
      const phase1PassLoss = calculatePhase1PassLoss(slotDraft.hedgeBaseTarget);
      const phase2PassLoss = calculatePhase2PassLoss(
        slotDraft.hedgeBaseTarget,
        challengeFee,
      );
      const phase2RecoveryTarget = calculatePhase2RecoveryTarget(
        slotDraft.hedgeBaseTarget,
        challengeFee,
      );
      const cycleProjection = buildCycleProjection(slotDraft);
      const phaseChecks = [
        {
          label: "Perdita se passi Fase 1",
          value: phase1PassLoss,
          withinLimit: phase1PassLoss <= brokerGuardrail,
        },
        {
          label: "Perdita se passi Fase 2",
          value: phase2PassLoss,
          withinLimit: phase2PassLoss <= brokerGuardrail,
        },
      ];

      return (
        <Drawer
          title={`Parametri trading · ${slotDraft.slot}`}
          description="Applica il preset consigliato. Le opzioni avanzate qui sotto sono facoltative."
          onClose={closePanel}
          onSave={saveSlotParameters}
          saveLabel="Salva parametri"
        >
          <div className="space-y-5">
            <div className="rounded-[14px] border border-primary/10 bg-primary/5 p-4 text-sm text-zinc-300">
              <div className="mb-2 text-sm font-medium text-white">
                Fee challenge: {formatCurrency(challengeFee)}
              </div>
              Se non vuoi toccare nulla, lascia il preset consigliato e premi solo
              <span className="font-medium text-white"> Salva parametri</span>.
            </div>
            <Field label="Nome profilo">
              <input
                className={inputClass}
                value={profileDraft.name}
                onChange={(event) =>
                  setProfileDraft((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Valore broker a inizio challenge ($)"
                hint="Letto da MetaApi al primo aggancio"
              >
                <input
                  className={`${inputClass} cursor-not-allowed opacity-80`}
                  type="text"
                  value={
                    Number(slotDraft.brokerStartEquity || 0) > 0
                      ? formatCurrency(Number(slotDraft.brokerStartEquity))
                      : "In attesa del primo aggancio"
                  }
                  readOnly
                />
              </Field>
              <Field
                label="Target hedge base Fase 1 ($)"
                hint="Usato per stimare Fase 1 e Fase 2"
              >
                <input
                  className={inputClass}
                  type="number"
                  value={slotDraft.hedgeBaseTarget}
                  onChange={(event) =>
                    setSlotDraft((current) => ({
                      ...current,
                      hedgeBaseTarget: Number(event.target.value),
                    }))
                  }
                />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Rischio per trade (%)">
                <input
                  className={inputClass}
                  type="number"
                  step="0.1"
                  value={profileDraft.riskPerTrade}
                  onChange={(event) =>
                    setProfileDraft((current) => ({
                      ...current,
                      riskPerTrade: Number(event.target.value),
                    }))
                  }
                />
              </Field>
              <Field label="Trade massimi al giorno">
                <input
                  className={inputClass}
                  type="number"
                  value={profileDraft.maxDailyTrades}
                  onChange={(event) =>
                    setProfileDraft((current) => ({
                      ...current,
                      maxDailyTrades: Number(event.target.value),
                    }))
                  }
                />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Timeout orphan (ms)">
                <input
                  className={inputClass}
                  type="number"
                  value={profileDraft.orphanTimeoutMs}
                  onChange={(event) =>
                    setProfileDraft((current) => ({
                      ...current,
                      orphanTimeoutMs: Number(event.target.value),
                    }))
                  }
                />
              </Field>
              <div className="rounded-lg border border-border/80 bg-muted/20 px-4 py-3">
                <div className="text-sm font-medium text-foreground">
                  Filtro news sul funded
                </div>
                <div className="mt-1 text-sm leading-6 text-muted-foreground">
                  Non e configurabile dall'utente. Sul funded bloccheremo in automatico il trading durante news ad alto impatto.
                </div>
              </div>
            </div>
            <div className="rounded-[14px] border border-primary/10 bg-primary/5 p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
                  <CircleAlert className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-white">
                    Suggerimento guardrail hedging
                  </div>
                  <div className="mt-1 text-sm leading-6 text-zinc-400">
                    La perdita stimata se passi Fase 1 o Fase 2 non dovrebbe
                    superare il 30% del valore broker a inizio challenge.
                  </div>
                  <div className="mt-3 text-xs text-zinc-500">
                    Fase 2 = (perdita Fase 1 + fee challenge) + 20%
                    <span className="mx-2 text-zinc-700">·</span>
                    target stimato {formatCurrency(phase2RecoveryTarget)}
                  </div>
                  <div className="mt-4 rounded-lg border border-white/8 bg-white/[0.03] px-3 py-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500">
                        Limite consigliato broker
                      </span>
                      <span className="font-semibold text-white">
                        {formatCurrency(brokerGuardrail)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {phaseChecks.map((check) => (
                      <div
                        key={check.label}
                        className={`rounded-lg border px-3 py-3 text-sm ${
                          check.withinLimit
                            ? "border-primary/16 bg-primary/8"
                            : "border-amber-500/20 bg-amber-500/10"
                        }`}
                      >
                        <div className="text-zinc-400">{check.label}</div>
                        <div className="mt-1 text-lg font-semibold text-white">
                          {formatCurrency(check.value)}
                        </div>
                        <div
                          className={`mt-2 text-xs font-medium ${
                            check.withinLimit
                              ? "text-primary"
                              : "text-amber-300"
                          }`}
                        >
                          {check.withinLimit
                            ? "Dentro il 30% del broker iniziale"
                            : "Supera il 30% del broker iniziale"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-[14px] border border-white/8 bg-white/[0.03] p-4">
              <div className="text-sm font-medium text-white">
                Proiezione ciclo
              </div>
              <div className="mt-1 text-sm leading-6 text-zinc-400">
                Simulazione lineare del broker partendo da {formatCurrency(cycleProjection.brokerInitialEquity)}.
              </div>
              <div className="mt-4 grid gap-3">
                <div className="rounded-lg border border-white/8 bg-white/[0.03] px-4 py-3">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-medium text-white">
                        Se passi Fase 1
                      </div>
                      <div className="mt-1 text-xs text-zinc-500">
                        Broker iniziale - perdita Fase 1
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-rose-300">
                        - {formatCurrency(cycleProjection.phase1PassLoss)}
                      </div>
                      <div className="mt-1 text-base font-semibold text-white">
                        {formatCurrency(cycleProjection.brokerAfterPhase1Pass)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-white/8 bg-white/[0.03] px-4 py-3">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-medium text-white">
                        Se passi Fase 2
                      </div>
                      <div className="mt-1 text-xs text-zinc-500">
                        Saldo iniziale Fase 2 - perdita per passare Fase 2
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-zinc-500">
                        Target Fase 2 {formatCurrency(cycleProjection.phase2RecoveryTarget)}
                      </div>
                      <div className="mt-1 text-sm text-rose-300">
                        - {formatCurrency(cycleProjection.phase2PassLoss)}
                      </div>
                      <div className="mt-1 text-base font-semibold text-white">
                        {formatCurrency(cycleProjection.brokerAfterPhase2Pass)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-white/8 bg-white/[0.03] px-4 py-3">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-medium text-white">
                        Se fallisci il Funded
                      </div>
                      <div className="mt-1 text-xs text-zinc-500">
                        Saldo dopo Fase 2 + recupero funded fail
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-primary">
                        + {formatCurrency(cycleProjection.fundedFailGain)}
                      </div>
                      <div className="mt-1 text-base font-semibold text-white">
                        {formatCurrency(cycleProjection.brokerAfterFundedFail)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-primary/12 bg-primary/5 px-4 py-3">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-medium text-white">
                        Se arrivi a payout
                      </div>
                      <div className="mt-1 text-xs text-zinc-500">
                        Il broker viene liquidato e il funded torna tradabile a break even
                      </div>
                      <div className="mt-1 text-xs text-zinc-500">
                        Rapporto funded: 1000 prop = 400 broker
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-primary">
                        Lordo {formatCurrency(cycleProjection.fundedGrossPayout)}
                      </div>
                      <div className="mt-1 text-base font-semibold text-white">
                        Broker finale {formatCurrency(cycleProjection.brokerAfterPayout)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Drawer>
      );
    }

    if (panel.type === "activate-slot" && slotDraft) {
      const liveSlot = slots.find((item) => item.id === slotDraft.id) ?? slotDraft;
      const activationChecklist = [
        {
          label: "Challenge collegata",
          done: hasPropConnection(liveSlot),
        },
        {
          label: "Broker collegato",
          done: hasBrokerConnection(liveSlot),
        },
        {
          label: "Parametri applicati",
          done: hasStrategyParameters(liveSlot),
        },
      ];

      return (
        <Drawer
          title={`Attiva challenge · ${slotDraft.slot}`}
          description="Completa gli ultimi passaggi e porta lo slot online."
          onClose={closePanel}
          onSave={saveActivation}
          saveLabel={slotDraft.challengeState === "ATTIVA" ? "Aggiorna stato" : "Attiva ora"}
        >
          <div className="space-y-5">
            <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
              <div className="text-sm text-zinc-500">
                Challenge
              </div>
              <div className="mt-1 text-lg font-semibold text-white">
                {liveSlot.challenge}
              </div>
              <div className="mt-1 text-sm text-zinc-500">
                Broker collegato: {liveSlot.brokerAccount || "Non collegato"}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {activationChecklist.map((item) => (
                  <Badge
                    key={item.label}
                    className={
                      item.done
                        ? "border-primary/20 bg-primary/10 text-primary hover:bg-primary/10"
                        : "border-amber-500/20 bg-amber-500/10 text-amber-300 hover:bg-amber-500/10"
                    }
                  >
                    {item.label}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-400">
              Prima dell'attivazione servono entrambe le connessioni complete. Se manca qualcosa, salva i conti e riprova.
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Fase attuale">
                <OptionCardGroup
                  options={phaseOptions}
                  value={slotDraft.phase}
                  onChange={(nextValue) =>
                    setSlotDraft((current) => ({
                      ...current,
                      phase: nextValue,
                    }))
                  }
                  columns="grid-cols-1"
                />
              </Field>
              <Field label="Stato MetaApi">
                <div className="flex h-11 items-center rounded-lg border border-white/10 bg-[#0d1120] px-3 text-sm text-zinc-300">
                  {getMetaApiReadiness(liveSlot).label}
                </div>
              </Field>
            </div>
            <Field label="Posizione ciclo" hint="Calcolata live dal PnL non realizzato del conto prop">
              <div className="flex h-11 items-center justify-between rounded-lg border border-white/10 bg-[#0d1120] px-3 text-sm">
                <span className="text-zinc-400">Stato attuale</span>
                <span className="font-medium text-zinc-200">{getCycleBalanceLabel(liveSlot)}</span>
              </div>
            </Field>
            <CycleBalanceBar value={getDynamicCycleBalance(liveSlot)} />
            <Button
              type="button"
              variant="outline"
              className={`w-full ${secondaryButtonClass}`}
              onClick={() => openSlotConnections(slotDraft.id)}
            >
              Collega o modifica i conti
            </Button>
          </div>
        </Drawer>
      );
    }

    if (panel.type === "trade-test" && slotDraft && tradeTestDraft) {
      const liveSlot = slots.find((item) => item.id === slotDraft.id) ?? slotDraft;
      const projectedBrokerLot = roundBrokerLotUp(
        tradeTestDraft.propLot,
        getEffectiveMultiplier(liveSlot),
        Number(liveSlot.brokerLotStep || 0.01),
      );
      const propConnectionState = getSlotSideConnectionState(liveSlot, "prop");
      const brokerConnectionState = getSlotSideConnectionState(liveSlot, "broker");

      return (
        <Drawer
          title={`Trade test · ${liveSlot.slot}`}
          description="Scegli manualmente direzione e lotto prop. DeltaHedge aspetta che entrambi i conti siano connessi, aspetta altri 15 secondi e poi invia i due ordini hedge."
          onClose={closePanel}
          onSave={() => runSlotExecutionTest(liveSlot.id, tradeTestDraft)}
          saveLabel={testingSlotId === liveSlot.id ? "Trade in corso..." : "Esegui trade test"}
          maxWidthClass="max-w-[760px]"
        >
          <div className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  label: "Challenge",
                  state: propConnectionState,
                  detail:
                    propConnectionState === "connected"
                      ? "Confermata da MetaApi"
                      : propConnectionState === "connecting"
                        ? "In attesa di conferma"
                        : "Non collegata",
                },
                {
                  label: "Broker",
                  state: brokerConnectionState,
                  detail:
                    brokerConnectionState === "connected"
                      ? "Confermato da MetaApi"
                      : brokerConnectionState === "connecting"
                        ? "In attesa di conferma"
                        : "Non collegato",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[14px] border border-white/8 bg-white/[0.03] px-4 py-4"
                >
                  <div className="flex items-center gap-2 text-sm font-medium text-white">
                    <span className={`size-2 rounded-full ${getConnectionDotClass(item.state)}`} />
                    {item.label}
                  </div>
                  <div className="mt-2 text-sm text-zinc-400">{item.detail}</div>
                </div>
              ))}
            </div>

            {liveSlot.testLog ? (
              <div className="rounded-[14px] border border-white/8 bg-white/[0.03] px-4 py-4 text-sm text-zinc-300">
                {liveSlot.testLog}
              </div>
            ) : null}

            <Field label="Symbol">
              <input
                className={inputClass}
                value={tradeTestDraft.symbol}
                onChange={(event) =>
                  setTradeTestDraft((current) => ({
                    ...current,
                    symbol: event.target.value.toUpperCase(),
                  }))
                }
              />
            </Field>

            <Field label="Direzione prop">
              <OptionCardGroup
                options={[
                  {
                    value: "BUY",
                    title: "BUY",
                    description: "Broker aprirà SELL",
                  },
                  {
                    value: "SELL",
                    title: "SELL",
                    description: "Broker aprirà BUY",
                  },
                ]}
                value={tradeTestDraft.direction}
                onChange={(nextValue) =>
                  setTradeTestDraft((current) => ({
                    ...current,
                    direction: nextValue,
                  }))
                }
                columns="grid-cols-2"
              />
            </Field>

            <Field
              label="Lotto prop"
              hint="Range reale test: da 0.80 a 2.00 lotti prop"
            >
              <input
                className={inputClass}
                type="number"
                min="0.80"
                max="2.00"
                step="0.01"
                value={tradeTestDraft.propLot}
                onChange={(event) =>
                  setTradeTestDraft((current) => ({
                    ...current,
                    propLot: normaliseTradeTestPropLot(event.target.value),
                  }))
                }
              />
            </Field>

            <div>
              <div className="mb-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                Lotti rapidi reali
              </div>
              <OptionCardGroup
                options={tradeTestLotOptions}
                value={tradeTestDraft.propLot}
                onChange={(nextValue) =>
                  setTradeTestDraft((current) => ({
                    ...current,
                    propLot: normaliseTradeTestPropLot(nextValue),
                  }))
                }
                columns="grid-cols-2 sm:grid-cols-4"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[14px] border border-white/8 bg-white/[0.03] px-4 py-4">
                <div className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                  Fase
                </div>
                <div className="mt-2 text-base font-semibold text-white">{liveSlot.phase}</div>
              </div>
              <div className="rounded-[14px] border border-white/8 bg-white/[0.03] px-4 py-4">
                <div className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                  Lotto broker
                </div>
                <div className="mt-2 text-base font-semibold text-white">
                  {formatLotSize(projectedBrokerLot)}
                </div>
                <div className="mt-1 text-xs text-zinc-500">
                  Calcolato sul moltiplicatore reale della fase
                </div>
              </div>
              <div className="rounded-[14px] border border-white/8 bg-white/[0.03] px-4 py-4">
                <div className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                  Direzione broker
                </div>
                <div className="mt-2 text-base font-semibold text-white">
                  {getOppositeDirection(tradeTestDraft.direction)}
                </div>
              </div>
            </div>

            <div className="rounded-[14px] border border-primary/10 bg-primary/5 px-4 py-4 text-sm text-zinc-300">
              Quando premi <span className="font-medium text-white">Esegui trade test</span>,
              DeltaHedge aspetta che entrambi i conti risultino verdi, aspetta altri 15 secondi
              di stabilizzazione e solo dopo invia il trade su entrambi i lati.
            </div>
          </div>
        </Drawer>
      );
    }

    if (panel.type === "slot-detail" && slotDraft) {
      const slotTrades = tradeLedger.filter((trade) => trade.slotId === slotDraft.id);
      const propTrades = slotTrades.filter((trade) => trade.accountType === "PROP");
      const brokerTrades = slotTrades.filter((trade) => trade.accountType === "BROKER");
      const slotReadiness = getMetaApiReadiness(slotDraft);
      const slotConnectionRows = [
        {
          label: "Challenge prop",
          value: hasPropConnection(slotDraft)
            ? `${getDisplayedMaskedLogin(slotDraft, "prop")} · ${getDisplayedServerHint(slotDraft, "prop")}`
            : "Da collegare",
          tone: hasPropConnection(slotDraft) ? "text-primary" : "text-zinc-400",
        },
        {
          label: "Broker",
          value: hasBrokerConnection(slotDraft)
            ? `${slotDraft.brokerAccount || "Broker"} · ${getDisplayedServerHint(slotDraft, "broker")}`
            : "Da collegare",
          tone: hasBrokerConnection(slotDraft) ? "text-primary" : "text-zinc-400",
        },
        {
          label: "Preset",
          value: hasStrategyParameters(slotDraft)
            ? slotDraft.parametersProfile
            : "Non ancora salvato",
          tone: hasStrategyParameters(slotDraft) ? "text-primary" : "text-zinc-400",
        },
      ];

      return (
        <Drawer
          title={`Dettaglio slot · ${slotDraft.slot}`}
          description="Vista slot: stato corrente, trade eseguiti e monitoraggio live di equity e unrealized PnL."
          onClose={closePanel}
          maxWidthClass="max-w-[1180px]"
        >
          <div className="space-y-5">
            <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-[16px] border border-white/8 bg-white/[0.04] p-5 shadow-[0_24px_54px_rgba(0,0,0,0.26),inset_0_1px_0_rgba(255,255,255,0.03)]">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-[12px] bg-primary/12 text-primary">
                      <FundingPipsLogo className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                        Slot operativo
                      </div>
                      <div className="mt-1 text-2xl font-semibold text-white">
                        {slotDraft.challenge}
                      </div>
                      <div className="mt-1 text-sm text-zinc-400">
                        Broker collegato: {slotDraft.brokerAccount || "Da collegare"}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <ChallengeStateBadge value={slotDraft.challengeState} />
                    <StatusBadge value={slotDraft.status} />
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[12px] border border-white/8 bg-white/[0.03] px-4 py-3">
                    <div className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                      Fase corrente
                    </div>
                    <div className="mt-2 text-base font-semibold text-white">{slotDraft.phase}</div>
                  </div>
                  <div className="rounded-[12px] border border-white/8 bg-white/[0.03] px-4 py-3">
                    <div className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                      Target hedge
                    </div>
                    <div className="mt-2 text-base font-semibold text-white">
                      {formatCurrency(getEffectiveCycleTarget(slotDraft))}
                    </div>
                  </div>
                  <div className="rounded-[12px] border border-white/8 bg-white/[0.03] px-4 py-3">
                    <div className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                      Moltiplicatore
                    </div>
                    <div className="mt-2 text-base font-semibold text-white">
                      {formatMultiplier(getEffectiveMultiplier(slotDraft))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-[14px] border border-white/8 bg-white/[0.03] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-medium text-white">Posizione ciclo</div>
                      <div className="mt-1 text-sm text-zinc-500">
                        Indicatore di avanzamento tra fallimento e pass della challenge.
                      </div>
                    </div>
                    <div className="text-sm font-medium text-zinc-300">
                      {getCycleBalanceLabel(slotDraft)}
                    </div>
                  </div>
                  <div className="mt-4">
                    <CycleBalanceBar value={getDynamicCycleBalance(slotDraft)} />
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className={secondaryButtonClass}
                    onClick={() => openTradeTest(slotDraft.id)}
                    disabled={testingSlotId === slotDraft.id}
                  >
                    {testingSlotId === slotDraft.id ? "Trade in corso..." : "Trade test"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className={secondaryButtonClass}
                    onClick={() => openSlotConnections(slotDraft.id)}
                  >
                    Modifica conti
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className={secondaryButtonClass}
                    onClick={() => openSlotParameters(slotDraft.id)}
                  >
                    Modifica preset
                  </Button>
                </div>
              </div>

              <div className="grid gap-5">
                <div className="rounded-[16px] border border-white/8 bg-white/[0.03] p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-medium text-white">Monitor live</div>
                      <div className="mt-1 text-sm text-zinc-500">
                        Equity e unrealized PnL di prop e broker aggiornati dal monitor MetaApi.
                      </div>
                    </div>
                    <Badge className="border-primary/20 bg-primary/10 text-primary hover:bg-primary/10">
                      {slotReadiness.label}
                    </Badge>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[12px] border border-white/8 bg-white/[0.03] px-4 py-4">
                      <div className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                        Equity prop
                      </div>
                      <div className="mt-2 text-lg font-semibold text-white">
                        {formatLiveCurrencyValue(slotDraft.propEquity)}
                      </div>
                      <div className="mt-2 text-sm text-zinc-500">
                        Challenge aggiornata direttamente da MetaApi.
                      </div>
                    </div>
                    <div className="rounded-[12px] border border-white/8 bg-white/[0.03] px-4 py-4">
                      <div className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                        Equity broker
                      </div>
                      <div className="mt-2 text-lg font-semibold text-white">
                        {formatLiveCurrencyValue(slotDraft.brokerEquity)}
                      </div>
                      <div className="mt-2 text-sm text-zinc-500">
                        Equity del lato broker separata dalla prop.
                      </div>
                    </div>
                    <div className="rounded-[12px] border border-white/8 bg-white/[0.03] px-4 py-4">
                      <div className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                        Unrealized PnL prop
                      </div>
                      <div
                        className={`mt-2 text-lg font-semibold ${getLivePnlToneClass(
                          slotDraft.propUnrealizedPnl,
                        )}`}
                      >
                        {formatLiveSignedCurrencyValue(slotDraft.propUnrealizedPnl)}
                      </div>
                      <div className="mt-2 text-sm text-zinc-500">
                        Derivato da equity - balance sul conto challenge.
                      </div>
                    </div>
                    <div className="rounded-[12px] border border-white/8 bg-white/[0.03] px-4 py-4">
                      <div className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                        Unrealized PnL broker
                      </div>
                      <div
                        className={`mt-2 text-lg font-semibold ${getLivePnlToneClass(
                          slotDraft.brokerUnrealizedPnl,
                        )}`}
                      >
                        {formatLiveSignedCurrencyValue(slotDraft.brokerUnrealizedPnl)}
                      </div>
                      <div className="mt-2 text-sm text-zinc-500">
                        Flottante del broker monitorato in tempo reale.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[16px] border border-white/8 bg-white/[0.03] p-5">
                  <div className="text-sm font-medium text-white">Connessioni dello slot</div>
                  <div className="mt-4 space-y-3">
                    {slotConnectionRows.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-[12px] border border-white/8 bg-white/[0.03] px-4 py-3"
                      >
                        <div className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                          {item.label}
                        </div>
                        <div className={`mt-2 text-sm font-medium ${item.tone}`}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-5 xl:grid-cols-2">
              <div className="rounded-[14px] border border-white/8 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium text-white">
                      Trade challenge prop
                    </div>
                    <div className="mt-1 text-sm text-zinc-500">
                      Asset, lot size, direzione e risultato lato prop.
                    </div>
                  </div>
                  <Badge className="border-white/10 bg-white/6 text-zinc-300 hover:bg-white/6">
                    {propTrades.length} trade
                  </Badge>
                </div>
                {propTrades.length > 0 ? (
                  <div className="mt-4 overflow-hidden rounded-[12px] border border-white/8">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white/8 hover:bg-transparent">
                          <TableHead className="text-xs uppercase tracking-[0.14em] text-zinc-500">Asset</TableHead>
                          <TableHead className="text-xs uppercase tracking-[0.14em] text-zinc-500">Lotti</TableHead>
                          <TableHead className="text-xs uppercase tracking-[0.14em] text-zinc-500">Direzione</TableHead>
                          <TableHead className="text-xs uppercase tracking-[0.14em] text-zinc-500">Realizzato</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {propTrades.map((trade) => (
                          <TableRow key={trade.id} className="border-white/8 hover:bg-white/[0.02]">
                            <TableCell className="text-white">{trade.symbol}</TableCell>
                            <TableCell className="text-zinc-400">{trade.lotSize}</TableCell>
                            <TableCell className="text-zinc-400">{trade.direction}</TableCell>
                            <TableCell className="text-zinc-400">{trade.realizedPnl}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="mt-4 rounded-[12px] border border-dashed border-white/10 px-4 py-6 text-sm text-zinc-500">
                    Nessun trade prop disponibile ancora. Qui vedrai ogni esecuzione con asset, direzione, lot size e PnL realizzato.
                  </div>
                )}
              </div>

              <div className="rounded-[14px] border border-white/8 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium text-white">
                      Trade broker
                    </div>
                    <div className="mt-1 text-sm text-zinc-500">
                      Asset, lot size, direzione e risultato lato broker.
                    </div>
                  </div>
                  <Badge className="border-white/10 bg-white/6 text-zinc-300 hover:bg-white/6">
                    {brokerTrades.length} trade
                  </Badge>
                </div>
                {brokerTrades.length > 0 ? (
                  <div className="mt-4 overflow-hidden rounded-[12px] border border-white/8">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white/8 hover:bg-transparent">
                          <TableHead className="text-xs uppercase tracking-[0.14em] text-zinc-500">Asset</TableHead>
                          <TableHead className="text-xs uppercase tracking-[0.14em] text-zinc-500">Lotti</TableHead>
                          <TableHead className="text-xs uppercase tracking-[0.14em] text-zinc-500">Direzione</TableHead>
                          <TableHead className="text-xs uppercase tracking-[0.14em] text-zinc-500">Realizzato</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {brokerTrades.map((trade) => (
                          <TableRow key={trade.id} className="border-white/8 hover:bg-white/[0.02]">
                            <TableCell className="text-white">{trade.symbol}</TableCell>
                            <TableCell className="text-zinc-400">{trade.lotSize}</TableCell>
                            <TableCell className="text-zinc-400">{trade.direction}</TableCell>
                            <TableCell className="text-zinc-400">{trade.realizedPnl}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="mt-4 rounded-[12px] border border-dashed border-white/10 px-4 py-6 text-sm text-zinc-500">
                    Nessun trade broker disponibile ancora. Quando il bot esegue ordini, qui li vedrai separati dal lato prop.
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-[14px] border border-primary/10 bg-primary/5 p-4 text-sm text-zinc-300">
              Appena il backend colleghera MetaApi, questa schermata mostrera in tempo reale:
              <span className="font-medium text-white">
                {" "}asset tradato, lot size, direzione, profitto/perdita realizzata e unrealized PnL
              </span>
              {" "}separati tra challenge prop e broker.
            </div>
          </div>
        </Drawer>
      );
    }

    if (panel.type === "subscription") {
      return (
        <Drawer
          title="Piano e abbonamento"
          description="Gestisci il piano SaaS e il numero di slot disponibili per il cliente."
          onClose={closePanel}
          onSave={saveSubscription}
          saveLabel="Salva piano"
        >
          <div className="space-y-5">
            <Field label="Nome piano">
              <input
                className={inputClass}
                value={planDraft.planName}
                onChange={(event) =>
                  setPlanDraft((current) => ({
                    ...current,
                    planName: event.target.value,
                  }))
                }
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Slot inclusi">
                <input
                  className={inputClass}
                  type="number"
                  value={planDraft.slotsIncluded}
                  onChange={(event) =>
                    setPlanDraft((current) => ({
                      ...current,
                      slotsIncluded: Number(event.target.value),
                    }))
                  }
                />
              </Field>
              <Field label="Cadenza">
                <OptionCardGroup
                  options={billingCadenceOptions}
                  value={planDraft.billingCadence}
                  onChange={(nextValue) =>
                    setPlanDraft((current) => ({
                      ...current,
                      billingCadence: nextValue,
                    }))
                  }
                  columns="grid-cols-1"
                />
              </Field>
            </div>
            <Field label="Data rinnovo">
              <input
                className={inputClass}
                value={planDraft.renewalDate}
                onChange={(event) =>
                  setPlanDraft((current) => ({
                    ...current,
                    renewalDate: event.target.value,
                  }))
                }
              />
            </Field>
          </div>
        </Drawer>
      );
    }

    if (panel.type === "billing-offers") {
      return (
        <Drawer
          title="Sblocca i tuoi slot"
          description="Per creare nuove coppie ti serve un abbonamento attivo. Scegli il pacchetto mensile piu adatto e continua su Stripe."
          onClose={closePanel}
          maxWidthClass="max-w-[980px]"
        >
          <div className="space-y-5">
            <div className="rounded-[16px] border border-primary/10 bg-primary/5 px-4 py-4 text-sm text-zinc-300">
              Con ogni pacchetto sblocchi slot reali nel tuo account. Se il pagamento fallisce o l'abbonamento viene cancellato,
              gli slot vengono revocati e le connessioni MetaApi collegate vengono smontate in automatico.
            </div>

            {stripePlansError ? (
              <div className="rounded-[14px] border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                {stripePlansError}
              </div>
            ) : null}

            {!stripePlansConfigured ? (
              <div className="rounded-[16px] border border-amber-500/15 bg-amber-500/10 px-4 py-4 text-sm text-amber-100">
                Stripe non e ancora configurato in produzione. La struttura checkout e pronta, ma serve collegare le price API key e i webhook.
              </div>
            ) : null}

            {stripePlansLoading ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={`plan-skeleton-${index}`}
                    className="h-[240px] animate-pulse rounded-[22px] border border-white/8 bg-white/[0.03]"
                  />
                ))}
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {stripePlans
                  .filter((plan) => !plan.isTest || isDashboardAdmin)
                  .map((plan) => (
                  <div
                    key={plan.id}
                    className={`brand-surface-soft rounded-[22px] border px-5 py-5 ${
                      plan.seatCount === 3
                        ? "border-primary/30 shadow-[0_0_0_1px_rgba(123,137,255,0.12),0_24px_80px_rgba(92,97,255,0.16)]"
                        : "border-white/8"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                          {plan.isTest ? "Test" : `${plan.seatCount} slot`}
                        </div>
                        <div className="mt-2 text-2xl font-semibold text-white">{plan.name}</div>
                        <div className="mt-2 text-sm leading-6 text-zinc-400">{plan.description}</div>
                      </div>
                      {plan.seatCount === 3 ? (
                        <Badge className="border-primary/20 bg-primary/10 text-primary hover:bg-primary/10">
                          Popolare
                        </Badge>
                      ) : null}
                    </div>

                    <div className="mt-6">
                      <div className="text-4xl font-semibold tracking-tight text-white">
                        {formatPreciseUsd(plan.monthlyAmountUsd)}
                      </div>
                      <div className="mt-1 text-sm text-zinc-500">
                        / mese · {formatPreciseUsd(plan.monthlyPerSlotUsd)} per slot
                      </div>
                    </div>

                    <div className="mt-6 space-y-2 text-sm text-zinc-300">
                      <div>• {plan.seatCount} slot cloud riservati al tuo utente</div>
                      <div>• Uso di conti salvati e wizard coppie sbloccato</div>
                      <div>• Revoca automatica se il billing si interrompe</div>
                      {plan.isTest ? (
                        <div>• Piano interno di verifica, visibile solo all&apos;admin</div>
                      ) : null}
                    </div>

                    <Button
                      type="button"
                      className={`mt-6 w-full ${primaryButtonClass}`}
                      disabled={!plan.configured || billingCheckoutPlanId === plan.id}
                      onClick={() => void startStripeCheckout(plan.id)}
                    >
                      {billingCheckoutPlanId === plan.id
                        ? "Reindirizzamento..."
                        : plan.configured
                          ? "Continua con Stripe"
                          : "Non configurato"}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Drawer>
      );
    }

    if (panel.type === "notifications") {
      return (
        <Drawer
          title="Notifiche"
          description="Aggiornamenti recenti su slot, challenge e parametri."
          onClose={closePanel}
        >
          <div className="space-y-3">
            {notifications.map((notice) => (
              <div
                key={notice.id}
                className="rounded-xl border border-white/8 bg-white/[0.03] p-4"
              >
                <div className="text-sm font-medium text-white">{notice.title}</div>
                <div className="mt-1 text-sm leading-6 text-zinc-500">{notice.body}</div>
              </div>
            ))}
          </div>
        </Drawer>
      );
    }

    if (panel.type === "export") {
      return (
        <Drawer
          title={`Esporta dati · ${panel.source ?? "dashboard"}`}
          description="Configura l'output dell'export per dashboard, slot o analytics."
          onClose={closePanel}
          onSave={saveExport}
          saveLabel="Conferma export"
        >
          <div className="space-y-5">
            <Field label="Scope export">
              <OptionCardGroup
                options={exportScopeOptions}
                value={exportDraft.scope}
                onChange={(nextValue) =>
                  setExportDraft((current) => ({
                    ...current,
                    scope: nextValue,
                  }))
                }
                columns="sm:grid-cols-2"
              />
            </Field>
            <label className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3">
              <span className="text-sm text-zinc-300">Includi eventi slot</span>
              <input
                type="checkbox"
                checked={exportDraft.includeEvents}
                onChange={(event) =>
                  setExportDraft((current) => ({
                    ...current,
                    includeEvents: event.target.checked,
                  }))
                }
              />
            </label>
            <label className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3">
              <span className="text-sm text-zinc-300">Includi metriche equity</span>
              <input
                type="checkbox"
                checked={exportDraft.includeEquity}
                onChange={(event) =>
                  setExportDraft((current) => ({
                    ...current,
                    includeEquity: event.target.checked,
                  }))
                }
              />
            </label>
            <label className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3">
              <span className="text-sm text-zinc-300">Includi dati billing</span>
              <input
                type="checkbox"
                checked={exportDraft.includeBilling}
                onChange={(event) =>
                  setExportDraft((current) => ({
                    ...current,
                    includeBilling: event.target.checked,
                  }))
                }
              />
            </label>
          </div>
        </Drawer>
      );
    }

    return null;
  }

  const onboardingSteps = [
    {
      title: "Crea il primo slot",
      description: "Scegli la challenge da collegare. Non servono ancora credenziali.",
      done: slots.length > 0,
      onAction: openAddSlot,
    },
    {
      title: "Collega la challenge",
      description: "Inserisci login, password e server della prop challenge.",
      done: selectedSlot ? hasPropConnection(selectedSlot) : false,
      onAction: selectedSlot ? () => openSlotConnections(selectedSlot.id) : openAddSlot,
    },
    {
      title: "Collega il broker",
      description: "Inserisci login, password e server del broker da usare in hedge.",
      done: selectedSlot ? hasBrokerConnection(selectedSlot) : false,
      onAction: selectedSlot ? () => openSlotConnections(selectedSlot.id) : openAddSlot,
    },
    {
      title: "Usa il preset consigliato",
      description: "Applica il profilo guidato. Le opzioni avanzate restano opzionali.",
      done: selectedSlot ? hasStrategyParameters(selectedSlot) : false,
      onAction: selectedSlot ? () => openSlotParameters(selectedSlot.id) : openAddSlot,
    },
    {
      title: "Attiva la challenge",
      description: "Controlla il riepilogo finale e porta lo slot online.",
      done: selectedSlot ? selectedSlot.challengeState === "ATTIVA" : false,
      onAction: selectedSlot ? () => openActivateSlot(selectedSlot.id) : openAddSlot,
    },
  ];

  const strategyGuideSections = [
    {
      question: "In una frase: che cosa fa DeltaHedge?",
      answer:
        "DeltaHedge mette insieme due conti e li fa lavorare come una coppia. Il primo conto prova a passare la challenge. Il secondo conto serve a proteggere il capitale mentre il primo si muove.",
    },
    {
      question: "Perché usiamo due conti invece di uno solo?",
      answer:
        "Perché i due conti hanno due lavori diversi. La challenge serve per arrivare a Fase 1, Fase 2 e poi funded. Il broker serve per assorbire il colpo quando la challenge sale o scende. Uno spinge il percorso, l'altro aiuta a controllare il rischio.",
    },
    {
      question: "Cosa succede davvero quando il motore apre un trade?",
      answer:
        "Quando il motore vede un ingresso, apre un trade sulla challenge e uno sul broker quasi nello stesso momento. La challenge decide la size principale. Il broker la segue con la sua size calcolata. Se uno dei due non entra bene, il sistema prova a chiudere subito per non restare scoperto.",
    },
    {
      question: "Se la challenge passa una fase, il broker perde: è normale?",
      answer:
        "Sì. È il prezzo controllato che paghiamo per far avanzare la challenge alla fase successiva. Non significa che qualcosa si è rotto. Significa che il ciclo sta seguendo il piano deciso dal motore.",
    },
    {
      question: "Se invece la challenge fallisce, cosa succede?",
      answer:
        "Se la challenge fallisce, il broker deve aver recuperato il target pensato per quel ciclo. In quel momento il ciclo si chiude, il risultato viene salvato nei log e la dashboard te lo mostra in modo semplice.",
    },
    {
      question: "Cosa controlla il software mentre lavori o dormi?",
      answer:
        "Controlla se i conti sono collegati, se i due trade entrano bene, quanto manca al pass o al fail, quanto stanno muovendo prop e broker e se il ciclo deve fermarsi. Tu non devi stare davanti al grafico per capire ogni secondo cosa succede.",
    },
    {
      question: "Perché c'è la regola del 30% sul broker iniziale?",
      answer:
        "Perché non vogliamo consumare troppo in fretta il broker mentre la challenge continua il suo percorso. È una cintura di sicurezza: se la perdita prevista è troppo alta, il sistema ti avvisa prima di partire.",
    },
  ];

  const platformGuideSections = [
    {
      title: "1. Crea lo slot",
      body: "Premi il bottone + e scegli la challenge. Pensa allo slot come a una scatola dove vivranno insieme challenge e broker.",
    },
    {
      title: "2. Collega i conti",
      body: "Apri lo slot e inserisci login, password e server della challenge e del broker. Quando i due lati sono dentro, la coppia è completa.",
    },
    {
      title: "3. Usa il preset",
      body: "Apri Parametri trading e salva il preset consigliato. Se sei all'inizio, non devi toccare subito le opzioni avanzate.",
    },
    {
      title: "4. Attiva e monitora",
      body: "Quando tutto è pronto, premi attiva. Da lì in poi la dashboard ti fa vedere se la coppia è viva, cosa sta facendo e come stanno andando i due conti.",
    },
  ];

  let nextActionLabel = "Crea il primo slot";
  let nextActionDescription =
    "Parti da qui. Ti accompagniamo un pezzo alla volta, senza riempirti di impostazioni inutili.";
  let nextActionHandler = openAddSlot;

  if (selectedSlot) {
    if (!hasPropConnection(selectedSlot) || !hasBrokerConnection(selectedSlot)) {
      nextActionLabel = "Collega i conti";
      nextActionDescription =
        "Adesso ci servono solo i due accessi: challenge e broker. Una volta messi, la coppia può iniziare a vivere.";
      nextActionHandler = () => openSlotConnections(selectedSlot.id);
    } else if (!hasStrategyParameters(selectedSlot)) {
      nextActionLabel = "Scegli il preset consigliato";
      nextActionDescription =
        "Qui scegli come vuoi far lavorare il motore. Se non vuoi complicarti la vita, usa il preset consigliato.";
      nextActionHandler = () => openSlotParameters(selectedSlot.id);
    } else if (selectedSlot.challengeState !== "ATTIVA") {
      nextActionLabel = "Attiva la challenge";
      nextActionDescription =
        "Controlla l'ultimo riepilogo e accendi la coppia. Da lì in poi il sistema inizia a sorvegliarla per te.";
      nextActionHandler = () => openActivateSlot(selectedSlot.id);
    } else {
      nextActionLabel = "Apri il ciclo";
      nextActionDescription =
        "La coppia è già accesa. Qui dentro puoi vedere in modo semplice se sta bene, se è in pericolo o se sta avanzando.";
      nextActionHandler = () => openSlotDetail(selectedSlot.id);
    }
  }

  const isOverview = activeSection === "Panoramica";
  const isPerformance = activeSection === "Performance";
  const isCyclesHistory = activeSection === "Cicli";
  const isAccountsLibrary = activeSection === "Conti";
  const isStrategyGuide = activeSection === "Guida strategia";
  const isPlatformGuide = activeSection === "Guida piattaforma";

  if (isAccountsLibrary) {
    nextActionLabel = "Aggiungi conto";
    nextActionDescription =
      "Salva una volta le credenziali di prop o broker e poi importale negli slot con un click.";
    nextActionHandler = () => openSavedAccountPanel("PROP");
  }

  return (
    <div className="dark brand-shell relative min-h-screen overflow-hidden text-foreground">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at top right, rgba(123,137,255,0.18), transparent 28%),
            radial-gradient(circle at top right, rgba(103,232,249,0.08), transparent 14%),
            radial-gradient(circle at bottom left, rgba(45,212,191,0.08), transparent 22%),
            radial-gradient(circle, rgba(158,171,204,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "auto, auto, auto, 18px 18px",
          backgroundPosition: "center, center, center, 0 0",
        }}
      />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -right-24 top-[-12rem] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(123,137,255,0.28)_0,rgba(123,137,255,0.04)_45%,transparent_72%)] blur-3xl"
          animate={{
            x: [0, -36, 0],
            y: [0, 26, 0],
            opacity: [0.24, 0.12, 0.24],
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -left-28 bottom-[-14rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.2)_0,rgba(45,212,191,0.03)_44%,transparent_72%)] blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -18, 0],
            opacity: [0.16, 0.08, 0.16],
            scale: [1, 1.06, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className="relative mx-auto max-w-[1600px] p-4 sm:p-6">
        <div className="grid gap-5 xl:grid-cols-[248px_minmax(0,1fr)]">
          <aside className="brand-surface sticky top-4 rounded-[28px] p-4">
            <div className="flex items-center gap-3 border-b border-border/80 pb-5">
              <div>
                <DeltaHedgeWordmark />
                <div className="text-xs text-muted-foreground">Motore cicli prop</div>
              </div>
            </div>

            <div className="space-y-7 py-6">
              {sidebarSections.map((section) => (
                <div key={section.title}>
                  <div className="px-2 text-xs font-medium text-muted-foreground">
                    {section.title}
                  </div>
                  <div className="mt-3 space-y-1.5">
                    {section.items.map((label) => {
                      const Icon = sidebarIcons[label];
                      const active = label === activeSection;

                      return (
                        <button
                          key={label}
                          type="button"
                          onClick={() => setActiveSection(label)}
                          className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${
                            active
                              ? "bg-[linear-gradient(135deg,rgba(123,137,255,0.18),rgba(45,212,191,0.12))] font-medium text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                              : "text-muted-foreground hover:bg-white/[0.05] hover:text-foreground"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <Icon className="size-4" />
                            {label}
                          </span>
                          {active ? (
                            <div className="size-2 rounded-full bg-primary" />
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="brand-surface-soft rounded-[22px] p-4">
              <div className="text-xs font-medium text-muted-foreground">Guida iniziale</div>
              <div className="mt-3 text-sm text-muted-foreground">
                {nextActionDescription}
              </div>
              <Button
                className={`mt-4 h-10 w-full ${primaryButtonClass}`}
                onClick={nextActionHandler}
              >
                {nextActionLabel}
              </Button>
            </div>
          </aside>

          <main className="min-w-0 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm text-muted-foreground">Dashboard cliente</div>
                <div className="mt-1 text-2xl font-semibold text-foreground">
                  {isPerformance
                    ? "Performance dei cicli"
                    : isCyclesHistory
                    ? "Storico dei cicli conclusi"
                    : isAccountsLibrary
                    ? "Libreria conti salvati"
                    : isStrategyGuide
                    ? "Guida alla strategia"
                    : isPlatformGuide
                      ? "Guida all'utilizzo della piattaforma"
                      : slots.length === 0
                        ? "Configura il primo slot"
                        : "I tuoi slot e la guida operativa"}
                </div>
              </div>

              <div className="flex items-center gap-3">
                {(isOverview || isAccountsLibrary) && (slots.length > 0 || savedAccounts.length > 0) ? (
                  <div className="brand-surface-soft flex h-11 min-w-[280px] items-center gap-3 rounded-2xl px-4 text-sm text-muted-foreground">
                    <Search className="size-4" />
                    <input
                      className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
                      value={search}
                      placeholder={
                        isAccountsLibrary
                          ? "Cerca conto, server o piattaforma..."
                          : "Cerca slot, challenge o broker..."
                      }
                      onChange={(event) => setSearch(event.target.value)}
                    />
                  </div>
                ) : null}

                <Button
                  variant="ghost"
                  size="icon"
                  className="brand-surface-soft size-11 rounded-2xl text-muted-foreground hover:bg-white/[0.06] hover:text-foreground"
                  onClick={openNotificationsPanel}
                >
                  <BellDot className="size-4" />
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="brand-surface-soft h-11 rounded-2xl px-4 text-muted-foreground hover:bg-white/[0.06] hover:text-foreground"
                  onClick={handleSignOut}
                >
                  <span className="hidden max-w-[160px] truncate text-sm font-medium sm:block">
                    {user?.email || "Esci"}
                  </span>
                  <LogOut className="size-4 sm:ml-2" />
                </Button>

                <Button
                  size="icon"
                  className={`size-11 ${primaryButtonClass}`}
                  onClick={() =>
                    isAccountsLibrary ? openSavedAccountPanel("PROP") : openAddSlot()
                  }
                >
                  <Plus className="size-4" />
                </Button>
              </div>
            </div>
            {isPerformance ? (
              <>
                <div className="grid gap-3 md:grid-cols-3">
                  {performanceCards.map((card) => (
                    <CompactSummaryCard
                      key={card.label}
                      label={card.label}
                      value={card.value}
                      note={card.note}
                    />
                  ))}
                </div>

                <Card className={`overflow-hidden ${panelClass}`}>
                  <CardHeader className="border-b border-border/80 pb-5">
                    <Badge className="w-fit border-primary/20 bg-primary/10 text-primary hover:bg-primary/10">
                      Performance
                    </Badge>
                    <CardTitle className="mt-4 text-3xl tracking-tight text-white">
                      Performance netta dei cicli chiusi
                    </CardTitle>
                    <CardDescription className="max-w-3xl text-zinc-500">
                      Il grafico segue solo il netto finale dei cicli archiviati: profitto broker realizzato meno costo prop.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    {closedCycleLogs.length === 0 ? (
                      <div className="rounded-[16px] border border-white/8 bg-white/[0.03] p-6">
                        <div className="flex items-center justify-between text-xs uppercase tracking-[0.14em] text-zinc-500">
                          <span>Equity curve</span>
                          <span>In attesa del primo ciclo chiuso</span>
                        </div>
                        <div className="mt-6 h-[280px] overflow-hidden rounded-[14px] border border-dashed border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))]">
                          <div className="flex h-full items-center justify-center px-6 text-center text-sm leading-7 text-zinc-500">
                            Appena il primo ciclo viene archiviato qui comparirà la curva equity cumulata.
                          </div>
                        </div>
                      </div>
                    ) : (
                      <EquityCurveChart points={equityCurvePoints} />
                    )}
                  </CardContent>
                </Card>

                <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
                  <Card className={panelClass}>
                    <CardHeader>
                      <CardTitle className="text-xl text-white">
                        Ripartizione del risultato
                      </CardTitle>
                      <CardDescription className="text-zinc-500">
                        Vista aggregata dei cicli chiusi fino ad ora.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-3 sm:grid-cols-3">
                      <div className="rounded-[12px] border border-white/8 bg-white/[0.03] px-4 py-4">
                        <div className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                          Broker realizzato
                        </div>
                        <div className="mt-2 text-lg font-semibold text-white">
                          {formatSignedCurrency(totalBrokerRealized)}
                        </div>
                      </div>
                      <div className="rounded-[12px] border border-white/8 bg-white/[0.03] px-4 py-4">
                        <div className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                          Costi prop
                        </div>
                        <div className="mt-2 text-lg font-semibold text-white">
                          {formatSignedCurrency(-totalPropCost)}
                        </div>
                      </div>
                      <div className="rounded-[12px] border border-primary/10 bg-primary/5 px-4 py-4">
                        <div className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                          Netto totale
                        </div>
                        <div className="mt-2 text-lg font-semibold text-white">
                          {formatSignedCurrency(totalNetProfit)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={panelClass}>
                    <CardHeader>
                      <CardTitle className="text-xl text-white">
                        Ultimo ciclo archiviato
                      </CardTitle>
                      <CardDescription className="text-zinc-500">
                        L'ultimo ciclo chiuso spiega il punto più recente della curva.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-zinc-400">
                      <div className="rounded-[12px] border border-white/8 bg-white/[0.03] px-4 py-3">
                        Slot:{" "}
                        <span className="font-medium text-white">
                          {lastClosedCycle?.slot || "Nessuno"}
                        </span>
                      </div>
                      <div className="rounded-[12px] border border-white/8 bg-white/[0.03] px-4 py-3">
                        Esito:{" "}
                        <span className="font-medium text-white">
                          {lastClosedCycle
                            ? getCycleOutcomeLabel(lastClosedCycle.outcome)
                            : "In attesa"}
                        </span>
                      </div>
                      <div className="rounded-[12px] border border-white/8 bg-white/[0.03] px-4 py-3">
                        Netto ciclo:{" "}
                        <span className="font-medium text-white">
                          {formatSignedCurrency(lastClosedCycle?.netProfit || 0)}
                        </span>
                      </div>
                      <div className="rounded-[12px] border border-white/8 bg-white/[0.03] px-4 py-3">
                        Chiuso il:{" "}
                        <span className="font-medium text-white">
                          {lastClosedCycle
                            ? formatDateTime(lastClosedCycle.closedAt)
                            : "In attesa"}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {closedCycleLogs.length > 0 ? (
                  <Card className={`overflow-hidden ${panelClass}`}>
                    <CardHeader className="border-b border-white/8 pb-5">
                      <CardTitle className="text-2xl tracking-tight text-white">
                        Log dei cicli
                      </CardTitle>
                      <CardDescription className="text-zinc-500">
                        Ogni riga rappresenta un ciclo chiuso e il suo netto finale.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="overflow-hidden rounded-[14px] border border-white/8">
                        <Table>
                          <TableHeader>
                            <TableRow className="border-white/8 hover:bg-transparent">
                              <TableHead className="text-xs uppercase tracking-[0.14em] text-zinc-500">Ciclo</TableHead>
                              <TableHead className="text-xs uppercase tracking-[0.14em] text-zinc-500">Slot</TableHead>
                              <TableHead className="text-xs uppercase tracking-[0.14em] text-zinc-500">Esito</TableHead>
                              <TableHead className="text-xs uppercase tracking-[0.14em] text-zinc-500">Broker realizzato</TableHead>
                              <TableHead className="text-xs uppercase tracking-[0.14em] text-zinc-500">Costo prop</TableHead>
                              <TableHead className="text-xs uppercase tracking-[0.14em] text-zinc-500">Netto</TableHead>
                              <TableHead className="text-xs uppercase tracking-[0.14em] text-zinc-500">Chiuso il</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {closedCycleLogs.map((cycle, index) => (
                              <TableRow key={cycle.id} className="border-white/8 hover:bg-white/[0.02]">
                                <TableCell className="text-white">Ciclo {index + 1}</TableCell>
                                <TableCell className="text-zinc-300">{cycle.slot}</TableCell>
                                <TableCell>
                                  <Badge className={getCycleOutcomeBadgeClass(cycle.outcome)}>
                                    {getCycleOutcomeLabel(cycle.outcome)}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-zinc-300">
                                  {formatSignedCurrency(cycle.brokerRealizedProfit)}
                                </TableCell>
                                <TableCell className="text-zinc-300">
                                  {formatCurrency(cycle.propCost)}
                                </TableCell>
                                <TableCell
                                  className={
                                    Number(cycle.netProfit || 0) >= 0
                                      ? "text-primary"
                                      : "text-rose-300"
                                  }
                                >
                                  {formatSignedCurrency(cycle.netProfit)}
                                </TableCell>
                                <TableCell className="text-zinc-500">
                                  {formatDateTime(cycle.closedAt)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                ) : null}

                <Card className={panelClass}>
                  <CardHeader>
                    <CardTitle className="text-lg text-white">
                      Come funziona questa sezione
                    </CardTitle>
                    <CardDescription className="text-zinc-500">
                      Nota rapida, non più protagonista della pagina.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-3 text-sm text-zinc-400 md:grid-cols-3">
                    <div className="rounded-[12px] border border-white/8 bg-white/[0.03] px-4 py-3">
                      Un ciclo entra qui solo quando termina per fail in Fase 1, fail in Fase 2 o fail nel Funded.
                    </div>
                    <div className="rounded-[12px] border border-white/8 bg-white/[0.03] px-4 py-3">
                      Il netto ciclo è calcolato come profitto broker realizzato meno costo prop della challenge.
                    </div>
                    <div className="rounded-[12px] border border-white/8 bg-white/[0.03] px-4 py-3">
                      La curva non segue il mark-to-market: segue solo il netto finale dei cicli archiviati.
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : isCyclesHistory ? (
              <>
                <div className="grid gap-3 md:grid-cols-3">
                  {[
                    {
                      label: "Cicli conclusi",
                      value: String(closedCycleLogs.length),
                      note: "Storico finale di slot passati o falliti",
                    },
                    {
                      label: "Passed",
                      value: String(
                        closedCycleLogs.filter((cycle) =>
                          String(cycle.outcome || "").startsWith("PASS_"),
                        ).length,
                      ),
                      note: "Slot che hanno raggiunto il target della fase",
                    },
                    {
                      label: "Failed",
                      value: String(
                        closedCycleLogs.filter((cycle) =>
                          String(cycle.outcome || "").startsWith("FAIL_"),
                        ).length,
                      ),
                      note: "Slot liberati subito dopo violazione del drawdown",
                    },
                  ].map((card) => (
                    <CompactSummaryCard
                      key={card.label}
                      label={card.label}
                      value={card.value}
                      note={card.note}
                    />
                  ))}
                </div>

                <Card className={`overflow-hidden ${panelClass}`}>
                  <CardHeader className="border-b border-border/80 pb-5">
                    <CardTitle className="text-2xl tracking-tight text-foreground">
                      Storico cicli conclusi
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Qui non c'è più la dashboard generica: ogni card rappresenta un ciclo concluso con esito finale e risultato economico registrato.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    {closedCycleLogs.length === 0 ? (
                      <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.02] px-5 py-10 text-center">
                        <div className="text-lg font-medium text-white">
                          Nessun ciclo concluso ancora
                        </div>
                        <div className="mt-2 text-sm text-zinc-500">
                          Appena una fase termina come PASSED o FAILED, la troverai qui come card fissa di storico.
                        </div>
                      </div>
                    ) : (
                      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {closedCycleLogs.map((cycle, index) => {
                          const outcomeMeta = {
                            label: getCycleOutcomeLabel(cycle.outcome),
                            className: getCycleOutcomeBadgeClass(cycle.outcome),
                            isPassed: String(cycle.outcome || "").startsWith("PASS_"),
                          };

                          return (
                            <motion.div
                              key={cycle.id}
                              initial={{ opacity: 0, y: 16 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, amount: 0.3 }}
                              transition={{ delay: index * 0.04, duration: 0.24 }}
                              className="rounded-xl border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.02))] p-4 shadow-[0_16px_34px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.02)]"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <div className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                                    {cycle.slot}
                                  </div>
                                  <div className="mt-2 text-lg font-semibold text-white">
                                    {outcomeMeta.label}
                                  </div>
                                </div>
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.85 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  viewport={{ once: true, amount: 0.3 }}
                                  transition={{ delay: 0.12, duration: 0.2 }}
                                  className={`flex size-10 items-center justify-center rounded-full border ${outcomeMeta.className}`}
                                >
                                  {outcomeMeta.isPassed ? (
                                    <Check className="size-4" />
                                  ) : (
                                    <X className="size-4" />
                                  )}
                                </motion.div>
                              </div>

                              <div className="mt-4 grid gap-3 text-sm">
                                <div className="rounded-lg border border-white/8 bg-white/[0.03] px-3 py-3">
                                  <div className="text-xs uppercase tracking-[0.12em] text-zinc-500">
                                    Netto finale
                                  </div>
                                  <div
                                    className={`mt-2 text-base font-semibold ${
                                      Number(cycle.netProfit || 0) >= 0
                                        ? "text-emerald-300"
                                        : "text-rose-300"
                                    }`}
                                  >
                                    {formatSignedCurrency(cycle.netProfit)}
                                  </div>
                                </div>
                                <div className="grid gap-3 sm:grid-cols-2">
                                  <div className="rounded-lg border border-white/8 bg-white/[0.03] px-3 py-3">
                                    <div className="text-xs uppercase tracking-[0.12em] text-zinc-500">
                                      Profitto broker
                                    </div>
                                    <div className="mt-2 text-zinc-200">
                                      {formatSignedCurrency(cycle.brokerRealizedProfit)}
                                    </div>
                                  </div>
                                  <div className="rounded-lg border border-white/8 bg-white/[0.03] px-3 py-3">
                                    <div className="text-xs uppercase tracking-[0.12em] text-zinc-500">
                                      Costo prop
                                    </div>
                                    <div className="mt-2 text-zinc-200">
                                      {formatCurrency(cycle.propCost)}
                                    </div>
                                  </div>
                                </div>
                                <div className="rounded-lg border border-white/8 bg-white/[0.03] px-3 py-3 text-zinc-400">
                                  Chiuso il {formatDateTime(cycle.closedAt)}
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            ) : isAccountsLibrary ? (
              <>
                <div className="grid gap-3 md:grid-cols-3">
                  {accountLibraryCards.map((card) => (
                    <CompactSummaryCard
                      key={card.key}
                      label={card.label}
                      value={card.value}
                      note={card.note}
                    />
                  ))}
                </div>

                <Card className={`overflow-hidden ${panelClass}`}>
                  <CardHeader className="border-b border-border/80 pb-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <CardTitle className="text-2xl tracking-tight text-foreground">
                          Libreria conti
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                          Salva qui i conti prop e broker una sola volta. Quando apri uno slot, li puoi importare dal menu a tendina dentro la sezione conti dello slot.
                        </CardDescription>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          className={secondaryButtonClass}
                          onClick={() => openSavedAccountPanel("PROP")}
                        >
                          Nuovo prop
                        </Button>
                        <Button
                          type="button"
                          className={primaryButtonClass}
                          onClick={() => openSavedAccountPanel("BROKER")}
                        >
                          Nuovo broker
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6">
                    {filteredSavedAccounts.length === 0 ? (
                      <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.02] px-5 py-10 text-center">
                        <div className="text-lg font-medium text-white">
                          Nessun conto salvato
                        </div>
                        <div className="mt-2 text-sm text-zinc-500">
                          {subscription.canManageAccounts
                            ? "Inizia da qui: salva un conto prop o broker e poi importalo direttamente negli slot."
                            : "Per collegare nuovi conti ti serve almeno uno slot pagato e disponibile nel tuo abbonamento."}
                        </div>
                        <div className="mt-5 flex flex-wrap justify-center gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            className={secondaryButtonClass}
                            onClick={() => openSavedAccountPanel("PROP")}
                          >
                            Salva conto prop
                          </Button>
                          <Button
                            type="button"
                            className={primaryButtonClass}
                            onClick={() => openSavedAccountPanel("BROKER")}
                          >
                            Salva conto broker
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {filteredSavedAccounts.map((account) => (
                          <motion.div
                            key={account.id}
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.22 }}
                            className="rounded-xl border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.02))] p-4 shadow-[0_16px_34px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.02)]"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                                  {account.accountType === "PROP" ? "Prop" : "Broker"}
                                </div>
                              <div className="mt-1 text-lg font-semibold text-white">
                                  {account.label}
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <div className="flex items-center gap-2">
                                  <Badge className="border-primary/16 bg-primary/8 text-primary hover:bg-primary/8">
                                    {String(account.platform).toUpperCase()}
                                  </Badge>
                                  {isDashboardAdmin ? (
                                    <Button
                                      type="button"
                                      variant="outline"
                                      className={`h-8 w-8 p-0 ${secondaryButtonClass}`}
                                      disabled={deletingSavedAccountId === account.id}
                                      onClick={() => {
                                        void deleteSavedAccount(account);
                                      }}
                                    >
                                      <Trash2 className="size-3.5" />
                                    </Button>
                                  ) : null}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-zinc-400">
                                  <span
                                    className={`size-2 rounded-full ${getSavedAccountStatusMeta(account).dotClass}`}
                                  />
                                  {getSavedAccountStatusMeta(account).label}
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 grid gap-3 text-sm">
                              <div className="rounded-lg border border-white/8 bg-white/[0.03] px-3 py-3">
                                <div className="text-xs uppercase tracking-[0.12em] text-zinc-500">
                                  Nome conto
                                </div>
                                <div className="mt-2 text-zinc-200">{account.accountName}</div>
                              </div>
                              <div className="grid gap-3 sm:grid-cols-2">
                                <div className="rounded-lg border border-white/8 bg-white/[0.03] px-3 py-3">
                                  <div className="text-xs uppercase tracking-[0.12em] text-zinc-500">
                                    Login
                                  </div>
                                  <div className="mt-2 text-zinc-200">{account.loginMasked}</div>
                                </div>
                                <div className="rounded-lg border border-white/8 bg-white/[0.03] px-3 py-3">
                                  <div className="text-xs uppercase tracking-[0.12em] text-zinc-500">
                                    Server
                                  </div>
                                  <div className="mt-2 truncate text-zinc-200">{account.server}</div>
                                </div>
                              </div>
                              {account.accountType === "BROKER" ? (
                                <div className="rounded-lg border border-white/8 bg-white/[0.03] px-3 py-3">
                                  <div className="text-xs uppercase tracking-[0.12em] text-zinc-500">
                                    Lot step
                                  </div>
                                  <div className="mt-2 text-zinc-200">
                                    {Number(account.lotStep || 0.01).toFixed(2)}
                                  </div>
                                </div>
                              ) : null}
                              <div className="rounded-lg border border-white/8 bg-white/[0.03] px-3 py-3">
                                <div className="text-xs uppercase tracking-[0.12em] text-zinc-500">
                                  Stato validazione
                                </div>
                                <div className="mt-2 text-zinc-200">
                                  {getSavedAccountStatusMeta(account).note}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            ) : isStrategyGuide ? (
              <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
                <Card className={panelClass}>
                  <CardHeader className="border-b border-white/8 pb-5">
                    <Badge className="w-fit border-primary/20 bg-primary/10 text-primary hover:bg-primary/10">
                      FAQ strategia
                    </Badge>
                    <CardTitle className="mt-4 text-3xl tracking-tight text-white">
                      Le domande che il cliente si fa prima di attivare
                    </CardTitle>
                    <CardDescription className="max-w-3xl text-zinc-500">
                      Risposte brevi, pratiche e ordinate come una conversazione reale: cosa fa il sistema, perché esistono due lati e cosa succede quando il ciclo passa o fallisce.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 p-6">
                    {strategyGuideSections.map((section, index) => {
                      const isOpen = index === openStrategyQuestion;

                      return (
                        <div
                          key={section.question}
                          className={`overflow-hidden rounded-[18px] border transition ${
                            isOpen
                              ? "border-primary/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.02))]"
                              : "border-white/8 bg-white/[0.03]"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setOpenStrategyQuestion((current) =>
                                current === index ? -1 : index,
                              )
                            }
                            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                          >
                            <div className="min-w-0">
                              <div className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">
                                Domanda {index + 1}
                              </div>
                              <div className="mt-2 text-lg font-semibold text-white">
                                {section.question}
                              </div>
                            </div>
                            <div
                              className={`flex size-9 shrink-0 items-center justify-center rounded-full border transition ${
                                isOpen
                                  ? "border-primary/20 bg-primary text-primary-foreground"
                                  : "border-white/8 bg-white/[0.03] text-zinc-400"
                              }`}
                            >
                              <ChevronDown
                                className={`size-4 transition ${isOpen ? "rotate-180" : ""}`}
                              />
                            </div>
                          </button>

                          <AnimatePresence initial={false}>
                            {isOpen ? (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="overflow-hidden"
                              >
                                <div className="border-t border-white/8 px-5 py-4 text-sm leading-7 text-zinc-300">
                                  {section.answer}
                                </div>
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                <Card className={panelClass}>
                  <CardHeader className="border-b border-white/8 pb-5">
                    <CardTitle className="text-xl text-white">
                      In pratica
                    </CardTitle>
                    <CardDescription className="text-zinc-500">
                      La spiegazione corta, semplice e utile prima di iniziare.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6 text-sm text-zinc-400">
                    <div className="rounded-[18px] border border-primary/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.02))] p-5">
                      <div className="text-[11px] uppercase tracking-[0.14em] text-primary">
                        Sintesi
                      </div>
                      <div className="mt-3 text-2xl font-semibold text-white">
                        Uno slot è una coppia: un conto prova a passare, l'altro aiuta a proteggere
                      </div>
                      <div className="mt-2 leading-7 text-zinc-300">
                        Tutto il prodotto gira attorno a questa idea. Se manca uno dei due conti, il motore non può lavorare bene e il ciclo non parte.
                      </div>
                    </div>

                    {[
                      "Prima colleghi due conti, poi il sistema li fa lavorare insieme.",
                      "Non devi capire tutta la matematica per partire: il preset consigliato basta.",
                      "La pagina più importante è Panoramica, perché lì capisci subito cosa sta facendo ogni coppia.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-[14px] border border-white/8 bg-white/[0.03] px-4 py-4"
                      >
                        <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Check className="size-4" />
                        </div>
                        <div className="leading-6 text-zinc-300">{item}</div>
                      </div>
                    ))}

                    <Button
                      className={`w-full ${primaryButtonClass}`}
                      onClick={() => setActiveSection("Panoramica")}
                    >
                      Torna alla panoramica
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ) : isPlatformGuide ? (
              <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
                <Card className={panelClass}>
                  <CardHeader className="border-b border-white/8 pb-5">
                    <Badge className="w-fit border-primary/20 bg-primary/10 text-primary hover:bg-primary/10">
                      Onboarding visuale
                    </Badge>
                    <CardTitle className="mt-4 text-3xl tracking-tight text-white">
                      Come usare DeltaHedge, spiegato in modo semplice
                    </CardTitle>
                    <CardDescription className="max-w-3xl text-zinc-500">
                      L'idea è questa: prepari la coppia, la accendi e poi la controlli da qui. Non devi fare giri strani o lavorare con dieci pagine diverse.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {platformGuideSections.map((section, index) => (
                        <div
                          key={section.title}
                          className="group relative overflow-hidden rounded-[18px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] p-5"
                        >
                          <div className="absolute inset-y-0 left-0 w-px bg-white/8" />
                          <div className="flex items-start gap-4">
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-[14px] bg-primary text-primary-foreground shadow-[0_12px_32px_rgba(255,255,255,0.08)]">
                              <span className="text-sm font-bold">{index + 1}</span>
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-primary">
                                Step {index + 1}
                                <ArrowRight className="size-3" />
                              </div>
                              <div className="mt-2 text-xl font-semibold text-white">
                                {section.title.replace(/^\d+\.\s*/, "")}
                              </div>
                              <div className="mt-2 text-sm leading-7 text-zinc-300">
                                {section.body}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className={panelClass}>
                  <CardHeader className="border-b border-white/8 pb-5">
                    <CardTitle className="text-xl text-white">
                      Checklist rapida
                    </CardTitle>
                    <CardDescription className="text-zinc-500">
                      Le poche cose che servono davvero per partire.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6 text-sm text-zinc-400">
                    <div className="rounded-[18px] border border-white/8 bg-white/[0.03] p-5">
                      <div className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">
                        Stato onboarding
                      </div>
                      <div className="mt-3 text-3xl font-semibold text-white">
                        {onboardingSteps.filter((step) => step.done).length}/{onboardingSteps.length}
                      </div>
                      <div className="mt-2 text-sm leading-6 text-zinc-400">
                        Quando tutti i passaggi sono completi, la coppia è pronta e puoi accenderla senza altre complicazioni.
                      </div>
                    </div>

                    {onboardingSteps.map((step, index) => (
                      <div
                        key={step.title}
                        className="flex items-center justify-between rounded-[14px] border border-white/8 bg-white/[0.03] px-4 py-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex size-8 items-center justify-center rounded-full bg-white/6 text-xs font-semibold text-zinc-300">
                            {index + 1}
                          </div>
                          <span className="text-zinc-300">{step.title}</span>
                        </div>
                        <span
                          className={`text-[11px] font-medium uppercase tracking-[0.12em] ${
                            step.done ? "text-primary" : "text-zinc-500"
                          }`}
                        >
                          {step.done ? "Fatto" : "Da fare"}
                        </span>
                      </div>
                    ))}

                    <Button
                      className={`w-full ${primaryButtonClass}`}
                      onClick={() => setActiveSection("Panoramica")}
                    >
                      Torna alla panoramica
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ) : slots.length === 0 ? (
              <>
                <div className="grid gap-3 md:grid-cols-3">
                  {summaryCards.map((card) => (
                    <CompactSummaryCard
                      key={card.key}
                      label={card.label}
                      value={card.value}
                      note={card.note}
                      change={card.change}
                    />
                  ))}
                </div>

                <GuideStrip
                  steps={onboardingSteps}
                />

                <Card className={`overflow-hidden ${panelClass}`}>
                  <CardHeader className="border-b border-white/8 pb-5">
                    <CardTitle className="text-2xl tracking-tight text-white">
                      Prima coppia, zero attrito
                    </CardTitle>
                    <CardDescription className="text-zinc-500">
                      Ti servono solo i dati dei due conti. DeltaHedge fa il resto e ti guida passo per passo.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-8 p-6 lg:grid-cols-[1fr_1fr]">
                    <div>
                      <div className="text-sm font-medium text-white">Cosa preparare</div>
                      <div className="mt-4 space-y-3 text-sm text-zinc-400">
                        <div>I dati della challenge: login, password e server.</div>
                        <div>I dati del broker: login, password e server.</div>
                        <div>Il preset consigliato, se vuoi partire in modo semplice.</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">Cosa succede dopo</div>
                      <div className="mt-4 space-y-3 text-sm text-zinc-400">
                        <div>Vedrai subito se la coppia è pronta, in attesa o attiva.</div>
                        <div>Vedrai i trade divisi in modo chiaro tra prop e broker.</div>
                        <div>Vedrai equity e PnL live appena il backend riceve i dati reali.</div>
                      </div>
                      <div className="mt-5 flex flex-wrap gap-3">
                        <Button
                          variant="outline"
                          className={secondaryButtonClass}
                          onClick={() => setActiveSection("Guida strategia")}
                        >
                          Guida strategia
                        </Button>
                        <Button
                          variant="outline"
                          className={secondaryButtonClass}
                          onClick={() => setActiveSection("Guida piattaforma")}
                        >
                          Guida piattaforma
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                <div className="grid gap-3 md:grid-cols-3">
                  {summaryCards.map((card) => (
                    <CompactSummaryCard
                      key={card.key}
                      label={card.label}
                      value={card.value}
                      note={card.note}
                      change={card.change}
                    />
                  ))}
                </div>

                <GuideStrip
                  steps={onboardingSteps}
                />

                <Card className={`overflow-hidden ${panelClass}`}>
                  <CardHeader className="border-b border-border/80 pb-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <CardTitle className="text-2xl tracking-tight text-foreground">
                          Le tue coppie
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                          Qui vedi le coppie che lavorano per te. Ogni coppia ha due conti: uno prova a passare la challenge, l'altro aiuta a proteggere il percorso.
                        </CardDescription>
                      </div>
                      <Badge className="border-border/80 bg-muted/35 text-muted-foreground hover:bg-muted/35">
                        {filteredSlots.length} visualizzati
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid justify-items-start gap-4 md:grid-cols-2">
                      {filteredSlots.map((slot, index) => {
                        const propConnected = hasPropConnection(slot);
                        const brokerConnected = hasBrokerConnection(slot);
                        const propConnectionState = getSlotSideConnectionState(slot, "prop");
                        const brokerConnectionState = getSlotSideConnectionState(slot, "broker");
                        const cycleStateMeta = getCycleStateMeta(
                          slot.cycleState,
                          slot.challengeState,
                        );
                        const slotReady =
                          propConnected &&
                          brokerConnected &&
                          hasStrategyParameters(slot);
                        const projection = getBrokerProjections(slot);

                        return (
                          <motion.div
                            key={slot.id}
                            role="button"
                            tabIndex={0}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.04, duration: 0.22 }}
                            whileHover={{ y: -3 }}
                            onClick={() => setSelectedSlotId(slot.id)}
                            onKeyDown={(event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                setSelectedSlotId(slot.id);
                              }
                            }}
                            className={`relative w-full max-w-[440px] cursor-pointer overflow-hidden rounded-xl border text-left transition ${
                              slot.id === selectedSlotId
                                ? "border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.02))] shadow-[0_24px_54px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.03)]"
                                : "border-border/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0.012))] shadow-[0_16px_34px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.02)] hover:bg-white/[0.03]"
                            }`}
                          >
                            <div className="absolute right-3 top-3 z-10 flex items-center gap-2">
                                {cycleStateMeta ? (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.85 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                    className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-medium ${cycleStateMeta.className}`}
                                  >
                                    {cycleStateMeta.icon === "check" ? (
                                      <Check className="size-3.5" />
                                    ) : (
                                      <X className="size-3.5" />
                                    )}
                                    {cycleStateMeta.label}
                                  </motion.div>
                                ) : null}
                                <SlotPowerSwitch
                                  checked={slot.challengeState === "ATTIVA"}
                                  title={
                                    slot.challengeState === "ATTIVA"
                                      ? "Spegni slot"
                                      : slotReady
                                        ? "Accendi slot"
                                        : "Completa setup prima di accendere"
                                  }
                                  onToggle={() => toggleSlotPower(slot.id)}
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon-sm"
                                  className={secondaryButtonClass}
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    openSlotParameters(slot.id);
                                  }}
                                >
                                  <Settings className="size-4" />
                                </Button>
                                {isDashboardAdmin ? (
                                  <Button
                                    type="button"
                                    variant="outline"
                                    className={`h-9 w-9 p-0 ${secondaryButtonClass}`}
                                    disabled={deletingSlotId === slot.id}
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      void deleteSlotCard(slot);
                                    }}
                                  >
                                    <Trash2 className="size-4" />
                                  </Button>
                                ) : null}
                                <ChallengeStateBadge value={slot.challengeState} />
                            </div>

                            <div>
                              <FundingPipsWordmark
                                large
                                className="justify-start rounded-none pr-[132px]"
                              />
                            </div>

                            <div className="px-4 pb-4 pt-3">
                            <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                              {slot.slot}
                            </div>
                            <div className="mt-1 text-lg font-semibold text-foreground">
                              {slot.challenge.replace("FundingPips ", "")}
                            </div>
                            <div className="mt-1 text-sm text-muted-foreground">
                              Broker: {slot.brokerAccount || "da collegare"}
                            </div>

                            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium">
                              {[
                                { label: "Challenge", state: propConnectionState },
                                { label: "Broker", state: brokerConnectionState },
                              ].map((item) => (
                                <div
                                  key={item.label}
                                  className="inline-flex items-center gap-2 text-muted-foreground"
                                >
                                  <span
                                    className={`size-2 rounded-full ${getConnectionDotClass(item.state)}`}
                                  />
                                  <span>{item.label}</span>
                                </div>
                              ))}
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-2">
                              <div className="rounded-md border border-white/8 bg-white/[0.03] px-3 py-2">
                                <div className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">
                                  Equity prop
                                </div>
                                <div className="mt-1 text-sm font-medium text-white">
                                  {formatLiveCurrencyValue(slot.propEquity)}
                                </div>
                              </div>
                              <div className="rounded-md border border-white/8 bg-white/[0.03] px-3 py-2">
                                <div className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">
                                  Equity broker
                                </div>
                                <div className="mt-1 text-sm font-medium text-white">
                                  {formatLiveCurrencyValue(slot.brokerEquity)}
                                </div>
                              </div>
                              <div className="rounded-md border border-white/8 bg-white/[0.03] px-3 py-2">
                                <div className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">
                                  Unrealized prop
                                </div>
                                <div
                                  className={`mt-1 text-sm font-medium ${getLivePnlToneClass(slot.propUnrealizedPnl)}`}
                                >
                                  {formatLiveSignedCurrencyValue(slot.propUnrealizedPnl)}
                                </div>
                              </div>
                              <div className="rounded-md border border-white/8 bg-white/[0.03] px-3 py-2">
                                <div className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">
                                  Unrealized broker
                                </div>
                                <div
                                  className={`mt-1 text-sm font-medium ${getLivePnlToneClass(slot.brokerUnrealizedPnl)}`}
                                >
                                  {formatLiveSignedCurrencyValue(slot.brokerUnrealizedPnl)}
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between gap-3 text-sm">
                              <div className="text-muted-foreground">
                                <span className="text-foreground">{slot.phase}</span>
                                {" · "}
                                target {formatCurrency(getEffectiveCycleTarget(slot))}
                              </div>
                              <div className="text-muted-foreground">{slot.challengeState}</div>
                            </div>

                            {slot.testLog ? (
                              <div className="mt-3 rounded-md border border-white/8 bg-white/[0.03] px-3 py-2 text-xs text-zinc-400">
                                Log test: {slot.testLog}
                              </div>
                            ) : null}

                            <div className="mt-3">
                              <CycleBalanceBar
                                value={getDynamicCycleBalance(slot)}
                                leftValue={projection.failGain}
                                rightValue={projection.passLoss}
                                compact
                              />
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                className={`h-9 px-3 ${secondaryButtonClass}`}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  openSlotConnections(slot.id);
                                }}
                              >
                                Conti
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                className={`h-9 px-3 ${secondaryButtonClass}`}
                                disabled={testingSlotId === slot.id}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  openTradeTest(slot.id);
                                }}
                              >
                                {testingSlotId === slot.id ? "Trade..." : "Trade test"}
                              </Button>
                              <Button
                                type="button"
                                className={`h-9 px-3 ${secondaryButtonClass}`}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  if (slot.challengeState === "ATTIVA") {
                                    openSlotDetail(slot.id);
                                    return;
                                  }

                                  if (slotReady) {
                                    openActivateSlot(slot.id);
                                    return;
                                  }

                                  if (!propConnected || !brokerConnected) {
                                    openSlotConnections(slot.id);
                                    return;
                                  }

                                  openSlotParameters(slot.id);
                                }}
                              >
                                {slot.challengeState === "ATTIVA"
                                  ? "Apri slot"
                                  : slotReady
                                    ? "Apri slot"
                                    : "Continua"}
                              </Button>
                            </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500">
                  <span>Una coppia = challenge da una parte, broker dall'altra.</span>
                  <span className="text-white/20">•</span>
                  <button
                    type="button"
                    className="text-zinc-300 transition hover:text-white"
                    onClick={() => setActiveSection("Guida strategia")}
                  >
                    Apri guida strategia
                  </button>
                  <span className="text-white/20">•</span>
                  <button
                    type="button"
                    className="text-zinc-300 transition hover:text-white"
                    onClick={() => setActiveSection("Guida piattaforma")}
                  >
                    Apri guida piattaforma
                  </button>
                </div>
              </>
            )}
          </main>
        </div>
      </div>

      <AnimatePresence>{renderDrawer()}</AnimatePresence>
    </div>
  );
}

export default App;
