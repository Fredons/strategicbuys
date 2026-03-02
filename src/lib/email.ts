import { Resend } from "resend";
import { siteConfig } from "./constants/site";
import { prisma } from "./prisma";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || `${siteConfig.name} <noreply@strategicbuys.com.au>`;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || siteConfig.email;

interface EnquiryEmailData {
  name: string;
  email: string;
  phone?: string | null;
  service?: string | null;
  budget?: string | null;
  message: string;
}

interface BlogPostLink {
  title: string;
  slug: string;
}

// ─── Helpers ────────────────────────────────────────────────────

/** Get notification email recipients from SiteSettings, falling back to ADMIN_EMAIL */
export async function getNotificationEmails(): Promise<string[]> {
  try {
    const settings = await prisma.siteSettings.findFirst({
      select: { notificationEmails: true },
    });

    if (settings?.notificationEmails) {
      const emails = settings.notificationEmails
        .split("\n")
        .map((e) => e.trim())
        .filter((e) => e.length > 0 && e.includes("@"));
      if (emails.length > 0) return emails;
    }
  } catch {
    // Fall through to default
  }

  return [ADMIN_EMAIL];
}

// ─── Enquiry Notification (to admin) ────────────────────────────

/** Notify admin(s) of a new contact form enquiry */
export async function sendEnquiryNotification(
  data: EnquiryEmailData,
  recipients?: string[]
) {
  if (!resend) {
    console.log("[Email] Resend not configured — skipping enquiry notification");
    return null;
  }

  const toEmails = recipients || [ADMIN_EMAIL];

  const priorityLabel =
    data.budget && parseBudgetMax(data.budget) >= 1_500_000
      ? '<span style="display:inline-block;background:#fef2f2;color:#dc2626;padding:2px 8px;border-radius:12px;font-size:11px;font-weight:700;margin-left:8px;">HOT LEAD</span>'
      : "";

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #1a1a2e, #16213e); padding: 24px; border-radius: 8px 8px 0 0;">
        <h1 style="color: #c6962c; margin: 0; font-size: 20px;">New Contact Enquiry${priorityLabel}</h1>
        <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0; font-size: 14px;">via ${siteConfig.name} website</p>
      </div>
      <div style="background: #ffffff; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 100px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${data.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email</td><td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #c6962c;">${data.email}</a></td></tr>
          ${data.phone ? `<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Phone</td><td style="padding: 8px 0;"><a href="tel:${data.phone}" style="color: #c6962c;">${data.phone}</a></td></tr>` : ""}
          ${data.service ? `<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Service</td><td style="padding: 8px 0;">${data.service}</td></tr>` : ""}
          ${data.budget ? `<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Budget</td><td style="padding: 8px 0;">${data.budget}</td></tr>` : ""}
        </table>
        <div style="margin-top: 16px; padding: 16px; background: #f9fafb; border-radius: 6px;">
          <p style="margin: 0 0 8px; font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
          <p style="margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
        </div>
        <p style="margin-top: 16px; font-size: 12px; color: #9ca3af;">Reply directly to this email to respond to the enquiry.</p>
      </div>
    </div>
  `;

  const subject = `New Enquiry from ${data.name}${data.service ? ` — ${data.service}` : ""}`;

  // Send to all recipients in parallel
  const results = await Promise.allSettled(
    toEmails.map((recipient) =>
      resend!.emails.send({
        from: FROM_EMAIL,
        to: recipient,
        subject,
        html,
        replyTo: data.email,
      })
    )
  );

  const failures = results.filter((r) => r.status === "rejected");
  if (failures.length > 0) {
    console.error(
      `[Email] ${failures.length}/${toEmails.length} notification emails failed`
    );
  }

  return results;
}

// ─── Enquiry Confirmation (to user) ─────────────────────────────

/** Send confirmation email to the person who submitted the contact form */
export async function sendEnquiryConfirmation(
  data: EnquiryEmailData,
  blogPosts?: BlogPostLink[]
) {
  if (!resend) {
    console.log("[Email] Resend not configured — skipping enquiry confirmation");
    return null;
  }

  const firstName = data.name.split(" ")[0];

  // Build blog post links section if available
  let blogSection = "";
  if (blogPosts && blogPosts.length > 0) {
    const links = blogPosts
      .map(
        (post) =>
          `<li><a href="${siteConfig.url}/blog/${post.slug}" style="color: #c6962c;">${post.title}</a></li>`
      )
      .join("");
    blogSection = `
      <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin-top: 16px;">
        <strong>Recommended reading based on your enquiry:</strong>
      </p>
      <ul style="padding-left: 20px; color: #4b5563; font-size: 14px; line-height: 1.8;">
        ${links}
      </ul>
    `;
  }

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: `Thanks for reaching out, ${firstName}!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1a1a2e, #16213e); padding: 32px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: #c6962c; margin: 0; font-size: 22px;">${siteConfig.name}</h1>
          </div>
          <div style="background: #ffffff; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <h2 style="margin: 0 0 8px; font-size: 18px; color: #111827;">Thanks for your enquiry!</h2>
            <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
              Hi ${firstName}, we've received your message and one of our buyer's agents will be in touch within 24 hours.
            </p>
            <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
              In the meantime, you might find these resources helpful:
            </p>
            <ul style="padding-left: 20px; color: #4b5563; font-size: 14px; line-height: 1.8;">
              <li><a href="${siteConfig.url}/services" style="color: #c6962c;">Our Services</a> — See how we can help</li>
              <li><a href="${siteConfig.url}/faq" style="color: #c6962c;">FAQ</a> — Common questions answered</li>
              <li><a href="${siteConfig.url}/blog" style="color: #c6962c;">Blog</a> — Property market insights</li>
            </ul>
            ${blogSection}
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              ${siteConfig.name} | ${siteConfig.email}<br/>
              ABN: ${siteConfig.abn}
            </p>
          </div>
        </div>
      `,
    });
    return result;
  } catch (error) {
    console.error("[Email] Failed to send enquiry confirmation:", error);
    return null;
  }
}

// ─── Admin Quick-Reply ──────────────────────────────────────────

/** Send a reply email from admin to the enquirer */
export async function sendReplyEmail(data: {
  to: string;
  subject: string;
  body: string;
  enquirerName: string;
}) {
  if (!resend) {
    console.log("[Email] Resend not configured — skipping reply email");
    return null;
  }

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.to,
      subject: data.subject,
      replyTo: ADMIN_EMAIL,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1a1a2e, #16213e); padding: 32px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: #c6962c; margin: 0; font-size: 22px;">${siteConfig.name}</h1>
          </div>
          <div style="background: #ffffff; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <div style="font-size: 14px; line-height: 1.8; color: #374151; white-space: pre-wrap;">${data.body}</div>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              ${siteConfig.name} | ${siteConfig.email}<br/>
              ABN: ${siteConfig.abn}
            </p>
          </div>
        </div>
      `,
    });
    return result;
  } catch (error) {
    console.error("[Email] Failed to send reply email:", error);
    return null;
  }
}

// ─── Follow-Up Email ────────────────────────────────────────────

/** Send a follow-up email for enquiries that haven't been responded to */
export async function sendFollowUpEmail(data: {
  name: string;
  email: string;
  service?: string | null;
}) {
  if (!resend) {
    console.log("[Email] Resend not configured — skipping follow-up email");
    return null;
  }

  const firstName = data.name.split(" ")[0];

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: `Following up on your enquiry, ${firstName}`,
      replyTo: ADMIN_EMAIL,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1a1a2e, #16213e); padding: 32px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: #c6962c; margin: 0; font-size: 22px;">${siteConfig.name}</h1>
          </div>
          <div style="background: #ffffff; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <h2 style="margin: 0 0 12px; font-size: 18px; color: #111827;">Hi ${firstName}, just checking in</h2>
            <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
              We received your enquiry${data.service ? ` about <strong>${data.service}</strong>` : ""} and wanted to make sure you received our initial confirmation.
            </p>
            <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
              Our team is reviewing your details and we'll be in touch shortly. If you have any additional questions or would like to fast-track a conversation, feel free to reply to this email or book a free consultation below.
            </p>
            <div style="margin: 24px 0; text-align: center;">
              <a href="${siteConfig.url}/contact" style="display: inline-block; background: linear-gradient(135deg, #c6962c, #a67c20); color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
                Book a Free Consultation
              </a>
            </div>
            <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
              We look forward to helping you with your property journey.
            </p>
            <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
              Warm regards,<br/>
              The ${siteConfig.name} Team
            </p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              ${siteConfig.name} | ${siteConfig.email}<br/>
              ABN: ${siteConfig.abn}
            </p>
          </div>
        </div>
      `,
    });
    return result;
  } catch (error) {
    console.error("[Email] Failed to send follow-up email:", error);
    return null;
  }
}

// ─── Newsletter Welcome ─────────────────────────────────────────

/** Send welcome email to new newsletter subscriber */
export async function sendWelcomeEmail(email: string, name?: string | null) {
  if (!resend) {
    console.log("[Email] Resend not configured — skipping welcome email");
    return null;
  }

  const firstName = name?.split(" ")[0] || "there";

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Welcome to ${siteConfig.name} — Property insights, delivered.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1a1a2e, #16213e); padding: 32px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: #c6962c; margin: 0; font-size: 22px;">${siteConfig.name}</h1>
            <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0; font-size: 14px;">Property Market Insights</p>
          </div>
          <div style="background: #ffffff; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <h2 style="margin: 0 0 16px; font-size: 18px; color: #111827;">Hey ${firstName}, welcome aboard!</h2>
            <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
              You're now subscribed to the Strategic Buys newsletter. We'll send you:
            </p>
            <ul style="padding-left: 20px; color: #4b5563; font-size: 14px; line-height: 1.8;">
              <li>Australian property market insights and analysis</li>
              <li>Tips for home buyers and investors</li>
              <li>Off-market opportunities and alerts</li>
              <li>Expert guides and resources</li>
            </ul>
            <div style="margin: 24px 0; text-align: center;">
              <a href="${siteConfig.url}/blog" style="display: inline-block; background: linear-gradient(135deg, #c6962c, #a67c20); color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
                Read Our Latest Articles
              </a>
            </div>
            <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
              Thinking about buying property? <a href="${siteConfig.url}/contact" style="color: #c6962c;">Book a free strategy call</a> and let's chat about your goals.
            </p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              ${siteConfig.name} | ${siteConfig.email}<br/>
              ABN: ${siteConfig.abn}
            </p>
          </div>
        </div>
      `,
    });
    return result;
  } catch (error) {
    console.error("[Email] Failed to send welcome email:", error);
    return null;
  }
}

// ─── Utility ────────────────────────────────────────────────────

/** Parse the maximum budget value from budget strings like "$1,000,000 - $1,500,000" */
function parseBudgetMax(budget: string): number {
  const numbers = budget.match(/[\d,]+/g);
  if (!numbers) return 0;
  const values = numbers.map((n) => parseInt(n.replace(/,/g, ""), 10));
  return Math.max(...values);
}
