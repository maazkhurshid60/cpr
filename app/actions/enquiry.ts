"use server";

import { SITE } from "@/lib/site";

/* ============================================================================
   Every form on the site (seat requests, group quotes, general contact) sends
   through here.

   Two rules:
     1. The visitor is only told it worked if the email provider accepted it.
     2. An enquiry is never lost quietly. If email is not set up or fails, the
        details go to the server log at error level, and the visitor is given
        the phone number and email instead of a false "thank you".

   SETUP (see .env.example):
     RESEND_API_KEY   API key from resend.com
     LEAD_TO_EMAIL    Inbox for enquiries (defaults to the business Gmail)
     LEAD_FROM_EMAIL  Sender on a domain verified with Resend. A Gmail address
                      cannot be the sender.
   ========================================================================== */

export type EnquiryState = { ok: boolean; message: string } | null;

const KINDS = {
  seat: "Seat request",
  group: "Group / onsite training quote",
  contact: "General enquiry",
} as const;
type Kind = keyof typeof KINDS;

/** Field name -> label, in the order they appear in the email. */
const FIELDS: [string, string][] = [
  ["name", "Name"],
  ["company", "Organization"],
  ["email", "Email"],
  ["phone", "Phone"],
  ["course", "Course"],
  ["session", "Class date"],
  ["seats", "Seats"],
  ["groupSize", "Group size"],
  ["industry", "Industry"],
  ["location", "Training location"],
  ["city", "City"],
  ["dates", "Preferred dates"],
  ["payment", "Payment"],
  ["message", "Message"],
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Trim, cap length, and strip the line breaks that allow header injection. */
const clean = (v: FormDataEntryValue | null, max = 300) =>
  String(v ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);

const FALLBACK = `Sorry, your message didn't go through. Please call ${SITE.phone} or email ${SITE.email}.`;

export async function sendEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  // Honeypot: hidden from people, filled in by bots. Pretend it worked.
  if (clean(formData.get("website"))) return { ok: true, message: "Thanks! We'll be in touch soon." };

  const kindRaw = clean(formData.get("kind"));
  const kind: Kind = kindRaw in KINDS ? (kindRaw as Kind) : "contact";
  const name = clean(formData.get("name"), 120);
  const email = clean(formData.get("email"), 160);
  const phone = clean(formData.get("phone"), 40);

  if (!name) return { ok: false, message: "Please enter your name." };
  if (!EMAIL_RE.test(email)) return { ok: false, message: "Please enter a valid email address." };
  if (kind !== "contact" && !phone) return { ok: false, message: "Please enter a phone number so we can confirm." };

  const lines = FIELDS.map(([key, label]) => {
    const v = clean(formData.get(key), key === "message" ? 4000 : 300);
    return v ? `${label}: ${v}` : null;
  }).filter(Boolean);
  const text = `${KINDS[kind]} from the website\n\n${lines.join("\n")}`;
  const subject = `${KINDS[kind]}: ${name}${formData.get("company") ? ` (${clean(formData.get("company"), 80)})` : ""}`;

  const key = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL;
  const to = process.env.LEAD_TO_EMAIL || SITE.email;

  if (!key || !from) {
    console.error("[enquiry] Email is not configured. Enquiry details follow so they are not lost:\n" + text);
    return { ok: false, message: FALLBACK };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject, text }),
    });
    if (!res.ok) {
      console.error(`[enquiry] Resend returned ${res.status}: ${await res.text()}\n${text}`);
      return { ok: false, message: FALLBACK };
    }
  } catch (err) {
    console.error("[enquiry] Send failed:", err, "\n" + text);
    return { ok: false, message: FALLBACK };
  }

  const thanks: Record<Kind, string> = {
    seat: "Thanks! We received your seat request and will confirm by phone or email within one business day.",
    group: "Thanks! We received your request and will send a written quote within one business day.",
    contact: "Thanks! We received your message and will reply within one business day.",
  };
  return { ok: true, message: thanks[kind] };
}
