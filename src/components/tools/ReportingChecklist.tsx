"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const ITEMS = [
  "Проверены доходы",
  "Проверены расходы",
  "Проверены документы (ЭСЧФ, акты)",
  "Проверены сотрудники (начисления, отпуска)",
  "Проверены платежи (ФСЗН, Белгосстрах)",
  "Проверены сроки сдачи",
  "Проверена декларация",
];

export function ReportingChecklist() {
  const [checked, setChecked] = useState<boolean[]>(() => ITEMS.map(() => false));
  const done = checked.filter(Boolean).length;
  const all = done === ITEMS.length;

  return (
    <div className="rounded-3xl border border-line bg-surface p-5 shadow-card sm:p-7">
      <p className="text-sm text-graphite">Готово: <span className="font-semibold text-forest">{done}</span> из {ITEMS.length}</p>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ivory-soft">
        <div className="h-full bg-forest transition-all" style={{ width: `${(done / ITEMS.length) * 100}%` }} />
      </div>
      <ul className="mt-5 space-y-2">
        {ITEMS.map((item, i) => (
          <li key={item}>
            <button onClick={() => setChecked((c) => c.map((v, idx) => (idx === i ? !v : v)))} className="flex w-full items-center gap-3 rounded-xl border border-line p-3.5 text-left hover:border-forest/30">
              <span className={cn("grid h-6 w-6 shrink-0 place-items-center rounded-md border", checked[i] ? "border-forest bg-forest text-white" : "border-line-strong text-transparent")}>
                <Icon name="CheckCircle2" size={15} />
              </span>
              <span className={cn("text-sm", checked[i] ? "text-muted line-through" : "text-ink")}>{item}</span>
            </button>
          </li>
        ))}
      </ul>
      {all ? (
        <div className="mt-5 rounded-2xl bg-forest p-5 text-center text-white">
          <p className="text-lg font-semibold">Готово</p>
          <p className="mt-1 text-sm text-white/90">Отлично. Финальную проверку лучше доверить бухгалтеру.</p>
          <Link href="/contacts" className="btn-base mt-4 bg-gold px-5 py-3 text-sm font-medium text-white">
            Попросить бухгалтера проверить <Icon name="ArrowRight" size={15} />
          </Link>
        </div>
      ) : (
        <p className="mt-4 text-center text-sm text-muted">Отметьте всё — появится кнопка проверки.</p>
      )}
    </div>
  );
}
