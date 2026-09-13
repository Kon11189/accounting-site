"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { track } from "@/lib/analytics";

const QS = [
  { key: "form", q: "ИП или ООО?", a: ["ИП", "ООО"] },
  { key: "emp", q: "Есть сотрудники?", a: ["Да", "Нет"] },
  { key: "online", q: "Интернет-продажи / маркетплейсы?", a: ["Да", "Нет"] },
  { key: "premise", q: "Нужно помещение / офис?", a: ["Да", "Нет"] },
  { key: "bank", q: "Нужен расчётный счёт?", a: ["Да", "Нет"] },
];

export function StartBusinessHelper() {
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState<Record<string, string>>({});

  const choose = (val: string) => {
    setAns((a) => ({ ...a, [QS[step].key]: val }));
    const next = step + 1;
    setStep(next);
    if (next >= QS.length) track("calculator_complete", { tool: "start-business" });
  };

  const done = step >= QS.length;

  const recs: string[] = [];
  if (ans.form === "ИП") recs.push("Регистрация ИП онлайн через Единый портал");
  if (ans.form === "ООО") recs.push("Регистрация ООО (устав, счёт, печать при необходимости)");
  recs.push("Выбор режима: УСН или НПД — подберём под оборот");
  if (ans.emp === "Да") recs.push("Кадровый учёт и расчёт зарплаты/взносов");
  if (ans.online === "Да") recs.push("ЭСЧФ и работа с маркетплейсами/агрегаторами");
  if (ans.bank === "Да" || ans.form === "ООО") recs.push("Открытие расчётного счёта");
  recs.push("ЭЦП для электронной отчётности");
  recs.push("Настройка учёта доходов и расходов с первого дня");

  return (
    <div className="rounded-3xl border border-line bg-surface p-5 shadow-card sm:p-7">
      {!done ? (
        <>
          <p className="text-xs text-muted">Вопрос {step + 1} из {QS.length}</p>
          <h3 className="mt-2 text-lg font-semibold text-ink">{QS[step].q}</h3>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {QS[step].a.map((a) => (
              <button key={a} onClick={() => choose(a)} className="rounded-2xl border border-line p-4 text-center text-sm font-medium text-graphite hover:border-forest/40">
                {a}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div>
          <h3 className="text-lg font-semibold text-ink">Вот что вам потребуется</h3>
          <ul className="mt-4 space-y-2.5">
            {recs.map((r) => (
              <li key={r} className="flex items-start gap-3 rounded-xl border border-line bg-surface p-3.5">
                <Icon name="CheckCircle2" size={17} className="mt-0.5 shrink-0 text-forest" />
                <span className="text-sm text-graphite">{r}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <Link href="/contacts" className="btn-base bg-forest px-5 py-3 text-sm font-medium text-white hover:bg-forest-light">
              Помочь начать <Icon name="ArrowRight" size={15} />
            </Link>
            <Link href="/tools/ip-checklist" className="btn-base border border-line-strong px-5 py-3 text-sm text-ink hover:border-forest">
              Чек-лист открытия ИП
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
