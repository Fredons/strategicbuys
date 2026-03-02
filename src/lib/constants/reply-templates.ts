export interface ReplyTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
}

/**
 * Quick-reply email templates for admin use.
 * Use {{name}} as a placeholder — it will be replaced with the enquirer's first name.
 */
export const replyTemplates: ReplyTemplate[] = [
  {
    id: "initial-response",
    name: "Initial Response",
    subject: "Re: Your enquiry with Strategic Buys",
    body: `Hi {{name}},

Thank you for reaching out to Strategic Buys. I've reviewed your enquiry and would love to learn more about your property goals.

I'd like to schedule a free, no-obligation consultation to discuss your requirements in detail. During this call, we can cover:

- Your ideal property criteria and timeline
- Current market conditions relevant to your search
- How our buyer's agent service works and what to expect

Would you be available for a quick 15-20 minute call this week? Please let me know a time that suits you, or feel free to reply with any additional questions.

Looking forward to hearing from you.

Warm regards,
The Strategic Buys Team`,
  },
  {
    id: "consultation-booking",
    name: "Book a Consultation",
    subject: "Let's book your free strategy session — Strategic Buys",
    body: `Hi {{name}},

Thanks for your interest in our buyer's agent services. We'd love to help you on your property journey.

The next step is to book a free strategy session where we'll discuss:

- Your property goals and budget
- The best approach for your situation
- Market insights relevant to your target areas

You can book directly by replying to this email with your preferred time, or visit our website to get in touch: https://strategicbuys.com.au/contact

We're available Monday to Sunday, 9 AM to 5 PM AEST.

Warm regards,
The Strategic Buys Team`,
  },
  {
    id: "investor-follow-up",
    name: "Investment Follow-Up",
    subject: "Your property investment strategy — Strategic Buys",
    body: `Hi {{name}},

Thanks for your enquiry about property investment with Strategic Buys.

We specialise in helping investors identify high-growth opportunities across Australia's major markets. Based on your initial enquiry, I'd like to discuss:

- Your investment strategy and objectives
- Target growth corridors and yield expectations
- How we source on-market and off-market opportunities
- Tax considerations including negative gearing and depreciation

Our data-driven approach has helped hundreds of investors build wealth through strategic property purchases. I'd love to walk you through how we can do the same for you.

Would you be available for a brief call this week?

Warm regards,
The Strategic Buys Team`,
  },
  {
    id: "not-right-now",
    name: "Not Right Now",
    subject: "Staying in touch — Strategic Buys",
    body: `Hi {{name}},

Thank you for reaching out to Strategic Buys. We appreciate your interest in our services.

We understand that timing is everything when it comes to property. If now isn't the right moment, that's completely fine — we're here whenever you're ready.

In the meantime, you might find our blog helpful for staying across the market: https://strategicbuys.com.au/blog

Feel free to reach out anytime you'd like to revisit your property plans. We'd be happy to assist.

Warm regards,
The Strategic Buys Team`,
  },
];
