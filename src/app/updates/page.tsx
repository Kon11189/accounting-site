import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { formatDateBE } from "@/lib/format";
import { UPDATES } from "@/data/faq";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Изменения в законодательстве",
  description: "Свежие изменения по налогам и отчётности для бизнеса в Беларуси.",
  alternates: { canonical: "/updates" },
};

export default function UpdatesPage() {
  return (
    <>
      <PageHero
        eyebrow="Изменения"
        title="Что изменилось в законодательстве"
        subtitle="Коротко о новом, что касается ИП и ООО. Всегда со ссылкой на источник."
      />
      <Section>
        <div className="space-y-4">
          {UPDATES.map((u) => (
            <div key={u.id} className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-soft px-3 py-1 text-xs font-medium text-forest">
                  <Icon name="Clock" size={13} /> {formatDateBE(u.date)}
                </span>
                <span className="chip">{u.who}</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-ink">{u.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-graphite">{u.what}</p>
              <a href={u.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-forest hover:underline">
                Источник: {u.sourceName} <Icon name="ExternalLink" size={13} />
              </a>
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs text-muted">
          Информация публикуется после проверки по официальным источникам. Не используйте без сверки с первоисточником.
        </p>
      </Section>
      <CTASection />
    </>
  );
}
