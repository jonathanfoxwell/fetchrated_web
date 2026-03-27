import Image from "next/image";
import {
  Navigation,
  Footer,
  WeightingBars,
  CriteriaMatrix,
  Card,
} from "@/components";
import { weightingData, criteriaData } from "@/lib/data";
import { Shield, Fingerprint, Lock, MessageCircle, ChevronDown } from "lucide-react";

const petOwnerFaqs = [
  {
    question: "What does the Verified Reviews badge mean?",
    answer: "It means the practice has reviews that were independently collected by FetchRated through our Conversation Methodology. These reviews come from real customers who we contacted directly after their visit—not incentivised reviews or reviews collected by the practice itself.",
  },
  {
    question: "Can a practice pay for a better rating?",
    answer: "No. FetchRated does not accept payment from practices in exchange for ratings, reviews, or favorable placement. Our assessments are conducted using standardised criteria by trained evaluators. Practices cannot influence their scores through advertising, sponsorship, or any commercial arrangement.",
  },
  {
    question: "What if I have a concern about a listed practice?",
    answer: "If you have a concern about a practice listed in our directory, please email us at hello@fetchrated.com. We take all feedback seriously and will investigate appropriately. Your concern will be handled confidentially.",
  },
];

export const metadata = {
  title: "How We Assess | FetchRated Methodology",
  description: "Our assessment methodology covers online visibility, review quality and volume, review authenticity, and competitive position. Learn how we verify pet care practices.",
};

export default function HowWeAssessPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Navigation currentPath="/how-we-assess" />

      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24 grid md:grid-cols-12 gap-12 items-end">
          <div className="md:col-span-8">
            <div className="mb-4 flex items-center gap-2">
              <span className="w-12 h-[1px] bg-primary"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Methodology
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-headline font-bold tracking-tight leading-[0.95] text-on-surface mb-8">
              The Science of{" "}
              <span className="serif-italic font-medium">Editorial Trust.</span>
            </h1>
            <p className="text-xl md:text-2xl text-on-surface-variant leading-relaxed max-w-2xl">
              Our methodology isn't just a list of rules—it's an institutional standard
              designed to bring transparency to an opaque industry.
            </p>
          </div>
          <div className="md:col-span-4 flex justify-end">
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 rounded-full border border-outline-variant/30 animate-pulse"></div>
              <div className="absolute inset-4 rounded-full border border-outline/20 z-10 pointer-events-none"></div>
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&q=80"
                  alt="Veterinary assessment"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Weighting Distribution */}
        <section className="bg-surface-container-low py-24 mb-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-4xl font-headline font-bold text-on-surface mb-6">
                  Weighting Distribution
                </h2>
                <p className="text-on-surface-variant mb-12 max-w-md">
                  Integrity is measured through diverse vectors. We weight clinical outcomes
                  most heavily, followed by the physical environment and the human expertise behind it.
                </p>
                <WeightingBars items={weightingData} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square rounded-full overflow-hidden bg-surface-container-highest relative">
                  <Image
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80"
                    alt="Veterinary clinical examination"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="aspect-square rounded-full overflow-hidden bg-primary/5 relative mt-12">
                  <Image
                    src="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=600&q=80"
                    alt="Veterinarian with pet"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Criteria Matrix */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-32">
          <h2 className="text-4xl font-headline font-bold text-on-surface mb-12">
            Detailed Criteria Matrix
          </h2>
          <CriteriaMatrix criteria={criteriaData} />
        </section>

        {/* Four Assessment Dimensions */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
          <h2 className="text-4xl font-headline font-bold text-on-surface mb-12">
            Four Assessment <span className="serif-italic">Dimensions</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Online Visibility", desc: "How easily can customers find you? We assess website quality, search rankings, and digital presence." },
              { num: "02", title: "Review Quality", desc: "Volume and sentiment of genuine customer reviews across platforms, weighted by recency and detail." },
              { num: "03", title: "Review Authenticity", desc: "Our Conversation Methodology verifies reviews through direct customer contact." },
              { num: "04", title: "Competitive Position", desc: "How you compare to peers in your area across all quality metrics." },
            ].map((item) => (
              <Card key={item.num} className="p-6 border-outline-variant/10">
                <span className="text-3xl font-headline italic text-primary mb-4 block">
                  {item.num}
                </span>
                <h3 className="font-bold uppercase tracking-wider mb-3">{item.title}</h3>
                <p className="text-sm text-on-surface-variant">{item.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* The Conversation Methodology */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-3 mb-6">
                <MessageCircle className="w-8 h-8 text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  Review Collection
                </span>
              </div>
              <h2 className="text-4xl font-headline font-bold text-on-surface mb-6">
                The Conversation <span className="serif-italic">Methodology</span>
              </h2>
              <p className="text-lg text-on-surface-variant leading-relaxed mb-6">
                We contact a practice's existing customers after a visit—not to ask for a review,
                but to ask how it went. For customers who had a good experience, we invite them
                to share that on Google.
              </p>
              <p className="text-lg text-on-surface-variant leading-relaxed mb-6">
                Customers with concerns are heard first, and those concerns go to the practice
                privately. We never incentivise reviews. We never coach customers on what to write.
              </p>
              <p className="text-on-surface-variant leading-relaxed">
                The result is a verified review record that both pet owners and practices can trust—
                reviews that reflect genuine experiences, collected through an independent process.
              </p>
            </div>
            <Card className="p-8 bg-surface-container-low border-outline-variant/10">
              <h3 className="font-bold text-lg mb-6">How It Works</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0 text-sm">1</span>
                  <div>
                    <h4 className="font-semibold mb-1">We reach out</h4>
                    <p className="text-sm text-on-surface-variant">We contact recent customers with a personalised message about their pet's visit.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0 text-sm">2</span>
                  <div>
                    <h4 className="font-semibold mb-1">We listen first</h4>
                    <p className="text-sm text-on-surface-variant">If there are concerns, we hear them and pass them to the practice privately.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0 text-sm">3</span>
                  <div>
                    <h4 className="font-semibold mb-1">Happy customers share</h4>
                    <p className="text-sm text-on-surface-variant">Customers who had a good experience are invited to leave a Google review.</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* The Standards Score */}
        <section className="bg-surface-container-low py-24 mb-24">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-headline font-bold text-on-surface mb-6">
              The Standards <span className="serif-italic">Score</span>
            </h2>
            <p className="text-lg text-on-surface-variant leading-relaxed mb-8">
              The Standards Score is a composite measure of a practice's assessed position across
              the four dimensions. It informs the membership tier a practice is invited to and
              appears in the practice's FetchRated profile for pet owners.
            </p>
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="font-bold text-sm uppercase tracking-wider">Verified</h3>
                <p className="text-xs text-on-surface-variant mt-1">Meets baseline standards</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-tertiary/20 flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-8 h-8 text-tertiary" />
                </div>
                <h3 className="font-bold text-sm uppercase tracking-wider">Excellent</h3>
                <p className="text-xs text-on-surface-variant mt-1">Exceeds across dimensions</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-sm uppercase tracking-wider">Outstanding</h3>
                <p className="text-xs text-on-surface-variant mt-1">Top-tier performance</p>
              </div>
            </div>
          </div>
        </section>

        {/* Fraud Protection */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative bg-on-surface text-card p-12 md:p-24 overflow-hidden rounded-sm">
            <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-white text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
                  Encrypted Verification
                </div>
                <h2 className="text-4xl md:text-5xl font-headline font-bold leading-tight mb-8">
                  Immutable{" "}
                  <span className="serif-italic font-medium text-secondary-container">
                    Fraud Protection.
                  </span>
                </h2>
                <p className="text-lg text-surface-container-high leading-relaxed mb-8">
                  Every FetchRated Trust Mark is tied to a unique verification hash,
                  ensuring that certification data cannot be altered or falsified.
                  We protect the integrity of our ratings as fiercely as we protect the welfare of animals.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="/verify"
                    className="inline-flex items-center justify-center h-12 px-8 bg-primary text-white font-bold text-sm rounded-sm hover:bg-primary-container transition-colors"
                  >
                    Verify a Mark
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center h-12 px-8 border border-outline-variant/30 font-bold text-sm rounded-sm hover:border-white transition-colors"
                  >
                    Security Protocols
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-6 backdrop-blur-sm rounded-sm">
                  <Fingerprint className="w-8 h-8 text-secondary-container mb-4" />
                  <h3 className="font-bold mb-2">Digital Signature</h3>
                  <p className="text-sm text-surface-container-high/70">
                    Each certificate carries a cryptographic anchor.
                  </p>
                </div>
                <div className="bg-white/5 p-6 backdrop-blur-sm rounded-sm translate-y-8">
                  <Lock className="w-8 h-8 text-secondary-container mb-4" />
                  <h3 className="font-bold mb-2">Vaulted Data</h3>
                  <p className="text-sm text-surface-container-high/70">
                    Raw assessment data is stored in secure ledgers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Independence Statement */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <Card className="p-8 md:p-12 border-primary/20 bg-primary/5">
            <h3 className="text-xl font-bold mb-4">Our Independence</h3>
            <p className="text-on-surface-variant leading-relaxed">
              FetchRated is independently operated. We are not affiliated with the RCVS,
              the British Veterinary Association, or any government body. We do not receive
              referral fees, advertising revenue, or payments from practices in exchange for
              listings or ratings. Practices appear in the FetchRated directory because they
              meet our standards—not because they have paid to be listed.
            </p>
          </Card>
        </section>

        {/* FAQs for Pet Owners */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 pb-24">
          <h2 className="text-3xl font-headline font-bold text-on-surface mb-8 text-center">
            FAQs for <span className="serif-italic">Pet Owners</span>
          </h2>
          <div className="space-y-4">
            {petOwnerFaqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-card border border-outline-variant/10 rounded-lg"
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
      </main>

      <Footer />
    </div>
  );
}
