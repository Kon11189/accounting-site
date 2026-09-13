"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { BYN } from "@/lib/format";
import { calcServiceCost, type EmployeeCount, type OperationCount } from "@/lib/calc";
import { BUSINESS_OPTIONS } from "@/data/site";
import { track } from "@/lib/analytics";
import { Disclaimer } from "@/components/ui/SourceNote";
import { cn } from "@/lib/utils";

type Biz = "ip" | "ooo";
const REGIMES: Record<Biz, { value: string; label: string; hint: string }[]> = {
  ip: [
    { value: "unified", label: "Единый налог", hint: "Закрытый перечень видов деятельности" },
    { value: "general", label: "Общий порядок", hint: "Подоходный 20% с доходов минус расходы" },
  ],
  ooo: [
    { value: "usn", label: "УСН", hint: "6% от выручки (только для организаций)" },
    { value: "general", label: "Общий порядок", hint: "Налог на прибыль 18% + НДС" },
  ],
};
const EMP: { value: EmployeeCount; label: string }[] = [
  { value: "0", label: "0" },
  { value: "1-5", label: "1–5" },
  { value: "6-20", label: "6–20" },
  { value: "20+", label: "20+" },
];
const OPS: { value: OperationCount; label: string }[] = [
  { value: "0-30", label: "до 30" },
  { value: "31-120", label: "31–120" },
  { value: "120+", label: "120+" },
];

export function CostCalculator() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    business: "ip" as Biz,
    regime: "unified",
    employees: "0" as EmployeeCount,
    operations: "0-30" as OperationCount,
    payroll: false,
    hr: false,
    reporting: true,
  });
  const [opCount, setOpCount] = useState(15);

  const set = (k: keyof typeof data, v: unknown) =>
    setData((d) => ({ ...d, [k]: v }));

  // при смене субъекта сбрасываем режим на первый доступный для него
  const pickBusiness = (b: Biz) =>
    setData((d) => ({ ...d, business: b, regime: REGIMES[b][0].value }));

  const total = 7;
  const next = () => {
    if (step < total - 1) setStep(step + 1);
    else track("calculator_complete", { tool: "cost" });
  };
  const back = () => step > 0 && setStep(step - 1);

  const result = calcServiceCost(data);

  return (
    <div className="rounded-3xl border border-line bg-surface p-5 shadow-card sm:p-7">
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-muted">
          <span>Шаг {Math.min(step + 1, total)} из {total}</span>
          <span>{Math.round(((Math.min(step + 1, total)) / total) * 100)}%</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ivory-soft">
          <motion.div
            className="h-full bg-forest"
            animate={{ width: `${(Math.min(step + 1, total) / total) * 100}%` }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.3 }}
        >
          {step === 0 && (
            <Q title="Кто вы?">
              {BUSINESS_OPTIONS.filter((b) => b.value === "ip" || b.value === "ooo").map((b) => (
                <Choice key={b.value} active={data.business === b.value} onClick={() => pickBusiness(b.value as Biz)} icon="Building2" label={b.label} hint={b.hint} />
              ))}
            </Q>
          )}
          {step === 1 && (
            <Q title="Система налогообложения">
              {REGIMES[data.business].map((r) => (
                <Choice key={r.value} active={data.regime === r.value} onClick={() => set("regime", r.value)} icon="Percent" label={r.label} hint={r.hint} />
              ))}
            </Q>
          )}
          {step === 2 && (
            <Q title="Сколько сотрудников?">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {EMP.map((e) => (
                  <Choice key={e.value} active={data.employees === e.value} onClick={() => set("employees", e.value)} icon="Users" label={e.label} compact />
                ))}
              </div>
            </Q>
          )}
          {step === 3 && (
            <Q title="Сколько операций в месяц?">
              <div className="rounded-2xl border border-line bg-surface p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-graphite">Операций в месяц</span>
                  <span className="text-lg font-semibold text-forest tabular-nums">{opCount}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={200}
                  step={5}
                  value={opCount}
                  onChange={(e) => {
                    const n = Number(e.target.value);
                    setOpCount(n);
                    set("operations", n <= 30 ? "0-30" : n <= 120 ? "31-120" : "120+");
                  }}
                  className="mt-3 w-full accent-forest"
                />
                <div className="mt-2 flex justify-between text-2xs text-muted">
                  <span>0</span>
                  <span>200+</span>
                </div>
              </div>
            </Q>
          )}
          {step === 4 && (
            <Q title="Нужен ли расчёт зарплаты?">
              <Toggle active={data.payroll} onClick={() => set("payroll", !data.payroll)} />
            </Q>
          )}
          {step === 5 && (
            <Q title="Нужен ли кадровый учёт?">
              <Toggle active={data.hr} onClick={() => set("hr", !data.hr)} />
            </Q>
          )}
          {step === 6 && (
            <div>
              <h3 className="text-lg font-semibold text-ink">Предварительная стоимость</h3>
              <div className="mt-5 rounded-2xl bg-forest p-6 text-white">
                <p className="text-sm text-white/85">Ориентировочно</p>
                <p className="mt-1 text-3xl font-semibold">
                  {BYN(result.from)} – {BYN(result.to)}
                  <span className="text-base font-normal text-white/85"> / мес</span>
                </p>
                <p className="mt-3 text-sm text-white/90">
                  Точная цена зависит от деталей вашего учёта. Оставьте заявку —
                  пришлём расчёт под вашу ситуацию.
                </p>
              </div>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                <Link href="/contacts" className="btn-base bg-forest px-5 py-3 text-sm font-medium text-white hover:bg-forest-light">
                  Получить точный расчёт <Icon name="ArrowRight" size={15} />
                </Link>
                <Button variant="outline" size="md" onClick={() => setStep(0)}>
                  Пройти заново
                </Button>
              </div>
              <Disclaimer className="mt-4 text-white/85" />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {step < total - 1 && (
        <div className="mt-7 flex items-center justify-between">
          <button
            onClick={back}
            disabled={step === 0}
            className="inline-flex items-center gap-1.5 text-sm text-graphite hover:text-ink disabled:opacity-40"
          >
            <Icon name="ArrowRight" size={15} className="rotate-180" /> Назад
          </button>
          <Button onClick={next} size="md">
            Далее <Icon name="ArrowRight" size={15} />
          </Button>
        </div>
      )}
    </div>
  );
}

function Q({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Choice({
  active, onClick, icon, label, hint, compact,
}: {
  active: boolean; onClick: () => void; icon: string; label: string; hint?: string; compact?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-2xl border p-4 text-left transition-all hover:border-forest/40",
        compact ? "flex-col items-start" : "",
        active ? "border-forest bg-forest-soft ring-1 ring-forest/30" : "border-line bg-surface"
      )}
    >
      <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-xl", active ? "bg-forest text-white" : "bg-ivory-soft text-forest")}>
        <Icon name={icon} size={18} />
      </span>
      <span>
        <span className="block text-sm font-medium text-ink">{label}</span>
        {hint && <span className="block text-xs text-muted">{hint}</span>}
      </span>
    </button>
  );
}

function Toggle({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button onClick={() => active || onClick()} className={cn("rounded-2xl border p-4 text-center text-sm font-medium", active ? "border-forest bg-forest-soft text-forest" : "border-line text-graphite")}>
        Да
      </button>
      <button onClick={() => !active || onClick()} className={cn("rounded-2xl border p-4 text-center text-sm font-medium", !active ? "border-forest bg-forest-soft text-forest" : "border-line text-graphite")}>
        Нет
      </button>
    </div>
  );
}
