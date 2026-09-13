import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CalendarTool } from "@/components/tools/CalendarTool";
import { Section } from "@/components/ui/Section";
import { SourceNote, Disclaimer } from "@/components/ui/SourceNote";
import { DEADLINES } from "@/data/deadlines";

export const metadata: Metadata = {
  title: "Календарь бухгалтера",
  description: "Налоговые сроки, отчётность и платежи ИП и ООО в Беларуси в одном месте.",
  alternates: { canonical: "/tools/calendar" },
};

export default function CalendarPage() {
  return (
    <>
      <PageHero
        eyebrow="Календарь"
        title="Не пропустите ни один срок"
        subtitle="Все налоговые сроки, отчётность и платежи — с фильтрами по ИП, ООО и ведомствам."
      />
      <Section>
        <CalendarTool />
        <div className="mt-6 rounded-2xl border border-gold/30 bg-gold-soft p-5">
          <SourceNote
            updatedAt={DEADLINES[0]?.lastChecked}
            sourceName="МНС / ФСЗН / Белгосстрах"
            sourceUrl="https://nalog.gov.by"
          />
          <Disclaimer className="mt-3" />
        </div>
      </Section>
    </>
  );
}
