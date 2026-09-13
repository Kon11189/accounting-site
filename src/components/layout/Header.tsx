"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV, SITE, MOBILE_NAV } from "@/data/site";
import { LinkButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-smooth",
          scrolled ? "glass shadow-soft" : "bg-transparent"
        )}
      >
        <div
          className={cn(
            "shell flex items-center justify-between transition-all duration-300 ease-smooth",
            scrolled ? "h-14" : "h-[var(--header-h)]"
          )}
        >
          <Link href="/" className="flex items-center gap-2" aria-label={SITE.name}>
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-forest text-white text-sm font-semibold">
              С
            </span>
            <span className="text-[17px] font-semibold tracking-tight">
              {SITE.name}
              <span className="text-gold">.</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm transition-colors",
                    active ? "text-forest font-medium" : "text-graphite hover:text-ink"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <LinkButton href="/tools/calculator" variant="outline" size="sm">
              Рассчитать стоимость
            </LinkButton>
            <LinkButton href="/contacts" variant="primary" size="sm">
              Получить консультацию
            </LinkButton>
          </div>

          <button
            className="lg:hidden grid h-10 w-10 place-items-center rounded-full hover:bg-ivory-soft"
            onClick={() => setOpen(true)}
            aria-label="Открыть меню"
          >
            <Icon name="Menu" size={22} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-ink/30 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-ivory p-6 pb-10 shadow-float"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 320 }}
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="text-lg font-semibold">
                  {SITE.name}
                  <span className="text-gold">.</span>
                </span>
                <button
                  className="grid h-9 w-9 place-items-center rounded-full hover:bg-ivory-soft"
                  onClick={() => setOpen(false)}
                  aria-label="Закрыть"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
              <nav className="grid gap-1">
                {MOBILE_NAV.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className="block rounded-xl px-4 py-3.5 text-lg font-medium text-ink hover:bg-surface"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-5 grid gap-2">
                <LinkButton href="/tools/calculator" variant="outline" size="lg" className="w-full">
                  Рассчитать стоимость
                </LinkButton>
                <LinkButton href="/contacts" variant="primary" size="lg" className="w-full">
                  Получить консультацию
                </LinkButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
