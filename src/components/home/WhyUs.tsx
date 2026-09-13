import { Icon } from "@/components/ui/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

const POINTS = [
  {
    icon: "User",
    title: "Один специалист",
    text: "Вы всегда знаете, к кому обратиться. Один бухгалтер знает ваш бизнес.",
  },
  {
    icon: "Clock",
    title: "Контроль сроков",
    text: "Следим за календарём платежей и отчётности, предупреждаем заранее.",
  },
  {
    icon: "MessageCircle",
    title: "Понятные объяснения",
    text: "Без бухгалтерского языка. Объясняем так, чтобы было ясно, что и зачем.",
  },
  {
    icon: "Send",
    title: "Электронная работа",
    text: "Документы и общение онлайн. Без поездок в офис и бумажной волокиты.",
  },
  {
    icon: "Scale",
    title: "Прозрачная стоимость",
    text: "Понимаете, за что платите. Цены известны до начала работы.",
  },
  {
    icon: "ShieldCheck",
    title: "Спокойствие",
    text: "Отчётность сдана вовремя, налоги посчитаны верно. Вы занимаетесь бизнесом.",
  },
];

export function WhyUs() {
  return (
    <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {POINTS.map((p) => (
        <StaggerItem key={p.title}>
          <div className="h-full rounded-2xl border border-line bg-surface p-5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-ivory-soft text-forest">
              <Icon name={p.icon} size={20} />
            </span>
            <h3 className="mt-4 text-[15px] font-semibold text-ink">{p.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-graphite">{p.text}</p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
