import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { IPChecklist } from "@/components/tools/IPChecklist";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Чек-лист открытия ИП",
  description: "Интерактивный чек-лист: что сделать после регистрации ИП в Беларуси.",
  alternates: { canonical: "/tools/ip-checklist" },
};

export default function IPChecklistPage() {
  return (
    <>
      <PageHero
        eyebrow="Чек-лист"
        title="Я зарегистрировал ИП. Что дальше?"
        subtitle="Отметьте пункты по мере выполнения. Чек-лист сохраняется на устройстве."
      />
      <Section>
        <IPChecklist />
      </Section>
    </>
  );
}
