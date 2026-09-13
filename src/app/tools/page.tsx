import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Полезные инструменты для бизнеса",
  description:
    "Калькуляторы налогов, зарплаты, стоимости ИП, календарь бухгалтера, чек-листы и проверки.",
  alternates: { canonical: "/tools" },
};

const TOOLS = [
  { icon: "Calculator", title: "Калькулятор стоимости", text: "Сколько стоит бухгалтерское сопровождение.", href: "/tools/calculator", tag: "Популярное" },
  { icon: "Percent", title: "Налоговый калькулятор", text: "Оцените налог по режиму ИП или ООО.", href: "/tools/tax-calculator" },
  { icon: "Wallet", title: "Калькулятор зарплаты", text: "Сколько сотрудник стоит бизнесу.", href: "/tools/salary" },
  { icon: "Banknote", title: "Стоимость ИП", text: "Расходы на содержание ИП в месяц и год.", href: "/tools/ip-cost" },
  { icon: "Calendar", title: "Календарь бухгалтера", text: "Все налоговые сроки и отчётность.", href: "/tools/calendar" },
  { icon: "HelpCircle", title: "Нужен ли бухгалтер?", text: "Тест за минуту — проверьте риски.", href: "/tools/need-accountant" },
  { icon: "ListChecks", title: "Чек-лист открытия ИП", text: "Что сделать после регистрации.", href: "/tools/ip-checklist" },
  { icon: "ClipboardCheck", title: "Чек-лист регистрации ООО", text: "Что сделать после регистрации.", href: "/tools/ooo-checklist" },
  { icon: "ClipboardCheck", title: "Чек-лист отчётности", text: "Проверка перед сдачей.", href: "/tools/reporting-checklist" },
  { icon: "HeartPulse", title: "Проверка здоровья бизнеса", text: "Business Health Check.", href: "/tools/health-check" },
  { icon: "Sparkles", title: "Налоговый помощник", text: "Подберём актуальные налоги.", href: "/tools/tax-helper" },
];

export default function ToolsPage() {
  return (
    <>
      <PageHero
        eyebrow="Сервисы"
        title="Полезные инструменты для бизнеса"
        subtitle="Калькуляторы и проверки, которые пригодятся даже без бухгалтера. Все расчёты — предварительные."
      />
      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((t) => (
            <a
              key={t.href}
              href={t.href}
              className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-forest/30 hover:shadow-card"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-forest-soft text-forest transition-colors group-hover:bg-forest group-hover:text-white">
                  <Icon name={t.icon} size={20} />
                </span>
                {t.tag && <span className="chip border-gold/30 text-gold">{t.tag}</span>}
              </div>
              <h3 className="mt-4 text-[15px] font-semibold text-ink group-hover:text-forest">
                {t.title}
              </h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-graphite">{t.text}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-forest">
                Открыть <Icon name="ArrowRight" size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          ))}
        </div>
      </Section>
      <CTASection title="Не разобрались сами?" text="Опишите ситуацию — бухгалтер разберёт и подскажет следующий шаг." />
    </>
  );
}
