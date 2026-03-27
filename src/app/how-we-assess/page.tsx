import Image from "next/image";
import {
  Navigation,
  Footer,
  WeightingBars,
  Card,
} from "@/components";
import { Shield, MessageCircle, ChevronDown, Eye, Star, Users, TrendingUp } from "lucide-react";

const assessmentWeighting = [
  { label: "Review Quality & Volume", percentage: 35 },
  { label: "Online Visibility", percentage: 30 },
  { label: "Review Authenticity", percentage: 20 },
  { label: "Local Competitive Position", percentage: 15 },
];

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
  title: "How We Assess | FetchRated",
  description: "We assess practices on online visibility, review quality, review authenticity, and local competitive position. No facility inspections—just your online reputation.",
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
              How We{" "}
              <span className="serif-italic font-medium">Assess Practices.</span>
            </h1>
            <p className="text-xl md:text-2xl text-on-surface-variant leading-relaxed max-w-2xl">
              We measure what pet owners actually care about: your reputation, your visibility,
              and whether the reviews you have are genuine.
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
                  What We Measure
                </h2>
                <p className="text-on-surface-variant mb-12 max-w-md">
                  Our assessment focuses on your online presence and reputation—the things
                  pet owners see when they're deciding which practice to trust.
                </p>
                <WeightingBars items={assessmentWeighting} />
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

        {/* What This Means In Practice */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-32">
          <h2 className="text-4xl font-headline font-bold text-on-surface mb-6">
            What This Means <span className="serif-italic">In Practice</span>
          </h2>
          <p className="text-on-surface-variant mb-12 max-w-2xl">
            We don't inspect your facilities or audit your clinical procedures. We assess what's already
            publicly visible—and we verify that your reviews are genuine.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 border-outline-variant/10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <span className="text-green-600 text-lg">✓</span>
                </div>
                <div>
                  <h3 className="font-bold mb-2">What We Do Assess</h3>
                  <ul className="text-sm text-on-surface-variant space-y-2">
                    <li>• Your Google reviews (volume, recency, sentiment)</li>
                    <li>• Your website and online presence</li>
                    <li>• How you appear in local search results</li>
                    <li>• How you appear in AI-generated recommendations</li>
                    <li>• Consistency of your business information online</li>
                  </ul>
                </div>
              </div>
            </Card>
            <Card className="p-8 border-outline-variant/10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <span className="text-gray-400 text-lg">✗</span>
                </div>
                <div>
                  <h3 className="font-bold mb-2">What We Don't Do</h3>
                  <ul className="text-sm text-on-surface-variant space-y-2">
                    <li>• On-site inspections or facility audits</li>
                    <li>• Clinical procedure reviews</li>
                    <li>• Staff certification checks</li>
                    <li>• Equipment calibration assessments</li>
                    <li>• Anything that requires access to your premises</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Four Assessment Dimensions */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
          <h2 className="text-4xl font-headline font-bold text-on-surface mb-6">
            Four Assessment <span className="serif-italic">Dimensions</span>
          </h2>
          <p className="text-on-surface-variant mb-12 max-w-2xl">
            Every practice in the pilot is assessed across four dimensions. Together, these form your Standards Score.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Eye, num: "01", title: "Online Visibility", desc: "Can pet owners find you easily? We check your website, search rankings, Google Business profile, and overall digital footprint." },
              { icon: Star, num: "02", title: "Review Quality", desc: "What are your customers saying? We analyse the volume, recency, and sentiment of your reviews across platforms." },
              { icon: Users, num: "03", title: "Review Authenticity", desc: "Are your reviews real? We contact your customers directly to verify their experiences are genuine." },
              { icon: TrendingUp, num: "04", title: "Local Position", desc: "How do you compare? We benchmark you against other practices in your area across all metrics." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.num} className="p-6 border-outline-variant/10">
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <span className="text-2xl font-headline italic text-primary/50 mb-2 block">
                    {item.num}
                  </span>
                  <h3 className="font-bold mb-3">{item.title}</h3>
                  <p className="text-sm text-on-surface-variant">{item.desc}</p>
                </Card>
              );
            })}
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
              The Three <span className="serif-italic">Tiers</span>
            </h2>
            <p className="text-lg text-on-surface-variant leading-relaxed mb-12">
              Based on your assessment, you'll receive one of three badges. Each represents
              a genuine achievement—there's no "basic" tier that everyone gets.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-10 h-10 text-secondary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Verified</h3>
                <p className="text-sm text-on-surface-variant">
                  Meets our standards for visibility and review quality. A solid, trustworthy practice.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-tertiary/20 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-10 h-10 text-tertiary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Excellent</h3>
                <p className="text-sm text-on-surface-variant">
                  Exceeds standards across multiple dimensions. Strong reputation with consistently positive reviews.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Outstanding</h3>
                <p className="text-sm text-on-surface-variant">
                  Top-tier across all dimensions. Among the best-reviewed and most visible practices in your area.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Verification */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <Card className="p-8 md:p-12 bg-on-surface text-card">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-headline font-bold leading-tight mb-6">
                  Every Badge is{" "}
                  <span className="serif-italic font-medium text-secondary-container">
                    Verifiable.
                  </span>
                </h2>
                <p className="text-surface-container-high leading-relaxed mb-6">
                  When you see a FetchRated badge on a practice's website or window, you can verify
                  it's genuine. Each badge links to a verification page showing the practice's
                  current status and assessment date.
                </p>
                <p className="text-surface-container-high/70 text-sm">
                  This protects both pet owners (from fake badges) and practices (from competitors
                  misusing the mark).
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-48 h-48 rounded-lg bg-white/10 flex items-center justify-center">
                  <Shield className="w-20 h-20 text-primary" />
                </div>
              </div>
            </div>
          </Card>
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
