import { corsHeaders } from "https://deno.land/x/cors@v1.2.2/mod.ts";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const FROM = "اینتل‌بریج <info@intlbridges.ir>";
const ADMIN_EMAIL = "info@intlbridges.ir";

const brandColors = {
  primary: "#0a52a3",
  secondary: "#d4a017",
  bg: "#f8f9fa",
  text: "#333333",
  muted: "#666666",
};

function baseLayout(content: string): string {
  return `<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:${brandColors.bg};font-family:Tahoma,Arial,sans-serif;">
<div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;margin-top:20px;margin-bottom:20px;">
  <div style="background:${brandColors.primary};padding:24px 32px;text-align:center;">
    <h1 style="color:#ffffff;margin:0;font-size:22px;">اینتل‌بریج</h1>
    <p style="color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:13px;">پل کسب‌وکار ایرانی با دنیا</p>
  </div>
  <div style="padding:32px;">${content}</div>
  <div style="background:${brandColors.bg};padding:16px 32px;text-align:center;border-top:1px solid #e5e7eb;">
    <p style="margin:0;font-size:12px;color:${brandColors.muted};">© ${new Date().getFullYear()} IntlBridges — تمامی حقوق محفوظ است</p>
    <p style="margin:4px 0 0;font-size:11px;color:${brandColors.muted};">info@intlbridges.ir | واتساپ: ۰۹۱۵۰۶۱۶۷۸۸</p>
  </div>
</div>
</body></html>`;
}

type EmailType =
  | "contact-admin"
  | "contact-confirm"
  | "consultation-admin"
  | "consultation-confirm"
  | "subscriber-welcome";

interface EmailRequest {
  type: EmailType;
  to: string;
  data: Record<string, string>;
}

function buildEmail(req: EmailRequest): { subject: string; html: string } {
  const { type, data } = req;

  switch (type) {
    case "contact-admin":
      return {
        subject: `پیام جدید از فرم تماس — ${data.name}`,
        html: baseLayout(`
          <h2 style="color:${brandColors.primary};margin:0 0 16px;font-size:18px;">📩 پیام جدید از فرم تماس</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:8px 0;color:${brandColors.muted};width:120px;">نام:</td><td style="padding:8px 0;color:${brandColors.text};font-weight:bold;">${data.name}</td></tr>
            <tr><td style="padding:8px 0;color:${brandColors.muted};">ایمیل:</td><td style="padding:8px 0;color:${brandColors.text};">${data.email}</td></tr>
            ${data.phone ? `<tr><td style="padding:8px 0;color:${brandColors.muted};">تلفن:</td><td style="padding:8px 0;color:${brandColors.text};">${data.phone}</td></tr>` : ""}
            ${data.businessType ? `<tr><td style="padding:8px 0;color:${brandColors.muted};">نوع کسب‌وکار:</td><td style="padding:8px 0;color:${brandColors.text};">${data.businessType}</td></tr>` : ""}
            ${data.services ? `<tr><td style="padding:8px 0;color:${brandColors.muted};">خدمات:</td><td style="padding:8px 0;color:${brandColors.text};">${data.services}</td></tr>` : ""}
          </table>
          ${data.message ? `<div style="margin-top:16px;padding:16px;background:${brandColors.bg};border-radius:8px;border-right:3px solid ${brandColors.primary};"><p style="margin:0;font-size:13px;color:${brandColors.muted};">پیام:</p><p style="margin:8px 0 0;font-size:14px;color:${brandColors.text};line-height:1.7;">${data.message}</p></div>` : ""}
        `),
      };

    case "contact-confirm":
      return {
        subject: "پیام شما دریافت شد — اینتل‌بریج",
        html: baseLayout(`
          <h2 style="color:${brandColors.primary};margin:0 0 16px;font-size:18px;">${data.name} عزیز، سپاس از پیام شما</h2>
          <p style="font-size:14px;color:${brandColors.text};line-height:1.8;">پیام شما با موفقیت دریافت شد. تیم ما در کمتر از <strong>۲۴ ساعت</strong> با شما تماس خواهد گرفت.</p>
          <p style="font-size:14px;color:${brandColors.text};line-height:1.8;">در صورت نیاز فوری، می‌توانید از طریق واتساپ (۰۹۱۵۰۶۱۶۷۸۸) با ما در ارتباط باشید.</p>
          <p style="margin-top:24px;font-size:14px;color:${brandColors.muted};">با احترام،<br/>تیم اینتل‌بریج</p>
        `),
      };

    case "consultation-admin":
      return {
        subject: `درخواست مشاوره جدید — ${data.name}`,
        html: baseLayout(`
          <h2 style="color:${brandColors.primary};margin:0 0 16px;font-size:18px;">📅 درخواست مشاوره جدید</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:8px 0;color:${brandColors.muted};width:120px;">نام:</td><td style="padding:8px 0;color:${brandColors.text};font-weight:bold;">${data.name}</td></tr>
            <tr><td style="padding:8px 0;color:${brandColors.muted};">ایمیل:</td><td style="padding:8px 0;color:${brandColors.text};">${data.email}</td></tr>
            ${data.phone ? `<tr><td style="padding:8px 0;color:${brandColors.muted};">تلفن:</td><td style="padding:8px 0;color:${brandColors.text};">${data.phone}</td></tr>` : ""}
            ${data.date ? `<tr><td style="padding:8px 0;color:${brandColors.muted};">تاریخ:</td><td style="padding:8px 0;color:${brandColors.text};">${data.date}</td></tr>` : ""}
            ${data.time ? `<tr><td style="padding:8px 0;color:${brandColors.muted};">ساعت:</td><td style="padding:8px 0;color:${brandColors.text};">${data.time}</td></tr>` : ""}
          </table>
          ${data.description ? `<div style="margin-top:16px;padding:16px;background:${brandColors.bg};border-radius:8px;border-right:3px solid ${brandColors.secondary};"><p style="margin:0;font-size:13px;color:${brandColors.muted};">توضیحات کسب‌وکار:</p><p style="margin:8px 0 0;font-size:14px;color:${brandColors.text};line-height:1.7;">${data.description}</p></div>` : ""}
        `),
      };

    case "consultation-confirm":
      return {
        subject: "درخواست مشاوره شما ثبت شد — اینتل‌بریج",
        html: baseLayout(`
          <h2 style="color:${brandColors.primary};margin:0 0 16px;font-size:18px;">${data.name} عزیز، درخواست مشاوره شما ثبت شد</h2>
          <p style="font-size:14px;color:${brandColors.text};line-height:1.8;">از علاقه‌مندی شما سپاسگزاریم. تیم ما به زودی برای هماهنگی زمان مشاوره با شما تماس خواهد گرفت.</p>
          <div style="margin:20px 0;padding:16px;background:${brandColors.bg};border-radius:8px;text-align:center;">
            <p style="margin:0;font-size:14px;color:${brandColors.primary};font-weight:bold;">🎯 مشاوره ۳۰ دقیقه‌ای رایگان</p>
            <p style="margin:4px 0 0;font-size:13px;color:${brandColors.muted};">بدون هیچ تعهدی — فقط برای شناخت نیازهای شما</p>
          </div>
          <p style="font-size:14px;color:${brandColors.muted};">با احترام،<br/>تیم اینتل‌بریج</p>
        `),
      };

    case "subscriber-welcome":
      return {
        subject: "به خبرنامه اینتل‌بریج خوش آمدید 🎉",
        html: baseLayout(`
          <h2 style="color:${brandColors.primary};margin:0 0 16px;font-size:18px;">خوش آمدید! 🎉</h2>
          <p style="font-size:14px;color:${brandColors.text};line-height:1.8;">از عضویت شما در خبرنامه اینتل‌بریج سپاسگزاریم.</p>
          <p style="font-size:14px;color:${brandColors.text};line-height:1.8;">از این پس، جدیدترین مطالب و راهنماهای تخصصی درباره تجارت بین‌الملل، تحول دیجیتال و ورود به بازارهای جهانی را در ایمیل خود دریافت خواهید کرد.</p>
          <div style="margin:20px 0;text-align:center;">
            <a href="https://intlbridges.ir/blog" style="display:inline-block;padding:12px 32px;background:${brandColors.primary};color:#ffffff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:bold;">مشاهده دانش‌نامه</a>
          </div>
          <p style="font-size:14px;color:${brandColors.muted};">با احترام،<br/>تیم اینتل‌بریج</p>
        `),
      };

    default:
      throw new Error(`Unknown email type: ${type}`);
  }
}

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({ from: FROM, to: [to], subject, html }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Resend error:", res.status, err);
    throw new Error(`Resend API error: ${res.status}`);
  }

  return res.json();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS });
  }

  try {
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY not configured");
    }

    const body: EmailRequest = await req.json();

    if (!body.type || !body.to || !body.data) {
      return new Response(
        JSON.stringify({ error: "Missing type, to, or data" }),
        { status: 400, headers: { ...CORS, "Content-Type": "application/json" } }
      );
    }

    const { subject, html } = buildEmail(body);
    const result = await sendEmail(body.to, subject, html);

    return new Response(JSON.stringify({ success: true, id: result.id }), {
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("send-email error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...CORS, "Content-Type": "application/json" } }
    );
  }
});
