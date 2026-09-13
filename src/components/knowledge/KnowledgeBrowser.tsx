"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { KNOWLEDGE_CATEGORIES, ARTICLES } from "@/data/articles";
import { formatDateShort } from "@/lib/format";
import { cn } from "@/lib/utils";

export function KnowledgeBrowser() {
  const [cat, setCat] = useState("all");
  const items = cat === "all" ? ARTICLES : ARTICLES.filter((a) => a.category === cat);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setCat("all")} className={chipCls(cat === "all")}>Все</button>
        {KNOWLEDGE_CATEGORIES.map((c) => (
          <button key={c.slug} onClick={() => setCat(c.slug)} className={chipCls(cat === c.slug)}>
            {c.title}
          </button>
        ))}
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((a) => (
          <Link key={a.slug} href={`/knowledge/${a.slug}`} className="group rounded-2xl border border-line bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-forest/30 hover:shadow-card">
            <span className="chip">{a.category}</span>
            <h3 className="mt-3 text-[15px] font-semibold text-ink group-hover:text-forest">{a.title}</h3>
            <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-graphite">{a.shortAnswer}</p>
            <p className="mt-3 text-2xs text-muted">Обновлено {formatDateShort(a.updatedAt)} · {a.readingTime} мин</p>
          </Link>
        ))}
      </div>
      {items.length === 0 && (
        <p className="mt-6 text-sm text-muted">Статей в этой категории пока нет. Скоро добавим.</p>
      )}
    </div>
  );
}

function chipCls(active: boolean) {
  return cn(
    "rounded-full px-3.5 py-1.5 text-sm transition-colors",
    active ? "bg-forest text-white" : "border border-line text-graphite hover:border-forest/40"
  );
}
