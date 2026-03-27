import {
  Navigation,
  Footer,
  NumberedSteps,
  CoverageMap,
  AssessmentProtocol,
  Badge,
  CTABanner,
  Card,
} from "@/components";
import { Shield, Scale, Eye, Star, BarChart3, Video, MapPin, ChevronDown } from "lucide-react";

export const metadata = {
  title: "For Practices | FetchRated Pilot Programme",
  description: "You've been selected for the FetchRated pilot. Receive a free visibility audit, verified Google reviews from your customers, and a listing in our directory.",
};

const qualificationSteps = [
  {
    number: "01.",
    title: "You Confirm",
    description: "Accept your pilot place and share basic practice details. Takes about two minutes. No paperwork, no fees.",
  },
  {
    number: "02.",
    title: "We Assess",
    description: "We review your online presence, collect verified reviews from your existing customers, and compile your results. You don't need to do anything.",
  },
  {
    number: "03.",
    title: "You Receive",
    description: "A personalised video report with your visibility score, verified reviews posted to Google, and your FetchRated directory listing.",
  },
];

const protocolItems = [
  {
    icon: Shield,
    title: "RCVS Registered",
    description: "The pilot is open to practices registered with the RCVS or equivalent professional body.",
  },
  {
    icon: Scale,
    title: "Genuine Reviews Only",
    description: "We collect real feedback from real customers. No fake reviews, no gaming the system.",
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
    question: "Who is FetchRated?",
    answer: "We're an independent UK organisation building a national directory of verified pet care practices. We're not a marketing agency, not a software vendor, and we don't sell your data. Our goal is simple: help pet owners find quality care and help excellent practices get the recognition they deserve.",
  },
  {
    question: "Why was my practice selected?",
    answer: "We analyse publicly available data—your Google reviews, online presence, and local reputation—to identify practices that are already doing good work. If you received our letter, it's because your practice stood out. This is recognition, not inspection.",
  },
  {
    question: "Is it really free?",
    answer: "Yes. The pilot is completely free. There are no hidden fees, no contracts, and no obligation to continue afterwards. We're building a national picture of quality pet care, and your participation helps us do that.",
  },
  {
    question: "How do you contact my clients?",
    answer: "We reach out to recent customers with a short, friendly message about their pet's visit. We ask how it went. If they had a good experience, we invite them to share it on Google. If they had concerns, we listen first and share that feedback with you privately. One message per customer, no spam, no sales pitch.",
  },
  {
    question: "Will my clients mind being contacted?",
    answer: "In our experience, most clients appreciate being asked. The message is personalised to their pet by name and their recent visit. It takes less than a minute to respond. We've found that clients who had a good experience are happy to say so.",
  },
  {
    question: "What happens after the pilot?",
    answer: "You receive your results—a personalised video walkthrough of your visibility score, your verified reviews, and how you compare locally. If you'd like to continue with ongoing review collection and membership, we'll extend an invitation. But there's no obligation. The reviews we collected during the pilot are yours to keep either way.",
  },
  {
    question: "What data do you need from me?",
    answer: "Just your practice name, a contact name, email, and optionally a phone number. We handle everything else using publicly available information. We don't need access to your practice management system or customer database.",
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
              By Invitation
            </Badge>
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-on-surface leading-[1.1] mb-8">
              Your practice has been selected for the{" "}
              <span className="serif-italic font-medium">FetchRated pilot.</span>
            </h1>
            <p className="text-xl text-on-surface-variant max-w-xl leading-relaxed mb-10">
              We've identified your practice as one that's already doing excellent work.
              The pilot gives you a free visibility audit, verified Google reviews from your existing customers,
              and a listing in our national directory.
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

        {/* What We Look At */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-32 grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <h2 className="font-headline text-4xl font-medium tracking-tight mb-8">
              What We <span className="serif-italic">Look At</span>
            </h2>
            <p className="text-on-surface-variant mb-12 leading-relaxed">
              Our assessment focuses on your online presence and reputation—not
              an inspection of your facilities. We review what pet owners can
              already see when they search for you.
            </p>
            <AssessmentProtocol items={protocolItems} />
          </div>

          <div>
            <div className="bg-surface border border-outline-variant/10 rounded-sm p-8">
              <h3 className="font-bold text-lg mb-6">What We Assess</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <span className="font-medium">Online Visibility</span>
                    <p className="text-sm text-on-surface-variant">How easily customers can find you through search</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <span className="font-medium">Review Quality</span>
                    <p className="text-sm text-on-surface-variant">Volume, recency, and sentiment of your existing reviews</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <span className="font-medium">Local Position</span>
                    <p className="text-sm text-on-surface-variant">How you compare to other practices in your area</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <span className="font-medium">AI Search Presence</span>
                    <p className="text-sm text-on-surface-variant">How your practice appears in AI-generated recommendations</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="mt-6 bg-surface-container-low p-6 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                  Status
                </div>
                <div className="text-sm font-bold text-primary italic">
                  Now Accepting Practices
                </div>
              </div>
              <a
                href="/for-practices/pilot/apply"
                className="inline-flex items-center justify-center h-10 px-6 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-primary-container transition-colors"
              >
                Get Started
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

        {/* Already Invited */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <Card className="p-8 md:p-12 bg-surface-container-low border-outline-variant/10">
            <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">
              Received Our Letter?
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-6 max-w-3xl">
              If you've received a letter or email from us, your place in the pilot is already reserved.
              Use the link in your invitation to confirm your details, or enter your practice name below
              to check your status.
            </p>
            <a
              href="/for-practices/pilot/apply"
              className="inline-flex items-center justify-center h-12 px-8 bg-primary text-white font-bold text-sm uppercase tracking-widest rounded-sm hover:bg-primary-container transition-colors"
            >
              Confirm Your Place
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
          headline="Ready to get started?"
          description="Confirm your place in the pilot. It takes two minutes and there's no obligation to continue."
          actionLabel="Confirm Your Place"
          actionHref="/for-practices/pilot/apply"
        />
      </main>

      <Footer />
    </div>
  );
}
