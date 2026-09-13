"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BUSINESS_OPTIONS, SITE } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

export function ConsultForm({ source = "default" }: { source?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    business: "ip",
    message: "",
  });
  const [error, setError] = useState("");

  const update = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setError("Укажите имя и телефон.");
      return;
    }
    setError("");
    setStatus("loading");
    track("consultation_submit", { source });
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-forest/20 bg-forest-soft p-6 text-center"
      >
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-forest text-white">
          <Icon name="CheckCircle2" size={24} />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-forest">Заявка отправлена</h3>
        <p className="mt-1.5 text-sm text-graphite">
          Мы свяжемся с вами в течение рабочего дня и разберём ситуацию.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="field"
          placeholder="Ваше имя"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          autoComplete="name"
        />
        <input
          className="field"
          placeholder="+375 XX XXX-XX-XX"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          inputMode="tel"
          autoComplete="tel"
        />
      </div>

      <div>
        <p className="mb-1.5 text-xs font-medium text-muted">Вы —</p>
        <div className="flex flex-wrap gap-2">
          {BUSINESS_OPTIONS.map((opt) => (
            <button
              type="button"
              key={opt.value}
              onClick={() => {
                update("business", opt.value);
                track("business_type_select", { value: opt.value });
              }}
              className={cn(
                "rounded-full border px-3.5 py-2 text-sm transition-colors",
                form.business === opt.value
                  ? "border-forest bg-forest text-white"
                  : "border-line text-graphite hover:border-forest/40"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <textarea
        className="field min-h-[88px] resize-none"
        placeholder="Кратко опишите вопрос (необязательно)"
        value={form.message}
        onChange={(e) => update("message", e.target.value)}
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" size="lg" disabled={status === "loading"} className="w-full">
        {status === "loading" ? "Отправляем…" : "Получить консультацию"}
      </Button>

      <p className="flex items-center justify-center gap-1.5 text-2xs text-muted">
        <Icon name="Phone" size={12} /> или позвоните{" "}
        <a href={SITE.phoneHref} className="text-forest underline">
          {SITE.phone}
        </a>
      </p>
    </form>
  );
}
