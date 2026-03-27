import {
  Navigation,
  Footer,
  NumberedSteps,
  CoverageMap,
  VerificationChecklist,
  AssessmentProtocol,
  Badge,
  CTABanner,
  Card,
} from "@/components";
import { verificationItems } from "@/lib/data";
import { Shield, Scale, Eye, Star, BarChart3, Video, MapPin, ChevronDown } from "lucide-react";

export const metadata = {
  title: "For Practices | FetchRated National Pilot Programme",
  description: "Join the FetchRated national pilot programme. Selected practices receive visibility audit, verified reviews, and standards assessment at no cost.",
};

const qualificationSteps = [
  {
    number: "01.",
    title: "Submission",
    description: "Initial data ingestion of practice credentials, professional indemnity coverage, and senior clinical staff certifications for the current cohort year.",
  },
  {
    number: "02.",
    title: "Clinical Audit",
    description: "A remote-first audit of treatment outcomes, surgical suite standards, and patient recovery protocols reviewed by our peer committee.",
  },
  {
    number: "03.",
    title: "Trust Mark Issuance",
    description: "Granting of the FetchRated Physical Seal and digital credentials, allowing public placement on the National Integrated Practice Register.",
  },
];

const protocolItems = [
  {
    icon: Shield,
    title: "Mandatory Accreditation",
    description: "Proof of RCVS or equivalent national standing is a prerequisite for pilot entry.",
  },
  {
    icon: Scale,
    title: "Ethical Framework",
    description: "Adherence to the FetchRated Patient Advocacy Charter and Transparent Pricing policy.",
  },
];

const pilotBenefits = [
  {
    icon: Eye,
    title: "Visibility Audit",
    description: "Full review of your online presence and competitive position in your local area.",
  },
  {
    icon: Star,
    title: "Verified Google Reviews",
    description: "5+ independently collected reviews from your existing customers, posted to Google.",
  },
  {
    icon: BarChart3,
    title: "AI Search Check",
    description: "How your practice appears in AI-generated local search results and recommendations.",
  },
  {
    icon: Shield,
    title: "Standards Score",
    description: "Your assessed position across visibility, review quality, and consistency metrics.",
  },
  {
    icon: Video,
    title: "Personalised Video Report",
    description: "Your results presented in a short personalised video walkthrough.",
  },
  {
    icon: MapPin,
    title: "FetchRated Listing",
    description: "Your practice listed in the FetchRated directory with verified badge.",
  },
];

const faqs = [
  {
    question: "Is it really free?",
    answer: "Yes. There is no charge at any stage of the pilot. If you later choose to join membership, that is a separate decision made after you've seen your results.",
  },
  {
    question: "Who contacts my clients?",
    answer: "FetchRated contacts them independently, using our Conversation Methodology—a warm, unhurried check-in approach. We do not cold-pitch or spam.",
  },
  {
    question: "Will my clients be bothered?",
    answer: "We contact each client once. The message is personalised to their pet and their visit. Most clients respond positively—they appreciate being asked.",
  },
  {
    question: "What happens after the pilot?",
    answer: "We present your results and extend a membership invitation if appropriate. You are under no obligation to continue. The reviews we collected are yours to keep.",
  },
  {
    question: "Who is FetchRated?",
    answer: "An independent organisation—not a marketing agency, not a software vendor. Our interest is in helping pet owners find quality care and helping excellent practices get recognised.",
  },
];

export default function ForPracticesPage() {
  return (
    <div className="min-h-screen bg-card">
      <Navigation currentPath="/for-practices" />

      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <Badge className="bg-secondary text-white uppercase text-[10px] tracking-[0.2em] mb-6">
              Institutional Programme
            </Badge>
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-on-surface leading-[1.1] mb-8">
              FetchRated is running a national pilot programme for{" "}
              <span className="serif-italic font-medium">quality pet care.</span>
            </h1>
            <p className="text-xl text-on-surface-variant max-w-xl leading-relaxed mb-10">
              Selected practices receive a comprehensive visibility audit, verified customer reviews,
              and standards assessment—at no cost during the pilot phase.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#coverage"
                className="inline-flex items-center justify-center h-12 px-8 bg-primary text-white font-bold text-sm uppercase tracking-widest rounded-sm hover:bg-primary-container transition-colors"
              >
                See If Your Area Is Active
              </a>
              <a
                href="/how-we-assess"
                className="inline-flex items-center justify-center h-12 px-8 border border-outline-variant/20 text-primary font-bold text-sm uppercase tracking-widest rounded-sm hover:bg-surface-container-low transition-colors"
              >
                View Methodology
              </a>
            </div>
          </div>

          {/* Coverage Map */}
          <div id="coverage" className="lg:col-span-5">
            <CoverageMap />
          </div>
        </section>

        {/* What Pilot Participants Receive */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 mt-16">
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-on-surface mb-4">
            What Pilot Participants <span className="serif-italic">Receive</span>
          </h2>
          <p className="text-on-surface-variant text-lg mb-12 max-w-2xl">
            Every practice in the pilot receives a comprehensive package at no cost.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pilotBenefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="p-6 bg-surface border border-outline-variant/10 rounded-sm"
                >
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-bold text-on-surface mb-2">{benefit.title}</h3>
                  <p className="text-sm text-on-surface-variant">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* How the Pilot Works */}
        <NumberedSteps steps={qualificationSteps} className="mt-8" />

        {/* Assessment Protocol */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-32 grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <h2 className="font-headline text-4xl font-medium tracking-tight mb-8">
              Assessment <span className="serif-italic">Protocol</span>
            </h2>
            <p className="text-on-surface-variant mb-12 leading-relaxed">
              Our assessment criteria are built upon the 2024 Welfare Framework.
              Practices must demonstrate compliance across four primary axes to achieve FetchRated accreditation.
            </p>
            <AssessmentProtocol items={protocolItems} />
          </div>

          <div>
            <VerificationChecklist
              title="Verification Checklist"
              items={verificationItems}
            />
            <div className="mt-6 bg-surface-container-low p-6 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                  Status
                </div>
                <div className="text-sm font-bold text-primary italic">
                  Cohort Alpha Open
                </div>
              </div>
              <a
                href="/for-practices/pilot/apply"
                className="inline-flex items-center justify-center h-10 px-6 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-primary-container transition-colors"
              >
                Join Registry
              </a>
            </div>
          </div>
        </section>

        {/* Why It's Free */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <Card className="p-8 md:p-12 border-primary/20 bg-primary/5">
            <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">
              Why It's Free
            </h2>
            <p className="text-on-surface-variant leading-relaxed max-w-3xl">
              This is a pilot programme. We're building a national picture of quality pet care
              across the UK. Participation is free. There is no obligation to join membership
              after your pilot results are delivered. The reviews we collect during your pilot
              are yours to keep regardless of whether you continue with FetchRated.
            </p>
          </Card>
        </section>

        {/* Qualification */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <Card className="p-8 md:p-12 bg-surface-container-low border-outline-variant/10">
            <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">
              Qualification
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-6 max-w-3xl">
              Not every practice is selected. Eligibility depends on your area being active
              in the current cohort. If you've received direct mail or a personalised link,
              your place may already be reserved.
            </p>
            <a
              href="/for-practices/pilot/apply"
              className="inline-flex items-center justify-center h-12 px-8 bg-primary text-white font-bold text-sm uppercase tracking-widest rounded-sm hover:bg-primary-container transition-colors"
            >
              Apply for the Pilot
            </a>
          </Card>
        </section>

        {/* FAQs */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-on-surface mb-12 text-center">
            Frequently Asked <span className="serif-italic">Questions</span>
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-surface border border-outline-variant/10 rounded-sm"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-bold text-on-surface pr-4">{faq.question}</span>
                  <ChevronDown className="w-5 h-5 text-on-surface-variant shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 text-on-surface-variant leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <CTABanner
          headline="Secure your practice's place in the pilot."
          description="Start your assessment process today and join the national standard for pet care excellence."
          actionLabel="Apply for the Pilot"
          actionHref="/for-practices/pilot/apply"
        />
      </main>

      <Footer />
    </div>
  );
}
