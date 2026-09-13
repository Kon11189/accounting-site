"use client";

import { motion } from "framer-motion";
import { LinkButton } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { Icon } from "@/components/ui/Icon";

const STATUSES = [
  { label: "Отчётность", done: true },
  { label: "ФСЗН", done: true },
  { label: "МНС", done: true },
  { label: "Белгосстрах", done: false },
];

function getNextDeadlineDate(): string {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  const deadline = new Date(nextYear, nextMonth, 22);
  return deadline.toLocaleDateString("ru-BY", { day: "numeric", month: "long" });
}

const linePath =
  "M0,80 C40,72 60,40 100,46 C140,52 160,20 200,28 C240,34 260,12 300,18 L340,14";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-ivory-soft/60 via-ivory to-ivory"
        aria-hidden
      />
      <div className="shell grid items-center gap-12 pt-12 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:pt-20 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="chip mb-5">
            <Icon name="Sparkles" size={13} className="text-gold" />
            Бухгалтерия для бизнеса в Беларуси
          </span>
          <h1 className="text-[2.1rem] leading-[1.08] sm:text-5xl lg:text-[3.4rem] text-balance">
            Бухгалтерия, в которой{" "}
            <span className="text-forest">всё под контролем.</span>
          </h1>
          <p className="lead mt-5 max-w-xl text-balance">
            Ведём бухгалтерский и налоговый учёт бизнеса в Беларуси, следим за
            сроками и помогаем принимать решения без лишней бюрократии.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/contacts" variant="primary" size="lg">
              Получить консультацию <Icon name="ArrowRight" size={16} />
            </LinkButton>
            <LinkButton href="/tools/calculator" variant="outline" size="lg">
              Рассчитать стоимость
            </LinkButton>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Icon name="CheckCircle2" size={14} className="text-forest" /> ИП и ООО
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="CheckCircle2" size={14} className="text-forest" /> Онлайн по Беларуси
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="CheckCircle2" size={14} className="text-forest" /> Один специалист
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <DashboardCard />
        </motion.div>
      </div>
    </section>
  );
}

function DashboardCard() {
  return (
    <div className="relative rounded-3xl bg-surface p-6 shadow-card sm:p-7">
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-forest/5 blur-2xl"
        aria-hidden
      />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-wider text-muted">
            Финансы бизнеса
          </p>
          <p className="text-sm text-graphite">{new Date().toLocaleDateString("ru-BY", { month: "long" })} · ИП, единый налог</p>
        </div>
        <span className="grid h-9 w-9 place-items-center rounded-full bg-forest-soft text-forest">
          <Icon name="PieChart" size={18} />
        </span>
      </div>

      <div className="mt-5 space-y-3">
        <Row label="Доход" value={485200} delay={0.3} tone="ink" />
        <Row label="Расход" value={183400} delay={0.45} tone="graphite" />
        <div className="h-px bg-line" />
        <Row label="Налоги" value={42500} delay={0.6} tone="forest" />
      </div>

      <div className="mt-5 rounded-2xl bg-ivory-soft/60 p-4">
        <svg viewBox="0 0 340 90" className="h-16 w-full" preserveAspectRatio="none">
          <motion.path
            d={linePath}
            fill="none"
            stroke="#14352B"
            strokeWidth={2.5}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, delay: 0.5, ease: "easeInOut" }}
          />
        </svg>
        <p className="mt-1 text-2xs text-muted">Динамика дохода за период</p>
      </div>

      <div className="mt-4 space-y-2">
        {STATUSES.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + i * 0.12 }}
            className="flex items-center justify-between rounded-xl border border-line px-3.5 py-2.5"
          >
            <span className="text-sm text-graphite">{s.label}</span>
            {s.done ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-forest">
                <Icon name="CheckCircle2" size={15} /> Сдано
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gold">
                <Icon name="Clock" size={14} /> К 22-му числу
              </span>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="mt-4 flex items-center justify-between rounded-xl bg-forest px-4 py-3 text-white"
      >
        <span className="text-sm">Следующий срок</span>
        <span className="text-sm font-semibold">{getNextDeadlineDate()}</span>
      </motion.div>
    </div>
  );
}

function Row({
  label,
  value,
  delay,
  tone,
}: {
  label: string;
  value: number;
  delay: number;
  tone: "ink" | "graphite" | "forest";
}) {
  const color = tone === "forest" ? "text-forest" : tone === "graphite" ? "text-graphite" : "text-ink";
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-graphite">{label}</span>
      <span className={`text-lg font-semibold tabular-nums ${color}`}>
        <CountUp value={value} delay={delay} suffix=" BYN" />
      </span>
    </div>
  );
}
