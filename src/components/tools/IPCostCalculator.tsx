"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { BYN } from "@/lib/format";
import { calcIpCost, IP_MONTHLY } from "@/lib/calc";
import { cn } from "@/lib/utils";

export function IPCostCalculator() {
  const [useAccounting, setUseAccounting] = useState(true);
  const [hasMandatory, setHasMandatory] = useState(false);
  const r = calcIpCost(useAccounting, hasMandatory);

  return (
    <div className="rounded-3xl border border-line bg-surface p-5 shadow-card sm:p-7">
      <div className="space-y-3">
        <ToggleRow label="Бухгалтерия (аутсорс)" value={IP_MONTHLY.accounting} active={useAccounting} onClick={() => setUseAccounting((v) => !v)} />
        <ToggleRow label="Обязательные взносы ИП" value={IP_MONTHLY.mandatory} active={hasMandatory} onClick={() => setHasMandatory((v) => !v)} note="зависит от статуса — уточните" />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-line bg-surface p-5">
          <p className="text-2xs font-medium text-muted">В месяц</p>
          <p className="mt-1 text-2xl font-semibold text-ink">{BYN(r.monthly)}</p>
        </div>
        <div className="rounded-2xl border border-forest bg-forest p-5 text-white">
          <p className="text-2xs font-medium text-white/85">В год</p>
          <p className="mt-1 text-2xl font-semibold">{BYN(r.yearly)}</p>
        </div>
      </div>

      <ul className="mt-5 space-y-2">
        {r.items.map((i) => (
          <li key={i.label} className="flex justify-between border-b border-line pb-2 text-sm">
            <span className="text-graphite">{i.label}</span>
            <span className="tabular-nums font-medium text-ink">{BYN(i.value)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-2xs text-muted">
        Ориентировочные расходы. Банковские тарифы и ЭЦП могут отличаться — проверьте у своего банка и удостоверяющего центра.
      </p>
    </div>
  );
}

function ToggleRow({ label, value, active, onClick, note }: { label: string; value: number; active: boolean; onClick: () => void; note?: string }) {
  return (
    <button onClick={onClick} className="flex w-full items-center justify-between rounded-2xl border border-line p-4 text-left hover:border-forest/40">
      <span className="flex items-center gap-3">
        <span className={cn("grid h-9 w-9 place-items-center rounded-xl", active ? "bg-forest text-white" : "bg-ivory-soft text-forest")}>
          <Icon name={active ? "CheckCircle2" : "Clock"} size={18} />
        </span>
        <span>
          <span className="block text-sm font-medium text-ink">{label}</span>
          {note && <span className="block text-xs text-muted">{note}</span>}
        </span>
      </span>
      <span className="text-sm tabular-nums text-graphite">{value > 0 ? BYN(value) : "—"}</span>
    </button>
  );
}
