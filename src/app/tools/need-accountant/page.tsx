import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { NeedAccountant } from "@/components/tools/NeedAccountant";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Нужен ли вам бухгалтер?",
  description: "Пройдите короткий тест и узнайте, стоит ли делегировать бухгалтерию.",
  alternates: { canonical: "/tools/need-accountant" },
};

export default function NeedAccountantPage() {
  return (
    <>
      <PageHero
        eyebrow="Проверка"
        title="Нужен ли вам бухгалтер?"
        subtitle="Ответьте на 8 вопросов — покажем, пора делегировать учёт или пока справляетесь сами."
      />
      <Section>
        <NeedAccountant />
      </Section>
    </>
  );
}
