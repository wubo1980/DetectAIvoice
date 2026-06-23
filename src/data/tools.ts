export interface Tool {
  slug: string;
  name: string;
  description: string;
  url: string;
  reviewArticleSlug?: string;
  price: "Free" | "Freemium" | "Paid";
  priceRange?: string;
  accuracy: string;
  accuracySource: string;
  bestFor: string;
  pros: string[];
  cons: string[];
  platform: string[];
  rating: number;
}

export const tools: Tool[] = [
  {
    slug: "eyesift",
    name: "EyeSift",
    description:
      "Free browser-based AI voice detector that analyzes audio files locally without uploading to a server.",
    url: "https://www.eyesift.com/faq/ai-voice-detection-deepfake-audio-2026/",
    reviewArticleSlug: "tested-3-free-tools",
    price: "Free",
    accuracy: "87%",
    accuracySource: "Independent test reports",
    bestFor: "Quick audio file checks for individuals",
    pros: [
      "No file upload needed (browser-side)",
      "Free forever",
      "Simple one-click interface",
      "Supports MP3, WAV, M4A, OGG, FLAC"
    ],
    cons: [
      "Lower accuracy on compressed audio",
      "No API for enterprise",
      "No real-time call detection"
    ],
    platform: ["Web"],
    rating: 4.0
  },
  {
    slug: "resemble-detect",
    name: "Resemble Detect",
    description:
      "Enterprise-grade deepfake audio detection API with benchmark-leading accuracy. From the team behind Resemble AI voice cloning.",
    url: "https://www.resemble.ai/resources/audio-deepfake-detection-benchmark-results-how-8-systems-performed-in-2026",
    reviewArticleSlug: "best-ai-voice-detectors-2026",
    price: "Paid",
    priceRange: "Contact for pricing",
    accuracy: "94%",
    accuracySource: "Resemble AI published benchmark (May 2026)",
    bestFor: "Professional media verification and enterprise deployment",
    pros: [
      "Highest reported accuracy in 2026 benchmarks",
      "API integration ready",
      "Benchmarked against 8 competing systems",
      "Built by voice AI experts"
    ],
    cons: [
      "Paid only — no free tier",
      "Requires technical integration",
      "Overkill for casual users"
    ],
    platform: ["API", "Web"],
    rating: 4.5
  },
  {
    slug: "pindrop-pulse",
    name: "Pindrop Pulse",
    description:
      "Enterprise voice security platform that detects deepfakes in real-time phone calls and audio files.",
    url: "https://www.pindrop.com/",
    reviewArticleSlug: "best-ai-voice-detectors-2026",
    price: "Paid",
    priceRange: "Contact for pricing",
    accuracy: "92%",
    accuracySource: "Industry analyst reports",
    bestFor: "Enterprise call center security and fraud prevention",
    pros: [
      "Real-time call analysis",
      "Enterprise security features",
      "Integrates with contact center systems",
      "Proven track record"
    ],
    cons: ["Enterprise pricing only", "Not for individual use", "Complex setup"],
    platform: ["API", "Phone System Integration"],
    rating: 4.3
  },
  {
    slug: "deepfakedetector-ai",
    name: "DeepfakeDetector.ai",
    description:
      "Online tool for detecting deepfake audio and video with educational resources and tutorials.",
    url: "https://deepfakedetector.ai/blog/how-to-detect-deepfake-audio",
    reviewArticleSlug: "tested-3-free-tools",
    price: "Freemium",
    priceRange: "Free basic, Pro from $9.99/mo",
    accuracy: "85%",
    accuracySource: "User reports and internal testing",
    bestFor: "Basic audio and video deepfake detection for individuals",
    pros: [
      "Free tier available",
      "Covers both audio and video",
      "Includes educational content",
      "Easy to use"
    ],
    cons: [
      "Accuracy varies by audio quality",
      "Limited free tier",
      "Less suitable for enterprise"
    ],
    platform: ["Web"],
    rating: 3.8
  },
  {
    slug: "hiya-deepfake",
    name: "Hiya AI Call Detection",
    description:
      "Mobile app and network-level solution that identifies and blocks AI-powered scam calls in real time.",
    url: "https://www.hiya.com/en-ca/newsroom/press-releases/state-of-the-call-2026",
    reviewArticleSlug: "signs-of-deepfake-call",
    price: "Freemium",
    priceRange: "Free basic, Premium from $3.99/mo",
    accuracy: "N/A",
    accuracySource: "N/A (blocking, not detecting)",
    bestFor: "Real-time scam call blocking on smartphones",
    pros: [
      "Blocks calls before you answer",
      "Available as mobile app",
      "Network-level protection",
      "Proven against robocalls"
    ],
    cons: [
      "Does not analyze audio files",
      "Not a detection tool per se",
      "Relies on call metadata"
    ],
    platform: ["iOS", "Android"],
    rating: 4.1
  },
  {
    slug: "uncovai",
    name: "UncovAI",
    description:
      "AI content detection platform that identifies AI-generated voice, text, and images.",
    url: "https://uncovai.com/best-ai-audio-detector-2026/",
    reviewArticleSlug: "free-ai-voice-detectors",
    price: "Freemium",
    priceRange: "Free basic, Pro from $14.99/mo",
    accuracy: "88%",
    accuracySource: "Internal testing and user reports",
    bestFor: "Multi-modal AI content detection (voice + text + image)",
    pros: [
      "Multi-modal detection",
      "Regularly updated",
      "Reasonable accuracy",
      "User-friendly interface"
    ],
    cons: [
      "Newer tool with less track record",
      "Not specialized solely for voice",
      "Accuracy varies by audio quality"
    ],
    platform: ["Web"],
    rating: 3.9
  }
];
