import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES, getService } from "@/data/services";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { Accordion } from "@/components/ui/Accordion";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { BYN } from "@/lib/format";
import { SourceNote } from "@/components/ui/SourceNote";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.short,
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <PageHero eyebrow="Услуга" title={service.title} subtitle={service.short}>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/services"
            className="inline-flex items-center gap-1 text-sm text-graphite hover:text-forest"
          >
            <Icon name="ArrowRight" size={14} className="rotate-180" /> Все услуги
          </Link>
          {service.startingPrice != null && (
            <span className="chip border-forest/20 text-forest">
              от {BYN(service.startingPrice)}/мес
            </span>
          )}
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-12">
            <Block title="Проблема">
              <p className="lead">{service.problem}</p>
            </Block>
            <Block title="Что мы делаем">
              <ul className="grid gap-3 sm:grid-cols-2">
                {service.whatWeDo.map((w) => (
                  <li key={w} className="flex items-start gap-3 rounded-xl border border-line bg-surface p-4">
                    <Icon name="CheckCircle2" size={18} className="mt-0.5 shrink-0 text-forest" />
                    <span className="text-sm text-graphite">{w}</span>
                  </li>
                ))}
              </ul>
            </Block>
            <Block title="Для кого">
              <div className="flex flex-wrap gap-2">
                {service.forWhom.map((f) => (
                  <span key={f} className="chip">{f}</span>
                ))}
              </div>
            </Block>
            <Block title="Частые вопросы">
              <Accordion items={service.faq} />
            </Block>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-line bg-surface p-6 shadow-card">
              <p className="eyebrow">Что входит</p>
              <ul className="mt-4 space-y-2.5">
                {service.includes.map((inc) => (
                  <li key={inc} className="flex items-center gap-2.5 text-sm text-graphite">
                    <Icon name="CheckCircle2" size={16} className="text-forest" /> {inc}
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-line pt-5">
                <p className="text-sm text-muted">Стоимость</p>
                <p className="mt-1 text-2xl font-semibold text-ink">
                  {service.startingPrice != null
                    ? `от ${BYN(service.startingPrice)}`
                    : "Индивидуально"}
                  <span className="text-sm font-normal text-muted"> / мес</span>
                </p>
                {service.priceNote && (
                  <p className="mt-1 text-xs text-muted">{service.priceNote}</p>
                )}
              </div>
              <Link
                href="/contacts"
                className="btn-base mt-5 w-full bg-forest px-5 py-3 text-sm font-medium text-white hover:bg-forest-light"
              >
                Получить консультацию
              </Link>
              <Link
                href="/tools/calculator"
                className="btn-base mt-2 w-full border border-line-strong px-5 py-3 text-sm font-medium text-ink hover:border-forest hover:text-forest"
              >
                Рассчитать стоимость
              </Link>
              <div className="mt-4">
                <SourceNote updatedAt="2026-01-15" sourceName="МНС Республики Беларусь" sourceUrl="https://nalog.gov.by" />
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <CTASection title="Готовы передать это нам?" text="Оставьте заявку — разберём вашу ситуацию и предложим формат." />
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-ink">{title}</h2>
      {children}
    </div>
  );
}
