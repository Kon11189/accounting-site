import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

const TOOLS = [
  { icon: "Calculator", title: "Калькулятор стоимости", text: "Узнайте предварительную цену сопровождения.", href: "/tools/calculator" },
  { icon: "Percent", title: "Налоговый калькулятор", text: "Оцените налог по вашему режиму.", href: "/tools/tax-calculator" },
  { icon: "Wallet", title: "Калькулятор зарплаты", text: "Сколько стоит сотрудник бизнесу.", href: "/tools/salary" },
  { icon: "Banknote", title: "Стоимость ИП", text: "Расходы на содержание ИП в год.", href: "/tools/ip-cost" },
  { icon: "Calendar", title: "Календарь бухгалтера", text: "Все сроки в одном месте.", href: "/tools/calendar" },
  { icon: "HelpCircle", title: "Нужен ли бухгалтер?", text: "Проверьте за минуту.", href: "/tools/need-accountant" },
];

export function ToolsPreview() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {TOOLS.map((t) => (
        <Link
          key={t.href}
          href={t.href}
          className="group flex flex-col rounded-2xl border border-line bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-forest/30 hover:shadow-card"
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-forest-soft text-forest transition-colors group-hover:bg-forest group-hover:text-white">
            <Icon name={t.icon} size={20} />
          </span>
          <h3 className="mt-4 text-[15px] font-semibold text-ink">{t.title}</h3>
          <p className="mt-1.5 flex-1 text-sm leading-relaxed text-graphite">{t.text}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-forest">
            Открыть <Icon name="ArrowRight" size={14} className="transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      ))}
    </div>
  );
}
