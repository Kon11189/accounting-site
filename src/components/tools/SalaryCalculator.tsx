"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { BYN, NUM } from "@/lib/format";
import { calcSalary } from "@/lib/calc";
import { RATES } from "@/data/rates";

export function SalaryCalculator() {
  const [gross, setGross] = useState(1500);
  const [mode, setMode] = useState<"employee" | "employer">("employer");
  const r = calcSalary(gross);

  return (
    <div className="rounded-3xl border border-line bg-surface p-5 shadow-card sm:p-7">
      <div className="grid gap-5 sm:grid-cols-[1fr_1fr]">
        <div>
          <p className="mb-1.5 text-xs font-medium text-muted">Оклад (до удержаний), BYN</p>
          <input
            type="range"
            min={300}
            max={6000}
            step={50}
            value={gross}
            onChange={(e) => setGross(Number(e.target.value))}
            className="w-full accent-forest"
          />
          <input
            type="number"
            className="field mt-3 tabular-nums"
            value={gross}
            onChange={(e) => setGross(Number(e.target.value) || 0)}
          />
        </div>
        <div>
          <p className="mb-1.5 text-xs font-medium text-muted">Что показать</p>
          <div className="flex gap-2">
            <button
              onClick={() => setMode("employee")}
              className={`flex-1 rounded-xl border px-3 py-2.5 text-sm ${mode === "employee" ? "border-forest bg-forest-soft text-forest" : "border-line text-graphite"}`}
            >
              На руки
            </button>
            <button
              onClick={() => setMode("employer")}
              className={`flex-1 rounded-xl border px-3 py-2.5 text-sm ${mode === "employer" ? "border-forest bg-forest-soft text-forest" : "border-line text-graphite"}`}
            >
              Для бизнеса
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-line bg-surface p-5">
          <p className="text-2xs font-medium text-muted">Сотрудник получает</p>
          <p className="mt-1 text-2xl font-semibold text-ink">{BYN(r.net)}</p>
          <ul className="mt-3 space-y-1.5 text-sm text-graphite">
            <li className="flex justify-between"><span>Подоходный налог</span><span className="tabular-nums">−{BYN(r.incomeTax)}</span></li>
            <li className="flex justify-between"><span>Взнос в ФСЗН</span><span className="tabular-nums">−{BYN(r.fsznEmployee)}</span></li>
          </ul>
        </div>
        <div className="rounded-2xl border border-forest bg-forest p-5 text-white">
          <p className="text-2xs font-medium text-white/85">Сотрудник обходится бизнесу</p>
          <p className="mt-1 text-2xl font-semibold">{BYN(r.employerTotal)}</p>
          <ul className="mt-3 space-y-1.5 text-sm text-white/90">
            <li className="flex justify-between"><span>Оклад</span><span className="tabular-nums">{BYN(r.gross)}</span></li>
            <li className="flex justify-between"><span>ФСЗН (работодатель)</span><span className="tabular-nums">+{BYN(r.fsznEmployer)}</span></li>
            <li className="flex justify-between"><span>Белгосстрах</span><span className="tabular-nums">+{BYN(r.belgosstrakh)}</span></li>
          </ul>
        </div>
      </div>

      <p className="mt-4 text-2xs text-muted">
        Переплата бизнеса сверх оклада: {Math.round(r.overheadPct * 100)}% (ФСЗН + Белгосстрах).
        Ориентир на {RATES.lastChecked}, источник: {RATES.sourceUrl ? "ФСЗН / МНС" : "—"}.
        Расчёт предварительный.
      </p>
    </div>
  );
}
