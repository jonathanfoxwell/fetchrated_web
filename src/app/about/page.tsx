import {
  Navigation,
  Footer,
  Card,
} from "@/components";
import { Mail, Shield, Users, Target } from "lucide-react";

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
            Bringing transparency to{" "}
            <span className="serif-italic">pet care.</span>
          </h1>
          <p className="text-xl text-on-surface-variant leading-relaxed">
            Finding quality pet care shouldn't be a gamble. Yet for most pet owners,
            choosing a vet, groomer, or trainer means relying on word of mouth,
            questionable online reviews, or simply hoping for the best.
          </p>
        </section>

        {/* The Problem */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 mb-24">
          <h2 className="text-2xl font-bold mb-6">The Problem</h2>
          <div className="prose prose-lg text-on-surface-variant max-w-none">
            <p>
              The pet care industry lacks transparency. Online reviews are often
              unreliable—plagued by fake reviews, competitor sabotage, and businesses
              that cherry-pick feedback. Professional accreditations exist but are
              rarely visible to consumers. And there's no independent body helping
              pet owners understand which practices truly deliver excellent care.
            </p>
            <p>
              Meanwhile, excellent practices struggle to stand out from the crowd.
              They invest in training, facilities, and patient care, but have no
              way to credibly demonstrate this to potential customers.
            </p>
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

        {/* Mission */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 mb-24">
          <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-on-surface-variant leading-relaxed mb-8">
            To improve the visibility of quality pet care through independent assessment,
            verified customer feedback, and transparent standards—helping pet owners
            make informed choices and helping excellent practices get the recognition they deserve.
          </p>
        </section>

        {/* How It Works */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 mb-24">
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">
                1
              </span>
              <div>
                <h3 className="font-bold mb-1">We identify practices</h3>
                <p className="text-on-surface-variant">
                  Using public data, we build a comprehensive picture of pet care
                  providers in each area—their online presence, reviews, and public credentials.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">
                2
              </span>
              <div>
                <h3 className="font-bold mb-1">We verify reviews</h3>
                <p className="text-on-surface-variant">
                  Our Conversation Methodology involves contacting reviewers directly
                  to confirm their experiences are genuine and recent.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">
                3
              </span>
              <div>
                <h3 className="font-bold mb-1">We assess against standards</h3>
                <p className="text-on-surface-variant">
                  Practices that meet our criteria receive a FetchRated trust mark,
                  visible to consumers searching our directory.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">
                4
              </span>
              <div>
                <h3 className="font-bold mb-1">We help you find quality</h3>
                <p className="text-on-surface-variant">
                  Our directory and guides help pet owners discover verified practices
                  and understand what to look for in quality care.
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
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}
