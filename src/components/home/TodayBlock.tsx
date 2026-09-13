import Link from "next/link";
import { getUpcoming } from "@/lib/calendar";
import { UPDATES } from "@/data/faq";
import { Icon } from "@/components/ui/Icon";
import { formatDateBE } from "@/lib/format";

export function TodayBlock() {
  const upcoming = getUpcoming(3);
  const update = UPDATES[0];
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="rounded-2xl border border-line bg-surface p-5 lg:col-span-2">
        <div className="flex items-center justify-between">
          <p className="eyebrow">Сегодня для бизнеса</p>
          <Link
            href="/tools/calendar"
            className="inline-flex items-center gap-1 text-sm font-medium text-forest hover:underline"
          >
            Календарь <Icon name="ArrowRight" size={14} />
          </Link>
        </div>
        <ul className="mt-4 space-y-2.5">
          {upcoming.map((e) => (
            <li
              key={e.id + e.occurrence.toISOString()}
              className="flex items-center gap-3 rounded-xl border border-line px-3.5 py-3"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-forest-soft text-center text-xs font-semibold text-forest">
                {formatDateBE(e.occurrence).split(" ")[0]}
                <span className="sr-only"> </span>
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">{e.title}</p>
                <p className="text-xs text-muted">{formatDateBE(e.occurrence)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-gold/30 bg-gold-soft p-5">
        <p className="eyebrow text-forest">Изменения</p>
        {update && (
          <div className="mt-3">
            <p className="text-sm font-semibold text-ink">{update.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-graphite">
              {update.what}
            </p>
            <Link
              href="/updates"
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-forest hover:underline"
            >
              Все изменения <Icon name="ArrowRight" size={14} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
