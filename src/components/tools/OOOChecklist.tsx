"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

const ITEMS = [
  "Зарегистрировать ООО (через регистратора или онлайн)",
  "Открыть расчётный счёт в банке",
  "Получить ЭЦП (электронную цифровую подпись)",
  "Выбрать режим: УСН (6%) или общий порядок (налог на прибыль 18% + НДС)",
  "Подать уведомление о переходе на УСН (до 20 января, если применимо)",
  "Настроить бухгалтерский и налоговый учёт",
  "Зарегистрироваться в ЭСЧФ (обязательно при работе с НДС)",
  "Настроить учёт сотрудников (если есть) и кадровый учёт",
  "Изучить график отчётности и платежей (ФСЗН, налоги)",
];

export function OOOChecklist() {
  const [checked, setChecked] = useState<boolean[]>(() => ITEMS.map(() => false));
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ooo-checklist");
      if (raw) setChecked(JSON.parse(raw));
    } catch {}
  }, []);

  const toggle = (i: number) =>
    setChecked((c) => c.map((v, idx) => (idx === i ? !v : v)));
  const save = () => {
    try {
      localStorage.setItem("ooo-checklist", JSON.stringify(checked));
    } catch {}
    setSaved(true);
    track("calculator_complete", { tool: "ooo-checklist" });
    setTimeout(() => setSaved(false), 2000);
  };

  const done = checked.filter(Boolean).length;

  return (
    <div className="rounded-3xl border border-line bg-surface p-5 shadow-card sm:p-7">
      <div className="flex items-center justify-between">
        <p className="text-sm text-graphite">
          Готово: <span className="font-semibold text-forest">{done}</span> из {ITEMS.length}
        </p>
        <button onClick={save} className="inline-flex items-center gap-1.5 text-sm font-medium text-forest hover:underline">
          <Icon name="CheckCircle2" size={15} /> Сохранить чек-лист
        </button>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ivory-soft">
        <div className="h-full bg-forest transition-all" style={{ width: `${(done / ITEMS.length) * 100}%` }} />
      </div>

      <ul className="mt-5 space-y-2">
        {ITEMS.map((item, i) => (
          <li key={item}>
            <button onClick={() => toggle(i)} className="flex w-full items-center gap-3 rounded-xl border border-line p-3.5 text-left hover:border-forest/30">
              <span className={cn("grid h-6 w-6 shrink-0 place-items-center rounded-md border", checked[i] ? "border-forest bg-forest text-white" : "border-line-strong text-transparent")}>
                <Icon name="CheckCircle2" size={15} />
              </span>
              <span className={cn("text-sm", checked[i] ? "text-muted line-through" : "text-ink")}>{item}</span>
            </button>
          </li>
        ))}
      </ul>

      {saved && (
        <p className="mt-4 rounded-xl bg-forest-soft p-3 text-center text-sm text-forest">
          Чек-лист сохранён на этом устройстве.
        </p>
      )}
      <a href="/contacts" className="btn-base mt-5 w-full bg-forest px-5 py-3 text-sm font-medium text-white hover:bg-forest-light">
        Помочь со всем этим <Icon name="ArrowRight" size={15} />
      </a>
    </div>
  );
}
