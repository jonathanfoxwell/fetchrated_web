import { Stethoscope, Scissors, GraduationCap, Home } from "lucide-react";
import type { ServiceCategory } from "@/components";
import type { Guide } from "@/components";

// Service Categories. Pre-pilot only the `vets` category has real underlying
// data — the others are kept here so the directory page conveys the full
// breadth of FetchRated's planned coverage. CategoryCard renders comingSoon
// entries grayscaled, unlinked, with a "Coming soon" badge.
export const serviceCategories: ServiceCategory[] = [
  {
    slug: "vets",
    name: "Veterinary Practices",
    description: "Find verified vets and animal hospitals near you",
    icon: Stethoscope,
    imageUrl: "/images/categories/vets.jpg",
  },
  {
    slug: "groomers",
    name: "Dog Groomers",
    description: "Professional grooming services for your pet",
    icon: Scissors,
    imageUrl: "/images/categories/groomers.jpg",
    comingSoon: true,
  },
  {
    slug: "trainers",
    name: "Dog Trainers",
    description: "Certified trainers and behaviourists",
    icon: GraduationCap,
    imageUrl: "/images/categories/trainers.jpg",
    comingSoon: true,
  },
  {
    slug: "boarding",
    name: "Boarding & Daycare",
    description: "Safe and caring facilities for your pet",
    icon: Home,
    imageUrl: "/images/categories/boarding.jpg",
    comingSoon: true,
  },
];

// Pillar Guides
export const pillarGuides: Guide[] = [
  {
    slug: "how-to-choose-a-vet",
    title: "How to Choose a Vet: The Complete Guide",
    excerpt: "Everything you need to know about finding the right veterinary practice for your pet, from checking credentials to evaluating facilities.",
    category: "Veterinary",
    readTime: 12,
    isPillar: true,
    imageUrl: "/images/guides/how-to-choose-vet.jpg",
  },
  {
    slug: "how-to-choose-a-dog-groomer",
    title: "How to Choose a Dog Groomer",
    excerpt: "A comprehensive guide to finding a professional groomer who will keep your dog looking and feeling their best.",
    category: "Grooming",
    readTime: 8,
    isPillar: true,
    imageUrl: "/images/guides/how-to-choose-groomer.jpg",
  },
  {
    slug: "how-to-choose-a-dog-trainer",
    title: "How to Choose a Dog Trainer",
    excerpt: "Learn what to look for in a dog trainer and how to find one whose methods align with your values.",
    category: "Training",
    readTime: 10,
    isPillar: true,
    imageUrl: "/images/guides/how-to-choose-trainer.jpg",
  },
  {
    slug: "understanding-vet-reviews",
    title: "Understanding Online Vet Reviews",
    excerpt: "How to read between the lines of online reviews and identify genuine feedback from fake or biased reviews.",
    category: "Reviews",
    readTime: 7,
    isPillar: true,
    imageUrl: "/images/guides/understanding-vet-reviews.jpg",
  },
];

// Supporting Articles
export const supportingArticles: Guide[] = [
  {
    slug: "what-to-expect-first-vet-visit",
    title: "What to Expect at Your First Vet Visit",
    excerpt: "Preparing for your new pet's first veterinary appointment.",
    category: "Veterinary",
    readTime: 5,
    imageUrl: "/images/guides/first-vet-visit.jpg",
  },
  {
    slug: "pet-vaccination-schedule",
    title: "Pet Vaccination Schedule: A Complete Guide",
    excerpt: "Understanding which vaccinations your pet needs and when.",
    category: "Health",
    readTime: 6,
    imageUrl: "/images/guides/vaccination-schedule.jpg",
  },
  {
    slug: "signs-your-pet-needs-grooming",
    title: "5 Signs Your Pet Needs Professional Grooming",
    excerpt: "How to tell when it's time to book a grooming appointment.",
    category: "Grooming",
    readTime: 4,
    imageUrl: "/images/guides/grooming-signs.jpg",
  },
  {
    slug: "puppy-training-basics",
    title: "Puppy Training Basics: Start Here",
    excerpt: "Essential commands and techniques for new puppy owners.",
    category: "Training",
    readTime: 8,
    imageUrl: "/images/guides/puppy-training.jpg",
  },
  {
    slug: "choosing-pet-insurance",
    title: "How to Choose Pet Insurance",
    excerpt: "Comparing policies and understanding what coverage you really need.",
    category: "Finance",
    readTime: 7,
    imageUrl: "/images/guides/pet-insurance.jpg",
  },
  {
    slug: "emergency-vet-when-to-go",
    title: "Emergency Vet: When Should You Go?",
    excerpt: "Recognizing the signs that require immediate veterinary attention.",
    category: "Health",
    readTime: 5,
    imageUrl: "/images/guides/emergency-vet.jpg",
  },
  {
    slug: "when-to-change-vets",
    title: "When to Change Vets: 7 Warning Signs",
    excerpt: "How to know when it's time to find a new veterinary practice for your pet.",
    category: "Veterinary",
    readTime: 6,
    imageUrl: "/images/guides/how-to-choose-vet.jpg",
  },
  {
    slug: "understanding-vet-fees",
    title: "Understanding Vet Fees: What You're Paying For",
    excerpt: "A breakdown of common veterinary costs and how to budget for pet healthcare.",
    category: "Finance",
    readTime: 8,
    imageUrl: "/images/guides/pet-insurance.jpg",
  },
  {
    slug: "questions-before-booking-groomer",
    title: "10 Questions to Ask Before Booking a Groomer",
    excerpt: "Essential questions to ensure your pet has a safe and positive grooming experience.",
    category: "Grooming",
    readTime: 5,
    imageUrl: "/images/categories/groomers.jpg",
  },
  {
    slug: "dog-anxiety-at-vet",
    title: "Dog Anxiety at the Vet: What Helps",
    excerpt: "Practical tips to reduce your dog's stress during veterinary visits.",
    category: "Health",
    readTime: 7,
    imageUrl: "/images/categories/trainers.jpg",
  },
  {
    slug: "breed-specific-grooming-needs",
    title: "Breed-Specific Grooming: What Your Dog Needs",
    excerpt: "Understanding the grooming requirements for different coat types and breeds.",
    category: "Grooming",
    readTime: 9,
    imageUrl: "/images/guides/how-to-choose-groomer.jpg",
  },
  {
    slug: "positive-vs-punitive-training",
    title: "Positive vs Punitive Training: What to Look For",
    excerpt: "Understanding different training approaches and choosing what's right for your dog.",
    category: "Training",
    readTime: 8,
    imageUrl: "/images/guides/how-to-choose-trainer.jpg",
  },
];

// Tier descriptions — shared between /how-we-assess and /find so they cannot drift
export const tierDescriptions = {
  verified: "Meets our standards for visibility and review quality. A solid, trustworthy practice.",
  excellent: "Exceeds standards across multiple dimensions. Strong reputation with consistently positive reviews.",
  outstanding: "Top-tier across all dimensions. Among the best-reviewed and most visible practices in your area.",
};

// Methodology data
export const weightingData = [
  { label: "Clinical Standards", percentage: 45 },
  { label: "Facility Infrastructure", percentage: 35 },
  { label: "Staff Certification", percentage: 20 },
];

export const criteriaData = [
  {
    category: "Medical",
    factor: "Clinical Rigor",
    measurement: "Bi-annual review of on-site medical equipment, emergency protocols, and pharmacy management systems.",
    impact: "critical" as const,
  },
  {
    category: "Operational",
    factor: "Patient Outcomes",
    measurement: "Statistical analysis of recovery rates, secondary infection incidents, and long-term wellness tracking post-discharge.",
    impact: "high" as const,
  },
  {
    category: "Ethical",
    factor: "Transparency Index",
    measurement: "Audit of pricing structures, ownership disclosures, and clarity of customer-facing contracts.",
    impact: "vital" as const,
  },
  {
    category: "Physical",
    factor: "Environmental Safety",
    measurement: "Evaluation of air filtration systems (HEPA), non-porous surface integrity, and sound management for reduced stress.",
    impact: "moderate" as const,
  },
];

export const verificationItems = [
  { label: "Surgical Suite Calibration Records", completed: true },
  { label: "Nurse-to-Patient Ratio (24hr Cover)", completed: true },
  { label: "Post-Op Recovery Outcome Data", completed: true },
  { label: "Bi-Annual CPD Audit Compliance", completed: true },
  { label: "Clinical Waste & Sustainability Protocol", completed: true },
];
