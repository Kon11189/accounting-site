import type { Review } from "@/lib/types";

// Демонстрационные отзывы (шаблон). Замените подтверждёнными реальными
// отзывами клиентов перед публикацией (см. ТЗ §41 — без фальшивых отзывов).
export const REVIEWS: Review[] = [
  {
    id: "r1",
    name: "Анна К.",
    businessType: "ip",
    businessLabel: "ИП, онлайн-торговля",
    text: "Наконец понятно, сколько и когда платить. Напоминания спасают от штрафов.",
    verified: false,
    initials: "АК",
  },
  {
    id: "r2",
    name: "Дмитрий П.",
    businessType: "ooo",
    businessLabel: "ООО, услуги",
    text: "Передали учёт без боли. Один специалист всё знает про наш бизнес.",
    verified: false,
    initials: "ДП",
  },
  {
    id: "r3",
    name: "Мария С.",
    businessType: "ip",
    businessLabel: "ИП, консалтинг",
    text: "Калькуляторы помогли оценить расходы до старта. Очень удобно.",
    verified: false,
    initials: "МС",
  },
  {
    id: "r4",
    name: "Игорь В.",
    businessType: "ooo",
    businessLabel: "ООО, производство",
    text: "Зарплату и взносы ведут чётко. Вопросы объясняют без заумности.",
    verified: false,
    initials: "ИВ",
  },
];
