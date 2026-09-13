import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { TaxHelper } from "@/components/tools/TaxHelper";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Налоговый помощник",
  description: "Подберите потенциально актуальные налоги и обязательства по вашей ситуации.",
  alternates: { canonical: "/tools/tax-helper" },
};

export default function TaxHelperPage() {
  return (
    <>
      <PageHero
        eyebrow="Помощник"
        title="Какие налоги вам могут быть актуальны?"
        subtitle="Ответьте на три вопроса — покажем справочный набор обязательств."
      />
      <Section>
        <TaxHelper />
      </Section>
    </>
  );
}
