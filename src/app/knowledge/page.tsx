import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { KnowledgeBrowser } from "@/components/knowledge/KnowledgeBrowser";
import { Section } from "@/components/ui/Section";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "База знаний",
  description: "Короткие ответы про налоги, ИП, ООО, УСН, ФСЗН, зарплату и отчётность в Беларуси.",
  alternates: { canonical: "/knowledge" },
};

export default function KnowledgePage() {
  return (
    <>
      <PageHero
        eyebrow="Полезное"
        title="База знаний с короткими ответами"
        subtitle="Без юридических полотен. Только что важно знать и что делать."
      />
      <Section>
        <KnowledgeBrowser />
      </Section>
      <CTASection />
    </>
  );
}
