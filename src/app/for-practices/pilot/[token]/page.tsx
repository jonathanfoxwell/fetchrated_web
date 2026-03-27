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
  const { token } = await params;

  // In real app, would decode token to get practice name
  return {
    title: "Accept Your Pilot Place | FetchRated",
    description: "Complete your registration for the FetchRated national pilot programme.",
  };
}

export default async function PilotTokenPage({ params }: PilotPageProps) {
  const { token } = await params;

  // In real app, would decode token to get pre-filled data
  // For demo, we'll use placeholder data
  const practiceData = {
    name: token === "apply" ? "" : "Sample Practice",
    area: "Greater London",
    cohort: "Alpha 2024",
  };

  return (
    <div className="min-h-screen bg-card">
      <Navigation currentPath="/for-practices" />

      <main className="pt-24 pb-24">
        {/* Breadcrumbs */}
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-4">
          <Breadcrumbs
            items={[
              { label: "For Practices", href: "/for-practices" },
              { label: "Pilot Registration" },
            ]}
          />
        </div>

        {/* Form Section */}
        <section className="max-w-3xl mx-auto px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-headline font-bold text-on-surface mb-4">
              {token === "apply" ? "Apply for the Pilot" : "Accept Your Pilot Place"}
            </h1>
            <p className="text-on-surface-variant text-lg max-w-xl mx-auto">
              {token === "apply"
                ? "Submit your practice details to be considered for the FetchRated pilot programme."
                : "You've been selected for the FetchRated pilot programme. Complete your registration below."}
            </p>
          </div>

          <PilotForm
            defaultPracticeName={practiceData.name}
            area={token !== "apply" ? practiceData.area : undefined}
            cohort={token !== "apply" ? practiceData.cohort : undefined}
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
