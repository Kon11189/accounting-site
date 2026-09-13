import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { QuickSelect } from "@/components/home/QuickSelect";
import { WhyUs } from "@/components/home/WhyUs";
import { TodayBlock } from "@/components/home/TodayBlock";
import { ToolsPreview } from "@/components/home/ToolsPreview";
import { KnowledgePreview } from "@/components/home/KnowledgePreview";
import { CTASection } from "@/components/sections/CTASection";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { SERVICES } from "@/data/services";

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section className="pt-8">
        <Reveal>
          <QuickSelect />
        </Reveal>
      </Section>

      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Услуги"
            title="Закроем бухгалтерию под ключ."
            subtitle="Один специалист ведёт учёт, налоги и отчётность — вы видите результат."
          />
          <LinkButton href="/services" variant="outline" size="sm" className="hidden sm:inline-flex">
            Все услуги <Icon name="ArrowRight" size={15} />
          </LinkButton>
        </div>
        <Stagger className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <StaggerItem key={s.slug}>
              <ServiceCard service={s} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section className="bg-ivory-soft/50">
        <SectionHeading
          eyebrow="Почему мы"
          title="Не «качество и профессионализм». А конкретно."
          align="left"
        />
        <div className="mt-9">
          <WhyUs />
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Сегодня"
          title="Что важно прямо сейчас"
          subtitle="Ближайшие сроки и свежие изменения — автоматически из нашей базы."
        />
        <div className="mt-9">
          <TodayBlock />
        </div>
      </Section>

      <Section className="bg-ivory-soft/50">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Сервисы"
            title="Полезные инструменты для бизнеса"
            subtitle="Калькуляторы и проверки, которые пригодятся даже без бухгалтера."
          />
          <LinkButton href="/tools" variant="outline" size="sm" className="hidden sm:inline-flex">
            Все инструменты <Icon name="ArrowRight" size={15} />
          </LinkButton>
        </div>
        <div className="mt-9">
          <ToolsPreview />
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Полезное"
          title="База знаний с короткими ответами"
          subtitle="Без юридических полотен. Только то, что нужно сделать."
        />
        <div className="mt-9">
          <KnowledgePreview />
        </div>
        <div className="mt-6 text-center">
          <LinkButton href="/knowledge" variant="ghost" size="md">
            Открыть базу знаний <Icon name="ArrowRight" size={15} />
          </LinkButton>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
