import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { OOOChecklist } from "@/components/tools/OOOChecklist";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Чек-лист регистрации ООО",
  description: "Интерактивный чек-лист: что сделать после регистрации ООО в Беларуси.",
  alternates: { canonical: "/tools/ooo-checklist" },
};

export default function OOOChecklistPage() {
  return (
    <>
      <PageHero
        eyebrow="Чек-лист"
        title="Я зарегистрировал ООО. Что дальше?"
        subtitle="Отметьте пункты по мере выполнения. Чек-лист сохраняется на устройстве."
      />
      <Section>
        <OOOChecklist />
      </Section>
    </>
  );
}
