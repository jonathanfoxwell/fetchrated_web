import { Navigation, Footer, Badge, PilotForm } from "@/components";

export const metadata = {
  title: "Register Your Interest | FetchRated",
  description:
    "The National Pilot Programme is by invitation. If you'd like FetchRated to consider your practice for an upcoming cohort, leave your details.",
};

export default function RegisterInterestPage() {
  return (
    <div className="min-h-screen bg-card">
      <Navigation currentPath="/for-practices" />

      <main className="pt-32 pb-24">
        <section className="max-w-3xl mx-auto px-6 lg:px-8">
          <Badge className="bg-secondary text-white uppercase text-[10px] tracking-[0.2em] mb-6">
            By Invitation
          </Badge>
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-on-surface leading-[1.1] mb-6">
            Register your <span className="serif-italic font-medium">interest.</span>
          </h1>

          <PilotForm
            source="register-interest"
            submitLabel="Register Interest"
            intro={
              <p>
                Tell us about your practice. The pilot is by invitation — if our
                assessment identifies yours as a fit for an upcoming cohort, we&apos;ll
                be in touch.
              </p>
            }
            successContent={
              <>
                <h2 className="text-2xl md:text-3xl font-headline font-bold text-on-surface mb-3">
                  Thanks — we&apos;ve recorded your details.
                </h2>
                <p className="text-on-surface-variant leading-relaxed max-w-md mx-auto">
                  The pilot is by invitation, so we don&apos;t reach out to every
                  practice that registers, but we&apos;ll consider yours as we shortlist
                  for upcoming cohorts.
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
