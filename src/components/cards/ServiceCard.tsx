import Link from "next/link";
import type { Service } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-forest/30 hover:shadow-card"
    >
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-forest-soft text-forest transition-colors group-hover:bg-forest group-hover:text-white">
        <Icon name={service.icon} size={22} />
      </span>
      <h3 className="mt-4 text-base font-semibold text-ink">{service.title}</h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-graphite">
        {service.short}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-forest">
        Подробнее
        <Icon
          name="ArrowRight"
          size={15}
          className="transition-transform group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}
