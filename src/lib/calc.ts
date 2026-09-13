import { RATES } from "@/data/rates";
import type { BusinessType } from "@/lib/types";

// ============================================================================
// Все расчёты — предварительные и информационные (ТЗ §50).
// Значения берутся из централизованного RATES (см. @/data/rates) и должны быть
// сверены с официальными источниками перед публикацией.
// ============================================================================

export type EmployeeCount = "0" | "1-5" | "6-20" | "20+";
export type OperationCount = "0-30" | "31-120" | "120+";

export function employeeFactor(e: EmployeeCount): number {
  switch (e) {
    case "0": return 0;
    case "1-5": return 1;
    case "6-20": return 2.2;
    case "20+": return 4;
  }
}

export function operationFactor(o: OperationCount): number {
  switch (o) {
    case "0-30": return 0;
    case "31-120": return 1;
    case "120+": return 2.4;
  }
}

// --- Зарплата ---------------------------------------------------------------
export function calcSalary(gross: number) {
  const incomeTax = gross * RATES.incomeTax.baseRate;
  const fsznEmployee = gross * RATES.fsznEmployee;
  const net = gross - incomeTax - fsznEmployee;
  const fsznEmployer = gross * RATES.fsznEmployer;
  const belgosstrakh = gross * RATES.belgosstrakhEmployer;
  const employerTotal = gross + fsznEmployer + belgosstrakh;
  return {
    gross,
    incomeTax,
    fsznEmployee,
    net,
    fsznEmployer,
    belgosstrakh,
    employerTotal,
    overheadPct: (employerTotal - gross) / gross,
  };
}

export type TaxRegime = "usn" | "general" | "unified" | "npd";

// --- Налог (по выбранному режиму) ------------------------------------------
// Возвращает базу, ставку, сумму и человекочитаемую метку режима + примечание.
export function calcTax(opts: {
  business: BusinessType;
  regime: TaxRegime;
  income: number;
  expense: number;
}): { base: number; rate: number; tax: number; label: string; note?: string } {
  const base = Math.max(0, opts.income - opts.expense);

  // ИП не применяет УСН — доступны единый налог (фиксированный) и общий порядок.
  if (opts.business === "ip" && opts.regime === "unified") {
    return {
      base,
      rate: 0,
      tax: 0,
      label: "Единый налог (ИП)",
      note: "Сумма единого налога фиксированная и зависит от вида деятельности и региона — введите её отдельно или уточните по месту учёта.",
    };
  }

  if (opts.business === "ooo" && opts.regime === "usn") {
    return {
      base: opts.income,
      rate: RATES.usnOoo.defaultRate,
      tax: opts.income * RATES.usnOoo.defaultRate,
      label: "УСН (6% от выручки)",
    };
  }

  if (opts.business === "ooo" && opts.regime === "general") {
    return {
      base,
      rate: RATES.profitTaxOoo,
      tax: base * RATES.profitTaxOoo,
      label: "Налог на прибыль (18%) + НДС, если ведёте",
      note: "Общий порядок: налог на прибыль 18% с прибыли, плюс НДС 20% при ведении по НДС.",
    };
  }

  // ИП на общем порядке
  return {
    base,
    rate: RATES.ipGeneralRate,
    tax: base * RATES.ipGeneralRate,
    label: "Подоходный налог ИП (20%)",
    note: "Общий порядок: 20% с разницы доходы минус расходы; 30% при доходе свыше 500 000 BYN/год.",
  };
}

// --- Стоимость содержания ИП (ориентир) ------------------------------------
// Константы ориентировочные — замените на актуальные перед публикацией.
export const IP_MONTHLY = {
  accounting: 90, // бухгалтерия (базовый пакет)
  bank: 25, // обслуживание счёта (ориентир)
  ecp: 8, // ЭЦП, разнесённая на месяц (ориентир)
  mandatory: 0, // обязательные взносы ИП (зависит от статуса) — уточните
  other: 10,
};

export function calcIpCost(useAccounting = true, hasMandatory = false) {
  const monthly =
    (useAccounting ? IP_MONTHLY.accounting : 0) +
    IP_MONTHLY.bank +
    IP_MONTHLY.ecp +
    (hasMandatory ? IP_MONTHLY.mandatory : 0) +
    IP_MONTHLY.other;
  return {
    monthly,
    yearly: monthly * 12,
    items: [
      { label: "Бухгалтерия", value: useAccounting ? IP_MONTHLY.accounting : 0 },
      { label: "Обслуживание счёта", value: IP_MONTHLY.bank },
      { label: "Электронная подпись (ЭЦП)", value: IP_MONTHLY.ecp },
      { label: "Обязательные взносы ИП", value: hasMandatory ? IP_MONTHLY.mandatory : 0 },
      { label: "Прочие сервисы", value: IP_MONTHLY.other },
    ].filter((i) => i.value > 0),
  };
}

// --- Калькулятор стоимости сопровождения ------------------------------------
export function calcServiceCost(opts: {
  business: BusinessType;
  employees: EmployeeCount;
  operations: OperationCount;
  payroll: boolean;
  hr: boolean;
  reporting: boolean;
}): { from: number; to: number } {
  let base = opts.business === "ooo" ? 120 : 90;
  base += operationFactor(opts.operations) * 70;
  base += employeeFactor(opts.employees) * 45;
  if (opts.payroll) base += 40;
  if (opts.hr) base += 30;
  if (opts.reporting) base += 35;
  const from = Math.round(base);
  const to = Math.round(base * 1.8);
  return { from, to };
}
