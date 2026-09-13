import { DEADLINES } from "@/data/deadlines";
import type { BusinessType, Deadline } from "@/lib/types";

export type DeadlineEvent = Deadline & { occurrence: Date };

// Раскрывает повторяющиеся сроки (monthly/quarterly/yearly) в конкретные даты
// в пределах текущего года. Базируется на dayOffset (число месяца).
function expand(deadline: Deadline, year: number): Date[] {
  const out: Date[] = [];
  const monthOf = new Date(deadline.date).getMonth(); // опорный месяц
  if (deadline.recurring === "monthly") {
    for (let m = 0; m < 12; m++) out.push(new Date(year, m, deadline.dayOffset ?? 1));
  } else if (deadline.recurring === "quarterly") {
    for (let q = 0; q < 4; q++)
      out.push(new Date(year, monthOf + q * 3, deadline.dayOffset ?? 1));
  } else if (deadline.recurring === "yearly") {
    out.push(new Date(year, monthOf, deadline.dayOffset ?? 1));
  } else {
    out.push(new Date(deadline.date));
  }
  return out;
}

export function getEvents(year = new Date().getFullYear()): DeadlineEvent[] {
  const events: DeadlineEvent[] = [];
  for (const d of DEADLINES) {
    for (const occ of expand(d, year)) {
      events.push({ ...d, occurrence: occ });
    }
  }
  return events.sort((a, b) => a.occurrence.getTime() - b.occurrence.getTime());
}

export function getUpcoming(
  count = 4,
  filter?: BusinessType | "all"
): DeadlineEvent[] {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return getEvents()
    .filter((e) => e.occurrence >= now)
    .filter((e) => (filter && filter !== "all" ? e.appliesTo.includes(filter) : true))
    .slice(0, count);
}

export function getMonthEvents(
  monthIndex: number,
  year = new Date().getFullYear(),
  filter?: BusinessType | "all"
): DeadlineEvent[] {
  return getEvents(year)
    .filter((e) => e.occurrence.getMonth() === monthIndex)
    .filter((e) => (filter && filter !== "all" ? e.appliesTo.includes(filter) : true));
}
