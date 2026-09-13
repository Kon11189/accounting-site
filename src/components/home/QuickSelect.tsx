"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { track } from "@/lib/analytics";

const OPTIONS = [
  { key: "open-ip", label: "Открываю ИП", icon: "Rocket", biz: "ip",
    links: [
      { label: "Как открыть ИП", href: "/knowledge/kak-otkryt-ip" },
      { label: "Чек-лист открытия ИП", href: "/tools/ip-checklist" },
      { label: "Сколько стоит ИП", href: "/tools/ip-cost" },
    ] },
  { key: "ip", label: "Уже работаю как ИП", icon: "User", biz: "ip",
    links: [
      { label: "Налоговый калькулятор", href: "/tools/tax-calculator" },
      { label: "Календарь бухгалтера", href: "/tools/calendar" },
      { label: "Ведение учёта", href: "/services/accounting" },
    ] },
  { key: "ooo", label: "У меня ООО", icon: "Building2", biz: "ooo",
    links: [
      { label: "Зарплата и взносы", href: "/tools/salary" },
      { label: "Калькулятор стоимости", href: "/tools/calculator" },
      { label: "Отчётность", href: "/services/reporting" },
    ] },
  { key: "need-acc", label: "Нужен бухгалтер", icon: "Briefcase", biz: "ip",
    links: [
      { label: "Бухгалтер на аутсорсе", href: "/services/outsource" },
      { label: "Рассчитать стоимость", href: "/tools/calculator" },
      { label: "Передать учёт", href: "/switch-accountant" },
    ] },
  { key: "consult", label: "Нужна консультация", icon: "MessageCircle", biz: "ip",
    links: [
      { label: "Получить консультацию", href: "/contacts" },
      { label: "Налоговый помощник", href: "/tools/tax-helper" },
      { label: "База знаний", href: "/knowledge" },
    ] },
  { key: "taxes", label: "Хочу разобраться с налогами", icon: "Percent", biz: "ip",
    links: [
      { label: "Налоговый калькулятор", href: "/tools/tax-calculator" },
      { label: "УСН или общий порядок", href: "/knowledge/usn-ili-obshchiy" },
      { label: "Календарь сроков", href: "/tools/calendar" },
    ] },
];

export function QuickSelect() {
  const [picked, setPicked] = useState<string | null>(null);
  const selected = OPTIONS.find((o) => o.key === picked);

  const pick = (opt: (typeof OPTIONS)[number]) => {
    setPicked(opt.key);
    try {
      localStorage.setItem("bizType", opt.biz);
    } catch {}
    track("business_type_select", { value: opt.key });
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl text-balance">Что вам нужно?</h2>
      <p className="lead mt-3 max-w-xl">
        Выберите — и мы покажем то, что пригодится именно вам.
      </p>

      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {OPTIONS.map((opt) => (
          <button
            key={opt.key}
            onClick={() => pick(opt)}
            className={`group flex items-center gap-3 rounded-2xl border bg-surface p-4 text-left transition-all hover:border-forest/40 hover:shadow-soft ${
              picked === opt.key ? "border-forest ring-1 ring-forest/30" : "border-line"
            }`}
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-forest-soft text-forest transition-colors group-hover:bg-forest group-hover:text-white">
              <Icon name={opt.icon} size={20} />
            </span>
            <span className="text-[15px] font-medium text-ink">{opt.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-5 rounded-2xl border border-forest/20 bg-forest-soft p-5"
          >
            <p className="text-sm font-medium text-forest">
              Подобрали для вас:
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {selected.links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="inline-flex items-center gap-1.5 rounded-full bg-surface px-4 py-2 text-sm font-medium text-ink shadow-sm transition-colors hover:text-forest"
                >
                  {l.label} <Icon name="ArrowRight" size={14} />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
