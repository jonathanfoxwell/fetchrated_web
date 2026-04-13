import { Stethoscope, Scissors, GraduationCap, Home } from "lucide-react";
import type { ServiceCategory } from "@/components";
import type { Guide } from "@/components";

// Service Categories
export const serviceCategories: ServiceCategory[] = [
  {
    slug: "vets",
    name: "Veterinary Practices",
    description: "Find verified vets and animal hospitals near you",
    icon: Stethoscope,
    locationCount: 48,
    imageUrl: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=800&q=80",
  },
  {
    slug: "groomers",
    name: "Dog Groomers",
    description: "Professional grooming services for your pet",
    icon: Scissors,
    locationCount: 32,
    imageUrl: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&q=80",
  },
  {
    slug: "trainers",
    name: "Dog Trainers",
    description: "Certified trainers and behaviorists",
    icon: GraduationCap,
    locationCount: 24,
    imageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
  },
  {
    slug: "boarding",
    name: "Boarding & Daycare",
    description: "Safe and caring facilities for your pet",
    icon: Home,
    locationCount: 18,
    imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?w=800&q=80",
  },
  {
    slug: "how-to-choose-a-dog-groomer",
    title: "How to Choose a Dog Groomer",
    excerpt: "A comprehensive guide to finding a professional groomer who will keep your dog looking and feeling their best.",
    category: "Grooming",
    readTime: 8,
    isPillar: true,
    imageUrl: "https://images.unsplash.com/photo-1597673030062-0a0f1a801a31?w=800&q=80",
  },
  {
    slug: "how-to-choose-a-dog-trainer",
    title: "How to Choose a Dog Trainer",
    excerpt: "Learn what to look for in a dog trainer and how to find one whose methods align with your values.",
    category: "Training",
    readTime: 10,
    isPillar: true,
    imageUrl: "https://images.unsplash.com/photo-1558929996-da64ba858215?w=800&q=80",
  },
  {
    slug: "understanding-vet-reviews",
    title: "Understanding Online Vet Reviews",
    excerpt: "How to read between the lines of online reviews and identify genuine feedback from fake or biased reviews.",
    category: "Reviews",
    readTime: 7,
    isPillar: true,
    imageUrl: "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=800&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80",
  },
  {
    slug: "pet-vaccination-schedule",
    title: "Pet Vaccination Schedule: A Complete Guide",
    excerpt: "Understanding which vaccinations your pet needs and when.",
    category: "Health",
    readTime: 6,
    imageUrl: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&q=80",
  },
  {
    slug: "signs-your-pet-needs-grooming",
    title: "5 Signs Your Pet Needs Professional Grooming",
    excerpt: "How to tell when it's time to book a grooming appointment.",
    category: "Grooming",
    readTime: 4,
    imageUrl: "https://images.unsplash.com/photo-1534361960057-19889db9621e?w=800&q=80",
  },
  {
    slug: "puppy-training-basics",
    title: "Puppy Training Basics: Start Here",
    excerpt: "Essential commands and techniques for new puppy owners.",
    category: "Training",
    readTime: 8,
    imageUrl: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80",
  },
  {
    slug: "choosing-pet-insurance",
    title: "How to Choose Pet Insurance",
    excerpt: "Comparing policies and understanding what coverage you really need.",
    category: "Finance",
    readTime: 7,
    imageUrl: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&q=80",
  },
  {
    slug: "emergency-vet-when-to-go",
    title: "Emergency Vet: When Should You Go?",
    excerpt: "Recognizing the signs that require immediate veterinary attention.",
    category: "Health",
    readTime: 5,
    imageUrl: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&q=80",
  },
  {
    slug: "when-to-change-vets",
    title: "When to Change Vets: 7 Warning Signs",
    excerpt: "How to know when it's time to find a new veterinary practice for your pet.",
    category: "Veterinary",
    readTime: 6,
    imageUrl: "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?w=800&q=80",
  },
  {
    slug: "understanding-vet-fees",
    title: "Understanding Vet Fees: What You're Paying For",
    excerpt: "A breakdown of common veterinary costs and how to budget for pet healthcare.",
    category: "Finance",
    readTime: 8,
    imageUrl: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&q=80",
  },
  {
    slug: "questions-before-booking-groomer",
    title: "10 Questions to Ask Before Booking a Groomer",
    excerpt: "Essential questions to ensure your pet has a safe and positive grooming experience.",
    category: "Grooming",
    readTime: 5,
    imageUrl: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&q=80",
  },
  {
    slug: "dog-anxiety-at-vet",
    title: "Dog Anxiety at the Vet: What Helps",
    excerpt: "Practical tips to reduce your dog's stress during veterinary visits.",
    category: "Health",
    readTime: 7,
    imageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
  },
  {
    slug: "breed-specific-grooming-needs",
    title: "Breed-Specific Grooming: What Your Dog Needs",
    excerpt: "Understanding the grooming requirements for different coat types and breeds.",
    category: "Grooming",
    readTime: 9,
    imageUrl: "https://images.unsplash.com/photo-1597673030062-0a0f1a801a31?w=800&q=80",
  },
  {
    slug: "positive-vs-punitive-training",
    title: "Positive vs Punitive Training: What to Look For",
    excerpt: "Understanding different training approaches and choosing what's right for your dog.",
    category: "Training",
    readTime: 8,
    imageUrl: "https://images.unsplash.com/photo-1558929996-da64ba858215?w=800&q=80",
  },
];

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
