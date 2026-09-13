"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const ITEMS = [
  { label: "Главная", href: "/", icon: "User" },
  { label: "Услуги", href: "/services", icon: "BookOpen" },
  { label: "Сервисы", href: "/tools", icon: "Calculator" },
  { label: "Полезное", href: "/knowledge", icon: "FileText" },
  { label: "Контакты", href: "/contacts", icon: "Phone" },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  return (
    <div className="lg:hidden">
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 glass">
        <nav className="grid grid-cols-5">
          {ITEMS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 text-2xs transition-colors",
                  active ? "text-forest" : "text-muted"
                )}
              >
                <Icon name={item.icon} size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <Link
        href="/contacts"
        className="fixed bottom-20 right-4 z-40 flex items-center gap-2 rounded-full bg-forest px-4 py-3 text-sm font-medium text-white shadow-float lg:hidden"
      >
        <Icon name="Send" size={16} /> Консультация
      </Link>
      <div className="h-24" />
    </div>
  );
}
