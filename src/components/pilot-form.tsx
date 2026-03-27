"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface PilotFormData {
  practiceName: string;
  contactName: string;
  email: string;
  phone: string;
}

interface PilotFormProps {
  defaultPracticeName?: string;
  area?: string;
  cohort?: string;
  onSubmit?: (data: PilotFormData) => Promise<void>;
  className?: string;
}

export function PilotForm({
  defaultPracticeName = "",
  area,
  cohort,
  onSubmit,
  className,
}: PilotFormProps) {
  const [formData, setFormData] = useState<PilotFormData>({
    practiceName: defaultPracticeName,
    contactName: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default behavior: redirect to confirmed page
        window.location.href = "/for-practices/pilot/confirmed";
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-2">
            Practice Name
          </label>
          <Input
            type="text"
            value={formData.practiceName}
            onChange={(e) => setFormData({ ...formData, practiceName: e.target.value })}
            required
            className="h-12 bg-surface border-outline-variant/20"
            placeholder="Your practice name"
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
            placeholder="you@practice.com"
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
          {isSubmitting ? "Confirming..." : "Confirm Your Place"}
        </Button>

        <p className="text-xs text-center text-on-surface-variant mt-4">
          No payment required. No obligation to continue after the pilot.
        </p>
      </form>
    </Card>
  );
}

interface ConfirmationCardProps {
  practiceName?: string;
  steps?: string[];
  className?: string;
}

export function PilotConfirmation({
  practiceName,
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
        You&apos;re in the pilot
      </h1>

      {practiceName && (
        <p className="text-lg text-on-surface-variant mb-8">
          Welcome, <span className="font-bold text-on-surface">{practiceName}</span>
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
