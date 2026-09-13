import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export default function NotFound() {
  return (
    <section className="shell grid min-h-[60vh] place-items-center py-24 text-center">
      <div>
        <p className="text-5xl font-semibold text-forest">404</p>
        <h1 className="mt-3 text-2xl font-semibold">Страница не найдена</h1>
        <p className="mt-2 text-graphite">Возможно, её переместили. Вернитесь на главную.</p>
        <Link href="/" className="btn-base mt-6 bg-forest px-5 py-3 text-sm font-medium text-white hover:bg-forest-light">
          На главную <Icon name="ArrowRight" size={15} />
        </Link>
      </div>
    </section>
  );
}
