// Central data model for the platform.
// Все чувствительные к законодательству данные хранятся отдельно от UI
// и содержат источник + дату проверки (см. требования ТЗ §23, §47, §49).

export type BusinessType = "ip" | "ooo" | "individual" | "npd";

export type SourceRef = {
  name: string;
  url: string;
  lastChecked: string; // ISO date
};

export type TaxRule = {
  id: string;
  name: string;
  description: string;
  rate: number | null; // ставка (доля 0..1) или null, если неприменимо
  rateNote?: string;
  effectiveFrom: string; // ISO date
  effectiveTo?: string; // ISO date | undefined = действует
  appliesTo: BusinessType[];
  payer: string;
  sourceUrl: string;
  sourceName: string;
  lastChecked: string;
};

export type DeadlineCategory =
  | "mns"
  | "fszn"
  | "belgosstrakh"
  | "payroll"
  | "reporting"
  | "other";

export type Deadline = {
  id: string;
  title: string;
  date: string; // ISO date (в текущем году — календарь строится динамически)
  dayOffset?: number; // смещение относительно периода (напр. 22-е число)
  category: DeadlineCategory;
  appliesTo: BusinessType[];
  description: string;
  action: string;
  sourceUrl: string;
  sourceName: string;
  lastChecked: string;
  recurring?: "monthly" | "quarterly" | "yearly";
};

export type Service = {
  slug: string;
  title: string;
  short: string;
  icon: string; // lucide icon name
  problem: string;
  whatWeDo: string[];
  includes: string[];
  forWhom: string[];
  startingPrice: number | null;
  priceNote?: string;
  faq: { q: string; a: string }[];
};

export type PricePackage = {
  slug: string;
  name: string;
  tagline: string;
  fromPrice: number;
  features: string[];
  highlighted?: boolean;
  cta: string;
};

export type Article = {
  slug: string;
  title: string;
  category: string;
  shortAnswer: string;
  important: string[];
  whatToDo: string[];
  example?: string;
  mistakes?: string[];
  needAccountant: string;
  sourceName: string;
  sourceUrl: string;
  updatedAt: string;
  readingTime: number;
};

export type CaseStudy = {
  slug: string;
  businessType: BusinessType;
  industry: string;
  problem: string;
  solution: string;
  result: string;
  metric?: string;
};

export type Review = {
  id: string;
  name: string;
  businessType: BusinessType;
  businessLabel: string;
  text: string;
  verified: boolean;
  initials: string;
};

export type FaqItem = {
  q: string;
  a: string;
};

export type KnowledgeCategory = {
  slug: string;
  title: string;
  description: string;
};
