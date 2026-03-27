import {
  Navigation,
  Footer,
  Card,
} from "@/components";
import { Mail, Shield, Users, Target, Building2, FileCheck } from "lucide-react";

export const metadata = {
  title: "About FetchRated | Independent Pet Care Standards",
  description: "FetchRated is an independent organisation running a national programme to verify the quality of pet care services across the UK.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-card">
      <Navigation currentPath="/about" />

      <main className="pt-32 pb-24">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 mb-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold tracking-tight text-on-surface leading-[1.1] mb-8">
            Helping great practices{" "}
            <span className="serif-italic">get found.</span>
          </h1>
          <p className="text-xl text-on-surface-variant leading-relaxed">
            FetchRated exists for two reasons: to help pet owners find practices they can trust,
            and to help excellent practices stand out from the crowd. We do this through
            independent assessment, verified reviews, and transparent standards.
          </p>
        </section>

        {/* The Problem */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 mb-24">
          <h2 className="text-2xl font-bold mb-6">The Problem We're Solving</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 border-outline-variant/10">
              <h3 className="font-bold mb-3">For Pet Owners</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Choosing a vet or groomer often means relying on online reviews that may be fake,
                outdated, or incentivised. There's no easy way to know which practices genuinely
                deliver excellent care versus those that are just good at marketing.
              </p>
            </Card>
            <Card className="p-6 border-outline-variant/10">
              <h3 className="font-bold mb-3">For Practices</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Excellent practices struggle to stand out. You invest in training, facilities,
                and patient care—but have no credible way to demonstrate this to potential customers.
                Your happy clients often don't think to leave reviews; your unhappy ones always do.
              </p>
            </Card>
          </div>
        </section>

        {/* What FetchRated Is */}
        <section className="bg-surface-container-low py-24 mb-24">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6">What FetchRated Is</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 bg-card">
                <Shield className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-bold mb-2">Independent Assessment</h3>
                <p className="text-sm text-on-surface-variant">
                  We evaluate practices against clear, published criteria—not paid placements.
                </p>
              </Card>
              <Card className="p-6 bg-card">
                <Users className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-bold mb-2">Verified Reviews</h3>
                <p className="text-sm text-on-surface-variant">
                  We contact customers directly to verify their experiences are genuine.
                </p>
              </Card>
              <Card className="p-6 bg-card">
                <Target className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-bold mb-2">Quality Standards</h3>
                <p className="text-sm text-on-surface-variant">
                  Our tiered trust marks help you quickly identify excellence.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* What We Actually Do */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 mb-24">
          <h2 className="text-2xl font-bold mb-6">What We Actually Do</h2>
          <p className="text-xl text-on-surface-variant leading-relaxed mb-8">
            We identify practices that are already doing excellent work. We reach out to invite them
            to our pilot programme. We assess their online presence, collect verified reviews from
            their real customers, and list them in our directory with a badge that pet owners can trust.
          </p>
          <p className="text-on-surface-variant leading-relaxed">
            We don't inspect facilities. We don't audit clinical procedures. We focus on what pet owners
            can already see when they search for a practice—and we verify that it's genuine.
          </p>
        </section>

        {/* How the Pilot Works */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 mb-24">
          <h2 className="text-2xl font-bold mb-6">How the Pilot Works</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">
                1
              </span>
              <div>
                <h3 className="font-bold mb-1">We identify promising practices</h3>
                <p className="text-on-surface-variant">
                  We analyse publicly available data—Google reviews, online presence, local reputation—
                  to find practices that are already doing good work.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">
                2
              </span>
              <div>
                <h3 className="font-bold mb-1">We invite them to the pilot</h3>
                <p className="text-on-surface-variant">
                  Selected practices receive a letter or email inviting them to participate.
                  If you received one, your place is already reserved.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">
                3
              </span>
              <div>
                <h3 className="font-bold mb-1">We collect verified reviews</h3>
                <p className="text-on-surface-variant">
                  We contact the practice's recent customers with a short, friendly message.
                  Happy customers are invited to share their experience on Google.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">
                4
              </span>
              <div>
                <h3 className="font-bold mb-1">We deliver results</h3>
                <p className="text-on-surface-variant">
                  Each practice receives a personalised video report, their verified reviews,
                  and a listing in our directory with an appropriate badge.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Independence Statement */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 mb-24">
          <Card className="p-8 md:p-12 border-primary/20 bg-primary/5">
            <h2 className="text-xl font-bold mb-4">Our Independence</h2>
            <p className="text-on-surface-variant leading-relaxed">
              FetchRated is editorially independent. We do not accept payment from
              practices in exchange for ratings, reviews, or favorable placement.
              Our assessments are conducted using standardized criteria by trained
              evaluators. Practices cannot influence their scores through advertising,
              sponsorship, or any commercial arrangement. This independence is
              fundamental to our credibility and to the trust pet owners place in
              our recommendations.
            </p>
          </Card>
        </section>

        {/* Company Info */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 mb-16">
          <h2 className="text-2xl font-bold mb-6">Company Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-outline-variant/10">
              <div className="flex items-start gap-4">
                <Building2 className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Registered in England</h3>
                  <p className="text-sm text-on-surface-variant">
                    FetchRated Ltd is a company registered in England and Wales.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6 border-outline-variant/10">
              <div className="flex items-start gap-4">
                <FileCheck className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Data Protection</h3>
                  <p className="text-sm text-on-surface-variant">
                    Registered with the ICO. We handle personal data in accordance with UK GDPR.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Contact */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
          <Card className="p-8">
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-primary" />
              <div>
                <p className="text-sm text-on-surface-variant">Email us at</p>
                <a
                  href="mailto:hello@fetchrated.com"
                  className="text-lg font-bold text-primary hover:underline"
                >
                  hello@fetchrated.com
                </a>
              </div>
            </div>
            <p className="text-sm text-on-surface-variant mt-4">
              We aim to respond to all enquiries within one working day.
            </p>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}
