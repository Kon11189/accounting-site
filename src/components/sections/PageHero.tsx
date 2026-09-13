import type { ReactNode } from "react";
import { Container } from "@/components/ui/Section";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-ivory-soft/70 to-ivory">
      <Container className="pb-12 pt-10 sm:pb-16 sm:pt-14">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className="max-w-3xl text-3xl leading-[1.1] sm:text-4xl lg:text-5xl text-balance">
          {title}
        </h1>
        {subtitle && <p className="lead mt-4 max-w-2xl text-balance">{subtitle}</p>}
        {children && <div className="mt-7">{children}</div>}
      </Container>
    </section>
  );
}
