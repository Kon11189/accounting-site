import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { IPCostCalculator } from "@/components/tools/IPCostCalculator";
import { Section } from "@/components/ui/Section";
import { Disclaimer } from "@/components/ui/SourceNote";

export const metadata: Metadata = {
  title: "Стоимость содержания ИП",
  description: "Ориентировочные расходы на содержание ИП в Беларуси: бухгалтерия, банк, ЭЦП, обязательные платежи.",
  alternates: { canonical: "/tools/ip-cost" },
};

export default function IPCostPage() {
  return (
    <>
      <PageHero
        eyebrow="Калькулятор"
        title="Сколько стоит содержание ИП?"
        subtitle="Сложите расходы на ведение бизнеса — поймёте минимальную планку в месяц и год."
      />
      <Section>
        <IPCostCalculator />
        <p className="mt-6 text-2xs text-muted">
          <Disclaimer />
        </p>
      </Section>
    </>
  );
}
