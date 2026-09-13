import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { LinkButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PRICES } from "@/data/prices";
import { BYN } from "@/lib/format";
import { Section } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Disclaimer } from "@/components/ui/SourceNote";

export const metadata: Metadata = {
  title: "Цены на бухгалтерское сопровождение",
  description:
    "Понятные пакеты для ИП и ООО. Стоимость зависит от операций, сотрудников и системы налогообложения.",
  alternates: { canonical: "/prices" },
};

export default function PricesPage() {
  return (
    <>
      <PageHero
        eyebrow="Цены"
        title="Понятные пакеты. Без скрытых платежей."
        subtitle="Цена зависит от количества операций, сотрудников и системы налогообложения. Точный расчёт — в калькуляторе."
      />
      <Section>
        <Stagger className="grid gap-5 lg:grid-cols-3">
          {PRICES.map((p) => (
            <StaggerItem key={p.slug}>
              <div
                className={`flex h-full flex-col rounded-3xl border p-7 ${
                  p.highlighted
                    ? "border-forest bg-forest text-white shadow-glow"
                    : "border-line bg-surface shadow-soft"
                }`}
              >
                {p.highlighted && (
                  <span className="mb-3 inline-flex w-fit rounded-full bg-gold px-3 py-1 text-2xs font-semibold text-white">
                    Популярный
                  </span>
                )}
                <h2 className={`text-lg font-semibold ${p.highlighted ? "text-white" : "text-ink"}`}>
                  {p.name}
                </h2>
                <p className={`mt-1 text-sm ${p.highlighted ? "text-white/85" : "text-muted"}`}>
                  {p.tagline}
                </p>
                <p className="mt-5 text-3xl font-semibold">
                  от {BYN(p.fromPrice)}
                  <span className={`text-sm font-normal ${p.highlighted ? "text-white/85" : "text-muted"}`}> / мес</span>
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Icon
                        name="CheckCircle2"
                        size={17}
                        className={`mt-0.5 shrink-0 ${p.highlighted ? "text-gold" : "text-forest"}`}
                      />
                      <span className={p.highlighted ? "text-white/90" : "text-graphite"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <LinkButton
                  href="/tools/calculator"
                  variant={p.highlighted ? "accent" : "outline"}
                  size="lg"
                  className="mt-7 w-full"
                >
                  {p.cta} <Icon name="ArrowRight" size={16} />
                </LinkButton>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-10 rounded-2xl border border-line bg-surface p-6">
          <p className="text-sm text-graphite">
            Не нашли подходящий вариант? Стоимость индивидуальна для сложных
            случаев. <LinkButton href="/tools/calculator" variant="ghost" size="sm">Рассчитайте</LinkButton> или
            получите консультацию — подберём формат под вас.
          </p>
          <Disclaimer className="mt-4" />
        </Reveal>
      </Section>
      <CTASection title="Узнайте точную цену за минуту" text="Калькулятор покажет предварительную стоимость по вашим параметрам." />
    </>
  );
}
