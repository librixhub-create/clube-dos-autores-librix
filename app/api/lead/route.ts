// Recebe o lead do formulário do topo do site e avisa a equipe por e-mail (Resend).
// Variáveis na Vercel: RESEND_API_KEY, LEAD_NOTIFY_EMAIL (e LEAD_FROM_EMAIL, opcional).
export const runtime = "nodejs";

const clean = (v: unknown, max: number) => String(v ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  // Honeypot: só robô preenche. Finge sucesso.
  if (clean(body.website, 50)) return Response.json({ ok: true });

  const name = clean(body.name, 120);
  const phone = clean(body.phone, 40);
  const email = clean(body.email, 160);
  const service = clean(body.service, 120);
  const lang = clean(body.lang, 10);
  if (name.length < 2 || phone.replace(/\D/g, "").length < 8 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (!apiKey || !to) {
    console.warn("RESEND_API_KEY/LEAD_NOTIFY_EMAIL not set — lead not emailed");
    return Response.json({ ok: true });
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.LEAD_FROM_EMAIL || "Librix Leads <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `Novo lead (librixacademy.com): ${name}${service ? ` — ${service}` : ""}`,
        text: `Novo lead (librixacademy.com)\n\nNome: ${name}\nWhatsApp: ${phone}\nE-mail: ${email}\nServiço: ${service || "não informado"}\nIdioma: ${lang}`,
      }),
    });
    if (!res.ok) console.error("Resend error:", await res.text());
  } catch (error) {
    console.error("Resend request failed:", error);
  }
  return Response.json({ ok: true });
}
