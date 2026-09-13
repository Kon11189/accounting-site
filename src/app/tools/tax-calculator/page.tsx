import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { TaxCalculator } from "@/components/tools/TaxCalculator";
import { Section } from "@/components/ui/Section";
import { SourceNote, Disclaimer } from "@/components/ui/SourceNote";
import { RATES } from "@/data/rates";

export const metadata: Metadata = {
  title: "Налоговый калькулятор",
  description: "Оцените предварительный налог ИП или ООО по выбранному режиму в Беларуси.",
  alternates: { canonical: "/tools/tax-calculator" },
};

export default function TaxCalcPage() {
  return (
    <>
      <PageHero
        eyebrow="Калькулятор"
        title="Сколько налога предстоит заплатить?"
        subtitle="Введите доход и расходы — увидите расчётную базу и ориентировочную сумму налога."
      />
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <TaxCalculator />
          <aside className="space-y-4">
            <div className="rounded-2xl border border-gold/30 bg-gold-soft p-5">
              <p className="text-sm font-semibold text-ink">Важно</p>
              <p className="mt-2 text-sm leading-relaxed text-graphite">
                Калькулятор считает упрощённо по базовой ставке УСН. Реальная
                ставка зависит от вида деятельности и применяемых льгот.
              </p>
              <div className="mt-3">
                <SourceNote updatedAt={RATES.lastChecked} sourceName={RATES.sourceName} sourceUrl={RATES.sourceUrl} />
              </div>
              <Disclaimer className="mt-3" />
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
