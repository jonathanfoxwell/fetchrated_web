import { redirect } from "next/navigation";
import {
  Navigation,
  Footer,
  PilotForm,
  Breadcrumbs,
} from "@/components";

interface PilotPageProps {
  params: Promise<{ token: string }>;
}

export async function generateMetadata({ params }: PilotPageProps) {
  await params;
  return {
    title: "Confirm Your Place | FetchRated",
    description: "Confirm your place in the FetchRated National Pilot Programme.",
    // Token-gated cohort URLs: keep them out of search results even if a
    // referrer leak exposes one to a crawler.
    robots: { index: false, follow: true },
  };
}

export default async function PilotTokenPage({ params }: PilotPageProps) {
  const { token } = await params;

  // /for-practices/pilot/apply is the legacy cold-visitor URL — collapsed into
  // the dedicated register-interest flow so the form's positioning stays
  // selection-led for non-letter visitors.
  if (token === "apply") {
    redirect("/for-practices/register-interest");
  }

  // In real app, would decode token to look up the practice's pre-filled data.
  // For now we render placeholder context so the form layout demonstrates.
  const practiceData = {
    name: "Sample Practice",
    area: "Greater London",
    cohort: "Alpha 2026",
  };

  return (
    <div className="min-h-screen bg-card">
      <Navigation currentPath="/for-practices" />

      <main className="pt-24 pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-4">
          <Breadcrumbs
            items={[
              { label: "For Practices", href: "/for-practices" },
              { label: "Confirm Your Place" },
            ]}
          />
        </div>

        <section className="max-w-3xl mx-auto px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-headline font-bold text-on-surface mb-4">
              Confirm Your Place
            </h1>
            <p className="text-on-surface-variant text-lg max-w-xl mx-auto">
              Your practice has been selected because it&apos;s already doing
              excellent work. Just confirm your details below — it takes less than
              two minutes.
            </p>
          </div>

          <PilotForm
            source="pilot-confirm"
            defaultBusinessName={practiceData.name}
            area={practiceData.area}
            cohort={practiceData.cohort}
            successContent={
              <>
                <h2 className="text-2xl md:text-3xl font-headline font-bold text-on-surface mb-3">
                  Thanks — your place is reserved.
                </h2>
                <p className="text-on-surface-variant leading-relaxed max-w-md mx-auto">
                  We&apos;ll be in touch with next steps for the assessment shortly.
                </p>
              </>
            }
          />

          <p className="text-center text-sm text-on-surface-variant mt-8">
            By submitting, you agree to our{" "}
            <a href="/terms" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
