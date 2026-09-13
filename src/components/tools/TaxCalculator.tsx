"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { BYN } from "@/lib/format";
import { calcTax, type TaxRegime } from "@/lib/calc";
import { BUSINESS_OPTIONS } from "@/data/site";
import { RATES } from "@/data/rates";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const REGIMES: Record<"ip" | "ooo", { value: TaxRegime; label: string }[]> = {
  ip: [
    { value: "unified", label: "Единый налог" },
    { value: "general", label: "Общий порядок" },
  ],
  ooo: [
    { value: "usn", label: "УСН (6%)" },
    { value: "general", label: "Общий порядок" },
  ],
};

export function TaxCalculator() {
  const [business, setBusiness] = useState<"ip" | "ooo">("ip");
  const [regime, setRegime] = useState<TaxRegime>(
    REGIMES.ip[0].value
  );
  const [income, setIncome] = useState(485200);
  const [expense, setExpense] = useState(183400);

  const res = calcTax({ business, regime, income, expense });

  function pickBusiness(b: "ip" | "ooo") {
    setBusiness(b);
    // при смене субъекта сбрасываем режим на первый доступный для него
    setRegime(REGIMES[b][0].value);
  }

  return (
    <div className="rounded-3xl border border-line bg-surface p-5 shadow-card sm:p-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <p className="mb-1.5 text-xs font-medium text-muted">Кто вы</p>
          <div className="flex gap-2">
            {BUSINESS_OPTIONS.filter((b) => b.value === "ip" || b.value === "ooo").map((b) => (
              <button
                key={b.value}
                onClick={() => pickBusiness(b.value as "ip" | "ooo")}
                className={cn(
                  "flex-1 rounded-xl border px-3 py-2.5 text-sm transition-colors",
                  business === b.value ? "border-forest bg-forest-soft text-forest" : "border-line text-graphite"
                )}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-1.5 text-xs font-medium text-muted">Режим налогообложения</p>
          <div className="flex flex-wrap gap-2">
            {REGIMES[business].map((r) => (
              <button
                key={r.value}
                onClick={() => setRegime(r.value)}
                className={cn(
                  "rounded-xl border px-3 py-2.5 text-sm transition-colors",
                  regime === r.value ? "border-forest bg-forest-soft text-forest" : "border-line text-graphite"
                )}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
        <Field label="Доход за период, BYN" value={income} onChange={setIncome} />
        <Field label="Расходы за период, BYN" value={expense} onChange={setExpense} />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Stat label="Расчётная база" value={BYN(res.base)} />
        <Stat label="Ставка" value={res.rate ? `${Math.round(res.rate * 100)}%` : "фикс."} />
        <Stat label="Предварительный налог" value={BYN(res.tax)} accent />
      </div>

      <p className="mt-4 text-2xs font-medium text-forest">{res.label}</p>
      {res.note && (
        <p className="mt-1 text-2xs text-muted">{res.note}</p>
      )}

      <p className="mt-5 flex items-start gap-2 rounded-xl bg-ivory-soft/70 p-3 text-2xs text-muted">
        <Icon name="Clock" size={14} className="mt-0.5 shrink-0" />
        Данные сверены {RATES.lastChecked} по{" "}
        <a href={RATES.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-forest underline">
          {RATES.sourceName}
        </a>
        . ИП не применяет УСН (только организации). Расчёт предварительный — точные суммы подтверждает бухгалтер.
      </p>

      <button
        onClick={() => track("tax_tool_use", { tool: "tax-calculator" })}
        className="mt-4 w-full rounded-full border border-line-strong py-3 text-sm font-medium text-ink hover:border-forest hover:text-forest"
      >
        Проверить ситуацию с бухгалтером
      </button>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted">{label}</span>
      <input
        type="number"
        inputMode="numeric"
        className="field tabular-nums"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
      />
    </label>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={cn("rounded-2xl border p-4", accent ? "border-forest bg-forest text-white" : "border-line bg-surface")}>
      <p className={cn("text-2xs font-medium", accent ? "text-white/85" : "text-muted")}>{label}</p>
      <p className="mt-1 text-lg font-semibold tabular-nums">{value}</p>
    </div>
  );
}
