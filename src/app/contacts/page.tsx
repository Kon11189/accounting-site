import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { ConsultForm } from "@/components/forms/ConsultForm";
import { Icon } from "@/components/ui/Icon";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Получите бесплатную консультацию по бухгалтерии для ИП и ООО в Беларуси.",
  alternates: { canonical: "/contacts" },
};

export default function ContactsPage() {
  return (
    <>
      <PageHero
        eyebrow="Контакты"
        title="Разберём вашу ситуацию"
        subtitle="Оставьте заявку — перезвоним в течение рабочего дня. Или напишите сами."
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-4">
            {[
              { icon: "Phone", label: "Телефон", value: SITE.phone, href: SITE.phoneHref },
              { icon: "Send", label: "Telegram", value: SITE.telegram, href: SITE.telegramUrl },
              { icon: "Mail", label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
              { icon: "Clock", label: "Режим работы", value: SITE.workHours },
              { icon: "User", label: "Формат работы", value: SITE.address },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-forest-soft text-forest">
                  <Icon name={c.icon} size={20} />
                </span>
                <div>
                  <p className="text-xs text-muted">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noopener noreferrer" className="text-[15px] font-medium text-ink hover:text-forest">
                      {c.value}
                    </a>
                  ) : (
                    <p className="text-[15px] font-medium text-ink">{c.value}</p>
                  )}
                </div>
              </div>
            ))}
            <div className="rounded-2xl border border-gold/30 bg-gold-soft p-4 text-sm text-graphite">
              Консультация бесплатна и ни к чему не обязывает. Мы поможем понять
              объём задач и предложим формат сопровождения.
            </div>
          </div>

          <div className="rounded-3xl border border-line bg-surface p-6 shadow-card">
            <h2 className="text-lg font-semibold text-ink">Оставить заявку</h2>
            <p className="mt-1 text-sm text-graphite">До 4 полей. Меньше минуты.</p>
            <div className="mt-5">
              <ConsultForm source="contacts" />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
