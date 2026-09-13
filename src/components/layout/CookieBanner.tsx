"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const t = setTimeout(() => setShow(true), 900);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  };
  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-[55] px-5 pb-5 lg:bottom-5 lg:left-5 lg:right-auto lg:w-[min(380px,calc(100%-2.5rem))]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="card p-5 shadow-float">
            <p className="text-sm font-medium text-ink">Мы используем файлы cookie</p>
            <p className="mt-1.5 text-xs leading-relaxed text-graphite">
              Они помогают улучшать сайт и показывать полезное. Вы можете
              отказаться. Подробнее — в{" "}
              <a href="/contacts" className="text-forest underline">
                Политике конфиденциальности
              </a>
              .
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={accept}
                className="flex-1 rounded-full bg-forest px-4 py-2 text-sm font-medium text-white hover:bg-forest-light"
              >
                Принять
              </button>
              <button
                onClick={decline}
                className="rounded-full px-4 text-sm text-graphite hover:text-ink"
              >
                Отклонить
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
