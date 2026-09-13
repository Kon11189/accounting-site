import type { BusinessType } from "@/lib/types";

export const SITE = {
  name: "Счёт",
  domain: "schet.by",
  tagline: "Бухгалтерия, в которой всё под контроле.",
  description:
    "Ведём бухгалтерский и налоговый учёт бизнеса в Беларуси, следим за сроками и помогаем принимать решения без лишней бюрократии.",
  email: "hello@schet.by",
  phone: "+375 29 658-12-34",
  phoneHref: "tel:+375296581234",
  telegram: "@schet_by",
  telegramUrl: "https://t.me/schet_by",
  city: "Онлайн",
  address: "Онлайн-сопровождение по всей Беларуси. Физический офис не требуется — работаем удалённо.",
  workHours: "Пн–Пт, 9:00–19:00",
  // Демонстрационные контакты. Замените на реальные перед запуском.
};

export const NAV: { label: string; href: string }[] = [
  { label: "Услуги", href: "/services" },
  { label: "Для бизнеса", href: "/cases" },
  { label: "Цены", href: "/prices" },
  { label: "Сервисы", href: "/tools" },
  { label: "Полезное", href: "/knowledge" },
  { label: "О компании", href: "/about" },
];

export const MOBILE_NAV: { label: string; href: string }[] = [
  { label: "Главная", href: "/" },
  { label: "Услуги", href: "/services" },
  { label: "Сервисы", href: "/tools" },
  { label: "Полезное", href: "/knowledge" },
  { label: "Контакты", href: "/contacts" },
];

export const BUSINESS_LABELS: Record<BusinessType, string> = {
  ip: "ИП",
  ooo: "ООО",
  individual: "Физлицо",
  npd: "НПД",
};

export const BUSINESS_OPTIONS: { value: BusinessType; label: string; hint: string }[] = [
  { value: "ip", label: "ИП", hint: "Индивидуальный предприниматель" },
  { value: "ooo", label: "ООО", hint: "Общество с ограниченной ответственностью" },
  { value: "npd", label: "НПД", hint: "Налог на профессиональный доход" },
  { value: "individual", label: "Физлицо", hint: "Самозанятый / личные вопросы" },
];
