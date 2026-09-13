import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { HealthCheck } from "@/components/tools/HealthCheck";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Проверка здоровья бизнеса",
  description: "Business Health Check — оцените уровень бухгалтерии вашего бизнеса за 10 вопросов.",
  alternates: { canonical: "/tools/health-check" },
};

export default function HealthCheckPage() {
  return (
    <>
      <PageHero
        eyebrow="Проверка"
        title="Проверьте здоровье вашего учёта"
        subtitle="10 вопросов — и понятная картина по налогам, отчётности, сотрудникам и срокам."
      />
      <Section>
        <HealthCheck />
      </Section>
    </>
  );
}
