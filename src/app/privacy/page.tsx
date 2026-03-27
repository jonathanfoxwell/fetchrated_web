import { Navigation, Footer } from "@/components";

export const metadata = {
  title: "Privacy Policy | FetchRated",
  description: "FetchRated's privacy policy explains how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-card">
      <Navigation />

      <main className="pt-24 pb-24">
        <article className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-headline font-bold text-on-surface mb-4">
            Privacy Policy
          </h1>
          <p className="text-on-surface-variant mb-8">
            Last updated: March 2024
          </p>

          <div className="prose prose-lg max-w-none text-on-surface-variant">
            <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">1. Introduction</h2>
            <p>
              FetchRated ("we", "our", or "us") is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard
              your information when you visit our website fetchrated.com and use our services.
            </p>

            <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">2. Information We Collect</h2>
            <h3 className="text-lg font-bold text-on-surface mt-6 mb-3">Information You Provide</h3>
            <p>We may collect information you provide directly, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contact information (name, email address, phone number)</li>
              <li>Practice information (for practice owners registering with us)</li>
              <li>Review content and feedback</li>
              <li>Communications you send to us</li>
            </ul>

            <h3 className="text-lg font-bold text-on-surface mt-6 mb-3">Information Collected Automatically</h3>
            <p>When you visit our website, we automatically collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Device information (browser type, operating system)</li>
              <li>Log data (IP address, access times, pages viewed)</li>
              <li>Location data (general geographic location based on IP)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">3. How We Use Your Information</h2>
            <p>We use collected information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process practice registrations and assessments</li>
              <li>Verify reviews and customer feedback</li>
              <li>Send administrative communications</li>
              <li>Respond to your inquiries and support requests</li>
              <li>Analyze usage patterns to improve user experience</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">4. Information Sharing</h2>
            <p>We do not sell your personal information. We may share information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Service providers who assist in our operations</li>
              <li>Professional advisors (lawyers, accountants)</li>
              <li>Law enforcement when required by law</li>
              <li>Other parties with your consent</li>
            </ul>

            <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect
              your personal information against unauthorized access, alteration, disclosure,
              or destruction. However, no method of transmission over the Internet is
              100% secure.
            </p>

            <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">6. Your Rights</h2>
            <p>Under applicable data protection laws, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to or restrict processing</li>
              <li>Data portability</li>
              <li>Withdraw consent</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, contact us at{" "}
              <a href="mailto:privacy@fetchrated.com" className="text-primary hover:underline">
                privacy@fetchrated.com
              </a>.
            </p>

            <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">7. Cookies</h2>
            <p>
              We use cookies and similar technologies to enhance your experience,
              analyze usage, and assist in our marketing efforts. You can control
              cookies through your browser settings.
            </p>

            <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">8. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices of these sites and encourage
              you to read their privacy policies.
            </p>

            <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">9. Children's Privacy</h2>
            <p>
              Our services are not directed to individuals under 16. We do not
              knowingly collect personal information from children.
            </p>

            <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify
              you of any changes by posting the new policy on this page and updating
              the "Last updated" date.
            </p>

            <h2 className="text-xl font-bold text-on-surface mt-8 mb-4">11. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-4">
              <strong>Email:</strong>{" "}
              <a href="mailto:privacy@fetchrated.com" className="text-primary hover:underline">
                privacy@fetchrated.com
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
