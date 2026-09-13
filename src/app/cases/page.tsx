import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Кейсы",
  description: "Реальные примеры сопровождения ИП и ООО в Беларуси — появятся здесь.",
  alternates: { canonical: "/cases" },
};

export default function CasesPage() {
  return (
    <>
      <PageHero
        eyebrow="Кейсы"
        title="Реальные истории появятся здесь"
        subtitle="Мы не публикуем выдуманные кейсы. Как только получим согласие клиентов, добавим их сюда с точными цифрами и результатами."
      />
      <Section>
        <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-line-strong bg-surface p-10 text-center">
          <p className="text-sm text-muted">
            Блок наполняется. Пока что изучите полезное или оставьте заявку —
            разберём вашу ситуацию на конкретном примере.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="/knowledge" className="btn-base bg-forest px-5 py-3 text-sm font-medium text-white hover:bg-forest-light">
              Полезное
            </a>
            <a href="/contacts" className="btn-base border border-line-strong px-5 py-3 text-sm text-ink hover:border-forest">
              Оставить заявку
            </a>
          </div>
        </div>
      </Section>
      <CTASection />
    </>
  );
}
