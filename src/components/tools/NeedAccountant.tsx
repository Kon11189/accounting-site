"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { track } from "@/lib/analytics";

type Q = { q: string; type?: "slider"; risk?: string[]; ok?: string[] };

const QUESTIONS: Q[] = [
  { q: "Сколько операций в месяц?", type: "slider" },
  { q: "Есть сотрудники?", risk: ["да"], ok: ["нет"] },
  { q: "Сами сдаёте отчётность?", risk: ["да"], ok: ["нет"] },
  { q: "Понимаете все налоговые сроки?", risk: ["нет"], ok: ["да"] },
  { q: "Используете ЭЦП?", risk: ["нет"], ok: ["да"] },
  { q: "Знаете свой налоговый режим?", risk: ["нет"], ok: ["да"] },
  { q: "Есть внешнеэкономическая деятельность?", risk: ["да"], ok: ["нет"] },
  { q: "Есть товары / маркетплейсы / касса?", risk: ["да"], ok: ["нет"] },
];

export function NeedAccountant() {
  const [step, setStep] = useState(0);
  const [risks, setRisks] = useState(0);
  const [opCount, setOpCount] = useState(10);

  const advance = (isRisk: boolean) => {
    if (isRisk) setRisks((r) => r + 1);
    const next = step + 1;
    setStep(next);
    if (next >= QUESTIONS.length) track("calculator_complete", { tool: "need-accountant" });
  };

  const done = step >= QUESTIONS.length;
  const delegated = risks >= 4;

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
              <h3 className="text-lg font-semibold text-ink">{QUESTIONS[step].q}</h3>

              {QUESTIONS[step].type === "slider" ? (
                <div className="mt-5 rounded-2xl border border-line bg-surface p-4">
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
                    onChange={(e) => setOpCount(Number(e.target.value))}
                    className="mt-3 w-full accent-forest"
                  />
                  <div className="mt-2 flex justify-between text-2xs text-muted">
                    <span>0</span>
                    <span>200+</span>
                  </div>
                  <button
                    onClick={() => advance(opCount > 10)}
                    className="btn-base mt-4 w-full bg-forest px-5 py-3 text-sm font-medium text-white hover:bg-forest-light"
                  >
                    Далее <Icon name="ArrowRight" size={15} />
                  </button>
                </div>
              ) : (
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button onClick={() => advance(false)} className="rounded-2xl border border-line p-4 text-center text-sm font-medium text-graphite hover:border-forest/40">
                    Да / всё под контролем
                  </button>
                  <button onClick={() => advance(true)} className="rounded-2xl border border-line p-4 text-center text-sm font-medium text-graphite hover:border-forest/40">
                    Нет / не уверен
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </>
      ) : (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className={`rounded-2xl p-6 ${delegated ? "bg-forest text-white" : "bg-gold-soft"}`}>
            <p className="text-2xs font-semibold uppercase tracking-wider text-white/85">
              Результат
            </p>
            <h3 className={`mt-2 text-xl font-semibold ${delegated ? "text-white" : "text-ink"}`}>
              {delegated
                ? "Вам, скорее всего, уже стоит делегировать бухгалтерию."
                : "Пока можно вести самостоятельно, но есть зоны риска."}
            </h3>
            <p className={`mt-2 text-sm ${delegated ? "text-white/85" : "text-graphite"}`}>
              {delegated
                ? "Чем больше операций и обязательств — тем выше цена ошибки. Передайте учёт специалисту."
                : "Несколько вопросов показали риски. Бесплатная консультация поможет их закрыть."}
            </p>
          </div>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <Link href="/contacts" className="btn-base bg-forest px-5 py-3 text-sm font-medium text-white hover:bg-forest-light">
              Получить бесплатную консультацию <Icon name="ArrowRight" size={15} />
            </Link>
            <Button variant="outline" size="md" onClick={() => { setStep(0); setRisks(0); setOpCount(10); }}>
              Пройти заново
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
