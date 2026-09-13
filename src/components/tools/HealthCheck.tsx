"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

type Cat = "Налоги" | "Отчётность" | "Сотрудники" | "Документы" | "Касса" | "Учёт" | "Сроки";
const QUESTIONS: { q: string; cat: Cat }[] = [
  { q: "Вы уверены, что платите правильные налоги?", cat: "Налоги" },
  { q: "Отчётность сдана вовремя за последний период?", cat: "Отчётность" },
  { q: "Сотрудники оформлены и начисления верны?", cat: "Сотрудники" },
  { q: "ЭСЧФ и договоры в порядке?", cat: "Документы" },
  { q: "Есть касса — и она соответствует требованиям?", cat: "Касса" },
  { q: "Учёт доходов и расходов ведётся регулярно?", cat: "Учёт" },
  { q: "Вы знаете все ближайшие сроки?", cat: "Сроки" },
  { q: "Можете быстро назвать прибыль за месяц?", cat: "Учёт" },
  { q: "Знаете свои взносы в ФСЗН и Белгосстрах?", cat: "Сотрудники" },
  { q: "Есть резерв на неожиданные платежи?", cat: "Налоги" },
];

const CATS: Cat[] = ["Налоги", "Отчётность", "Сотрудники", "Документы", "Касса", "Учёт", "Сроки"];

export function HealthCheck() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const done = step >= QUESTIONS.length;

  const answer = (yes: boolean) => {
    const q = QUESTIONS[step];
    setScores((s) => ({ ...s, [q.cat]: (s[q.cat] ?? 0) + (yes ? 1 : 0) }));
    const next = step + 1;
    setStep(next);
    if (next >= QUESTIONS.length) track("calculator_complete", { tool: "health-check" });
  };

  const perCat = CATS.map((c) => {
    const total = QUESTIONS.filter((q) => q.cat === c).length;
    const got = scores[c] ?? 0;
    return { cat: c, pct: total ? Math.round((got / total) * 100) : 100 };
  });
  const avg = perCat.reduce((a, b) => a + b.pct, 0) / perCat.length;
  const level = avg >= 80 ? "Хороший" : avg >= 50 ? "Есть риски" : "Требует внимания";
  const tone = avg >= 80 ? "forest" : avg >= 50 ? "gold" : "red";

  return (
    <div className="rounded-3xl border border-line bg-surface p-5 shadow-card sm:p-7">
      {!done ? (
        <>
          <div className="mb-5 flex items-center justify-between text-xs text-muted">
            <span>Вопрос {step + 1} из {QUESTIONS.length}</span>
            <span>{Math.round(((step + 1) / QUESTIONS.length) * 100)}%</span>
          </div>
          <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-ivory-soft">
            <motion.div className="h-full bg-forest" animate={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }} />
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }}>
              <span className="chip">{QUESTIONS[step].cat}</span>
              <h3 className="mt-3 text-lg font-semibold text-ink">{QUESTIONS[step].q}</h3>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <button onClick={() => answer(true)} className="rounded-2xl border border-line p-4 text-center text-sm font-medium text-graphite hover:border-forest/40">Да</button>
                <button onClick={() => answer(false)} className="rounded-2xl border border-line p-4 text-center text-sm font-medium text-graphite hover:border-forest/40">Нет</button>
              </div>
            </motion.div>
          </AnimatePresence>
        </>
      ) : (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className={cn("rounded-2xl p-6", tone === "forest" ? "bg-forest text-white" : tone === "gold" ? "bg-gold-soft" : "bg-red-50")}>
            <p className="text-2xs font-semibold uppercase tracking-wider opacity-90">Ваш бухгалтерский уровень</p>
            <h3 className="mt-2 text-xl font-semibold">{level}</h3>
          </div>
          <div className="mt-5 space-y-3">
            {perCat.map((p) => (
              <div key={p.cat}>
                <div className="flex justify-between text-sm"><span className="text-graphite">{p.cat}</span><span className="tabular-nums text-muted">{p.pct}%</span></div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-ivory-soft">
                  <div className={cn("h-full", tone === "red" ? "bg-red-500" : "bg-forest")} style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <Link href="/contacts" className="btn-base mt-6 w-full bg-forest px-5 py-3 text-sm font-medium text-white hover:bg-forest-light">
            Получить разбор <Icon name="ArrowRight" size={15} />
          </Link>
        </motion.div>
      )}
    </div>
  );
}
