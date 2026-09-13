import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ReportingChecklist } from "@/components/tools/ReportingChecklist";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Чек-лист перед сдачей отчётности",
  description: "Проверьте всё перед сдачей отчётности — интерактивный чек-лист.",
  alternates: { canonical: "/tools/reporting-checklist" },
};

export default function ReportingChecklistPage() {
  return (
    <>
      <PageHero
        eyebrow="Чек-лист"
        title="Проверка перед сдачей отчётности"
        subtitle="Пройдитесь по пунктам, чтобы ничего не упустить."
      />
      <Section>
        <ReportingChecklist />
      </Section>
    </>
  );
}
