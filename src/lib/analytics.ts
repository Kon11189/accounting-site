// Лёгкая аналитика событий (ТЗ §52). Подключите GA4 / Яндекс.Метрику через
// window.dataLayer или ym(). Функция не ломает сайт без счётчиков.
export type AnalyticsEvent =
  | "page_view"
  | "service_view"
  | "calculator_start"
  | "calculator_complete"
  | "tax_tool_use"
  | "calendar_open"
  | "article_view"
  | "consultation_open"
  | "consultation_submit"
  | "telegram_click"
  | "phone_click"
  | "pricing_view"
  | "business_type_select"
  | "switch_accountant_submit";

export function track(event: AnalyticsEvent, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    // GA4 / GTM
    if ((window as unknown as { dataLayer?: unknown[] }).dataLayer) {
      (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
        event,
        ...params,
      });
    }
    // Яндекс.Метрика
    const ym = (window as unknown as { ym?: (id: number, name: string, p?: unknown) => void })
      .ym;
    if (ym) ym(0, "reachGoal", event);
  } catch {
    /* no-op */
  }
}
