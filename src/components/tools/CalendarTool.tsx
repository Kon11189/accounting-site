"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { getEvents } from "@/lib/calendar";
import { MONTHS } from "@/lib/format";
import { formatDateBE } from "@/lib/format";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

const CATS = [
  { id: "all", label: "Все" },
  { id: "mns", label: "МНС" },
  { id: "fszn", label: "ФСЗН" },
  { id: "belgosstrakh", label: "Белгосстрах" },
  { id: "payroll", label: "Зарплата" },
];
const BIZ = [
  { id: "all", label: "Все" },
  { id: "ip", label: "ИП" },
  { id: "ooo", label: "ООО" },
];

export function CalendarTool() {
  const year = new Date().getFullYear();
  const [month, setMonth] = useState(new Date().getMonth());
  const [biz, setBiz] = useState<"all" | "ip" | "ooo">("all");
  const [cat, setCat] = useState("all");
  const [selected, setSelected] = useState<string | null>(null);

  const events = useMemo(() => getEvents(year), [year]);
  const monthEvents = useMemo(
    () =>
      events
        .filter((e) => e.occurrence.getMonth() === month)
        .filter((e) => (biz === "all" ? true : e.appliesTo.includes(biz)))
        .filter((e) => (cat === "all" ? true : e.category === cat))
        .sort((a, b) => a.occurrence.getTime() - b.occurrence.getTime()),
    [events, month, biz, cat]
  );

  const detail = selected ? monthEvents.find((e) => e.id + e.occurrence.toISOString() === selected) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div>
        <div className="flex flex-wrap gap-2">
          {BIZ.map((b) => (
            <Filter key={b.id} active={biz === b.id} onClick={() => setBiz(b.id as typeof biz)} label={b.label} />
          ))}
          <span className="mx-1 w-px self-stretch bg-line" />
          {CATS.map((c) => (
            <Filter key={c.id} active={cat === c.id} onClick={() => setCat(c.id)} label={c.label} />
          ))}
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {MONTHS.map((m, i) => (
            <button
              key={m}
              onClick={() => setMonth(i)}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-1.5 text-sm transition-colors",
                month === i ? "bg-forest text-white" : "border border-line text-graphite hover:border-forest/40"
              )}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="mt-4 space-y-2.5">
          {monthEvents.length === 0 && (
            <p className="rounded-2xl border border-line bg-surface p-5 text-sm text-muted">
              На выбранные фильтры событий в этом месяце нет. Попробуйте сменить месяц или категорию.
            </p>
          )}
          {monthEvents.map((e) => (
            <button
              key={e.id + e.occurrence.toISOString()}
              onClick={() => {
                setSelected(e.id + e.occurrence.toISOString());
                track("calendar_open", { id: e.id });
              }}
              className="flex w-full items-center gap-3 rounded-2xl border border-line bg-surface p-4 text-left transition-all hover:border-forest/30 hover:shadow-soft"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-forest-soft text-center text-xs font-semibold text-forest">
                {formatDateBE(e.occurrence).split(" ")[0]}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-ink">{e.title}</span>
                <span className="block text-xs text-muted">{e.appliesTo.map((a) => (a === "ip" ? "ИП" : a === "ooo" ? "ООО" : a)).join(", ")}</span>
              </span>
              <Icon name="ArrowRight" size={16} className="shrink-0 text-muted" />
            </button>
          ))}
        </div>
      </div>

      <div>
        <AnimatePresence mode="wait">
          {detail ? (
            <motion.div
              key={detail.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-3xl border border-forest/20 bg-forest-soft p-6"
            >
              <p className="text-2xs font-semibold uppercase tracking-wider text-forest">
                {formatDateBE(detail.occurrence)}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-ink">{detail.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-graphite">{detail.description}</p>
              <div className="mt-4 rounded-xl bg-surface p-4">
                <p className="text-xs font-medium text-muted">Что нужно сделать</p>
                <p className="mt-1 text-sm text-ink">{detail.action}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <a href="/contacts" className="btn-base bg-forest px-4 py-2.5 text-sm font-medium text-white hover:bg-forest-light">
                  Поручить бухгалтеру <Icon name="ArrowRight" size={14} />
                </a>
                <a href={detail.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn-base border border-line-strong px-4 py-2.5 text-sm text-ink hover:border-forest">
                  Источник: {detail.sourceName} <Icon name="ExternalLink" size={14} />
                </a>
              </div>
              <p className="mt-3 text-2xs text-muted">
                Проверено: {detail.lastChecked}. Даты могут меняться — сверяйтесь с официальным источником.
              </p>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid h-full place-items-center rounded-3xl border border-dashed border-line bg-surface/50 p-10 text-center">
              <div>
                <Icon name="Calendar" size={28} className="mx-auto text-muted" />
                <p className="mt-3 text-sm text-muted">Выберите событие слева, чтобы увидеть детали и ссылку на источник.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Filter({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full px-3.5 py-1.5 text-sm transition-colors",
        active ? "bg-forest text-white" : "border border-line text-graphite hover:border-forest/40"
      )}
    >
      {label}
    </button>
  );
}
