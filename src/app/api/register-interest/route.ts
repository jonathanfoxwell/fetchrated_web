import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

const MAX_LEN = 200;

function clamp(value: unknown, max = MAX_LEN): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const businessName = clamp(body.businessName);
  const contactName = clamp(body.contactName);
  const email = clamp(body.email);
  const phone = clamp(body.phone, 50);

  if (!businessName || !contactName || !email) {
    return NextResponse.json(
      { error: "businessName, contactName and email are required" },
      { status: 400 },
    );
  }
  if (!email.includes("@")) {
    return NextResponse.json({ error: "invalid email" }, { status: 400 });
  }

  // The form is multi-purpose: 'pilot-confirm' for letter recipients,
  // 'register-interest' for cold visitors. Reject anything else so the source
  // column stays clean for triage.
  const allowedSources = new Set(["pilot-confirm", "register-interest"]);
  const rawSource = clamp(body.source, 50);
  const source =
    rawSource && allowedSources.has(rawSource) ? rawSource : "register-interest";

  const supabase = createServerClient();
  const { error } = await supabase.from("practice_interest").insert({
    business_name: businessName,
    contact_name: contactName,
    email,
    phone,
    source,
    user_agent: request.headers.get("user-agent")?.slice(0, MAX_LEN) ?? null,
  });

  if (error) {
    console.error("register-interest insert failed:", error);
    return NextResponse.json({ error: "submit failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
