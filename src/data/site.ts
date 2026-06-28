export interface Category {
  slug: string;
  name: string;
  description: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface FeaturedToolSummary {
  name: string;
  slug: string;
  free: boolean;
  accuracy: string;
  bestFor: string;
}

export const siteConfig = {
  name: "DetectAIvoice",
  tagline: "Your guide to detecting AI voice deepfakes",
  description:
    "Comprehensive guides, tool comparisons, and safety tips for detecting AI voice clones and deepfake audio.",
  url: "https://detectaivoice.vercel.app",
  ogImage: "/images/og-default.jpg",
  categories: [
    {
      slug: "consumer-safety",
      name: "Consumer Safety",
      description: "Protect yourself and your family from AI voice scams."
    },
    {
      slug: "enterprise",
      name: "Enterprise Security",
      description: "Deepfake detection for businesses and organizations."
    },
    {
      slug: "tool-reviews",
      name: "Tool Reviews",
      description: "Expert comparisons of AI voice detection tools."
    },
    {
      slug: "scam-reconstruction",
      name: "Scam Reconstructions",
      description: "Real case studies of deepfake voice attacks."
    },
    {
      slug: "monthly-report",
      name: "Monthly Reports",
      description: "Monthly voice fraud landscape updates."
    },
    {
      slug: "legal",
      name: "Legal & Regulations",
      description: "Deepfake laws, regulations, and policy updates."
    }
  ] satisfies Category[],
  navigation: [
    { label: "Home", href: "/" },
    { label: "Tool Hub", href: "/tools" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" }
  ] satisfies NavigationItem[],
  tools: [
    {
      name: "EyeSift",
      slug: "eyesift",
      free: true,
      accuracy: "87%",
      bestFor: "Quick audio checks"
    },
    {
      name: "Resemble Detect",
      slug: "resemble-detect",
      free: false,
      accuracy: "94%",
      bestFor: "Professional verification"
    },
    {
      name: "Pindrop Pulse",
      slug: "pindrop-pulse",
      free: false,
      accuracy: "92%",
      bestFor: "Enterprise security"
    },
    {
      name: "DeepfakeDetector.ai",
      slug: "deepfakedetector-ai",
      free: true,
      accuracy: "85%",
      bestFor: "Basic detection"
    }
  ] satisfies FeaturedToolSummary[]
};
