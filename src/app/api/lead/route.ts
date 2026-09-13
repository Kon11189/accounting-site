import { NextResponse } from "next/server";

// Простая точка приёма заявок. В проде: валидация, rate-limit, сохранение в БД,
// отправка в CRM/Telegram. Здесь — базовая server-side валидация (ТЗ §61).
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";

  if (name.length < 2 || phone.length < 6) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  // Заглушка сохранения. Замените на запись в БД / отправку в CRM.
  // Логируем без персональных данных для соблюдения Privacy.
  console.log("[lead]", {
    source: body.source,
    at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
