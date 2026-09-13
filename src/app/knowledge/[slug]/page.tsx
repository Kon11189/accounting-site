import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ARTICLES, getArticle, KNOWLEDGE_CATEGORIES } from "@/data/articles";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { SourceNote } from "@/components/ui/SourceNote";
import { formatDateShort } from "@/lib/format";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return { title: a.title, description: a.shortAnswer, alternates: { canonical: `/knowledge/${slug}` } };
}

export default async function ArticlePage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const cat = KNOWLEDGE_CATEGORIES.find((c) => c.slug === a.category);

  const jsonld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    dateModified: a.updatedAt,
    author: { "@type": "Organization", name: "Счёт" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }} />
      <PageHero eyebrow={cat?.title ?? "Статья"} title={a.title}>
        <Link href="/knowledge" className="inline-flex items-center gap-1 text-sm text-graphite hover:text-forest">
          <Icon name="ArrowRight" size={14} className="rotate-180" /> База знаний
        </Link>
      </PageHero>
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <article className="space-y-9">
            <Block title="Краткий ответ"><p className="lead">{a.shortAnswer}</p></Block>
            <Block title="Что важно знать">
              <List items={a.important} />
            </Block>
            <Block title="Что делать">
              <List items={a.whatToDo} />
            </Block>
            {a.example && <Block title="Пример"><p className="text-sm leading-relaxed text-graphite">{a.example}</p></Block>}
            {a.mistakes && <Block title="Частые ошибки"><List items={a.mistakes} /></Block>}
            <Block title="Когда нужен бухгалтер">
              <p className="text-sm leading-relaxed text-graphite">{a.needAccountant}</p>
            </Block>
          </article>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-line bg-surface p-6 shadow-card">
              <SourceNote updatedAt={a.updatedAt} sourceName={a.sourceName} sourceUrl={a.sourceUrl} />
              <Link href="/contacts" className="btn-base mt-5 w-full bg-forest px-5 py-3 text-sm font-medium text-white hover:bg-forest-light">
                Сделать это за вас <Icon name="ArrowRight" size={15} />
              </Link>
              <p className="mt-3 text-2xs text-muted">
                Если хотите, чтобы мы сделали это за вас — получите консультацию.
              </p>
            </div>
          </aside>
        </div>
      </Section>
      <CTASection title="Остались вопросы?" text="Разберём вашу ситуацию и предложим понятное решение." />
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-3 text-lg font-semibold text-ink">{title}</h2>
      {children}
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((i) => (
        <li key={i} className="flex items-start gap-3 rounded-xl border border-line bg-surface p-3.5">
          <Icon name="CheckCircle2" size={17} className="mt-0.5 shrink-0 text-forest" />
          <span className="text-sm text-graphite">{i}</span>
        </li>
      ))}
    </ul>
  );
}
