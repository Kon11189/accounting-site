export const BYN = (value: number): string => {
  const rounded = Math.round(value);
  return (
    new Intl.NumberFormat("ru-RU", {
      maximumFractionDigits: 0,
    }).format(rounded) + " BYN"
  );
};

export const NUM = (value: number): string => {
  return new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(
    Math.round(value)
  );
};

const MONTHS_BE = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];

export const formatDateBE = (d: Date | string): string => {
  const date = typeof d === "string" ? new Date(d) : d;
  return `${date.getDate()} ${MONTHS_BE[date.getMonth()]}`;
};

export const formatDateShort = (d: Date | string): string => {
  const date = typeof d === "string" ? new Date(d) : d;
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${dd}.${mm}.${date.getFullYear()}`;
};

export const MONTHS = MONTHS_BE;
export const MONTHS_NOM = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
];

export const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 12);
  if (digits.startsWith("375") && digits.length >= 9) {
    const code = digits.slice(3, 5);
    const a = digits.slice(5, 8);
    const b = digits.slice(8, 10);
    const c = digits.slice(10, 12);
    return `+375 ${code} ${a}-${b}-${c}`;
  }
  return value;
};
