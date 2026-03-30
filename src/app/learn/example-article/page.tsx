/**
 * Example Article Page
 *
 * This page demonstrates how to combine ArticleContent (markdown rendering)
 * with custom article components for richer content layouts.
 *
 * In production, you might have a content_body field for the markdown
 * and separate structured data fields for checklists, FAQs, etc.
 */

import {
  Navigation,
  Footer,
  Breadcrumbs,
  Badge,
  ArticleContent,
  Checklist,
  ProTip,
  FAQ,
  KeyMetricGroup,
  StatusBar,
  SummaryBox,
  NumberedSection,
  PullQuote,
  TableOfContents,
} from "@/components";
import { Clock, Share2, Bookmark, ClipboardCheck } from "lucide-react";

export const metadata = {
  title: "How to Choose the Right Vet | FetchRated",
  description: "A comprehensive guide to selecting quality veterinary care for your pet.",
};

export default function ExampleArticlePage() {
  return (
    <div className="min-h-screen bg-surface-container-low">
      <Navigation currentPath="/learn" />

      <main className="pt-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="py-4">
            <Breadcrumbs
              items={[
                { label: "Guides", href: "/learn" },
                { label: "Veterinary", href: "/learn/topic/veterinary" },
                { label: "How to Choose the Right Vet" },
              ]}
            />
          </div>

          {/* Article Header */}
          <header className="py-8">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge className="bg-primary/10 text-primary">Pillar Guide</Badge>
              <Badge variant="outline">Veterinary</Badge>
              <span className="flex items-center gap-1 text-sm text-on-surface-variant">
                <Clock className="w-4 h-4" />
                12 min read
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-headline font-bold tracking-tight text-on-surface mb-6">
              How to Choose the Right <em className="not-italic font-headline italic">Vet</em>: A Pet Owner&apos;s Handbook
            </h1>

            <p className="text-xl text-on-surface-variant leading-relaxed mb-8 max-w-3xl">
              Finding a clinical partner for your pet&apos;s lifelong journey requires more
              than a local search. It demands a standard of heritage and heart.
            </p>

            <div className="flex items-center gap-4 pb-8 border-b border-outline-variant/20">
              <span className="flex items-center gap-2 text-sm text-on-surface-variant cursor-pointer hover:text-primary transition-colors">
                <Share2 className="w-4 h-4" />
                Share
              </span>
              <span className="flex items-center gap-2 text-sm text-on-surface-variant cursor-pointer hover:text-primary transition-colors">
                <Bookmark className="w-4 h-4" />
                Save
              </span>
            </div>
          </header>

          {/* Main Content Grid */}
          <div className="py-12 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
            {/* Main Article Content */}
            <article>
              {/* Status Bar - Shows registry/verification status */}
              <StatusBar
                status="active"
                title="FetchRated Verified Guide"
                subtitle="Last reviewed: March 2024"
                metrics={[
                  { value: "412", label: "Verified Practices" },
                  { value: "99.8%", label: "Accuracy" },
                ]}
              />

              {/* Key Metrics Section */}
              <KeyMetricGroup
                metrics={[
                  { value: "94.2", unit: "%", label: "Owner Satisfaction" },
                  { value: "3.5", unit: "yrs", label: "Avg. Relationship" },
                  { value: "8.4", unit: "/10", label: "Trust Rating" },
                ]}
              />

              {/* Intro Section - Markdown */}
              <ArticleContent
                content={`
## Introduction

The relationship between you, your pet, and their healthcare provider is built on trust. Finding a practice that aligns with your values and meets your pet's needs requires careful consideration.

This comprehensive guide walks you through the key factors to evaluate when choosing veterinary care. We've distilled insights from thousands of verified practice assessments to help you make an informed decision.
                `}
              />

              {/* Featured Checklist Component */}
              <Checklist
                title="The Essential Checklist"
                icon={ClipboardCheck}
                items={[
                  {
                    title: "Accreditation & Heritage",
                    description:
                      "Ensure the facility holds recognised national standards and has a documented history of clinical rigour.",
                  },
                  {
                    title: "Modern Equipment",
                    description:
                      "Diagnostic capabilities like in-house labs and digital X-rays indicate a commitment to rapid care.",
                  },
                  {
                    title: "Communication Style",
                    description:
                      "Does the staff translate complex clinical data into actionable guidance for you?",
                  },
                  {
                    title: "Emergency Protocols",
                    description:
                      "Clear after-hours care procedures and referral networks demonstrate preparedness.",
                  },
                ]}
              />

              {/* Pro Tip Component */}
              <ProTip
                title="Pro Tip: The Tour Test"
                quote="Always request a brief tour of the boarding and clinical areas. A practice that welcomes transparency is one that maintains institutional pride in its hygiene and organisation."
                author="Dr. Julian Thorne"
                authorRole="Chief Auditor, FetchRated"
              />

              {/* More Markdown Content */}
              <ArticleContent
                content={`
## What to Look For

Quality pet care providers share certain characteristics that set them apart. Look for **clear communication**, transparent pricing, modern facilities, and staff who genuinely care about animal welfare.

### Credentials and Accreditation

Always verify that a practice holds the appropriate professional registrations. For veterinary practices in the UK, this means **RCVS registration**. Don't be afraid to ask about staff qualifications and continuing professional development.

> [!TIP]
> The Royal College of Veterinary Surgeons maintains a public register of all accredited practices. You can verify any practice's credentials online.

### Reviews and Reputation

Online reviews can be helpful, but approach them critically. Look for patterns rather than individual reviews, and be wary of businesses with only perfect scores or suspicious review patterns.
                `}
              />

              {/* Featured Pull Quote */}
              <PullQuote
                variant="featured"
                quote="In veterinary medicine, consistency of care matters more than occasional excellence. A practice with steady 4-star reviews often outperforms one with volatile ratings."
                author="Dr. Sarah Mitchell"
                source="Veterinary Standards Review, 2024"
              />

              {/* Numbered Sections */}
              <NumberedSection number={1} title="Evaluate the Facility">
                <ArticleContent
                  content={`
Visit the practice in person before making a commitment. Pay attention to:

- **Cleanliness**: Reception, examination rooms, and visible treatment areas should be spotless
- **Organisation**: Well-organised practices tend to deliver better care
- **Equipment**: Modern diagnostic equipment suggests investment in quality care
- **Staff demeanour**: Observe how staff interact with animals and owners
                  `}
                />
              </NumberedSection>

              <NumberedSection number={2} title="Assess Communication">
                <ArticleContent
                  content={`
Good communication is essential for effective pet care. During your initial visit, evaluate:

- How thoroughly the vet explains diagnoses and treatment options
- Whether they welcome questions and provide clear answers
- If they discuss costs upfront before proceeding with treatment
- Their approach to follow-up care and ongoing communication
                  `}
                />
              </NumberedSection>

              <NumberedSection number={3} title="Consider Practical Factors">
                <ArticleContent
                  content={`
While quality of care is paramount, practical considerations matter too:

- **Location**: Consider travel time, especially for regular visits or emergencies
- **Hours**: Do their opening hours align with your schedule?
- **Parking**: Is there convenient parking or public transport access?
- **Waiting times**: Ask about typical appointment availability
                  `}
                />
              </NumberedSection>

              {/* Summary Box */}
              <SummaryBox
                title="Summary for Pet Owners"
                variant="highlight"
                action={{ label: "Find Verified Practices", href: "/find" }}
              >
                <ul className="space-y-2">
                  <li>• Verify RCVS registration and practice accreditation</li>
                  <li>• Visit in person and request a facility tour</li>
                  <li>• Evaluate communication style and transparency</li>
                  <li>• Read reviews critically, looking for patterns</li>
                  <li>• Consider practical factors like location and hours</li>
                </ul>
              </SummaryBox>

              {/* FAQ Section */}
              <FAQ
                title="Registry Inquiries"
                items={[
                  {
                    question: "What does 'Verified' status actually entail?",
                    answer:
                      "A FetchRated Verified status means the practice has undergone our comprehensive assessment process, including facility inspection, credential verification, and review analysis. This status is renewed annually.",
                  },
                  {
                    question: "How often are practices re-evaluated?",
                    answer:
                      "Our registry mandates a biennial audit covering sanitation, staff education, and patient outcomes to maintain the FetchRated seal. Practices can also request interim assessments.",
                    defaultOpen: true,
                  },
                  {
                    question: "Should I choose a generalist or a specialist?",
                    answer:
                      "For routine care, a general practice veterinarian is typically sufficient. Specialists are recommended for specific conditions or complex cases. Your general vet can refer you to appropriate specialists when needed.",
                  },
                  {
                    question: "What if I'm unhappy with my current vet?",
                    answer:
                      "You have the right to change veterinary practices at any time. Your medical records can be transferred to your new provider. We recommend discussing any concerns with your current vet first, as issues can often be resolved.",
                  },
                ]}
              />
            </article>

            {/* Sidebar */}
            <aside className="space-y-8">
              <TableOfContents
                items={[
                  { id: "introduction", title: "Introduction", level: 2 },
                  { id: "what-to-look-for", title: "What to Look For", level: 2 },
                  {
                    id: "credentials-and-accreditation",
                    title: "Credentials & Accreditation",
                    level: 3,
                  },
                  {
                    id: "reviews-and-reputation",
                    title: "Reviews & Reputation",
                    level: 3,
                  },
                  { id: "evaluate-the-facility", title: "Evaluate the Facility", level: 2 },
                  { id: "assess-communication", title: "Assess Communication", level: 2 },
                  {
                    id: "consider-practical-factors",
                    title: "Consider Practical Factors",
                    level: 2,
                  },
                  { id: "registry-inquiries", title: "Registry Inquiries", level: 2 },
                ]}
                title="In this guide"
              />

              {/* Sidebar Pro Tip */}
              <PullQuote
                variant="sidebar"
                quote="Trust your instincts. If something feels off during your visit, it's okay to keep looking."
              />
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
