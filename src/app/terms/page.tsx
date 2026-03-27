import { Navigation, Footer } from "@/components";

export const metadata = {
  title: "Terms of Service | FetchRated",
  description: "FetchRated's terms of service govern your use of our website and services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-card">
      <Navigation />

      <main className="pt-24 pb-24">
        <article className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-headline font-bold text-on-surface mb-4">
            Terms of Service
          </h1>
          <p className="text-on-surface-variant mb-8">
            Last updated: March 2024
          </p>

          <div className="prose prose-lg max-w-none text-on-surface-variant">
            <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing or using the FetchRated website and services, you agree to be
              bound by these Terms of Service. If you do not agree to these terms,
              please do not use our services.
            </p>

            <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">2. Description of Service</h2>
            <p>
              FetchRated provides an independent assessment and directory service for
              pet care providers in the United Kingdom. Our services include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>A searchable directory of verified pet care practices</li>
              <li>Independent quality assessments and ratings</li>
              <li>Verified customer reviews</li>
              <li>Educational content and guides</li>
              <li>Trust mark verification services</li>
            </ul>

            <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">3. User Accounts</h2>
            <p>
              Some features may require you to create an account. You are responsible
              for maintaining the confidentiality of your account credentials and for
              all activities under your account.
            </p>

            <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">4. Practice Listings</h2>
            <h3 className="text-lg font-bold text-on-surface mt-6 mb-3">For Pet Owners</h3>
            <p>
              Information provided about practices is based on our independent assessment
              at the time of evaluation. We make reasonable efforts to ensure accuracy
              but cannot guarantee that all information is current or complete.
            </p>

            <h3 className="text-lg font-bold text-on-surface mt-6 mb-3">For Practice Owners</h3>
            <p>
              By registering your practice with FetchRated, you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and truthful information</li>
              <li>Cooperate with our assessment process</li>
              <li>Not attempt to manipulate ratings or reviews</li>
              <li>Comply with the FetchRated Trust Mark usage guidelines</li>
            </ul>

            <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">5. Reviews and Content</h2>
            <p>
              Users who submit reviews represent that their content is accurate and
              reflects their genuine experience. We reserve the right to remove
              content that violates these terms or our community guidelines.
            </p>
            <p className="mt-4">You agree not to submit content that:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Is false, misleading, or fraudulent</li>
              <li>Infringes on intellectual property rights</li>
              <li>Contains defamatory or abusive material</li>
              <li>Violates any applicable law</li>
            </ul>

            <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">6. Intellectual Property</h2>
            <p>
              The FetchRated name, logo, trust marks, and all content on this website
              are the property of FetchRated Ltd and protected by copyright and
              trademark laws. You may not use our intellectual property without
              written permission.
            </p>

            <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">7. Trust Mark Usage</h2>
            <p>
              Practices awarded a FetchRated trust mark may display it subject to
              our usage guidelines. The trust mark remains the property of FetchRated
              and may be revoked if a practice no longer meets our standards.
            </p>

            <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">8. Limitation of Liability</h2>
            <p>
              FetchRated provides information to help users make informed decisions
              but does not guarantee any particular outcome. We are not liable for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The quality of services provided by listed practices</li>
              <li>Decisions made based on information on our website</li>
              <li>Any indirect, incidental, or consequential damages</li>
            </ul>

            <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">9. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless FetchRated and its officers,
              directors, employees, and agents from any claims arising from your
              use of our services or violation of these terms.
            </p>

            <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">10. Modifications</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use
              of our services after changes constitutes acceptance of the new terms.
            </p>

            <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">11. Termination</h2>
            <p>
              We may terminate or suspend your access to our services at our sole
              discretion, without notice, for conduct that we believe violates
              these terms or is harmful to other users or us.
            </p>

            <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">12. Governing Law</h2>
            <p>
              These terms are governed by the laws of England and Wales. Any disputes
              shall be subject to the exclusive jurisdiction of the courts of
              England and Wales.
            </p>

            <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">13. Contact</h2>
            <p>
              For questions about these Terms of Service, please contact us at:
            </p>
            <p className="mt-4">
              <strong>Email:</strong>{" "}
              <a href="mailto:legal@fetchrated.com" className="text-primary hover:underline">
                legal@fetchrated.com
              </a>
              <br />
              <strong>Address:</strong> FetchRated Ltd, United Kingdom
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
