import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { StartBusinessHelper } from "@/components/tools/StartBusinessHelper";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Открыть бизнес",
  description: "Интерактивный помощник для запуска ИП или ООО в Беларуси.",
  alternates: { canonical: "/start-business" },
};

export default function StartBusinessPage() {
  return (
    <>
      <PageHero
        eyebrow="Старт"
        title="Открываете ИП или ООО?"
        subtitle="Ответьте на 5 вопросов — покажем, что потребуется для старта."
      />
      <Section>
        <StartBusinessHelper />
      </Section>
    </>
  );
}
