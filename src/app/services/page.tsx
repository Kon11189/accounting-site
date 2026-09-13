import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { CTASection } from "@/components/sections/CTASection";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SERVICES } from "@/data/services";

export const metadata: Metadata = {
  title: "Услуги бухгалтерского сопровождения",
  description:
    "Ведение бухгалтерии, налоговый учёт, отчётность, ФСЗН, зарплата, кадры и регистрация бизнеса в Беларуси.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Услуги"
        title="Закроем бухгалтерию под ключ."
        subtitle="Один специалист ведёт учёт, налоги и отчётность — вы видите результат и понимаете цифры."
      />
      <section className="shell py-14 lg:py-20">
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <StaggerItem key={s.slug}>
              <ServiceCard service={s} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>
      <CTASection
        title="Не знаете, что именно нужно?"
        text="Опишите бизнес — подберём формат сопровождения под вашу ситуацию."
      />
    </>
  );
}
