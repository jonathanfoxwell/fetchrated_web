import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Navigation,
  Footer,
  Card,
  Badge,
} from "@/components";
import { samplePracticeDetails } from "@/lib/data";
import { Shield, CheckCircle, Calendar, MapPin, ExternalLink } from "lucide-react";

interface VerifyPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: VerifyPageProps) {
  const { id } = await params;
  // In real app, fetch practice by ID
  const practice = id === "1" ? samplePracticeDetails : null;

  if (!practice) {
    return { title: "Verification Not Found | FetchRated" };
  }

  return {
    title: `Verify ${practice.name} | FetchRated`,
    description: `Verify the FetchRated trust mark for ${practice.name}. This practice has been independently assessed and verified.`,
  };
}

export default async function VerifyPage({ params }: VerifyPageProps) {
  const { id } = await params;

  // In real app, fetch verification data by ID
  const practice = id === "1" ? samplePracticeDetails : null;

  if (!practice) {
    notFound();
  }

  const verificationData = {
    verifiedDate: "2024-02-01",
    expiryDate: "2025-02-01",
    assessmentId: `FR-2024-${id.padStart(6, "0")}`,
    tier: practice.badgeTier,
    status: "active" as const,
  };

  const tierLabels = {
    verified: "Verified",
    excellent: "Excellent",
    outstanding: "Outstanding",
  };

  const tierColors = {
    verified: "bg-secondary",
    excellent: "bg-tertiary",
    outstanding: "bg-primary",
  };

  return (
    <div className="min-h-screen bg-surface-container-low">
      <Navigation />

      <main className="pt-24 pb-24">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 py-12">
          {/* Verification Status */}
          <Card className="p-8 md:p-12 text-center mb-8">
            {/* Status Icon */}
            <div className="w-24 h-24 rounded-full bg-tertiary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-tertiary" />
            </div>

            {/* Status Message */}
            <h1 className="text-2xl md:text-3xl font-headline font-bold text-on-surface mb-2">
              Verification Confirmed
            </h1>
            <p className="text-on-surface-variant mb-8">
              This trust mark is valid and currently active.
            </p>

            {/* Badge Display */}
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-surface-container-low rounded-lg mb-8">
              <Shield className="w-10 h-10 text-primary" />
              <div className="text-left">
                <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                  FetchRated
                </p>
                <Badge className={`${tierColors[verificationData.tier]} text-white uppercase tracking-widest`}>
                  {tierLabels[verificationData.tier]}
                </Badge>
              </div>
            </div>

            {/* Practice Info */}
            <div className="border-t border-outline-variant/20 pt-8">
              <h2 className="text-xl font-bold mb-2">{practice.name}</h2>
              <p className="flex items-center justify-center gap-2 text-on-surface-variant mb-4">
                <MapPin className="w-4 h-4" />
                {practice.location}
              </p>
              <Link
                href={`/find/practice/${practice.slug}`}
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
              >
                View full profile
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </Card>

          {/* Verification Details */}
          <Card className="p-6 md:p-8">
            <h3 className="font-bold text-sm uppercase tracking-widest text-on-surface-variant mb-6">
              Verification Details
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-outline-variant/10">
                <span className="text-on-surface-variant">Assessment ID</span>
                <span className="font-mono text-sm font-medium">{verificationData.assessmentId}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-outline-variant/10">
                <span className="text-on-surface-variant">Status</span>
                <span className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                  <span className="font-medium text-tertiary">Active</span>
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-outline-variant/10">
                <span className="text-on-surface-variant">Tier</span>
                <span className="font-medium">{tierLabels[verificationData.tier]}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-outline-variant/10">
                <span className="text-on-surface-variant flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Verified On
                </span>
                <span className="font-medium">
                  {new Date(verificationData.verifiedDate).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-on-surface-variant flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Valid Until
                </span>
                <span className="font-medium">
                  {new Date(verificationData.expiryDate).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </Card>

          {/* Info Box */}
          <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-lg">
            <h4 className="font-bold mb-2">About FetchRated Verification</h4>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              FetchRated independently assesses pet care practices against our published
              standards. Verification confirms that this practice has met our criteria
              for quality, transparency, and customer satisfaction. Learn more about{" "}
              <Link href="/how-we-assess" className="text-primary hover:underline">
                our methodology
              </Link>
              .
            </p>
          </div>

          {/* Report Link */}
          <p className="text-center text-sm text-on-surface-variant mt-8">
            Believe this verification is incorrect?{" "}
            <a href="mailto:verify@fetchrated.com" className="text-primary hover:underline">
              Report an issue
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
