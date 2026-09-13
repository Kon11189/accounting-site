import Link from "next/link";
import { SITE, NAV } from "@/data/site";
import { Icon } from "@/components/ui/Icon";

const COLUMNS = [
  {
    title: "Услуги",
    links: [
      { label: "Ведение бухгалтерии", href: "/services/accounting" },
      { label: "Налоговый учёт", href: "/services/taxes" },
      { label: "Отчётность", href: "/services/reporting" },
      { label: "Зарплата и ФСЗН", href: "/services/payroll" },
      { label: "Бухгалтер на аутсорсе", href: "/services/outsource" },
    ],
  },
  {
    title: "Сервисы",
    links: [
      { label: "Калькулятор стоимости", href: "/tools/calculator" },
      { label: "Налоговый калькулятор", href: "/tools/tax-calculator" },
      { label: "Калькулятор зарплаты", href: "/tools/salary" },
      { label: "Календарь бухгалтера", href: "/tools/calendar" },
      { label: "Все инструменты", href: "/tools" },
    ],
  },
  {
    title: "Полезное",
    links: [
      { label: "База знаний", href: "/knowledge" },
      { label: "Изменения", href: "/updates" },
      { label: "Кейсы", href: "/cases" },
      { label: "О компании", href: "/about" },
      { label: "Контакты", href: "/contacts" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="shell py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-forest text-white text-sm font-semibold">
                С
              </span>
              <span className="text-lg font-semibold">
                {SITE.name}
                <span className="text-gold">.</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-graphite">
              {SITE.tagline} Ведём учёт бизнеса в Беларуси и следим за сроками,
              пока вы занимаетесь делом.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={SITE.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="chip hover:border-forest"
              >
                <Icon name="Send" size={14} /> Telegram
              </a>
              <a href={SITE.phoneHref} className="chip hover:border-forest">
                <Icon name="Phone" size={14} /> {SITE.phone}
              </a>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-graphite transition-colors hover:text-forest"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. Все права защищены.</p>
          <p className="max-w-xl">
            Информация на сайте носит справочный характер. Налоговое
            законодательство может изменяться — проверяйте актуальность по
            официальным источникам МНС.
          </p>
        </div>
      </div>
    </footer>
  );
}
