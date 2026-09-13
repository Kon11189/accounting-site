import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { ConsultForm } from "@/components/forms/ConsultForm";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Сменить бухгалтера",
  description: "Переход к новому бухгалтеру без боли: приём, проверка и ведение учёта.",
  alternates: { canonical: "/switch-accountant" },
};

const STEPS = [
  { n: 1, title: "Получаем документы", text: "Вы передаёте доступы и то, что есть на руках." },
  { n: 2, title: "Проверяем состояние учёта", text: "Находим проблемные места и риски до приёма." },
  { n: 3, title: "Находим проблемные места", text: "Фиксируем, что нужно поправить." },
  { n: 4, title: "Принимаем бухгалтерию", text: "Оформляем приём-передачу и закрываем период." },
  { n: 5, title: "Дальше ведём сами", text: "Вы занимаетесь бизнесом — цифры под контролем." },
];

export default function SwitchPage() {
  return (
    <>
      <PageHero
        eyebrow="Переход"
        title="Хотите сменить бухгалтера?"
        subtitle="Примем учёт без потерь: проверим состояние, найдём риски и продолжим ведение."
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <ol className="space-y-4">
              {STEPS.map((s) => (
                <li key={s.n} className="flex gap-4 rounded-2xl border border-line bg-surface p-5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-forest text-sm font-semibold text-white">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="text-[15px] font-semibold text-ink">{s.title}</h3>
                    <p className="mt-1 text-sm text-graphite">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-card lg:sticky lg:top-24 lg:self-start">
            <h2 className="text-lg font-semibold text-ink">Обсудить переход</h2>
            <p className="mt-1 text-sm text-graphite">Расскажите о ситуации — оценим объём.</p>
            <div className="mt-5">
              <ConsultForm source="switch-accountant" />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
