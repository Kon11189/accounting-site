import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { SITE } from "@/data/site";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "О компании",
  description: "За цифрами — человек. Почему мы ведём бухгалтерию для бизнеса в Беларуси.",
  alternates: { canonical: "/about" },
};

const POINTS = [
  { icon: "User", title: "Один специалист", text: "Вы всегда знаете, к кому обратиться. Один бухгалтер знает ваш бизнес." },
  { icon: "Clock", title: "Контроль сроков", text: "Следим за календарём платежей и отчётности, предупреждаем заранее." },
  { icon: "MessageCircle", title: "Понятные объяснения", text: "Объясняем без бухгалтерского языка — что и зачем." },
  { icon: "Send", title: "Электронная работа", text: "Документы и общение онлайн, без бумажной волокиты." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="О компании" title={<span>За цифрами — человек.</span>}>
        <p className="lead max-w-2xl">
          Мы ведём бухгалтерию для предпринимателей Беларуси так, чтобы вы
          думали о бизнесе, а не о сроках и формах.
        </p>
      </PageHero>
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold">Подход</h2>
            <p className="text-sm leading-relaxed text-graphite">
              Вы присылаете документы — мы занимаемся остальным. Один закреплённый
              специалист, понятные отчёты и контроль сроков. Без шаблонных фраз
              про «качество и профессионализм» — только конкретная работа.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {POINTS.map((p) => (
                <div key={p.title} className="rounded-2xl border border-line bg-surface p-4">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-forest-soft text-forest">
                    <Icon name={p.icon} size={18} />
                  </span>
                  <h3 className="mt-3 text-sm font-semibold text-ink">{p.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-graphite">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-forest p-8 text-white">
            <p className="text-2xs font-semibold uppercase tracking-wider text-white/85">Контакты</p>
            <div className="mt-5 space-y-4">
              <Contact icon="Phone" label="Телефон" value={SITE.phone} href={SITE.phoneHref} />
              <Contact icon="Send" label="Telegram" value={SITE.telegram} href={SITE.telegramUrl} />
              <Contact icon="Mail" label="Email" value={SITE.email} href={`mailto:${SITE.email}`} />
              <Contact icon="Clock" label="Режим" value={SITE.workHours} />
              <Contact icon="User" label="Регион" value="Онлайн · вся Беларусь" />
            </div>
          </div>
        </div>
      </Section>
      <CTASection />
    </>
  );
}

function Contact({ icon, label, value, href }: { icon: string; label: string; value: string; href?: string }) {
  const content = (
    <>
      <Icon name={icon} size={18} className="mt-0.5 shrink-0 text-gold" />
      <span><span className="block text-2xs text-white/85">{label}</span><span className="text-sm">{value}</span></span>
    </>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3">{content}</a>
  ) : (
    <div className="flex items-start gap-3">{content}</div>
  );
}
