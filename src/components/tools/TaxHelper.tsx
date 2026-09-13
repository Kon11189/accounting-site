"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { TAX_RULES } from "@/data/taxRules";
import type { BusinessType } from "@/lib/types";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Biz = "ip" | "ooo" | "npd";
type Regime = "unified" | "general" | "usn" | "npd";

const REGIMES: Record<Biz, { value: Regime; label: string }[]> = {
  ip: [
    { value: "unified", label: "Единый налог" },
    { value: "general", label: "Общий порядок" },
  ],
  ooo: [
    { value: "usn", label: "УСН (6%)" },
    { value: "general", label: "Общий порядок" },
  ],
  npd: [{ value: "npd", label: "НПД" }],
};

const BIZ_OPTIONS: { value: Biz; label: string }[] = [
  { value: "ip", label: "ИП" },
  { value: "ooo", label: "ООО" },
  { value: "npd", label: "НПД" },
];

// какой id правила показывать при выбранном режиме
const REGIME_RULE: Record<Regime, string> = {
  unified: "ip-unified",
  general: "ip-general", // для ИП; для ООО подменяем ниже
  usn: "ooo-usn",
  npd: "npd",
};

export function TaxHelper() {
  const [biz, setBiz] = useState<Biz | "">("");
  const [employees, setEmployees] = useState<"yes" | "no" | "">("");
  const [regime, setRegime] = useState<Regime | "">("");

  function pickBiz(b: Biz) {
    setBiz(b);
    setRegime(REGIMES[b][0].value);
  }

  const relevant = TAX_RULES.filter((r) => {
    if (!biz || !r.appliesTo.includes(biz as BusinessType)) return false;
    if (regime) {
      let target = REGIME_RULE[regime];
      if (biz === "ooo" && regime === "general") target = "ooo-profit";
      if (r.id !== target && !["ecp", "esf"].includes(r.id)) return false;
    }
    if ((r.id === "salary-pit" || r.id === "fszn" || r.id === "belgosstrakh") && employees !== "yes") return false;
    return true;
  });

  const showResult = biz && employees && regime;

  return (
    <div className="rounded-3xl border border-line bg-surface p-5 shadow-card sm:p-7">
      <div className="space-y-5">
        <Group title="Кто вы?">
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {BIZ_OPTIONS.map((b) => (
              <Opt key={b.value} active={biz === b.value} onClick={() => pickBiz(b.value)} label={b.label} />
            ))}
          </div>
        </Group>
        <Group title="Есть сотрудники?">
          <div className="grid grid-cols-2 gap-2 sm:max-w-xs">
            <Opt active={employees === "yes"} onClick={() => setEmployees("yes")} label="Да" />
            <Opt active={employees === "no"} onClick={() => setEmployees("no")} label="Нет" />
          </div>
        </Group>
        {biz && (
          <Group title="Система налогообложения">
            <div className="grid grid-cols-2 gap-2 sm:max-w-md">
              {REGIMES[biz].map((r) => (
                <Opt key={r.value} active={regime === r.value} onClick={() => setRegime(r.value)} label={r.label} />
              ))}
            </div>
          </Group>
        )}
      </div>

      <AnimatePresence>
        {showResult && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
            <div className="rounded-2xl border border-forest/20 bg-forest-soft p-5">
              <p className="text-sm font-semibold text-forest">Для вашего случая потенциально актуальны:</p>
              <ul className="mt-3 space-y-2">
                {relevant.map((r) => (
                  <li key={r.id} className="flex items-start gap-2.5 rounded-xl bg-surface p-3">
                    <Icon name="CheckCircle2" size={16} className="mt-0.5 shrink-0 text-forest" />
                    <span>
                      <span className="block text-sm font-medium text-ink">{r.title}</span>
                      <span className="block text-xs text-muted">{r.note ?? r.who}</span>
                      <span className="mt-1 block text-2xs text-graphite">
                        {r.period} · срок: {r.deadline}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 rounded-xl bg-gold-soft p-3 text-2xs text-graphite">
                Расчёт является справочным. Состав обязательств зависит от деталей деятельности — проверьте актуальность по официальному источнику.
              </p>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <Link href="/contacts" className="btn-base bg-forest px-5 py-3 text-sm font-medium text-white hover:bg-forest-light">
                Проверить ситуацию с бухгалтером <Icon name="ArrowRight" size={15} />
              </Link>
              <button onClick={() => track("tax_tool_use", { tool: "tax-helper" })} className="btn-base border border-line-strong px-5 py-3 text-sm text-ink hover:border-forest">
                Открыть налоговый калькулятор
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-ink">{title}</p>
      {children}
    </div>
  );
}

function Opt({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button onClick={onClick} className={cn("rounded-xl border px-3 py-2.5 text-sm transition-colors", active ? "border-forest bg-forest-soft text-forest" : "border-line text-graphite hover:border-forest/40")}>
      {label}
    </button>
  );
}
