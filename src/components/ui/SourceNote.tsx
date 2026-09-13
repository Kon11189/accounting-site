import { Icon } from "@/components/ui/Icon";
import { formatDateShort } from "@/lib/format";

// Блок актуальности данных (ТЗ §23, §49).
export function SourceNote({
  updatedAt,
  sourceName,
  sourceUrl,
  className,
}: {
  updatedAt?: string;
  sourceName?: string;
  sourceUrl?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-2xs text-muted ${
        className ?? ""
      }`}
    >
      <span className="inline-flex items-center gap-1">
        <Icon name="Clock" size={13} />
        {updatedAt ? `Актуально на ${formatDateShort(updatedAt)}` : "Требует проверки актуальности"}
      </span>
      {sourceName && (
        <span className="inline-flex items-center gap-1">
          <Icon name="ExternalLink" size={12} />
          Источник:
          {sourceUrl ? (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-forest underline"
            >
              {sourceName}
            </a>
          ) : (
            sourceName
          )}
        </span>
      )}
    </div>
  );
}

export function Disclaimer({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-2xs leading-relaxed text-muted ${className ?? ""}`}>
      {children ??
        "Расчёт является предварительным и носит информационный характер. Перед принятием решения проверьте актуальные нормы или получите консультацию специалиста."}
    </p>
  );
}
