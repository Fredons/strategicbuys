"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormData } from "@/lib/validations/contact";
import { CheckCircle, Loader2 } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send message");
      setSubmitted(true);
      reset();
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-success/20 bg-success/5 p-8 text-center">
        <CheckCircle className="mx-auto mb-3 h-10 w-10 text-success" />
        <h3 className="font-heading text-xl font-bold text-gray-900">Message Sent!</h3>
        <p className="mt-2 text-sm text-gray-600">
          Thank you for getting in touch. We&apos;ll be in contact within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 text-sm font-semibold text-gold hover:text-gold-dark"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700">
            First Name *
          </label>
          <input
            {...register("firstName")}
            className="w-full rounded-lg border-[1.5px] border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 transition-all focus:border-gold focus:shadow-[0_0_0_3px_rgba(184,134,11,0.08)] focus:outline-none"
            placeholder="First name"
          />
          {errors.firstName && (
            <p className="mt-1 text-xs text-error">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700">
            Last Name *
          </label>
          <input
            {...register("lastName")}
            className="w-full rounded-lg border-[1.5px] border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 transition-all focus:border-gold focus:shadow-[0_0_0_3px_rgba(184,134,11,0.08)] focus:outline-none"
            placeholder="Last name"
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-error">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700">
          Email Address *
        </label>
        <input
          type="email"
          {...register("email")}
          className="w-full rounded-lg border-[1.5px] border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 transition-all focus:border-gold focus:shadow-[0_0_0_3px_rgba(184,134,11,0.08)] focus:outline-none"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-error">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          {...register("phone")}
          className="w-full rounded-lg border-[1.5px] border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 transition-all focus:border-gold focus:shadow-[0_0_0_3px_rgba(184,134,11,0.08)] focus:outline-none"
          placeholder="04XX XXX XXX"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700">
            What can we help with?
          </label>
          <select
            {...register("service")}
            className="w-full rounded-lg border-[1.5px] border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 transition-all focus:border-gold focus:shadow-[0_0_0_3px_rgba(184,134,11,0.08)] focus:outline-none"
          >
            <option value="">Select a service</option>
            <option value="Full Service Property Buying">Full Service Property Buying</option>
            <option value="Negotiation Service">Negotiation Service</option>
            <option value="Auction Bidding">Auction Bidding</option>
            <option value="Investment Strategy">Investment Strategy</option>
            <option value="NDIS Property Investment">NDIS Property Investment</option>
            <option value="Other / General Enquiry">Other / General Enquiry</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700">
            Approximate Budget
          </label>
          <select
            {...register("budget")}
            className="w-full rounded-lg border-[1.5px] border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 transition-all focus:border-gold focus:shadow-[0_0_0_3px_rgba(184,134,11,0.08)] focus:outline-none"
          >
            <option value="">Select budget range</option>
            <option value="Under $500,000">Under $500,000</option>
            <option value="$500,000 - $750,000">$500,000 &ndash; $750,000</option>
            <option value="$750,000 - $1,000,000">$750,000 &ndash; $1,000,000</option>
            <option value="$1,000,000 - $1,500,000">$1,000,000 &ndash; $1,500,000</option>
            <option value="$1,500,000 - $2,000,000">$1,500,000 &ndash; $2,000,000</option>
            <option value="$2,000,000+">$2,000,000+</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700">
          Your Message *
        </label>
        <textarea
          {...register("message")}
          rows={5}
          className="w-full resize-y rounded-lg border-[1.5px] border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 transition-all focus:border-gold focus:shadow-[0_0_0_3px_rgba(184,134,11,0.08)] focus:outline-none"
          placeholder="Tell us about your property goals, preferred locations, timeline..."
        />
        {errors.message && (
          <p className="mt-1 text-xs text-error">{errors.message.message}</p>
        )}
      </div>

      {error && (
        <div className="rounded-lg border border-error/20 bg-error/5 p-3 text-sm text-error">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="gradient-gold inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold text-white shadow-[--shadow-gold] transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}
