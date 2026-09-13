import type { CaseStudy } from "@/lib/types";

// Демонстрационные кейсы. Замените на реальные (без выдумки) перед запуском.
export const CASES: CaseStudy[] = [
  {
    slug: "ip-online-shop",
    businessType: "ip",
    industry: "Интернет-магазин",
    problem: "ИП на едином налоге запутался в ЭСЧФ и сроках уплаты.",
    solution: "Настроили учёт, автоматизировали ЭСЧФ, поставили напоминания.",
    result: "Сдача в срок, без штрафов, на 6 часов рутины в месяц меньше.",
    metric: "−6 ч/мес рутины",
  },
  {
    slug: "ooo-rosnica",
    businessType: "ooo",
    industry: "Розничная сеть",
    problem: "ООО с 8 сотрудниками — зарплата и взносы вручную с ошибками.",
    solution: "Передали расчёт зарплаты и ФСЗН, восстановили учёт.",
    result: "Ошибки устранены, сроки под контролем, отчётность сдана.",
    metric: "0 ошибок в ФСЗН",
  },
  {
    slug: "uslugi-konsalting",
    businessType: "ip",
    industry: "Консалтинг",
    problem: "Самозанятый вырос в ИП, нужно перестроить учёт.",
    solution: "Подобрали режим, настроили документооборот и отчётность.",
    result: "Понятный учёт, готовность к масштабированию.",
    metric: "Старт за 3 дня",
  },
];

export const getCase = (slug: string) => CASES.find((c) => c.slug === slug);
