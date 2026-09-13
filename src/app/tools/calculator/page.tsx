import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CostCalculator } from "@/components/tools/CostCalculator";
import { SourceNote, Disclaimer } from "@/components/ui/SourceNote";
import { Section } from "@/components/ui/Section";
import { RATES } from "@/data/rates";

export const metadata: Metadata = {
  title: "Калькулятор стоимости бухгалтерии",
  description:
    "Рассчитайте предварительную стоимость бухгалтерского сопровождения ИП или ООО в Беларуси.",
  alternates: { canonical: "/tools/calculator" },
};

export default function CalculatorPage() {
  return (
    <>
      <PageHero
        eyebrow="Калькулятор"
        title="Рассчитайте стоимость за минуту"
        subtitle="Ответьте на несколько вопросов — покажем предварительный ориентир. Точная цена — после разбора вашей ситуации."
      />
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <CostCalculator />
          <aside className="space-y-4">
            <div className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="text-sm font-semibold text-ink">Что влияет на цену</h3>
              <ul className="mt-3 space-y-2 text-sm text-graphite">
                <li>• Количество операций в месяц</li>
                <li>• Число сотрудников и зарплата</li>
                <li>• Система налогообложения</li>
                <li>• Нужны ли кадры и отчётность</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-gold/30 bg-gold-soft p-5">
              <SourceNote updatedAt={RATES.lastChecked} sourceName={RATES.sourceName} sourceUrl={RATES.sourceUrl} />
              <Disclaimer className="mt-3" />
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
