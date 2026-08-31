import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Contact intake.
 *
 * Deliberately server-side only: the browser never holds a mailbox address,
 * an API key or a CRM endpoint. Validation, rate limiting and the honeypot
 * check all run here, because anything enforced in the browser is advisory.
 *
 * Before launch, set CONTACT_DESTINATION so submissions have somewhere to go.
 * Until then the endpoint refuses honestly rather than silently dropping a
 * visitor's message.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const str = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "נשלחו יותר מדי פניות מכתובת זו. נסו שוב מאוחר יותר." },
      { status: 429 }
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "בקשה לא תקינה." }, { status: 400 });
  }

  // honeypot: a real person never fills this in
  if (str(payload.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = str(payload.name, 120);
  const email = str(payload.email, 200);
  const message = str(payload.message, 5000);
  const phone = str(payload.phone, 60);
  const organization = str(payload.organization, 160);
  const topic = str(payload.topic, 60) || "general";
  const consent = payload.consent === "on" || payload.consent === true;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "יש למלא שם, דוא״ל ופרטי פנייה." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ error: "כתובת הדוא״ל אינה תקינה." }, { status: 400 });
  }
  if (!consent) {
    return NextResponse.json(
      { error: "יש לאשר את היידוע לפי חוק הגנת הפרטיות." },
      { status: 400 }
    );
  }

  const destination = process.env.CONTACT_DESTINATION;
  if (!destination) {
    return NextResponse.json(
      {
        error:
          "טופס האתר עדיין אינו מחובר לתיבת הדואר. אנא פנו אלינו בטלפון או בדוא״ל המופיעים בעמוד.",
      },
      { status: 503 }
    );
  }

  // Never log the message body or contact details — only that a submission arrived.
  console.info(`[contact] submission received · topic=${topic} · org=${organization ? "yes" : "no"} · phone=${phone ? "yes" : "no"}`);

  // TODO(pre-launch): deliver to `destination` via the approved transactional
  // mail provider or CRM endpoint, and record consent with a timestamp.

  return NextResponse.json({ ok: true });
}
