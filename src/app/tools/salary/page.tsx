import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { SalaryCalculator } from "@/components/tools/SalaryCalculator";
import { Section } from "@/components/ui/Section";
import { SourceNote, Disclaimer } from "@/components/ui/SourceNote";
import { RATES } from "@/data/rates";

export const metadata: Metadata = {
  title: "Калькулятор зарплаты",
  description: "Узнайте, сколько сотрудник получает на руки и сколько обходится бизнесу в Беларуси.",
  alternates: { canonical: "/tools/salary" },
};

export default function SalaryPage() {
  return (
    <>
      <PageHero
        eyebrow="Калькулятор"
        title="Сколько стоит сотрудник бизнесу?"
        subtitle="Оцените зарплату «на руки» и полную нагрузку работодателя до найма."
      />
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <SalaryCalculator />
          <aside className="space-y-4">
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
