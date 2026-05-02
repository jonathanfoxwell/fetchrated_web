"use client";

import { useState, type ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface PilotFormData {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
}

/**
 * Multi-purpose practice form. Used by both the warm letter-recipient flow
 * (/for-practices/pilot/[token]) and the cold register-interest flow
 * (/for-practices/register-interest).
 *
 * Submissions land in the same `practice_interest` Supabase table, distinguished
 * by the `source` prop ('pilot-confirm' for letter recipients, 'register-interest'
 * for cold visitors), so triage happens in one place.
 *
 * Visual context (intro paragraph, area/cohort bar, success state) is supplied
 * by the caller so the same component reads as warm-and-confirmed for letter
 * recipients and selection-led for cold visitors without forking.
 */
interface PilotFormProps {
  /** Tag stored on the row in `practice_interest`. Drives downstream triage. */
  source: "pilot-confirm" | "register-interest";
  /** Rendered inline once submission succeeds. Required so every flow has a
   *  context-appropriate thank-you state. */
  successContent: ReactNode;
  /** Optional copy rendered above the form fields. */
  intro?: ReactNode;
  /** Pre-fill the business name (letter recipients arrive with one). */
  defaultBusinessName?: string;
  /** Letter-recipient context: "Your place is reserved in: [Area]/[Cohort]". */
  area?: string;
  cohort?: string;
  /** Submit button label. Defaults to "Confirm Your Place". */
  submitLabel?: string;
  className?: string;
}

export function PilotForm({
  source,
  successContent,
  intro,
  defaultBusinessName = "",
  area,
  cohort,
  submitLabel = "Confirm Your Place",
  className,
}: PilotFormProps) {
  const [formData, setFormData] = useState<PilotFormData>({
    businessName: defaultBusinessName,
    contactName: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/register-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source }),
      });
      if (!res.ok) throw new Error("submit failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Card className={`p-8 md:p-12 border-outline-variant/20 text-center ${className ?? ""}`}>
        <div className="w-20 h-20 rounded-full bg-tertiary/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-tertiary" />
        </div>
        {successContent}
      </Card>
    );
  }

  return (
    <Card className={`p-8 md:p-12 border-outline-variant/20 ${className ?? ""}`}>
      {(area || cohort) && (
        <div className="mb-8 pb-8 border-b border-outline-variant/20">
          <p className="text-sm text-on-surface-variant mb-2">Your place is reserved in:</p>
          <div className="flex flex-wrap gap-4">
            {area && (
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Area</span>
                <p className="font-bold text-on-surface">{area}</p>
              </div>
            )}
            {cohort && (
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Cohort</span>
                <p className="font-bold text-primary">{cohort}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {intro && (
        <div className="mb-8 text-on-surface-variant leading-relaxed">{intro}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-2">
            Business Name
          </label>
          <Input
            type="text"
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            required
            className="h-12 bg-surface border-outline-variant/20"
            placeholder="Your business name"
          />
        </div>

        <div>
          <label className="block text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-2">
            Contact Name
          </label>
          <Input
            type="text"
            value={formData.contactName}
            onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
            required
            className="h-12 bg-surface border-outline-variant/20"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-2">
            Email Address
          </label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="h-12 bg-surface border-outline-variant/20"
            placeholder="you@yourbusiness.com"
          />
        </div>

        <div>
          <label className="block text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-2">
            Phone Number
          </label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="h-12 bg-surface border-outline-variant/20"
            placeholder="Optional"
          />
        </div>

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 bg-primary hover:bg-primary-container text-white font-bold text-sm uppercase tracking-widest"
        >
          {isSubmitting ? "Submitting..." : submitLabel}
        </Button>

        <p className="text-xs text-center text-on-surface-variant mt-4">
          No payment required. No obligation to continue after the pilot.
        </p>
      </form>
    </Card>
  );
}

interface ConfirmationCardProps {
  businessName?: string;
  steps?: string[];
  className?: string;
}

/**
 * Standalone confirmation card. Kept for the legacy /pilot/confirmed page.
 * New flows render their success state inline via PilotForm.successContent.
 */
export function PilotConfirmation({
  businessName,
  steps = [
    "We'll send a confirmation email with everything you need to know",
    "We'll begin your visibility assessment—you don't need to do anything",
    "We'll reach out to your recent customers to collect verified reviews",
    "Within a few weeks, you'll receive your personalised video report",
  ],
  className,
}: ConfirmationCardProps) {
  return (
    <Card className={`p-8 md:p-12 border-outline-variant/20 text-center ${className ?? ""}`}>
      <div className="w-20 h-20 rounded-full bg-tertiary/10 flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-tertiary" />
      </div>

      <h1 className="text-3xl md:text-4xl font-headline font-bold text-on-surface mb-4">
        Thanks — we&apos;ll be in touch with next steps
      </h1>

      {businessName && (
        <p className="text-lg text-on-surface-variant mb-8">
          For <span className="font-bold text-on-surface">{businessName}</span>
        </p>
      )}

      <div className="text-left bg-surface-container-low p-6 rounded-lg mb-8">
        <h3 className="font-bold text-sm uppercase tracking-widest text-on-surface-variant mb-4">
          What happens next
        </h3>
        <ol className="space-y-4">
          {steps.map((step, index) => (
            <li key={index} className="flex gap-4">
              <span className="w-6 h-6 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center shrink-0">
                {index + 1}
              </span>
              <span className="text-on-surface-variant">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <p className="text-sm text-on-surface-variant">
        Questions? Contact us at{" "}
        <a href="mailto:hello@fetchrated.com" className="text-primary font-medium hover:underline">
          hello@fetchrated.com
        </a>
      </p>
    </Card>
  );
}
