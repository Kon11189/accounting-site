import Link from "next/link";
import { ARTICLES } from "@/data/articles";
import { Icon } from "@/components/ui/Icon";
import { formatDateShort } from "@/lib/format";

export function KnowledgePreview() {
  const items = ARTICLES.slice(0, 4);
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((a) => (
        <Link
          key={a.slug}
          href={`/knowledge/${a.slug}`}
          className="group rounded-2xl border border-line bg-surface p-5 transition-all hover:border-forest/30 hover:shadow-card"
        >
          <span className="chip">{a.category}</span>
          <h3 className="mt-3 text-[15px] font-semibold text-ink group-hover:text-forest">
            {a.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-graphite line-clamp-2">
            {a.shortAnswer}
          </p>
          <p className="mt-3 text-2xs text-muted">
            Обновлено {formatDateShort(a.updatedAt)} · {a.readingTime} мин
          </p>
        </Link>
      ))}
    </div>
  );
}
