import { SITE } from "@/lib/site";

/* ============================================================================
   Every form on the site (seat requests, group quotes, general contact) sends
   through here.

   The site is a static export on GitHub Pages, which cannot run server code,
   so the browser posts straight to Web3Forms (web3forms.com), which emails the
   enquiry to the inbox the access key was created for.

   Rule: the visitor is only told it worked if Web3Forms accepted it. If the
   key is missing or the send fails, they get the phone number and email
   instead of a false "thank you".

   SETUP (see .env.example and README):
     NEXT_PUBLIC_WEB3FORMS_KEY  Access key from web3forms.com. It is public by
                                design, it only allows sending to its inbox.
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

/** Trim, cap length, and strip line breaks from single-line fields. */
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

  const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  if (!key) {
    console.error("[enquiry] NEXT_PUBLIC_WEB3FORMS_KEY is not set, so the form cannot send.");
    return { ok: false, message: FALLBACK };
  }

  const details = Object.fromEntries(
    FIELDS.map(([field, label]) => [label, clean(formData.get(field), field === "message" ? 4000 : 300)]).filter(([, v]) => v),
  );
  const company = clean(formData.get("company"), 80);

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: key,
        subject: `${KINDS[kind]}: ${name}${company ? ` (${company})` : ""}`,
        from_name: `${SITE.name} website`,
        replyto: email,
        "Enquiry type": KINDS[kind],
        ...details,
      }),
    });
    const data = (await res.json().catch(() => null)) as { success?: boolean; message?: string } | null;
    if (!res.ok || !data?.success) {
      console.error(`[enquiry] Web3Forms returned ${res.status}: ${data?.message ?? "no message"}`);
      return { ok: false, message: FALLBACK };
    }
  } catch (err) {
    console.error("[enquiry] Send failed:", err);
    return { ok: false, message: FALLBACK };
  }

  const thanks: Record<Kind, string> = {
    seat: "Thanks! We received your seat request and will confirm by phone or email within one business day.",
    group: "Thanks! We received your request and will send a written quote within one business day.",
    contact: "Thanks! We received your message and will reply within one business day.",
  };
  return { ok: true, message: thanks[kind] };
}
