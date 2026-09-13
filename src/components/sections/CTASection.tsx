import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

export function CTASection({
  eyebrow = "Готовы начать",
  title = "Давайте наведём порядок в цифрах.",
  text = "Расскажите, чем занимается ваш бизнес. Мы предложим подходящий формат бухгалтерского сопровождения.",
  primaryHref = "/contacts",
  primaryLabel = "Получить консультацию",
  secondaryHref = "/tools/calculator",
  secondaryLabel = "Рассчитать стоимость",
}: {
  eyebrow?: string;
  title?: string;
  text?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="shell pb-20 lg:pb-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-forest px-6 py-14 text-white sm:px-12 lg:py-20">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/20 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-white/5 blur-2xl"
            aria-hidden
          />
          <div className="relative max-w-2xl">
            <p className="text-2xs font-semibold uppercase tracking-[0.18em] text-white/85">
              {eyebrow}
            </p>
            <h2 className="mt-3 text-2xl leading-tight sm:text-4xl text-balance">
              {title}
            </h2>
            <p className="mt-4 max-w-xl text-white/90">{text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href={primaryHref} variant="accent" size="lg">
                {primaryLabel} <Icon name="ArrowRight" size={16} />
              </LinkButton>
              <LinkButton
                href={secondaryHref}
                variant="outline"
                size="lg"
                className="border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10"
              >
                {secondaryLabel}
              </LinkButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
